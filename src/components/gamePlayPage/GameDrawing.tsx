import Konva from "konva";
import { useEffect, useState } from "react";
import { Stage, Layer, Line, Rect } from "react-konva"; // Rect 추가 (캔버스 배경)
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
  gap: 10px;
  margin-top: 10px;
`;

const PaletteContainer = styled.div`
  display: flex;
  gap: 10px;
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
`;

const ClearButton = styled.button`
  background-color: #101010;
  color: white;
  padding: 5px 10px 5px 5px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease;
  font-weight: bold;

  &:hover {
    background-color: darkred;
  }
`;

const GameDrawing: React.FC<GameDrawingProps> = ({ socket }) => {
  const [lines, setLines] = useState<LineData[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [drawing, setDrawing] = useState<boolean>(false);
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth * 0.4);
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight * 0.45);

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

  // 창 크기 변경
  useEffect(() => {
    const handleResize = () => {
      setCanvasWidth(Math.max(400, window.innerWidth * 0.4));
      setCanvasHeight(Math.max(window.innerHeight * 0.45));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleClear = () => {
    setLines([]);
    socket.emit("clear");
  };

  return (
    <G.SketchbookContainer>
      <Stage
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <Rect width={canvasWidth} height={canvasHeight} fill="white" />

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
        </PaletteContainer>
        <ClearButton onClick={handleClear}>🧹 CLEAR</ClearButton>
      </ControlsContainer>
    </G.SketchbookContainer>
  );
};

export default GameDrawing;
