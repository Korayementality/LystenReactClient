import React, { Component } from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import './App.css';

class Player extends Component {
  constructor(props) {
        super(props);
        this.state = {
          url: '',
          nextPlayState: 'play'
        };
        this.setPlayState = this.setPlayState.bind(this);
        this.playSong = this.playSong.bind(this);
        this.stopSong = this.stopSong.bind(this);
        this.continueSong = this.continueSong.bind(this);
  }
  audio = new Audio()
  setPlayState(source) {
    if(this.state.nextPlayState==='play')
    {
      this.playSong(source);
    }
    else if(this.state.nextPlayState==='stop')
    {
      this.stopSong();
    }
  }
  playSong(source)
  {
    this.setState({url: source});
    this.audio.src = "https://lysten-korayementality.c9users.io/music/"+source;
    this.audio.play();
    this.setState({nextPlayState:'stop'});
  }
  continueSong()
  {
    this.audio.src = "https://lysten-korayementality.c9users.io/music/"+this.state.url;
    this.audio.play();
    this.setState({nextPlayState:'stop'});
  }
  stopSong()
  {
    this.audio.pause();
    //this.audio.currenTime = 0;
    this.setState({nextPlayState:'play'});
  }
  render() {
    return (
      <div>
      {this.state.nextPlayState==='play'? <Button onClick={this.continueSong}><Glyphicon glyph={this.state.nextPlayState}/></Button> : <Button onClick={this.stopSong}><Glyphicon glyph={this.state.nextPlayState}/></Button>}
      </div>
    );
  }
}

export default Player;
//<audio src={"https://lysten-korayementality.c9users.io/music/"+this.props.currentSong} controls></audio>
//<Button onClick={this.setPlayState}><Glyphicon glyph={this.state.nextPlayState}/></Button>