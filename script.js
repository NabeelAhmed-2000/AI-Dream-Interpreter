// Wait for the HTML document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Element Selection ---
    const dreamInput = document.getElementById('dream-input');
    const interpretButton = document.getElementById('interpret-button');
    const clearButton = document.getElementById('clear-button');
    const saveLogButton = document.getElementById('save-log-button');

    const interpretationOutput = document.getElementById('interpretation-output');
    const moodPaletteOutput = document.getElementById('mood-palette-output');
    const keySymbolsOutput = document.getElementById('key-symbols-output');
    const dreamLogList = document.getElementById('dream-log-list');

    // **NEW**: Variable to hold the current analysis result
    let currentAnalysisResult = null;
    
    // --- 2. Mock AI Analysis Function (IMPROVED) ---
    // This function now uses simple keyword matching to feel more realistic.
    function getMockInterpretation(dreamText) {
        const lowerCaseText = dreamText.toLowerCase();

        // Check for keywords
        if (lowerCaseText.includes('fly') || lowerCaseText.includes('flying')) {
            return {
                interpretation: "Flying dreams often symbolize a sense of freedom, release from pressures, and personal power. Seeing a city of glass could represent clarity of thought or feelings of emotional fragility and exposure.",
                mood: "Freedom",
                moodColors: ['#87CEEB', '#E0FFFF', '#B0E0E6'], // Light blues
                symbols: ['✈️ Flying', '🏙️ City', '🕊️ Freedom']
            };
        }
        if (lowerCaseText.includes('chase') || lowerCaseText.includes('running from')) {
            return {
                interpretation: "Being chased in a dream typically points to avoidance of a situation or emotion in your waking life. A dark forest can symbolize confusion, the unknown, or feeling lost on your current path.",
                mood: "Anxious",
                moodColors: ['#696969', '#A9A9A9', '#D3D3D3'], // Greys
                symbols: ['🏃‍♂️ Chasing', '🌲 Forest', '❓ Unknown']
            };
        }
        if (lowerCaseText.includes('water') || lowerCaseText.includes('ocean') || lowerCaseText.includes('river')) {
             return {
                interpretation: "Dreams about water often reflect your emotional state. A calm ocean can signify peace and tranquility, while discovering a hidden treasure suggests newfound self-worth or uncovering a hidden talent.",
                mood: "Calm",
                moodColors: ['#4682B4', '#5F9EA0', '#ADD8E6'], // Steel and light blues
                symbols: ['🌊 Water', '💎 Treasure', '😌 Calm']
            };
        }

        // Return a default response if no keywords are found
        return {
            interpretation: "Your dream seems to touch on complex themes. Often, dreams reflect our daily thoughts and anxieties in symbolic ways. Consider the feelings and major events of your dream for more personal insight.",
            mood: "Mysterious",
            moodColors: ['#9370DB', '#8A2BE2', '#4B0082'], // Purples
            symbols: ['✨ Abstract', '🤔 Thought', '❓ Unknown']
        };
    }

    // --- 3. UI Update Functions (Unchanged) ---
    function displayInterpretation(data) {
        interpretationOutput.innerHTML = `<p>${data.interpretation}</p>`;
        displayMoodPalette(data.moodColors);
        displayKeySymbols(data.symbols);
        saveLogButton.style.display = 'inline-block';
    }
    
    function displayMoodPalette(colors) {
        moodPaletteOutput.innerHTML = '';
        colors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.style.width = '30px';
            colorDiv.style.height = '30px';
            colorDiv.style.backgroundColor = color;
            colorDiv.style.borderRadius = '50%';
            colorDiv.style.border = '1px solid #ccc';
            moodPaletteOutput.appendChild(colorDiv);
        });
    }

    function displayKeySymbols(symbols) {
        keySymbolsOutput.innerHTML = '';
        const symbolList = document.createElement('ul');
        symbolList.style.listStyleType = 'none';
        symbolList.style.padding = '0';
        symbols.forEach(symbol => {
            const listItem = document.createElement('li');
            listItem.textContent = symbol;
            listItem.style.marginBottom = '5px';
            symbolList.appendChild(listItem);
        });
        keySymbolsOutput.appendChild(symbolList);
    }

    function resetUI() {
        dreamInput.value = '';
        interpretationOutput.innerHTML = '<p>Your results will appear here.</p>';
        moodPaletteOutput.innerHTML = '';
        keySymbolsOutput.innerHTML = '';
        dreamLogList.innerHTML = '';
        saveLogButton.style.display = 'none';
        currentAnalysisResult = null;
    }

    // --- 4. Event Listeners (Logic Updated) ---
    interpretButton.addEventListener('click', () => {
        const dreamText = dreamInput.value.trim();
        if (dreamText === '') {
            alert('Please describe your dream before interpreting.');
            return;
        }
        // **NEW**: Store the result in our new variable
        currentAnalysisResult = getMockInterpretation(dreamText);
        displayInterpretation(currentAnalysisResult);
    });

    clearButton.addEventListener('click', () => {
        resetUI();
    });

    saveLogButton.addEventListener('click', () => {
        // **FIXED**: Now correctly reads the mood from our stored variable
        if (!currentAnalysisResult) return; // safety check

        const dreamText = dreamInput.value.trim();
        const mood = currentAnalysisResult.mood; 
        
        const logItem = document.createElement('li');
        logItem.textContent = `Dream: "${dreamText.substring(0, 40)}..." - Mood: ${mood}`;
        logItem.style.padding = '8px';
        logItem.style.borderBottom = '1px solid #eee';
        
        dreamLogList.prepend(logItem);
        
        saveLogButton.textContent = 'Saved!';
        setTimeout(() => {
            saveLogButton.textContent = 'Save to Log';
        }, 1500);
    });
});