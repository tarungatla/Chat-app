import './App.css';
import io from "socket.io-client";
import {useState} from "react";
import Chat from "./Chat"
const socket = io.connect("http://localhost:3001");   //connecting to the socket server which is running on the port 3001


function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if(username!== "" && room!== "")
    {
      socket.emit("join_room",room);  // room will be passed as data
      setShowChat(true);
    }
  }
  return (
    <div className="App">
      {!showChat ? ( 
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <div>
          <input
            type="text"
            placeholder="Name..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          </div>

          <div>
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          </div>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
