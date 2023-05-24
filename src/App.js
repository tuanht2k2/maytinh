import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Stopwatch from "./pages/Stopwatch";
import Calculator from "./pages/Calculator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/stopwatch" element={<Stopwatch />}></Route>
        <Route path="/calculator" element={<Calculator />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
