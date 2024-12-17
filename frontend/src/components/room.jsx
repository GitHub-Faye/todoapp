import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import TodoDataService from "../services/todos";

const Room = (props) => {
  const [room, setRoom] = useState();
  const { roomCode } = useParams();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken); // Set the token state
    } else {
      alert("没有token");
    }
  }, []); // This effect runs once on initial render

  useEffect(() => {
    if (token) {
      getRoomDetails(); // Call getRoomDetails when token is available
    }
  }, [token]); // This effect runs when `token` changes


    // 在 roomCode 变化时重新调用 getRoomDetails
    // useEffect(() => {
    //   if (roomCode) {
    //     getRoomDetails();
    //   }
    // }, [roomCode]);  // 当 roomCode 变化时调用
  
  // 获取房间详细信息
  const getRoomDetails = async () => {
    try {
      if(token!=null){
        const response = await TodoDataService.getRoom({code:roomCode}, token); // 使用 async/await
        setRoom(response.data);
      }else{
        alert("没有token");
      }

    } catch (e) {
      console.error('Error fetching room details:', e);
      alert("Failed to fetch room details. Please try again.");
    }
  };


  return (
    <div>
      {room ? (
        <>
          <h3>{room.code}</h3>
          <p>Votes: {room.votes_to_skip}</p>
          <p>Guest Can Pause:  {room.guest_can_pause ? 'Yes' : 'No'}</p>
          <p>Host: {room.is_host ? 'Yes' : 'No'}</p>
        </>
      ) : (
        <p>Loading room details...</p>
      )}
    </div>
  );
};

export default Room;
