import React from "react"
import algorithms from "../AlgoList/algorithms.js"

export default function Toolbar(props) {
    

    const [algoTabs, setAlgoTabs] = React.useState(algorithms)

    function selectTab(index) {
        props.setSelectedTab(index)
        setAlgoTabs( (prevAlgoTabs) => {
            return prevAlgoTabs.map( (algoTab) => {
                return algoTab.id === index ? {...algoTab, isSelectedTab: !algoTab.isSelectedTab} : {...algoTab, isSelectedTab: false}
            })
        })
    }

    const allNotSelected = algoTabs.every(algorithm => !algorithm.isSelectedTab)

    const algoTabEls = algoTabs.map( (algo, index) => {

        const isCurrSelected = props.selectedTab === algo.id

        const styles = {
            color: isCurrSelected || allNotSelected  ? "#00D8FF" : "black",
            marginLeft: "15px",
            marginRight: "15px",
            cursor: "pointer"
        }

        return <div className="algo" key={index} style={styles} onClick={ () => selectTab(index)}>{algo.name}</div>
    })


    return (
        <div className="toolbar">
            <div className="generate-array" onClick={props.handleNewArray}>
                Generate New Array
            </div>
            <div className="sliders">
                <form className="number--slider--container">
                    <label className="number--slider--range" for="vol">Number of elements to sort (between 1 and {props.maxNumberOfArrayEls}): {props.length} </label>
                    <input className="number--slider" onChange={props.numberSliderChange} type="range" id="num" name="num" min="1" max={props.maxNumberOfArrayEls} />
                </form>
                <form className="speed--slider--container">
                    <label className="speed--slider--range" for="vol">Number of swaps / second (between 1 and 50): {Math.floor(1000 / props.speed)}</label>
                    <input className="speed--slider" onChange={props.speedSliderChange} type="range" id="speed" name="speed" min="1" max="50" />
                </form>
            </div>
            <div className="algorithms">
                {algoTabEls}
            </div>
            <div className="start--and--stop">
                {(!allNotSelected || props.showStop) && <div className="sort--button" onClick={props.handleSort}> Sort! </div>}
                {props.showStop && <div className="stop--button" onClick={props.handleStop}> Stop! </div>}
            </div>
            <div className="toolbar--other--buttons" onClick={props.handleSwapFirstLast}>
                Swap first and last
            </div>
        </div>
    )
}