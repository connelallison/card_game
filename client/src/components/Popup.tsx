import React, { Component } from "react";

export interface PopupProps {
    header: string
    message: string
    dismiss: () => void
}

class Popup extends Component {
    props!: PopupProps

    render() {
        return (
            <div className='popup'>
                <h2>{this.props.header}</h2>
                <p>{this.props.message}</p>
                <br/>
                <span className='challengeButtons'>
                    <button onClick={this.props.dismiss}>Dismiss</button>
                </span>
            </div>
        )
    }
}

export default Popup