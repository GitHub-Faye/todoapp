import React, { useState,useEffect } from "react";

import TodoDataService from "../services/todos";
import { Link,useNavigate } from 'react-router-dom';

import {Button,Grid,Typography,TextField,FormHelperText,FormControl,
  Radio,RadioGroup,FormControlLabel} from '@mui/material'


const RoomCreate = (props) => {
  const [defaultVotes, setDefaultVotes] = useState(1);
  const [guestCanPause, setGuestCanPause] = useState("true");
  const navigate = useNavigate();
  // Handle votes change
  const handleVotesChange = (event) => {
    setDefaultVotes(event.target.value);
  };

  // Handle radio button change
  const handleGuestCanPauseChange = (event) => {
    setGuestCanPause(event.target.value);
  };
  const handleRoomButtonPressed= (event) => {
    var data = {
        guest_can_pause : guestCanPause,
        votes_to_skip : defaultVotes,
        };
    TodoDataService.createRoom(data, props.token).then((response) => {
        console.log("Server response:", response.data || response); // Handle Axios or fetch
        navigate('/room/'+response.data.code);
      })
      .catch((e) => {
        console.error("Error saving:", e);
      });

      
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create A Room
        </Typography>
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
          onClick={handleRoomButtonPressed}
        >
          Create A Room
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
