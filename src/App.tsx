//import "./styles/global.css";
import GlobalStyle from "./styles/GlobalStyle";
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
