/**
 * calculatePDF.js
 * Manages the interactive experiment for calculating points on a PDF.
 */

document.addEventListener("DOMContentLoaded", () => {
    initializeChart();
    setupEventListeners();
    reset();
});

// --- Global State ---
let questionNum = 1;
let enteredVals = [];
let currentZIndices = [];
let questionPointer = 0;
const numPointsToQuiz = 5;

// --- DOM Element Cache ---
const elements = {
    questionText: document.getElementById('question-text'),
    startButton: document.getElementById('start-button'),
    promptDiv: document.getElementById('z-value-prompt'),
    chartCanvas: document.getElementById('pdf-chart'),
    currentZValueSpan: document.getElementById('current-z-value'),
    pdfZValueInput: document.getElementById('pdf-z-value'),
    submitZValueButton: document.getElementById('submit-z-value'),
    observationsDiv: document.getElementById("observations"),
    inputError: document.getElementById('input-error'),
    nextButton: document.getElementById("next-question-button"),
    prevButton: document.getElementById("prev-question-button"),
    resetButton: document.getElementById("reset-button")
};

// --- Question Data ---
const questions = {
    1: {
        text: "Find the PDF of Z = X+Y where X and Y are independent uniform random variables on the interval [0,1].",
        zVals: Array.from({ length: 201 }, (_, i) => i / 100),
        fZ: z => (z >= 0 && z <= 1) ? z : (z > 1 && z <= 2) ? 2 - z : 0
    },
    2: {
        text: "Find the PDF of Z = min(X,Y) where X and Y are independent exponential random variables with parameters 2 and 3 respectively.",
        zVals: Array.from({ length: 201 }, (_, i) => (i * 3) / 200),
        fZ: z => (z >= 0) ? 5 * Math.exp(-5 * z) : 0
    }
};

let pdfZChart;

/**
 * Initializes the Chart.js instance for displaying the PDF.
 */
function initializeChart() {
    pdfZChart = new Chart(elements.chartCanvas, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Your Entered Values',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 1)',
                pointRadius: 6
            }, {
                label: 'Correct PDF of Z',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                pointRadius: 0,
                showLine: true,
                fill: true
            }]
        },
        options: {
            scales: {
                x: { type: 'linear', title: { display: true, text: 'z' } },
                y: { title: { display: true, text: 'f_Z(z)' }, beginAtZero: true }
            },
            maintainAspectRatio: false
        }
    });
}

/**
 * Sets up all event listeners for the UI.
 */
function setupEventListeners() {
    elements.startButton.onclick = startExperiment;
    elements.submitZValueButton.onclick = handleSubmit;
    elements.nextButton.onclick = () => changeQuestion(2);
    elements.prevButton.onclick = () => changeQuestion(1);
    elements.resetButton.onclick = reset;

    // Allow submission with the 'Enter' key.
    elements.pdfZValueInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSubmit();
    });
}

/**
 * Starts the experiment for the currently selected question.
 */
function startExperiment() {
    elements.startButton.style.display = "none";
    elements.promptDiv.style.display = "flex";
    elements.chartCanvas.parentElement.style.display = "block";
    
    const qData = questions[questionNum];
    // Get 5 unique random indices from the zVals array.
    const allIndices = Array.from({ length: qData.zVals.length }).map((_, i) => i);
    currentZIndices = allIndices.sort(() => 0.5 - Math.random()).slice(0, numPointsToQuiz).sort((a, b) => a - b);
    
    promptNextZValue();
}

/**
 * Processes the user's submitted f_Z(z) value.
 */
function handleSubmit() {
    const fVal = parseFloat(elements.pdfZValueInput.value);
    elements.inputError.style.display = 'none';

    if (isNaN(fVal)) {
        elements.inputError.style.display = 'block';
        return;
    }

    enteredVals.push(fVal);
    const zIndex = currentZIndices[questionPointer];
    const zVal = questions[questionNum].zVals[zIndex];
    
    pdfZChart.data.datasets[0].data.push({ x: zVal, y: fVal });
    pdfZChart.update();
    
    questionPointer++;
    promptNextZValue();
}

/**
 * Prompts the user for the next value or ends the experiment.
 */
function promptNextZValue() {
    if (questionPointer < numPointsToQuiz) {
        const zIndex = currentZIndices[questionPointer];
        const currentZ = questions[questionNum].zVals[zIndex];
        elements.currentZValueSpan.textContent = currentZ.toFixed(3);
        elements.pdfZValueInput.value = '';
        elements.pdfZValueInput.focus();
    } else {
        elements.promptDiv.style.display = "none";
        showResults();
    }
}

/**
 * Displays the final results and the correct PDF curve.
 */
function showResults() {
    const qData = questions[questionNum];
    pdfZChart.data.datasets[1].data = qData.zVals.map(z => ({ x: z, y: qData.fZ(z) }));
    pdfZChart.update();

    let correctCount = 0;
    let observationText = "";
    
    currentZIndices.forEach((zIndex, i) => {
        const zVal = qData.zVals[zIndex];
        const correctFVal = qData.fZ(zVal);
        const userFVal = enteredVals[i];
        
        // Check if the user's answer is within a small tolerance.
        if (Math.abs(correctFVal - userFVal) < 0.05) {
            correctCount++;
        } else {
            observationText += `<p style="color: red;">❌ For z = <b>${zVal.toFixed(3)}</b>, you entered <b>${userFVal.toFixed(3)}</b>. Correct is ~<b>${correctFVal.toFixed(3)}</b>.</p>`;
        }
    });

    if (correctCount === numPointsToQuiz) {
        elements.observationsDiv.innerHTML = `<p style="color: green; font-weight: bold;">🎉 Excellent! All your entered values were correct.</p>`;
    } else {
        elements.observationsDiv.innerHTML = `<p>You got <b>${correctCount} out of ${numPointsToQuiz}</b> values correct.</p><hr>` + observationText;
    }
}

/**
 * Switches the question and resets the experiment.
 * @param {number} qNum - The question number to switch to.
 */
function changeQuestion(qNum) {
    questionNum = qNum;
    elements.questionText.innerHTML = questions[qNum].text;
    elements.nextButton.style.display = (qNum === 1) ? "inline-block" : "none";
    elements.prevButton.style.display = (qNum === 2) ? "inline-block" : "none";
    reset();
}

/**
 * Resets the entire interface to the initial state for the current question.
 */
function reset() {
    elements.startButton.style.display = "block";
    elements.promptDiv.style.display = "none";
    elements.chartCanvas.parentElement.style.display = "none";
    elements.inputError.style.display = 'none';

    pdfZChart.data.datasets[0].data = [];
    pdfZChart.data.datasets[1].data = [];
    pdfZChart.update();
    
    enteredVals = [];
    currentZIndices = [];
    questionPointer = 0;
    
    elements.observationsDiv.innerHTML = "<p>Your results will be displayed here after the experiment is complete.</p>";
}