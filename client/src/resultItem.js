import React, { Component } from 'react';
import { Panel, Image, Col, Fade } from 'react-bootstrap';
import './App.css';

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
          url: "",
          resultsLoaded: false
        };
        this.resultClicked = this.resultClicked.bind(this);
    }
    resultClicked() {
      //getComponentById("player").setState({url: })
        this.setState({url: this.props.vid});
        this.props.callbackParent(this.state.url, this.props.name);
        console.log("requesting: " + this.state.url);
    }
    componentDidMount() {
      this.setState({url: this.props.vid});
      setTimeout(() => { this.setState({resultsLoaded: true}); }, 500);
    }
  render() {
    return (
      <div>
        <Col md={4}>
          <Fade in={this.state.resultsLoaded} timeout={300}>
            <Panel className="resultItem">
              <p><Image rounded src={this.props.image} alt={this.props.name} onClick={this.resultClicked}/>{this.props.name}</p>
            </Panel>
          </Fade>
        </Col>
      </div>
    );
  }
}

export default Result;
