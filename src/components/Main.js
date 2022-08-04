import React from "react"

export default function Main(props) {

    return (
        <div style={props.style} className="main">
            {props.showTag && props.nums}  
        </div>
    )
}