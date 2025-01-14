import React, { useState,useEffect } from "react";

import TodoDataService from "../services/todos";
import { Link,useNavigate } from 'react-router-dom';

import {Button,Grid,Typography,TextField,FormHelperText,FormControl,
  Radio,RadioGroup,FormControlLabel,Collapse,Alert } from '@mui/material'

const RoomCreate = (props) => {
  const [defaultVotes, setDefaultVotes] = useState(props.votesToSkip?props.votesToSkip:2);
  const [guestCanPause, setGuestCanPause] = useState(props.guestCanPause?props.guestCanPause:false);
  const [upDate,setUpDate] = useState(props.update);
  const [roomCode,setRoomCode] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg,setSuccessMsg] = useState("");
  const title = upDate?'Update A Room':'Create A Room'
  // Handle votes change
  const handleVotesChange = (event) => {
    setDefaultVotes(event.target.value);
  };

  // Handle radio button change
  const handleGuestCanPauseChange = (event) => {
    setGuestCanPause(event.target.value);
  };
  const handleRoomButtonPressed= async (event) => {
    var data = {
        guest_can_pause : guestCanPause,
        votes_to_skip : defaultVotes,
        };
    TodoDataService.createRoom(data, props.token).then((response) => {
        console.log("Server response:", response.data || response); // Handle Axios or fetch
        setSuccessMsg(response.status);
        localStorage.setItem('room_code', response.data.code);
        props.set_room_code(response.data.code);  
        navigate('/room/'+response.data.code);
        setSuccessMsg(response.status);
      })
      .catch((e) => {
        setErrorMsg(response.status);
        console.error("Error saving:", e);
      });
    
      
  };

  const handleRoomUpdateButtonPressed= async (event) => {
    var data = {
        code : localStorage.getItem('room_code'),
        guest_can_pause : guestCanPause,
        votes_to_skip : defaultVotes,
        };
    TodoDataService.upDateRoom(data, props.token).then((response) => {
        console.log("Server response:", response.data || response); // Handle Axios or fetch
        localStorage.setItem('room_code', response.data.code);
        props.set_room_code(response.data.code);  
        // navigate('/room/'+response.data.code);
        props.updateCallback()
        setSuccessMsg(response.status);
      })
      .catch((e) => {
        setErrorMsg(response.status);
        console.log("data:", data);
        // console.log("ret:",response.data)
        console.error("Error saving:", e);
      });}
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
        {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
          <Collapse
            in={errorMsg != "" ||successMsg != ""}
          >
            {successMsg != "" ? (
              <Alert
                severity="success"
                onClose={() => {
                  setSuccessMsg("");
                }}
              >
                {successMsg}
              </Alert>
            ) : (
              <Alert
                severity="error"
                onClose={() => {
                  setErrorMsg("");
                }}
              >
                {errorMsg}
              </Alert>
            )}
          </Collapse>
        </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText align="center">
            Guest Control of Playback State
          </FormHelperText>
          <RadioGroup
            row
            value={guestCanPause}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl fullWidth>
          <TextField
            required
            type="number"
            value={defaultVotes}
            onChange={handleVotesChange}
            inputProps={{
              min: 1,
              style: { textAlign: 'center' },
            }}
            fullWidth
          />
          <FormHelperText align="center">
            Votes Required To Skip Song
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={upDate?handleRoomUpdateButtonPressed:handleRoomButtonPressed}
        >
          {title}
        </Button>
      </Grid>

      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default RoomCreate;
