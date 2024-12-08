import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/join/1" element={<p>Joining room 1...</p>} />
      </Routes>
    </Router>
  );
}


// 渲染 React 应用
const root = createRoot(document.getElementById("app"));
root.render(<App name="time time time!!!" />);
