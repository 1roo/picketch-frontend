// import React, { useEffect, useState, useRef } from "react";
// import { Stage, Layer, Line, Rect } from "react-konva";
// import io from "socket.io-client";
// import {
//   Container,
//   SketchbookWrapper,
//   StyledStageContainer,
//   ColorPalette,
//   ColorButton,
//   ClearButton,
// } from "../../styles/gameDrawingStyle";

// // 소켓 연결
// const socket = io(
//   process.env.NODE_ENV === "production"
//     ? process.env.REACT_APP_SOCKET_SERVER_URL
//     : "http://localhost:4000",
//   { transports: ["websocket"] }
// );

// interface LineData {
//   points: number[];
//   color: string;
//   originalWidth: number;
//   originalHeight: number;
// }

// // 12가지 색상 팔레트
// const COLORS = [
//   "#FFFFFF",
//   "#000000",
//   "#FF0000",
//   "#00FF00",
//   "#0000FF",
//   "#FFFF00",
//   "#FF00FF",
//   "#00FFFF",
//   "#800000",
//   "#808000",
//   "#008000",
//   "#800080",
// ];

// const GameDrawing: React.FC = () => {

//   const [lines, setLines] = useState<LineData[]>([]);
//   const [selectedColor, setSelectedColor] = useState<string>("#000000");
//   const [drawing, setDrawing] = useState<boolean>(false);

//   const [color, setColor] = useState<string>("#000000");
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

//   // 창 크기 변경 시 Stage와 그림 크기 조정
//   const handleResize = () => {
//     if (containerRef.current) {
//       const newWidth = containerRef.current.clientWidth * 0.9;
//       const newHeight = newWidth / 1.5; // 1.5:1 비율 유지

//       // 기존 그림 크기에 맞춰 비율 조정
//       setLines((prevLines) =>
//         prevLines.map((line) => ({
//           ...line,
//           points: line.points.map(
//             (point, index) =>
//               index % 2 === 0
//                 ? (point / line.originalWidth) * newWidth // X 좌표 비율 조정
//                 : (point / line.originalHeight) * newHeight // Y 좌표 비율 조정
//           ),
//           originalWidth: newWidth,
//           originalHeight: newHeight,
//         }))
//       );

//       setDimensions({ width: newWidth, height: newHeight });
//     }
//   };

//   // 창 크기 변경 감지 후 handleResize 실행

//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // 마우스를 눌렀을 때 선을 새로 추가
//   const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
//     setDrawing(true);
//     const stage = e.target.getStage();
//     if (!stage) return;
//     const point = stage.getPointerPosition();
//     if (!point) return;

//     setLines((prevLines) => [
//       ...prevLines,

//       {
//         points: [point.x, point.y],
//         color,
//         originalWidth: dimensions.width,
//         originalHeight: dimensions.height,
//       },

//     ]);
//   };

//   // 마우스 이동 시 선을 업데이트
//   const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
//     if (!drawing) return;

//     const stage = e.target.getStage();
//     if (!stage) return;
//     const point = stage.getPointerPosition();
//     if (!point) return;

//     setLines((prevLines) => {
//       const newLines = [...prevLines];
//       const lastLine = newLines[newLines.length - 1];
//       lastLine.points = [...lastLine.points, point.x, point.y];
//       return newLines;
//     });
//   };

//   // 마우스 버튼을 떼면 그리기 종료
//   const handleMouseUp = () => {
//     setDrawing(false);
//     socket.emit("draw", lines[lines.length - 1]);
//   };

//   // 클리어 버튼 클릭 시 그림 초기화
//   const handleClear = () => {
//     setLines([]);
//     socket.emit("clear");
//   };

//   return (

//     <Container ref={containerRef}>
//       <SketchbookWrapper>
//         <StyledStageContainer>
//           <Stage
//             width={dimensions.width}
//             height={dimensions.height}
//             onMouseDown={handleMouseDown}
//             onMousemove={handleMouseMove}
//             onMouseup={handleMouseUp}
//           >
//             <Layer>
//               <Rect width={dimensions.width} height={dimensions.height} />
//               {lines.map((line, i) => (
//                 <Line
//                   key={i}
//                   points={line.points}
//                   stroke={line.color}
//                   strokeWidth={3}
//                   lineCap="round"
//                   lineJoin="round"
//                 />
//               ))}
//             </Layer>
//           </Stage>
//         </StyledStageContainer>
//       </SketchbookWrapper>

//       <ColorPalette>
//         {COLORS.map((paletteColor) => (
//           <ColorButton
//             key={paletteColor}
//             color={paletteColor}
//             selected={color === paletteColor}
//             onClick={() => setColor(paletteColor)}
//           />
//         ))}
//       </ColorPalette>

//       <ClearButton onClick={handleClear}>🗑️ CLEAR</ClearButton>
//     </Container>

//   );
// };

// export default GameDrawing;
