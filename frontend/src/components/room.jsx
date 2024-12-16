import React, { useState,useEffect } from "react";

import TodoDataService from "../services/todos";



const Room = (props) => {
  const [room, SetRoom] = useState();

    const getRoomDetails = async () => {
        try {
            const response = await TodoDataService.RoomDetails(props.code); // 使用 async/await
            SetRoom(response.data)
        } catch (e) {
            console.error('Error fetching todos:', e);
        }
    };
    useEffect(() => {
            if (props.token) {
                retrieveTodos();
            }
        }, [token]);


  return (
    <div>
    <h3>{room.roomCode}</h3>
    <p>Votes: {room.votesToSkip}</p>
    <p>Guest Can Pause: {room.guestCanPause.toString()}</p>
    <p>Host: {room.isHost.toString()}</p>
  </div>
  );
};

export default Room;
