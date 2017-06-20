import React, { Component } from 'react';
import './App.css';

class SearchArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      executeSearch: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  handleChange(e) {
    this.setState({query: e.target.value});
  }
  submit(e)
  {
    this.setState({executeSearch: true});
  }
  render() {
    
    return (
      <div>
      <input type="text" value={this.state.query} onChange={this.handleChange}></input>
      <button onClick={this.submit}>Search for {this.state.query}</button>
      </div>
    );
  }
}

export default SearchArea;
