//import "./styles/global.css";
import GlobalStyle from "./styles/globalStyle";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
}
export default App;
