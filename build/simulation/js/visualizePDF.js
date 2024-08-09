// quadratic function
const xValues_1 = Array.from({ length: 500 }, (_, i) => -0.5 + i / 500);
xValues_1.forEach((value, index) => xValues_1[index] = value.toFixed(3));
const fXValues_1 = Array(500).fill(1);
const zValues_1 = Array.from({ length: 500 }, (_, i) => 0.001 + (i / 500) * 0.25);
const fZValues_1 = zValues_1.map(z => 1 / Math.sqrt(z));

// exponential function
const xValues_2 = Array.from({ length: 500 }, (_, i) => i / 500);
xValues_2.forEach((value, index) => xValues_2[index] = value.toFixed(3));
const fXValues_2 = Array(500).fill(1);
const zValues_2 = Array.from({ length: 500 }, (_, i) => Math.exp(i / 500));
const fZValues_2 = zValues_2.map(z => 1 / z);

// inverse quadratic function
const xValues_3 = Array.from({ length: 500 }, (_, i) => -0.5 + i / 500);
xValues_3.forEach((value, index) => xValues_3[index] = value.toFixed(3));
const fXValues_3 = Array(500).fill(1);
const zValues_3 = xValues_3.map(x => 0.25 - x ** 2);
const fZValues_3 = zValues_3.map(z => 1 / (Math.sqrt(0.25 - z) + Math.sqrt(z + 0.25)));

const ctxX = document.getElementById('pdfXChart').getContext('2d');
const ctxZ = document.getElementById('pdfZChart').getContext('2d');
const ctxTrans = document.getElementById('transformationChart').getContext('2d')

const pdfXChart = new Chart(ctxX, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'PDF of X',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            pointRadius: 0
        },
        {
            label: 'Selected Area',
            data: [],
            borderColor: 'rgba(255, 99, 132, 0.5)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            fill: true,
            pointRadius: 0,
            borderWidth: 1,
            fillBetweenSet: 1 // This option helps to fill between the datasets
        }]
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'x' } },
            y: { title: { display: true, text: 'f_X(x)' } }
        }
    }
});
const pdfZChart = new Chart(ctxZ, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'PDF of Z',
            data: [],
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            pointRadius: 0
        },
        {
            label: 'Selected Area',
            data: [],
            borderColor: 'rgba(255, 99, 132, 0.5)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            fill: true,
            pointRadius: 0,
            borderWidth: 1,
            fillBetweenSet: 1 // This option helps to fill between the datasets
        }]
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'z' } },
            y: { title: { display: true, text: 'f_Z(z)' } }
        },
        onClick: function (e) {
            const points = pdfZChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false);
            if (points.length) {
                const firstPoint = points[0];
                const zIndex = firstPoint.index;
                const z = pdfZChart.data.labels[zIndex];
                let x1, x2,x1_inPlot, x2_inPlot, xIndices;
                if (selectedFunc === 'quadratic') {
                    x1 = Math.sqrt(z);
                    x2 = -Math.sqrt(z);
                    x1_inPlot = xValues_1.reduce((prev, curr) => Math.abs(curr - x1) < Math.abs(prev - x1) ? curr : prev);
                    x2_inPlot = xValues_1.reduce((prev, curr) => Math.abs(curr - x2) < Math.abs(prev - x2) ? curr : prev);
                    pdfZChart.data.datasets[1].data = zValues_1.slice(0, zIndex + 1).map((zVal, i) => ({
                        x: zVal,
                        y: fZValues_1[i]
                    }));
                    xIndices = xValues_1.map((xVal, i) => xVal).reduce((acc, curr, i) => {
                        if (curr === x1_inPlot) acc[0] = i;
                        if (curr === x2_inPlot) acc[1] = i;
                        return acc;
                    }, [-1, -1]);
                    pdfXChart.data.datasets[1].data = xValues_1.slice(xIndices[1], xIndices[0] + 1).map((xVal, i) => ({
                        x: xVal,
                        y: fXValues_1[xIndices[1] + i]
                    }));
                }
                else if (selectedFunc === 'exponential') {
                    x1 = Math.log(z);
                    x2 = 0;
                    x1_inPlot = xValues_2.reduce((prev, curr) => Math.abs(curr - x1) < Math.abs(prev - x1) ? curr : prev);
                    x2_inPlot = xValues_2.reduce((prev, curr) => Math.abs(curr - x2) < Math.abs(prev - x2) ? curr : prev);
                    pdfZChart.data.datasets[1].data = zValues_2.slice(0, zIndex + 1).map((zVal, i) => ({
                        x: zVal,
                        y: fZValues_2[i]
                    }));
                    xIndices = xValues_2.map((xVal, i) => xVal).reduce((acc, curr, i) => {
                        if (curr === x1_inPlot) acc[0] = i;
                        if (curr === x2_inPlot) acc[1] = i;
                        return acc;
                    }, [-1, -1]);
                    pdfXChart.data.datasets[1].data = xValues_2.slice(xIndices[1], xIndices[0] + 1).map((xVal, i) => ({
                        x: xVal,
                        y: fXValues_2[xIndices[1] + i]
                    }));
                }
                pdfZChart.update();
                pdfXChart.update();
            }
        }
    }
});
const transformationChart = new Chart(ctxTrans,{
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Transform of X to Z',
            data: [],
            borderColor: 'rgba(15, 102, 55, 1)',
            backgroundColor: 'rgba(15, 102, 55, 0)',
            fill: true,
            pointRadius: 0
        }]
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'X' } },
            y: { title: { display: true, text: 'Z' } }
        }
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    reset();
});

let selectedFunc = '';

function selectQuadratic() {
    reset();
    selectedFunc = 'quadratic';
    document.getElementById("quadratic-select-button").disabled = true;
    document.getElementById("reset-button").style.display = 'block';
    document.getElementById('canvas-holder').style.display = 'block';
    pdfXChart.data.labels = xValues_1;
    pdfXChart.data.datasets[0].data = fXValues_1;
    pdfZChart.data.labels = zValues_1;
    pdfZChart.data.datasets[0].data = fZValues_1;
    transformationChart.data.labels = xValues_1;
    transformationChart.data.datasets[0].data = xValues_1.map(x => x ** 2);
    transformationChart.update();
    pdfXChart.update();
    pdfZChart.update();
}

function selectExponential() {
    reset();
    selectedFunc = 'exponential';
    document.getElementById("exponential-select-button").disabled = true;
    document.getElementById("reset-button").style.display = 'block';
    document.getElementById('canvas-holder').style.display = 'block';
    pdfXChart.data.labels = xValues_2;
    pdfXChart.data.datasets[0].data = fXValues_2;
    pdfZChart.data.labels = zValues_2;
    pdfZChart.data.datasets[0].data = fZValues_2;
    transformationChart.data.labels = xValues_2;
    transformationChart.data.datasets[0].data = xValues_2.map(x => Math.exp(x));
    transformationChart.update();
    pdfXChart.update();
    pdfZChart.update();
}

function reset() {
    document.getElementById('canvas-holder').style.display = 'none';
    document.getElementById("reset-button").style.display = 'none';
    document.getElementById("quadratic-select-button").disabled = false;
    document.getElementById("exponential-select-button").disabled = false;
    selectedFunc = '';
    pdfXChart.data.labels = [];
    pdfXChart.data.datasets[0].data = [];
    pdfXChart.data.datasets[1].data = [];
    pdfXChart.update();

    pdfZChart.data.labels = [];
    pdfZChart.data.datasets[0].data = [];
    pdfZChart.data.datasets[1].data = [];
    pdfZChart.update();
}