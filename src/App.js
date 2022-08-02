import React from "react"
import Toolbar from "./components/Toolbar"
import Main from "./components/Main"

export default function App() {

    const[isShown, setIsShown] = React.useState(true)
    const[array, setArray] = React.useState(generateArray())
    const[selectedTab, setSelectedTab] = React.useState(-1)
    const[isRunning, setIsRunning] = React.useState(false)

    console.log("isRunningTopApp:", isRunning)

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
        }
    }

    function generateArray() {
        const newArray = []
        for (let i = 0; i < 10; i++) {
            newArray.push(Math.ceil(Math.random() * 100))
        }
        return newArray
    }

    function generateNewArray() {
        setArray(generateArray())
    }

    function changeArray() {
        const copy = [...array]
        const tmp = copy[copy.length-1]
        copy[copy.length-1] = copy[0]
        copy[0] = tmp
        setArray(copy)
    }

    async function swap(arr, i, j) {
        await delay(1000)
        let tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
    }

    async function delay(milliseconds) {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

    async function selectionSort() {
        const newArray = [...array]
        let n = newArray.length

        for (let i = 0; i < n; i++) {
            let min = i
            for (let j = i+1; j < n; j++) {
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
        for(let i =0; i < n; i++) {  
            console.log("isRunning during buble", isRunning)        
            if(isRunning) {
                isSwapped = false;               
                for(let j = 0; j < n; j++) {
                    if (isRunning) {
                        if(newArray[j] > newArray[j + 1]) {
                            await swap(newArray, j, j+1)
                            isSwapped = true;
                        }
                        setArray([...newArray])
                    } else {
                        return
                    }
                }
                if(!isSwapped) {
                    break;
                }
            } else {
                return
            }                
        }
    }

    async function quickSort() {
        const newArray = [...array]
        await quickSortHelper(newArray, 0, newArray.length-1)
    }

    async function quickSortHelper(arr, lo, hi) {
        console.log("lo: ", lo)
        console.log("hi: ", hi)
        if (lo < hi) {
            let p = await twoFingerPart(arr, lo, hi);
            await quickSortHelper(arr, lo, p);
            await quickSortHelper(arr, p+1, hi);
        } else {
            return;
        }
    }

    async function twoFingerPart(arr, lo, hi) {
        console.log("here")
        let pivVal = arr[lo];
        let i = lo - 1;
        let j = hi + 1;
        while (true) {
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
        console.log("before sort: ", newArray)
        for (let i = 1; i < newArray.length; i++) {
            let key = newArray[i]
            let j = i-1
            while (j >= 0 && newArray[j] > key) {
                await slowShift(j, newArray)
                j--
            }
            newArray[j+1] = key
            setArray([...newArray])
        }
    }

    async function slowShift(index, newArray) {
        await delay(1000)
        newArray[index+1] = newArray[index]
        setArray([...newArray])
    }

    function stopAlgo() {
        setIsRunning(() => {
            const result = false
            return result
        })
    }
    

    // React.useEffect(() => {
    //     if (isRunning) {
    //       sortingAlgoToRun();
    //     } else {
    //       return;
    //     }
    //   }, [isRunning]);

    
    function handleAlgoFunctionCall() {
        console.log("top", isRunning)
        setIsRunning( isRunning => {
            const newIsRunning = true
            return newIsRunning
        })
        console.log("under", isRunning)
        //sortingAlgoToRun()
    }

    function handleAlgoFunctionCall() {
        console.log('isRunning right after click: ', isRunning);
        setIsRunning(true);
        console.log('isRunning after setIsRunning: ', isRunning);
        // sortingAlgoToRun();
      }
    
      React.useEffect(() => {
        if (isRunning) {
          sortingAlgoToRun();
        } else {
          return;
        }
      }, [isRunning]);


    const arrayEls = array.map( (value, index) => {

        const styles = {
            backgroundColor: "blue",
            display: "inline-block",
            margin: "10px",
            width: "20px",
            height: `${value * 4}px`
        }

        return <div style={styles} key={index} className="arrayEl">{value}</div>
    })

    return (
        <div className="app">
            <Toolbar handleNewArray={generateNewArray} handleSwapFirstLast={changeArray} handleSort={handleAlgoFunctionCall} selectedTab={selectedTab} setSelectedTab={setSelectedTab} showStop={isRunning} handleStop={stopAlgo}/>
            <Main showTag={isShown} nums={arrayEls}/>
        </div>
    )
}