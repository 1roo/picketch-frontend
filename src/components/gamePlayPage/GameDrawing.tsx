import Konva from 'konva';
import { useEffect, useState } from 'react';
import { Stage, Layer, Line, Rect } from 'react-konva';
import * as G from '../../styles/gameplayPage/gameplayPageStyle';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface DrawData {
  data: { x: number; y: number; brushColor: string };
}

interface LineData {
  points: number[];
  color: string;
}

interface GameDrawingProps {
  socket: any;
}
// 🎨 팔레트 & 도구 스타일
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
  const navigate = useNavigate();

  useEffect(() => {
    // 클라이언트에서 서버로부터 그림 그리기 이벤트 수신
    socket.on('drawCanvas', (data: DrawData) => {
      console.log(data.data.x, data.data.y); // 데이터 확인
      console.log(data); // 데이터 확인
      setLines((prevLines) => {
        const lastLine =
          prevLines.length > 0 ? prevLines[prevLines.length - 1] : null;
        console.log('셋라인안');
        if (lastLine && lastLine.color === data.data.brushColor) {
          // 마지막 선과 같은 색상일 경우, 기존 객체 수정하면 안 됨 -> 새로운 객체를 반환해야 함
          return [
            ...prevLines.slice(0, -1),
            {
              ...lastLine,
              points: [...lastLine.points, data.data.x, data.data.y],
            },
          ];
        }
        console.log('라인 업데이트');
        return [
          ...prevLines,
          { points: [data.data.x, data.data.y], color: data.data.brushColor },
        ];
      });
    });

    socket.on('clearCanvas', (data: any) => {
      if (data.type === 'SUCCESS') {
        console.log('지우기 success응답받음');
        setLines([]); // 화면 지우기
      }
    });

    socket.on('endRound', () => {
      // 라운드 종료시
      setLines([]); // 화면 지우기
      socket.emit('nextTurn');
    });

    // socket.on('startGame', (data: any) => {
    //   alert(
    //     `다음 라운드 시작. ${
    //       data.data.keyword ? data.data.keyword : '턴 순서가 아닙니다.'
    //     }`
    //   );
    //   console.log('다음턴 시작시 키워드정보', data);
    // });

    // socket.on('nextTurn', (data: any) => {
    //   //다음턴 시작시 키워드 정보 받음
    //   alert(
    //     `다음 라운드 시작. ${
    //       data.data.keyword ? data.data.keyword : '턴 순서가 아닙니다.'
    //     }`
    //   );
    //   console.log('다음턴 시작시 키워드정보', data);

    //   //만약 마지막 라운드일 경우에는 endGame 이벤트 emit 하기
    //   if (data.type === 'ERROR') {
    //     socket.emit('endGame');
    //   }
    // });

    socket.on('endGame', (data: any) => {
      console.log('게임종료 요청의 응답', data);
      if (data.type === 'SUCCESS') {
        alert('게임종료되었습니다.');
        setLines([]); // 화면 지우기
        navigate('/game-list-page');
        console.log('게임 종료 처리 완료');
      }
    });

    return () => {
      socket.off('drawCanvas');
      socket.off('clearCanvas');
    };
  }, [socket]);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    setIsDrawing(true); // 마우스 버튼 눌렸을 때 드로잉 시작
  };

  const handleMouseUp = () => {
    setIsDrawing(false); // 마우스 버튼 뗐을 때 드로잉 종료
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing) return; // 드로잉 중일 때만 emit 이벤트 발생

    const stage = e.target.getStage();
    if (!stage) return;
    const point = stage.getPointerPosition();
    if (!point) return;

    // 마우스 이동 시 서버로 그림 그리기 데이터 전송
    socket.emit('drawCanvas', {
      x: point.x,
      y: point.y,
      brushColor: selectedColor,
    });
  };

  const handlerClear = () => {
    socket.emit('clearCanvas');
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
              points={line.points} // 선을 그릴 좌표 데이터
              stroke={line.color} // 선 색상
              strokeWidth={3} // 선 두께
            />
          ))}
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
              onClick={() => setSelectedColor(color)} // 색상 선택 시 선택된 색상으로 변경
            />
          ))}
          <ClearButton
            src='/images/eraser.png'
            alt='Clear'
            // onClick={() => setLines([])} // 화면 지우기
            onClick={handlerClear} // 화면 지우기
          />
        </PaletteContainer>
      </ControlsContainer>
    </G.SketchbookContainer>
  );
};

export default GameDrawing;
