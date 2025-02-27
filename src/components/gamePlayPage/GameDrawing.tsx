import Konva from 'konva';
import { useEffect, useState } from 'react';
import { Stage, Layer, Line, Rect } from 'react-konva';
import * as G from '../../styles/gameplayPage/gameplayPageStyle';
import styled from 'styled-components';

interface DrawData {
  type: string;
  data: { x: number; y: number; brushColor: string; newLine: string };
}

interface LineData {
  points: number[];
  color: string;
}

interface GameDrawingProps {
  socket: any;
}

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  z-index: 10;
  @media (max-width: 768px) {
    gap: 5px;
  }
`;

const PaletteContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 50px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-bottom: 120px;
  @media (max-width: 1024px) {
    padding-bottom: 0px;
  }
  @media (max-width: 768px) {
    padding-bottom: 0px;
  }
  @media (max-width: 480px) {
    padding-bottom: 0px;
  }
`;

const PaletteColor = styled.button<{ color: string; $isSelected: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) =>
    props.$isSelected ? '3px solid black' : '1px solid #ccc'};
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
  }
`;

const ClearButton = styled.img`
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
  @media (max-width: 480px) {
    width: 22px;
    height: 22px;
  }
`;

const GameDrawing: React.FC<GameDrawingProps> = ({ socket }) => {
  const [lines, setLines] = useState<LineData[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [canvasSize, setCanvasSize] = useState({
    width: Math.max(460, window.innerWidth * 0.5),
    height: Math.max(306, (window.innerWidth * 0.5) / 1.5),
  });

  const [isDrawing, setIsDrawing] = useState(false); // 마우스 버튼 상태 추가
  const [currentLine, setCurrentLine] = useState<LineData | null>(null); // 현재 그리려는 선
  const [isNewLine, setIsNewLine] = useState(true);
  useEffect(() => {
    // 클라이언트에서 서버로부터 그림 그리기 이벤트 수신
    // 클라이언트에서 서버로부터 그림 그리기 이벤트 수신
    socket.on('drawCanvas', (data: DrawData) => {
      console.log('drawCanvas응답은', data);
      console.log('drawCanvas응답은', data.type);
      if (data.type === 'SUCCESS') {
        // data.newLine을 확인하여 새 선을 시작해야 하는지 결정
        if (data.data.newLine) {
          // 새로운 선 시작
          setLines((prevLines) => [
            ...prevLines,
            { points: [data.data.x, data.data.y], color: data.data.brushColor },
          ]);
        } else {
          // 기존 선에 점 추가
          setLines((prevLines) => {
            const lastLine =
              prevLines.length > 0 ? prevLines[prevLines.length - 1] : null;
            if (lastLine) {
              return [
                ...prevLines.slice(0, -1),
                {
                  ...lastLine,
                  points: [...lastLine.points, data.data.x, data.data.y],
                },
              ];
            }
            return prevLines;
          });
        }
      }
    });

    socket.on('clearCanvas', (data: any) => {
      if (data.type === 'SUCCESS') {
        setLines([]); // 화면 지우기
      }
    });

    socket.on('startGame', (data: any) => {
      // alert(
      //   `다음 라운드 시작. ${
      //     data.data.keyword ? data.data.keyword : "턴 순서가 아닙니다."
      //   }`
      // );
    });

    socket.on('endRound', () => {
      setLines([]); // 화면 지우기
      socket.emit('nextTurn');
    });

    socket.on('nextTurn', (data: any) => {
      // alert(
      //   `다음 라운드 시작. ${
      //     data.data.keyword ? data.data.keyword : "턴 순서가 아닙니다."
      //   }`
      // );
      if (data.type === 'ERROR') {
        socket.emit('endGame');
      }
    });

    socket.on('endGame', (data: any) => {
      if (data.type === 'SUCCESS') {
        alert('게임 종료되었습니다.');
        setLines([]); // 화면 지우기
      }
    });

    return () => {
      if (socket) {
        socket.off('drawCanvas');
        socket.off('clearCanvas');
        socket.off('startGame');
        socket.off('endRound');
        socket.off('nextTurn');
        socket.off('endGame');
      }
    };
  }, [socket]);

  // 마우스를 눌렀을 때 드로잉 시작
  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    setIsDrawing(true);
    setIsNewLine(true); // 새로운 선 시작
    setCurrentLine({ points: [], color: selectedColor });
  };

  // 마우스를 뗐을 때 드로잉 종료
  const handleMouseUp = () => {
    setIsDrawing(false);
    if (currentLine && currentLine.points.length > 0) {
      setLines((prevLines) => [...prevLines, currentLine]);
    }
    setCurrentLine(null); // 새로운 선을 시작할 준비
  };

  // 마우스를 움직일 때 그리는 선에 점 추가
  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing || !currentLine) return;

    const stage = e.target.getStage();
    if (!stage) return;
    const point = stage.getPointerPosition();
    if (!point) return;

    // 서버로 그림 그리기 데이터 전송
    socket.emit('drawCanvas', {
      x: point.x,
      y: point.y,
      brushColor: selectedColor,
      newLine: isNewLine,
    });

    if (isNewLine) {
      setIsNewLine(false);
    }
  };

  // 화면 지우기 버튼 클릭 시
  const handlerClear = () => {
    if (socket) socket.emit('clearCanvas');
  };

  return (
    <G.SketchbookContainer>
      <Stage
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          <Rect
            width={canvasSize.width}
            height={canvasSize.height}
            fill='transparent'
          />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={3}
            />
          ))}
          {/* 현재 그리는 선 */}
          {currentLine && currentLine.points.length > 0 && (
            <Line
              points={currentLine.points}
              stroke={currentLine.color}
              strokeWidth={3}
              tension={0.5}
              lineCap='round'
              lineJoin='round'
            />
          )}
        </Layer>
      </Stage>

      <ControlsContainer>
        <PaletteContainer>
          {[
            '#FFFFFF',
            '#000000',
            '#FF0000',
            '#00FF00',
            '#0000FF',
            '#FFFF00',
            '#FF00FF',
            '#00FFFF',
            '#808080',
            '#A52A2A',
            '#800080',
            '#008080',
          ].map((color) => (
            <PaletteColor
              key={color}
              color={color}
              $isSelected={selectedColor === color}
              onClick={() => setSelectedColor(color)}
            />
          ))}
          <ClearButton
            src='/images/eraser.png'
            alt='Clear'
            onClick={handlerClear} // 화면 지우기
          />
        </PaletteContainer>
      </ControlsContainer>
    </G.SketchbookContainer>
  );
};

export default GameDrawing;
