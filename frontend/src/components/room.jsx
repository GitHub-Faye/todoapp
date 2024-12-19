import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import TodoDataService from "../services/todos";

import { Grid, Button, ButtonGroup, Typography } from '@mui/material';

const Room = (props) => {
  const [room, setRoom] = useState();
  const { roomCode } = useParams();
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
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


  const leaveButtonPressed = ()=>{
    localStorage.removeItem('room_code');
    props.set_room_code(null);
    TodoDataService.leaveRoom(null,token);
    navigate('/homeroom');
  };

  return (
    <div>
      {room ? (

        <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Code: {room.code}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Votes: {room.votes_to_skip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Guest Can Pause: {room.guest_can_pause ? 'Yes' : 'No'}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Host: {room.is_host ? 'Yes' : 'No'}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={leaveButtonPressed}
          >
            Leave Room
          </Button>
        </Grid>
        </Grid>
        // <>
        //   <h3>{room.code}</h3>
        //   <p>Votes: {room.votes_to_skip}</p>
        //   <p>Guest Can Pause:  {room.guest_can_pause ? 'Yes' : 'No'}</p>
        //   <p>Host: {room.is_host ? 'Yes' : 'No'}</p>
        // </>
      ) : (
        <p>Loading room details...</p>
      )}
    </div>
  );
};

export default Room;
