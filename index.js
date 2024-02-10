function findIntersection0(arr1, arr2) {
    const counter1 = {};
    const counter2 = {};

    for (const value of arr1) {
        counter1[value] = true;
    }

    for (const value of arr2) {
        counter2[value] = true;
    }

    const intersection = [];

    for (const key in counter1) {
        if (counter2[key]) {
            intersection.push(key);
        }
    }

    return intersection;
}


function findIntersection1(arr1, arr2) {
    const counter1 = {};

    for (const value of arr1) {
        counter1[value] = true;
    }

    const intersection = [];

    for (const i of arr2) {
        if (counter1[i]) {
            intersection.push(i);
            counter1[i] = false;
        }
    }

    return intersection;
}


function findIntersection2(arr1, arr2) {
    const intersection = [];
    const counter1 = {};
    const counter2 = {};

    let longArray;
    let shortArray;

    if (arr1.length > arr2.length) {
        longArray = arr1;
        shortArray = arr2;
    } else {
        longArray = arr2;
        shortArray = arr1;
    }

    for (let i = 0; i < longArray.length; i++) {
        const num = longArray[i];
        counter1[num] = (counter1[num] || 0) + 1;

        if (i < shortArray.length) {
            const shortNum = shortArray[i];
            counter2[shortNum] = (counter2[shortNum] || 0) + 1;

            if (counter1[shortNum] > 0 && counter2[shortNum] === 1) {
                intersection.push(shortNum);
                counter2[shortNum] += 1;
            }
        }

        if (counter1[num] > 0 && counter2[num] === 1) {
            intersection.push(num);
            counter2[num] += 1;
        }
    }

    return intersection;
}


// Tests
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function areArraysEqual(arr1, arr2) {
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    return sortedArr1.length === sortedArr2.length &&
        sortedArr1.every((value, index) => value === sortedArr2[index]);
}

let testCount = 10000
let minArrLength = 1000;
let maxArrLength = 1000;
let minNumber = 0;
let maxNumber = 5000;

let arrayOfArray = []

for (let i = 0; i < testCount; i++) {
    let arr1 = []
    let arr2 = []
    let arr1Length = getRandomInt(minArrLength, maxArrLength);
    let arr2Length = getRandomInt(minArrLength, maxArrLength);

    for (let j = 0; j < arr1Length; j++) {
        arr1[j] = getRandomInt(minNumber, maxNumber);
    }

    for (let j = 0; j < arr2Length; j++) {
        arr2[j] = getRandomInt(minNumber, maxNumber);
    }

    arrayOfArray[i] = [arr1, arr2];

    // Test equal result
    // let r0 = findIntersection0(arr1, arr2);
    // let r1 = findIntersection1(arr1, arr2);
    // let r2 = findIntersection2(arr1, arr2);

    // let b1 = areArraysEqual(r0, r1);
    // let b2 = areArraysEqual(r0, r2);

    // if (b1 && b2 == false) {
    //     console.log("Arrays not equal");
    //     break;
    // }
}

const {performance} = require('perf_hooks')

function testFunction(fn) {
    const start = performance.now();

    for (let i = 0; i < testCount; i++) {
        fn(arrayOfArray[i][0], arrayOfArray[i][1]);
    }

    const end = performance.now();
    const timeTaken = end - start;
    console.log(`Algorithm execution time: ${timeTaken} ms`);
}

testFunction(findIntersection0);
testFunction(findIntersection1);
testFunction(findIntersection2);
