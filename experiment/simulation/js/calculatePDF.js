// on dom load
document.addEventListener("DOMContentLoaded", function () {
    reset();
});
let questionNum = 1;
let enteredVals = [];
const q1 = "Find the PDF of Z = X+Y where X and Y are independent uniform random variables on the interval [0,1].";
const q2 = "Find PDF of Z = min(X,Y) where X and Y are exponential random variables with parameter 2 and 3 respectively.";

const zVals1 = Array.from({ length: 200 }, (_, i) => i / 100);
const fZVals1 = zVals1.map((z) => {
    if (z >= 0 && z <= 1)
        return z;
    else if (z > 1 && z <= 2)
        return 2 - z;
    else
        return 0;
});

const zVals2 = Array.from({ length: 200 }, (_, i) => i / 100);
const fZVals2 = zVals2.map((z) => {
    if (z >= 0)
        return 5 * Math.exp(-5 * z);
    else
        return 0;
});

function startExperimentClick() {
    if (questionNum == 1) {
        startExperiment(zVals1, fZVals1);
    }
    else if (questionNum == 2) {
        startExperiment(zVals2, fZVals2);
    }
}
// function to get some unique randomly numbers from an array
function getRandomIndices(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result.sort((a, b) => a - b);
}

const ctxZ = document.getElementById('pdf-chart').getContext('2d');

const pdfZChart = new Chart(ctxZ, {
    type: 'scatter',
    data: {
        labels: [],
        datasets: [{
            label: 'Entered Values',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            pointRadius: 5,
            showLine: false // dont connect the points
        },
        {
            label: 'PDF of Z',
            data: [],
            borderColor: 'rgba(255, 99, 132, 0.5)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointRadius: 0,
            showLine: true
        }]
    }, options: {
        scales: {
            x: { title: { display: true, text: 'z' }, type: 'linear', position: 'bottom' },
            y: { title: { display: true, text: 'f_Z(z)' }, beginAtZero: true }
        }
    }
});

function plotPdfZ(vals, pdfZ) {
    pdfZChart.data.labels = vals;
    pdfZChart.data.datasets[0].data = pdfZ;
    pdfZChart.update();
}

const currentZValueSpan = document.getElementById('current-z-value');
const pdfZValueInput = document.getElementById('pdf-z-value');
const submitZValueButton = document.getElementById('submit-z-value');
var ptr = 0;
var randomIndx = [];

function startExperiment(vals, fVals) {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("z-value-prompt").style.display = "block";
    document.getElementById("pdf-chart").style.display = "block";
    randomIndx = getRandomIndices(Array.from({ length: vals.length }, (_, i) => i), 5);

    const pdfZ = Array(vals.length).fill(null);

    submitZValueButton.addEventListener('click', function () {
        const fVal = pdfZValueInput.value;
        console.log("Entered Val: "+fVal+" and it is a number: "+!isNaN(fVal));
        if (!isNaN(fVal)) {
            pdfZ[randomIndx[ptr]] = fVal;
            enteredVals.push(fVal);
            plotPdfZ(vals, pdfZ);
            ptr++;
            promptNextZValue();
        }
    });

    function promptNextZValue() {
        console.log(ptr);
        if (ptr < randomIndx.length) {
            const currentZValue = vals[randomIndx[ptr]];
            currentZValueSpan.textContent = currentZValue;
            pdfZValueInput.value = '';
        } else {
            console.log("done");
            document.getElementById("z-value-prompt").style.display = "none";
            pdfZChart.data.datasets[1].data = fVals;
            pdfZChart.update();
            showObservation();
        }
    }

    plotPdfZ(vals, pdfZ);
    promptNextZValue();
}

function check()
{
    const fVals = pdfZChart.data.datasets[1].data;
    const required_fvals = randomIndx.map((indx) => fVals[indx]);
    // check with the entered values
    var problem_indices = [];
    for (let i = 0; i < required_fvals.length; i++) {
        if (Math.abs(required_fvals[i] - enteredVals[i])>0.001) {
            problem_indices.push(i);
        }
    }
    return problem_indices;
}

function showObservation(){
    const problem_indices = check();
    console.log("Problem indices: "+problem_indices);
    if(problem_indices.length == 0){
        document.getElementById("observations").innerHTML = "Great! You have entered the correct values.";
    }
    else{
        const vals = pdfZChart.data.labels;
        const fVals = pdfZChart.data.datasets[1].data;
        const problemVals = problem_indices.map((indx) => vals[randomIndx[indx]]);
        const problemEnteredVals = problem_indices.map((indx) => enteredVals[indx]);
        const problemCorrectVals = problem_indices.map((indx) => fVals[randomIndx[indx]]);
        var problemText = "You have entered the wrong values for the following z values: ";
        for(let i=0; i<problemVals.length; i++){
            problemText += "<br>z = "+problemVals[i]+", you entered "+problemEnteredVals[i]+" but the correct value is "+problemCorrectVals[i];
        }
        document.getElementById("observations").innerHTML = problemText;
    }
}


function changeQuestion(qNum) {
    questionNum = qNum;
    reset();
    if (qNum == 1) {
        document.getElementById("next-question-button").style.display = "block";
        document.getElementById("prev-question-button").style.display = "none";
        document.getElementById("question-text").innerHTML = q1;
    } else if (qNum == 2) {
        document.getElementById("next-question-button").style.display = "none";
        document.getElementById("prev-question-button").style.display = "block";
        document.getElementById("question-text").innerHTML = q2;
    }
}
function reset() {
    document.getElementById("start-button").style.display = "block";
    document.getElementById("z-value-prompt").style.display = "none";
    document.getElementById("pdf-chart").style.display = "none";
    pdfZChart.data.datasets[0].data = [];
    pdfZChart.data.datasets[1].data = [];
    pdfZChart.data.labels = [];
    pdfZChart.update();
    enteredVals = [];
    ptr = 0;
    randomIndx = [];
}