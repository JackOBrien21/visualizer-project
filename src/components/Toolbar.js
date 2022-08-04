import React from "react"
import algorithms from "../SortingAlgos/algorithms.js"

export default function Toolbar(props) {

    const algorithms = [
        {
            name: "Bubble Sort",
            id: 0,
            isSelectedTab: false
        },
        {
            name: "Selection Sort",
            id: 1,
            isSelectedTab: false
        },
        {
            name: "Quick Sort",
            id: 2,
            isSelectedTab: false
        },
        {
            name: "Insertion Sort",
            id: 3,
            isSelectedTab: false
        },
        {
            name: "BOGO Sort",
            id: 4,
            isSelectedTab: false
        }
    ]

    

    const [algoTabs, setAlgoTabs] = React.useState(algorithms)

    // want algoTabs.every(isSelectedTab) == false -> render normally
    // if there is one that is true -> render it differently then others

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
            <form className="slider--container">
                <label className="slider--range" for="vol">Number of elements to sort (between 1 and {props.maxNumberOfArrayEls}):</label>
                <input className="slider" onChange={props.sliderChange} type="range" id="vol" name="vol" min="1" max={props.maxNumberOfArrayEls} />
            </form>
            <div className="algorithms">
                {algoTabEls}
            </div>
            <div className="start--and--stop">
                {(!allNotSelected && props.showStop) || <div className="sort--button" onClick={props.handleSort}> Sort! </div>}
                {props.showStop && <div className="stop--button" onClick={props.handleStop}> Stop! </div>}
            </div>
            <div className="toolbar--other--buttons" onClick={props.handleSwapFirstLast}>
                Swap first and last
            </div>
        </div>
    )
}