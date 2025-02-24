import Konva from "konva";
import { useEffect, useState } from "react";
import { Stage, Layer, Line, Rect } from "react-konva";
import * as G from "../../styles/gameplayPage/gameplayPageStyle";
import styled from "styled-components";

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
  padding-bottom: 120px; /* 기본 값 */

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
    props.$isSelected ? "3px solid black" : "1px solid #ccc"};
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
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [drawing, setDrawing] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState({
    width: Math.max(460, window.innerWidth * 0.5),
    height: Math.max(306, (window.innerWidth * 0.5) / 1.5),
  });

  const [prevCanvasSize, setPrevCanvasSize] = useState(canvasSize);

  const COLORS = [
    "#FFFFFF",
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#808080",
    "#A52A2A",
    "#800080",
    "#008080",
  ];

  // ✅ 창 크기 변경 감지 및 비율 유지
  useEffect(() => {
    const handleResize = () => {
      const newWidth = Math.max(300, window.innerWidth * 0.5);
      const newHeight = newWidth / 1.5;

      const widthRatio = newWidth / prevCanvasSize.width;
      const heightRatio = newHeight / prevCanvasSize.height;

      setLines((prevLines) =>
        prevLines.map((line) => ({
          ...line,
          points: line.points.map((point, index) =>
            index % 2 === 0 ? point * widthRatio : point * heightRatio
          ),
        }))
      );

      setPrevCanvasSize({ width: newWidth, height: newHeight });
      setCanvasSize({ width: newWidth, height: newHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [prevCanvasSize]);

  useEffect(() => {
    socket.on("draw", (newLine: LineData) => {
      setLines((prevLines) => [...prevLines, newLine]);
    });

    socket.on("clear", () => {
      setLines([]);
    });

    return () => {
      socket.off("draw");
      socket.off("clear");
    };
  }, [socket]);

  // ✨ 그림 그리기 기능 추가
  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    setDrawing(true);
    const stage = e.target.getStage();
    if (!stage) return;
    const point = stage.getPointerPosition();
    if (!point) return;

    setLines((prevLines) => [
      ...prevLines,
      { points: [point.x, point.y], color: selectedColor },
    ]);
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!drawing) return;
    const stage = e.target.getStage();
    if (!stage) return;
    const point = stage.getPointerPosition();
    if (!point) return;

    setLines((prevLines) => {
      const newLines = [...prevLines];
      const lastLine = newLines[newLines.length - 1];
      lastLine.points = [...lastLine.points, point.x, point.y];
      return newLines;
    });
  };

  const handleMouseUp = () => {
    setDrawing(false);
    socket.emit("draw", lines[lines.length - 1]);
  };

  return (
    <G.SketchbookContainer>
      <Stage
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <Rect
            width={canvasSize.width}
            height={canvasSize.height}
            fill="transparent"
          />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={3}
            />
          ))}
        </Layer>
      </Stage>

      <ControlsContainer>
        <PaletteContainer>
          {COLORS.map((color) => (
            <PaletteColor
              key={color}
              color={color}
              $isSelected={selectedColor === color}
              onClick={() => setSelectedColor(color)}
            />
          ))}
          <ClearButton
            src="/images/eraser.png"
            alt="Clear"
            onClick={() => setLines([])}
          />
        </PaletteContainer>
      </ControlsContainer>
    </G.SketchbookContainer>
  );
};

export default GameDrawing;
