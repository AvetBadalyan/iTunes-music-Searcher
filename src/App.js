import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import SingleSongDetails from "./Components/Songs/SingleSongDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/songdetails/:trackId" element={<SingleSongDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
