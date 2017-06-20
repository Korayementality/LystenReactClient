/* global gapi */
import React, { Component } from 'react';
import logo from './logo.svg';
import { Navbar, Grid, Row} from 'react-bootstrap';
import './App.css';
import Player from './PlayerComponent.js';
import Result from './resultItem.js';
//import SearchArea from './SearchArea.js';
class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      googleAPI: '',
      videoResults: [],
      videoResultsCount: 0,
      query: '',
      currentSong: '',
      currentSongName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.requestSong = this.requestSong.bind(this);
  }
  requestSong(newSong, name){
    this.setState({currentSong: newSong, currentSongName: name});
    this.refs.player.playSong(newSong);
    this.refs.player.setState({nextPlayState: 'stop'});
  }
  onYouTubeApiLoad() {
    console.log("ready to load");
    gapi.client.setApiKey('AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');
    this.search();
  }
  handleChange(e) {
    this.setState({query: e.target.value});
  }
  search() {
    var app = this;
    this.setState({videoResults: []});
      var request = gapi.client.youtube.search.list({
        q: this.state.query,
        part: 'snippet',
        maxResults: 25
      });
  
    request.execute(function(response) {
      var str = JSON.stringify(response.result);
      console.log(response.result);
      console.log(str);
      app.setState({videoResults: response.result.items});
      console.log(app.state.videoResults);
    });
  }
  beginYoutubeApiLoad() {
    var app = this;
    console.log("beginning YT API load");
    gapi.client.load('youtube', 'v3', function() {
      app.onYouTubeApiLoad();
    });
  }
  componentDidMount() {
    window.addEventListener('google-loaded',this.setState({googleAPI: gapi}));
    console.log(gapi);
    gapi.load('client', this.beginYoutubeApiLoad());
  }
   
  render() {
    var list = this.state.videoResults;
    var app = this;
    var result = list.map(function(item, index){
      return (<Result name={item.snippet.title} image={item.snippet.thumbnails.medium.url} vid={item.id.videoId} callbackParent={(newSong, name)=>app.requestSong(newSong, name)}></Result>);
    });
    return (
      <div className="App">
       <script src="https://apis.google.com/js/client.js"></script>
       <Navbar className="navbar-fixed-bottom">
        <Player currentSong={this.state.currentSong} ref="player"></Player><p>{this.state.currentSongName}</p>
       </Navbar>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Lysten</h2>
        </div>
        <p className="App-intro">
          <input type="text" value={this.state.query} onChange={this.handleChange}></input>
          <button class="glyphicon glyphicon-star" onClick={this.search}>Search for {this.state.query}</button>
        </p>
        <div>
        <Grid>
          <Row>
            {result}
          </Row>
        </Grid>
        </div>
      </div>
    );
  }
}

export default App;
