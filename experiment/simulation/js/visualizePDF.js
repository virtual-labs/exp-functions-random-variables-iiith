/**
 * visualizePDF.js
 * Handles the interactive visualization of probability density functions (PDFs)
 * for functions of a random variable.
 */

document.addEventListener("DOMContentLoaded", () => {
    initializeCharts();
    setupEventListeners();
    reset();
});

// --- Global State ---
let selectedFunc = '';
let pdfXChart, pdfZChart, transformationChart;
const observationsDiv = document.getElementById('observations');

// --- Core Data and Function Definitions ---
const functions = {
    quadratic: {
        xDomain: [-1, 1],
        fx: 0.5,
        g: x => x ** 2,
        zDomain: [0, 1],
        fz: z => (z > 1e-9 && z <= 1) ? 1 / (2 * Math.sqrt(z)) : 0,
        observation: `<p>For the <b>Quadratic</b> function $$Z = X^2$$</p>
                      <ul style="list-style:disc; margin-left:20px;">
                      <li>The function is <b>many-to-one</b>. For every positive Z, there are two corresponding values of X.</li>
                      <li>When you select an area for Z, two distinct areas are highlighted for X.</li>
                      <li>The PDF of Z is highest near zero because a wide range of X values are "compressed" into a small range of Z values.</li></ul>`
    },
    exponential: {
        xDomain: [-1, 1],
        fx: 0.5,
        g: x => Math.exp(x),
        zDomain: [1 / Math.E, Math.E],
        fz: z => (z >= 1 / Math.E && z <= Math.E) ? 1 / (2 * z) : 0,
        observation: `<p>For the <b>Exponential</b> function $$Z = e^X$$</p>
                      <ul style="list-style:disc; margin-left:20px;">
                      <li>This is a <b>one-to-one</b> function. Every value of Z corresponds to only one value of X.</li>
                      <li>As you select an area for Z, a single continuous area is highlighted for X.</li>
                      <li>The shape of the PDF of Z is \\(f_Z(z) = 1/(2z)\\). The probability density is higher for smaller values of Z.</li></ul>`
    }
};

/**
 * Highlights the corresponding areas on the Z and X charts based on a given range for Z.
 * @param {number} z1 The start of the range on the Z-axis.
 * @param {number} z2 The end of the range on the Z-axis.
 */
function highlightArea(z1, z2) {
    if (!selectedFunc) return;
    const funcData = functions[selectedFunc];
    const [zMin, zMax] = funcData.zDomain;

    const valid_z1 = Math.max(zMin, z1);
    const valid_z2 = Math.min(zMax, z2);
    if (valid_z1 >= valid_z2) return;

    // Generate a set of points for the highlighted slice on the Z chart.
    const zSlicePoints = Array.from({ length: 51 }, (_, i) => valid_z1 + (i / 50) * (valid_z2 - valid_z1));
    pdfZChart.data.datasets[1].data = zSlicePoints.map(z => ({ x: z, y: funcData.fz(z) }));
    
    let xSlices = [], obsUpdate = '';

    if (selectedFunc === 'quadratic') {
        const x_pos_1 = Math.sqrt(valid_z1), x_pos_2 = Math.sqrt(valid_z2);
        const x_neg_1 = -Math.sqrt(valid_z2), x_neg_2 = -Math.sqrt(valid_z1);
        
        const xSlice1Points = Array.from({ length: 51 }, (_, i) => x_neg_1 + (i / 50) * (x_neg_2 - x_neg_1));
        const xSlice2Points = Array.from({ length: 51 }, (_, i) => x_pos_1 + (i / 50) * (x_pos_2 - x_pos_1));
        xSlices = [...xSlice1Points, ...xSlice2Points];

        obsUpdate = `<p>Area for Z between \\(${valid_z1.toFixed(3)}\\) and \\(${valid_z2.toFixed(3)}\\) corresponds to <b>two</b> areas for X:</p>
                     <p style="text-align:center;">\\([${x_neg_1.toFixed(3)}, ${x_neg_2.toFixed(3)}]\\) and \\([${x_pos_1.toFixed(3)}, ${x_pos_2.toFixed(3)}]\\).</p>`;

    } else if (selectedFunc === 'exponential') {
        const x1 = Math.log(valid_z1), x2 = Math.log(valid_z2);
        xSlices = Array.from({ length: 51 }, (_, i) => x1 + (i / 50) * (x2 - x1));
        obsUpdate = `<p>Area for Z between \\(${valid_z1.toFixed(3)}\\) and \\(${valid_z2.toFixed(3)}\\) corresponds to <b>one</b> area for X:</p>
                     <p style="text-align:center;">\\([${x1.toFixed(3)}, ${x2.toFixed(3)}]\\).</p>`;
    }

    pdfXChart.data.datasets[1].data = xSlices.map(x => ({ x: x, y: funcData.fx }));

    pdfZChart.update();
    pdfXChart.update();
    observationsDiv.innerHTML = funcData.observation + "<hr>" + obsUpdate;
    if (window.MathJax) MathJax.typesetPromise();
}

/**
 * Initializes the Chart.js instances with correct numerical scaling.
 */
function initializeCharts() {
    const tickFormatter = (value) => Number(value).toFixed(2);
    const chartOptions = (xlabel, ylabel) => ({
        scales: {
            x: { type: 'linear', title: { display: true, text: xlabel }, ticks: { callback: tickFormatter } },
            y: { title: { display: true, text: ylabel }, beginAtZero: true, ticks: { callback: tickFormatter } }
        },
        animation: { duration: 0 },
        maintainAspectRatio: false
    });

    const baseData = () => ({
        datasets: [
            { label: 'PDF', fill: true, pointRadius: 0, tension: 0.1, borderColor: 'rgb(54, 162, 235)', backgroundColor: 'rgba(54, 162, 235, 0.2)' },
            { label: 'Selected Area', backgroundColor: 'rgba(255, 99, 132, 0.6)', fill: true, pointRadius: 0 }
        ]
    });

    pdfXChart = new Chart(document.getElementById('pdfXChart'), { type: 'line', data: baseData(), options: chartOptions('x', 'f_X(x)') });
    pdfZChart = new Chart(document.getElementById('pdfZChart'), { type: 'line', data: baseData(), options: chartOptions('z', 'f_Z(z)') });
    transformationChart = new Chart(document.getElementById('transformationChart'), {
        type: 'line',
        data: { datasets: [{ label: 'Z = g(X)', pointRadius: 0, borderColor: 'rgb(75, 192, 192)', tension: 0.1 }] },
        options: chartOptions('X', 'Z')
    });
}

/**
 * Sets up event listeners for UI elements.
 */
function setupEventListeners() {
    pdfZChart.options.onClick = (e) => {
        if (!selectedFunc) return;
        const z_click = pdfZChart.scales.x.getValueForPixel(e.x);
        const funcData = functions[selectedFunc];
        const [zMin, zMax] = funcData.zDomain;
        const delta_z = (zMax - zMin) / 10;

        const z1 = z_click - delta_z / 2;
        const z2 = z_click + delta_z / 2;

        document.getElementById('z1-input').value = Math.max(zMin, z1).toFixed(3);
        document.getElementById('z2-input').value = Math.min(zMax, z2).toFixed(3);
        
        highlightArea(z1, z2);
    };

    ['z1-input', 'z2-input'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            const z1 = parseFloat(document.getElementById('z1-input').value);
            const z2 = parseFloat(document.getElementById('z2-input').value);
            if (!isNaN(z1) && !isNaN(z2) && z1 < z2) {
                highlightArea(z1, z2);
            }
        });
    });
}

/**
 * Sets the active function and updates the UI and charts accordingly.
 * @param {string} funcName - The name of the function to select.
 */
function selectFunction(funcName) {
    reset(false);
    selectedFunc = funcName;
    const funcData = functions[selectedFunc];
    
    document.getElementById('quadratic-select-button').disabled = (funcName === 'quadratic');
    document.getElementById('exponential-select-button').disabled = (funcName === 'exponential');
    ['reset-button', 'canvas-holder', 'manual-input-holder'].forEach(id => document.getElementById(id).style.display = 'flex');
    document.getElementById('canvas-holder').style.display = 'grid';

    const [zMin, zMax] = funcData.zDomain;
    ['z1-input', 'z2-input'].forEach(id => {
        const input = document.getElementById(id);
        input.min = zMin.toFixed(3);
        input.max = zMax.toFixed(3);
        input.value = "";
    });

    if (funcName === 'quadratic') {
        pdfZChart.options.scales.y.max = 10;
    } else {
        delete pdfZChart.options.scales.y.max;
    }

    const xPoints = Array.from({ length: 201 }, (_, i) => funcData.xDomain[0] + (i / 200) * (funcData.xDomain[1] - funcData.xDomain[0]));
    const zPoints = Array.from({ length: 201 }, (_, i) => funcData.zDomain[0] + (i / 200) * (funcData.zDomain[1] - funcData.zDomain[0]));

    // --- FIX: Pass data as {x, y} objects for correct numerical scaling ---
    transformationChart.data.datasets[0].data = xPoints.map(x => ({ x: x, y: funcData.g(x) }));
    pdfXChart.data.datasets[0].data = xPoints.map(x => ({ x: x, y: funcData.fx }));
    pdfZChart.data.datasets[0].data = zPoints.map(z => ({ x: z, y: funcData.fz(z) }));
    
    [transformationChart, pdfXChart, pdfZChart].forEach(chart => chart.update());
    observationsDiv.innerHTML = funcData.observation;
    if (window.MathJax) MathJax.typesetPromise();
}

/**
 * Resets the application to its initial state.
 * @param {boolean} fullReset - If true, resets everything. If false, only clears chart data.
 */
function reset(fullReset = true) {
    if (fullReset) {
        ['canvas-holder', 'reset-button', 'manual-input-holder'].forEach(id => document.getElementById(id).style.display = 'none');
        ['quadratic-select-button', 'exponential-select-button'].forEach(id => document.getElementById(id).disabled = false);
        selectedFunc = '';
        observationsDiv.innerHTML = "<p>Select a function to begin and see observations here.</p>";
    }
    
    [transformationChart, pdfXChart, pdfZChart].forEach(chart => {
        if (chart) {
            chart.data.datasets.forEach(dataset => { dataset.data = []; });
            chart.update();
        }
    });
}