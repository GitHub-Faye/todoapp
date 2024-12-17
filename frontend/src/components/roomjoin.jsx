import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import TodoDataService from "../services/todos";

const RoomJoin = (props) => {
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onChangeTextField = (e) => {
        setRoomCode(e.target.value);
    };
    const roomButtonPressed = (e) => {
        TodoDataService.joinRoom({code:roomCode},props.token).then((response) => {
            if (response.ok) {
                console.log("Server response:", response.data || response); // Handle Axios or fetch
                localStorage.setItem('room_code', roomCode); 
                navigate('/room/'+roomCode);
              } else {
                setError("Room not found.");
              }
        })
          .catch((e) => {
            console.error("Error saving:", e);
          });
        
    }; 
    return (
        <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            error = {error}
            label="Code"
            placeholder="Enter a Room Code"
            value={roomCode}
            helperText={error}
            variant="outlined"
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={roomButtonPressed}
          >
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
};




export default RoomJoin;
