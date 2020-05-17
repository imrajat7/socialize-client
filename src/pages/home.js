import React, { Component } from 'react'
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';

export class home extends Component {
  constructor(props){
    super(props);
    this.state={
      screams: null
    }
  }

  componentDidMount(){
    Axios.get('/screams')
    .then(res=>{
      console.log(res.data);
      this.setState({
        screams: res.data
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }

  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map(scream=> <p>{scream.body}</p>)
    ): <p> Loading...</p>

    return (  
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
