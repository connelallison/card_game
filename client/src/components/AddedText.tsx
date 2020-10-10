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
                {this.props.contents.map(addedText => (
                    // <div>
                    [
                        <p className='addedTextName'>{addedText.name}</p>,
                        <p className='addedTextText'>{addedText.text}</p>
                    ]
                    // </div>
                ))}
            </div>
        )
    }
}

export default AddedText