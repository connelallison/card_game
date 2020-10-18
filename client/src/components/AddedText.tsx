import React, { Component } from "react";

interface AddedTextObject {
    name: string
    text: string
}

class AddedText extends Component {
    props!:  {tooltip?: boolean, contents: AddedTextObject[] }
    constructor(props: { tooltip?: boolean, contents: AddedTextObject[] }) {
        super(props)
    }

    render() {
        const styleClasses = `addedText ${this.props.tooltip ? 'tooltip' : ''}`
        return (
            <div className={styleClasses}>
                {this.props.contents.map((addedText, index) => (
                    // <div>
                    [
                        <p key={`${addedText.name}:${index}`} className='addedTextName'>{addedText.name}</p>,
                        <p key={`${addedText.text}:${index}`} className='addedTextText'>{addedText.text}</p>
                    ]
                    // </div>
                ))}
            </div>
        )
    }
}

export default AddedText