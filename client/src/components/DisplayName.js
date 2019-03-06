import React, { Component, Fragment } from "react";

class DisplayName extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    console.log("current name is " + this.props.currentName);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    console.log("component did mount");
    this.setState({value: this.props.currentName});
  }

  handleChange(event){
    this.setState({value: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault();
    if (!this.state.value || this.state.value === this.props.currentName) return;
    this.props.handleSubmit(this.state.value);
  }

  render(){
    return (
      <Fragment>
      <p>Display name:</p>
      <form onSubmit={this.handleSubmit}>
      <input type="text" ref="input" defaultValue={this.props.currentName} placeholder={this.props.currentName} onChange={this.handleChange}/>
      </form>
      </Fragment>
    );
  }
}

export default DisplayName;
