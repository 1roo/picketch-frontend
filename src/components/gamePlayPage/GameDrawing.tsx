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
  background-color: red;
  color: white;
  padding: 8px 15px;
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
  const [drawing, setDrawing] = useState<boolean>(false); // 🎨 현재 그리고 있는 상태

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
      { points: [point.x, point.y], color: selectedColor }, // 🎨 선택한 색상 적용
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
    socket.emit("draw", lines[lines.length - 1]); // 🎨 최종 선 서버로 전송
  };

  // 🧹 클리어 버튼 기능
  const handleClear = () => {
    setLines([]);
    socket.emit("clear"); // 서버에도 클리어 이벤트 전송
  };

  return (
    <G.SketchbookContainer>
      <Stage
        width={600}
        height={400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove} // 🎨 마우스 이동 추가
        onMouseUp={handleMouseUp} // 🎨 마우스를 떼면 선을 마무리
      >
        <Layer>
          {/* 🖌 캔버스(도화지) 배경 추가 */}
          <Rect width={600} height={400} fill="white" />

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

      {/* 🎨 컬러 팔레트 & 클리어 버튼 */}
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
