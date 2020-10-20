import React, { Component } from 'react'

class DisplayName extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    // console.log('current name is ' + this.props.displayName)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    // console.log('component did mount')
    this.setState({ value: this.props.displayName })
  }

  handleChange (event) {
    let value = event.target.value
    if (value.length > 25) {
      value = value.substring(0, 25)
    }
    this.setState({ value })
  }

  handleSubmit (event) {
    event.preventDefault()
    if (!this.state.value || this.state.value === this.props.displayName) return
    this.props.handleSubmit(this.state.value)
  }

  render () {
    return (
      <>
        {/* <p>Display name:</p> */}
        <form onSubmit={this.handleSubmit}>
          <label>
            Display name: 
            <input type='text' ref='input' maxLength='25' defaultValue={this.props.displayName} placeholder={this.props.displayName} onChange={this.handleChange} />
            <input type='submit' ref='submit' id='update-display-name' value='Update' />
          </label>
        </form>
      </>
    )
  }
}

export default DisplayName
