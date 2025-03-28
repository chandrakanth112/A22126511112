const idInput = document.getElementById('idInput');
const generateButton = document.getElementById('generateButton');
const nextButton = document.getElementById('nextButton');
const errorDiv = document.getElementById('error');
const windowCurrState = document.getElementById('windowCurrState');
const windowPrevState = document.getElementById('windowPrevState');
const currentAvg = document.getElementById('currentAvg');

let currentArray = [];
let previousArray = [];

function generateArray(type, size) {
    const array = [];
    if (type === 'p') {
        let num = 2;
        while (array.length < size) {
            if (isPrime(num)) array.push(num);
            num++;
        }
    } else if (type === 'f') {
        let a = 0, b = 1;
        while (array.length < size) {
            array.push(a);
            [a, b] = [b, a + b];
        }
    } else if (type === 'e') {
        for (let i = 0; i < size; i++) {
            array.push(i * 2);
        }
    } else if (type === 'r') {
        for (let i = 0; i < size; i++) {
            array.push(Math.floor(Math.random() * 100));
        }
    }
    return array;
}

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function calculateAverage(array) {
    if (array.length === 0) return 0;
    return (array.reduce((sum, num) => sum + num, 0) / array.length).toFixed(2);
}

function updateUI() {
    windowPrevState.textContent = previousArray.join(', ');
    windowCurrState.textContent = currentArray.join(', ');
    currentAvg.textContent = calculateAverage(currentArray);
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

generateButton.addEventListener('click', () => {
    const id = idInput.value.trim().toLowerCase();
    if (!['p', 'f', 'e', 'r'].includes(id)) {
        errorDiv.textContent = 'Invalid ID. Please enter p, f, e, or r.';
        return;
    }
    errorDiv.textContent = '';
    let size = Math.floor(Math.random() * 10) + 1; 
    let newArray;
    do {
        newArray = generateArray(id, size);
    } while (arraysAreEqual(newArray, currentArray));
    previousArray = [...currentArray];
    currentArray = newArray;
    updateUI();
  
    nextButton.disabled = false;
});

nextButton.addEventListener('click', () => {
    if (previousArray.length === 0) {
        errorDiv.textContent = 'No previous state available.';
        return;
    }
    errorDiv.textContent = '';
    currentArray = [...previousArray];
    previousArray = [];
    updateUI();
});