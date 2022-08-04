import React from "react"
import Toolbar from "./components/Toolbar"
import Main from "./components/Main"

export default function App() {

    const[isShown, setIsShown] = React.useState(true)
    const[array, setArray] = React.useState(generateFirstArray())
    const[selectedTab, setSelectedTab] = React.useState(-1)
    const[isRunning, setIsRunning] = React.useState(false)
    const[windowWidth, setWindowWidth] = React.useState(window.innerWidth)
    const[speed, setSpeed] = React.useState(250)
    const isRunningRef = React.useRef(isRunning)
    const isSorted = sorted(array)

    console.log("isSorted", isSorted)

    const widthOfArrayEls = 26
    const mainWidth = windowWidth*2/3
    const mainHeight = mainWidth*2/3

    const maxNumberOfArrayEls = Math.floor(mainWidth/widthOfArrayEls) - 1


    React.useEffect( () => {
        function watchWidth() {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize", watchWidth)
        return function() {
            window.removeEventListener("resize", watchWidth)
        }
    }, [])

    const mainStyles = {
        backgroundColor: "white",
        height: mainHeight,
        width: mainWidth,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "25px"
    }


    let sortingAlgoToRun = ""
    if (selectedTab !== -1) {
        if (selectedTab === 0) {
            sortingAlgoToRun = bubbleSort
        } else if (selectedTab === 1) {
            sortingAlgoToRun = selectionSort
        } else if (selectedTab === 2) {
            sortingAlgoToRun = quickSort
        } else if (selectedTab === 3) {
            sortingAlgoToRun = insertionSort
        } else if (selectedTab === 4) {
            sortingAlgoToRun = bogoSort
        }
    }

    function generateFirstArray() {
        const initialNumberOfArrayEls = 14
        const newArray = []
        for (let i = 0; i < initialNumberOfArrayEls; i++) {
            newArray.push(getRandomInt(10, 100))
        }
        return newArray
    }

    function generateRandomArray() {
        const numSliderEl = document.getElementById("num")
        const newArray = []
        for (let i = 0; i < numSliderEl.value; i++) {
            newArray.push(getRandomInt(10, 150))
        }
        return newArray
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    function generateNewRandomArray() {
        setArray(generateRandomArray())
    }

    function changeArray() {
        const copy = [...array]
        const tmp = copy[copy.length-1]
        copy[copy.length-1] = copy[0]
        copy[0] = tmp
        setArray(copy)
    }

    async function swap(arr, i, j) {
        await delay(speed)
        let tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
    }

    async function delay(milliseconds) {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

    function handleNumberSliderChange() {
        setArray(generateRandomArray())
    }

    function handleSpeedSliderChange() {
        const speedSliderEl = document.getElementById("speed")
        const speedSliderElVal = speedSliderEl.value
        setSpeed(Math.floor(1000 / speedSliderElVal))
    }

    async function selectionSort() {
        const newArray = [...array]
        let n = newArray.length

        for (let i = 0; i < n && isRunningRef.current; i++) {
            let min = i
            for (let j = i+1; j < n && isRunningRef.current; j++) {
                if (newArray[j] < newArray[min]) {
                    min = j
                }
            }
            if (min !== i) {
                await swap(newArray, min , i)
            }
            setArray([...newArray])
        }
    }


    async function bubbleSort() {
        console.log("isRunning bubble beginning ", isRunning)
        const newArray = [...array]
        let n = newArray.length
        let isSwapped = false
        for(let i =0; i < n && isRunningRef.current; i++) {  
            console.log("isRunning during buble", isRunning)        
            isSwapped = false;               
            for(let j = 0; j < n && isRunningRef.current; j++) {
                if(newArray[j] > newArray[j + 1]) {
                    await swap(newArray, j, j+1)
                    isSwapped = true;
                }
                setArray([...newArray])
            }
            if(!isSwapped) {
                break;
            }
        }
    }

    async function quickSort() {
        const newArray = [...array]
        await quickSortHelper(newArray, 0, newArray.length-1)
    }

    async function quickSortHelper(arr, lo, hi) {
        if (lo < hi && isRunningRef.current) {
            let p = await twoFingerPart(arr, lo, hi);
            await quickSortHelper(arr, lo, p);
            await quickSortHelper(arr, p+1, hi);
        } else {
            return;
        }
    }

    async function twoFingerPart(arr, lo, hi) {
        let pivVal = arr[lo];
        let i = lo - 1;
        let j = hi + 1;
        while (true && isRunningRef.current) {
            do {
                j--;
            }while (arr[j] > pivVal);
            
            do {
                i++;
            } while (pivVal > arr[i]);


            if (i < j) {
                await swap(arr, i, j);
            } else {
                return j;
            }
            setArray([...arr])
            // i keeps incrementing while arr[i] <= pivVal)
            // j keeps decrementing while pivVal <= arr[j])
        }
    }

    async function insertionSort() {
        const newArray = [...array]
        for (let i = 1; i < newArray.length && isRunningRef.current; i++) {
            let key = newArray[i]
            let j = i-1
            while (j >= 0 && newArray[j] > key && isRunningRef.current) {
                await slowShift(j, newArray)
                j--
            }
            newArray[j+1] = key
            setArray([...newArray])
        }
    }

    async function bogoSort() {
        const newArray = [...array]
        while (!isSorted && isRunningRef.current) {
            await delay(speed)
            await getRandPerm()
        }
        return
    }

    async function getRandPerm() {
        const newArray = await shuffle(array)
        setArray([...newArray])
    }

    async function shuffle(arr){
        const newArray = [...array]
        var count = newArray.length, temp, index;

        while(count > 0  && isRunningRef.current && !isSorted){
            index = Math.floor(Math.random() * count);
            count--;

            temp = newArray[count];
            newArray[count] = newArray[index];
            newArray[index] = temp;
        }
        return newArray;
    }

    function sorted(shuffle) {
        for (var i = 0; i < shuffle.length - 1; i++) {
          if (shuffle[i] <= shuffle[i + 1]) {
            continue;
          } else {
            return false;
          }
        }
        return true
    }

    async function slowShift(index, newArray) {
        await delay(speed)
        newArray[index+1] = newArray[index]
        setArray([...newArray])
    }

    function stopAlgo() {
        setIsRunning(() => {
            const result = false
            return result
        })
    }
    


    
    function handleAlgoFunctionCall() {
        setIsRunning( isRunning => {
            const newIsRunning = true
            return newIsRunning
        })
    }

    function handleAlgoFunctionCall() {
        setIsRunning(true);
      }
    
    React.useEffect(() => {
        isRunningRef.current = isRunning
        if (isRunning) {
            sortingAlgoToRun();
        } else {
            return;
        }
    }, [isRunning]);


    const arrayEls = array.map( (value, index) => {

        const len = array.length

        const totalWidthOfArrayEls = array.length*26

        const styles = {
            display: "flex",
            textAlign: "center",
            color: "yellow",
            borderColor: "black",
            borderStyle: "solid",
            borderWidth: ".5px",
            backgroundColor: isSorted ? "red" : "blue",
            display: "inline-block",
            margin: "3px",
            width: "20px",
            height: `${value * 4}px`
        }

        return <div style={styles} key={index} className="arrayEl">{value}</div> 
    })

    return (
        <div className="app">
            <Toolbar handleNewArray={generateNewRandomArray} handleSwapFirstLast={changeArray} handleSort={handleAlgoFunctionCall} selectedTab={selectedTab} setSelectedTab={setSelectedTab} showStop={isRunning} handleStop={stopAlgo} maxNumberOfArrayEls={maxNumberOfArrayEls} numberSliderChange={handleNumberSliderChange} speedSliderChange={handleSpeedSliderChange} speed={speed} mainWidth={mainWidth} widthOfArrayEls={widthOfArrayEls} length = {array.length}/>
            <Main style={mainStyles} showTag={isShown} nums={arrayEls}/>
        </div>
    )
}