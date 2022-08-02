import React from "react"

export default function Main(props) {

    return (
        <div className="main">
            {props.showTag && props.nums}    
        </div>
    )
}