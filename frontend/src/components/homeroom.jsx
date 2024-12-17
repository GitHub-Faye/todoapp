import React from 'react';
import { Grid, Button, ButtonGroup, Typography } from '@mui/material';
import {Route,Link,} from 'react-router-dom'; 

const HomeRoom = (props) => {

    return (
        <div>
        <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/roomjoin" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/roomcreate" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      </div>
    //    <div>
    //     <Link 
    //             to={`/roomcreate`} 
    //                 state={{  }} // 使用 ` location.state` 传递数据到跳转的页面 这里送到了/todos/${todo.id}
    //                     >
    //             <Button variant="outline-info" className="me-2">
    //                             CreateMusicRoom
    //             </Button>
    //     </Link>
    //     <Link 
    //             to={`/roomjoin`} 
    //                 state={{  }} // 使用 ` location.state` 传递数据到跳转的页面 这里送到了/todos/${todo.id}
    //                     >
    //             <Button variant="outline-info" className="me-2">
    //                             JoinRoom
    //             </Button>
    //     </Link>

    //    </div>
    );
};

export default HomeRoom;
