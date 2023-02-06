import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Favourite from "./components/Favourite";
import Homepage from "./components/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="favourite" element={<Favourite />} />
          <Route path="" element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
