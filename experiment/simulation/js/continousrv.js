document.addEventListener("DOMContentLoaded", function() {
    // Wait for MathJax to be ready before running the initial reset
    if (typeof MathJax !== "undefined" && MathJax.startup) {
        MathJax.startup.promise.then(initializeExperiment);
    } else {
        setTimeout(initializeExperiment, 500); // Fallback
    }
});

// --- GLOBAL VARIABLES ---
let randomize;
const yaxis = document.getElementById("inputValue");
const observationsDiv = document.getElementById("observationValue");
const sourcePanel = document.getElementById('source-panel');
const dropZonePanel = document.getElementById('drop-zone-panel');
const sourceContainer = document.getElementById('source-tile-container');
const dropZoneContainer = document.getElementById('drop-zone-container');

// --- DATA ---
const tilesData = [
    { id: "fx1", text: "\\(F_X(x_1)\\)" }, { id: "fx2", text: "\\(F_X(x_2)\\)" },
    { id: "fx3", text: "\\(F_X(x_3)\\)" }, { id: "fx4", text: "\\(F_X(x_4)\\)" },
    { id: "fx5", text: "\\(F_X(x_5)\\)" }, { id: "fx6", text: "\\(F_X(x_6)\\)" },
    { id: "fx7", text: "\\(F_X(x_7)\\)" }, { id: "nfx1", text: "\\(-F_X(x_1)\\)" },
    { id: "nfx2", text: "\\(-F_X(x_2)\\)" }, { id: "nfx3", text: "\\(-F_X(x_3)\\)" },
    { id: "nfx4", text: "\\(-F_X(x_4)\\)" }, { id: "nfx5", text: "\\(-F_X(x_5)\\)" },
    { id: "nfx6", text: "\\(-F_X(x_6)\\)" }, { id: "nfx7", text: "\\(-F_X(x_7)\\)" }
];
const correctAnswers = {
    1: ["fx1"],
    2: ["fx2", "nfx5", "fx6"],
    3: ["fx3", "nfx4", "fx7"]
};

// --- INITIALIZATION ---
function initializeExperiment() {
    setupEventListeners();
    reset();
}

function reset() {
    randomize = Math.floor(Math.random() * 3) + 1;
    yaxis.innerHTML = `\\( y_${randomize} \\)`;
    
    sourceContainer.innerHTML = '';
    dropZoneContainer.innerHTML = '';
    
    createTiles();
    
    observationsDiv.innerHTML = "Start by building the formula for the given point.";
    dropZonePanel.style.backgroundColor = '#e0f0e3';

    if (window.MathJax) MathJax.typesetPromise();
}

function createTiles() {
    // Shuffle tiles for randomness before creating them
    tilesData.sort(() => Math.random() - 0.5).forEach(tileData => {
        const tileEl = document.createElement('div');
        tileEl.className = 'tile';
        tileEl.id = tileData.id;
        tileEl.draggable = true;
        tileEl.innerHTML = tileData.text;
        sourceContainer.appendChild(tileEl);
    });
}

// --- CORE LOGIC ---
function check() {
    const droppedTileIDs = Array.from(dropZoneContainer.querySelectorAll('.tile')).map(t => t.id);
    const correctAnsIDs = correctAnswers[randomize];
    
    // Sort both arrays to compare them regardless of the order the user dropped them in
    const isCorrect = droppedTileIDs.length === correctAnsIDs.length &&
                      [...droppedTileIDs].sort().every((id, index) => id === [...correctAnsIDs].sort()[index]);

    if (isCorrect) {
        dropZonePanel.style.backgroundColor = '#d4edda'; // Green for correct
        observationsDiv.innerHTML = `<p style="color:green; font-weight:bold;">✅ CORRECT!</p>` + getExplanation(randomize);
    } else {
        dropZonePanel.style.backgroundColor = '#f8d7da'; // Red for incorrect
        observationsDiv.innerHTML = `<p style="color:red; font-weight:bold;">❌ INCORRECT.</p><p>The formula is not correct. Review the graph to find all regions on the x-axis where g(X) is less than or equal to \(y_${randomize}\), and then express the probability of those regions.</p>`;
    }

    if (window.MathJax) MathJax.typesetPromise();
}

function getExplanation(caseNum) {
    if (caseNum === 1) {
        return `<p><b>Explanation for y₁:</b></p>
        <p>The set of x-values where \(g(X) \\le y_1\) is the interval \((-\\infty, x_1]\). The probability of this set is given directly by the definition of the CDF:</p>
        <p>\( P(X \\le x_1) = F_X(x_1) \)</p>`;
    }
    if (caseNum === 2) {
        return `<p><b>Explanation for y₂:</b></p>
        <p>The set where \(g(X) \\le y_2\) consists of two disjoint intervals: \((-\\infty, x_2]\) and \([x_5, x_6]\). The total probability is the sum of their individual probabilities:</p>
        <p>\( P(X \\le x_2) + P(x_5 \\le X \\le x_6) \)</p>
        <p>This is expressed using the CDF as:</p>
        <p>\( F_X(x_2) + (F_X(x_6) - F_X(x_5)) \)</p>`;
    }
    if (caseNum === 3) {
        return `<p><b>Explanation for y₃:</b></p>
        <p>The set where \(g(X) \\le y_3\) consists of two disjoint intervals: \((-\\infty, x_3]\) and \([x_4, x_7]\). The total probability is the sum:</p>
        <p>\( P(X \\le x_3) + P(x_4 \\le X \\le x_7) \)</p>
        <p>This is expressed using the CDF as:</p>
        <p>\( F_X(x_3) + (F_X(x_7) - F_X(x_4)) \)</p>`;
    }
    return "";
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
    // Click-to-move functionality using event delegation
    document.body.addEventListener('click', e => {
        const tile = e.target.closest('.tile');
        if (!tile) return;

        const parentContainer = tile.parentElement;
        if (parentContainer === sourceContainer) {
            dropZoneContainer.appendChild(tile);
        } else if (parentContainer === dropZoneContainer) {
            sourceContainer.appendChild(tile);
        }
    });

    // Drag and Drop functionality
    document.body.addEventListener('dragstart', e => {
        const tile = e.target.closest('.tile');
        if (tile) {
            tile.classList.add('dragging');
            e.dataTransfer.setData('text/plain', tile.id);
        }
    });

    document.body.addEventListener('dragend', e => {
        const tile = e.target.closest('.tile');
        if (tile) {
            tile.classList.remove('dragging');
        }
    });

    [sourcePanel, dropZonePanel].forEach(panel => {
        panel.addEventListener('dragover', e => {
            e.preventDefault();
            panel.classList.add('drag-over');
        });

        panel.addEventListener('dragleave', () => {
            panel.classList.remove('drag-over');
        });

        panel.addEventListener('drop', e => {
            e.preventDefault();
            panel.classList.remove('drag-over');
            const id = e.dataTransfer.getData('text');
            const draggableElement = document.getElementById(id);
            if (draggableElement) {
                panel.querySelector('.tile-container').appendChild(draggableElement);
            }
        });
    });
}