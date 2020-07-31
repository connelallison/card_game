import React, { Component } from 'react'

class TestGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'TestBot'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onRequested(this.state.value)
  }

  render() {
    const options = this.props.opponents.map(opponent => {
      return (
        <option value={opponent.socketID}>{opponent.displayName}</option>
      )
    })

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Select an opponent:  
        <select id='select-opponent' name='opponents' value={this.state.value} onChange={this.handleChange}>
            <option value='TestBot' >TestBot</option>
            {options}
          </select>
        </label>
        <input type='submit' id='request-test-game' value='Request Game'/>
      </form>
    )
  }
}

export default TestGame
