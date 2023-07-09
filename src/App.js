import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import io from "socket.io-client";
function App() {
  const socket = io("/");
  socket.on("connect", () => {
    console.log("connected");
  });

  return (
    <div className="App">
      <LandingPage socket={socket} />
    </div>
  );
}

export default App;
