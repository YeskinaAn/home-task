import { Route, Routes, BrowserRouter } from "react-router-dom";
import Calculations from "./components/Calculations";
import Tournaments from "./components/Tournaments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calculations />} />
        <Route path="/tournaments" element={<Tournaments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
