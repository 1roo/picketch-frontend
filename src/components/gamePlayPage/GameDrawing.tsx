import Konva from "konva";
import React, { useEffect, useState } from "react";
import { Stage, Layer, Line, Rect } from "react-konva";
import io from "socket.io-client";

// 소켓 연결
const socket = io(
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SOCKET_SERVER_URL
    : "http://localhost:4000",
  { transports: ["websocket"] }
);

interface LineData {
  points: number[];
  color: string;
}

// 12가지 색상 팔레트
const COLORS = [
  "#FFFFFF",
  "#000000",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#800000",
  "#808000",
  "#008000",
  "#800080",
];

const IMAGE_URL = "/images/sketchbook.png";

const GameDrawing: React.FC = () => {
  const [lines, setLines] = useState<LineData[]>([]);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#000000");

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
  }, []);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    setDrawing(true);
    const stage = e.target.getStage();
    if (!stage) return;
    const point = stage.getPointerPosition();
    if (!point) return;

    setLines((prevLines) => [
      ...prevLines,
      { points: [point.x, point.y], color },
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
      newLines[newLines.length - 1].points = newLines[
        newLines.length - 1
      ].points.concat([point.x, point.y]);
      return newLines;
    });

    socket.emit("draw", lines[lines.length - 1]);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleClear = () => {
    setLines([]);
    socket.emit("clear");
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundImage: `url(${IMAGE_URL})`,
        backgroundSize: "cover",
        display: "flex",
        height: "100%",
        width: "80%",
        paddingTop: "100px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stage
        width={800}
        height={500}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        style={{ border: "1px solid black", backgroundColor: "white" }}
      >
        <Layer>
          <Rect width={800} height={500} fill="white" />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={3}
              lineCap="round"
              lineJoin="round"
            />
          ))}
        </Layer>
      </Stage>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        {COLORS.map((paletteColor) => (
          <div
            key={paletteColor}
            onClick={() => setColor(paletteColor)}
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: paletteColor,
              margin: "5px",
              borderRadius: "50%",
              cursor: "pointer",
              border:
                color === paletteColor ? "3px solid #000" : "1px solid #ccc",
            }}
          />
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={handleClear}
          style={{ marginRight: "10px", color: "#101010" }}
        >
          🗑️ CLEAR
        </button>
      </div>
    </div>
  );
};

export default GameDrawing;
