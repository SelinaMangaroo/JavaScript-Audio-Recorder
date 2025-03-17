let mediaRecorder; // Stores the MediaRecorder instance that manages the recording process.
let audioChunks = []; // Array to temporarily store recorded audio chunks.
let isPaused = false; // Boolean to track whether the recording is paused.
let audioBlob = null; // Stores the final recorded audio as a Blob.

let audioContext, analyser, dataArray, source; // Variables for the Web Audio API used for audio visualization.
let animationFrame; //Stores animation reference for the visualizer.

// Get references to UI elements (buttons, audio player, canvas) from the HTML document.
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const audioPlayback = document.getElementById("audioPlayback");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");
const canvas = document.getElementById("visualizer"); //element to display the audio visualization.
const canvasContext = canvas.getContext("2d");

async function startRecording() {
    // Requests access to the microphone. Returns a stream (audio data from the microphone).
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Initialize Web Audio API for visualization
    audioContext = new AudioContext(); // Creates an audio processing context.
    analyser = audioContext.createAnalyser(); // An analyser node for audio visualization.
    source = audioContext.createMediaStreamSource(stream); // Connects microphone input to the analyser.
    source.connect(analyser); // Links the audio input to the analyser.
    analyser.fftSize = 256; // Sets the resolution for frequency analysis.
    dataArray = new Uint8Array(analyser.frequencyBinCount); // Array to store audio frequency data.
    
    drawVisualizer();  // Start visualization animation

    // MediaRecorder API is initialized with the microphone stream, allows start, pause, and stop recording.
    const options = { mimeType: "audio/webm; codecs=opus" };  
    mediaRecorder = new MediaRecorder(stream, options);

    // event that fires when a chunk of audio data is available, event.data contains a piece of recorded audio.
    // Push each chunk into audioChunks. ensures all pieces of the recording are stored and can be assembled later.
    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    //event triggers when recording is stopped.
    mediaRecorder.onstop = () => {
        cancelAnimationFrame(animationFrame); // Stop visualization

        //Combines all the stored audioChunks into a single WebM file using a Blob.
        audioBlob = new Blob(audioChunks, { type: "audio/webm" });

        //Creates a temporary URL to download the recorded file and assigns it to the audio player for playback.
        const audioUrl = URL.createObjectURL(audioBlob);
        audioPlayback.src = audioUrl;

        saveBtn.disabled = false; // Enable save button
        audioChunks = []; // Clears the recorded chunks for the next session.
    };

    mediaRecorder.start();
    isPaused = false;

    // Update button states to reflect the active recording session.
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;
    cancelBtn.disabled = false; 
    saveBtn.disabled = true;
}

// Toggles between pausing and resuming the recording.
function pauseRecording() {
    if (!mediaRecorder) return;

    if (isPaused) {
        mediaRecorder.resume();
        pauseBtn.textContent = "⏸️ Pause";
        drawVisualizer(); // Restart visualization
    } else {
        mediaRecorder.pause();
        pauseBtn.textContent = "▶️ Resume";
        cancelAnimationFrame(animationFrame); // Stop visualization
    }
    isPaused = !isPaused;
}

// Stops the mediaRecorder on click. Enables Start button and disables the other buttons.
function stopRecording() {
    if (mediaRecorder) {
        mediaRecorder.stop();
        cancelAnimationFrame(animationFrame); // Stop visualization

        pauseBtn.textContent = "⏸️ Pause"; // Reset button text

        // Update button states after stopping the recording.
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        stopBtn.disabled = true;
    }
}

function drawVisualizer() {
    animationFrame = requestAnimationFrame(drawVisualizer); // Repeatedly calls this function for animation.
    canvasContext.fillStyle = "lightgrey"; // Sets the background color.
    canvasContext.fillRect(0, 0, canvas.width, canvas.height); // Clears the previous frame.

    analyser.getByteFrequencyData(dataArray); // Gets the current frequency data.
    canvasContext.fillStyle = "darkgrey"; // Sets the bar color.
    
    // Draws a bar graph representation of the audio.
    for (let i = 0; i < dataArray.length; i++) {
        let barHeight = dataArray[i] / 2; // Scales the height of each bar.
        canvasContext.fillRect(i * 3, canvas.height - barHeight, 2, barHeight); // Draws each bar.
    }
}

function cancelRecording() {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
    }

    // Reset recording-related variables.
    audioChunks = [];
    audioBlob = null;
    audioPlayback.src = "";
    pauseBtn.textContent = "⏸️ Pause"; // Reset button text

    // Reset button states.
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
    saveBtn.disabled = true;
    cancelBtn.disabled = true;

    cancelAnimationFrame(animationFrame); // Stop visualization animation
    // animationFrame = null;  // Prevents restarting the loop
    canvasContext.clearRect(0, 0, canvas.width, canvas.height); // Clear visualizer
}

function saveRecording() {
    if (audioBlob) {
        const a = Object.assign(document.createElement("a"), { // Creates an anchor element.
            href: URL.createObjectURL(audioBlob), // Creates a downloadable URL from the recorded Blob.
            download: "recording.webm" // Specifies the file name.
        });
        a.click(); // Click to trigger the download.
        URL.revokeObjectURL(a.href); // Releases the memory used for the URL.
    }
}

// Adds event listeners to handle button clicks.
startBtn.addEventListener("click", startRecording);
pauseBtn.addEventListener("click", pauseRecording);
stopBtn.addEventListener("click", stopRecording);
cancelBtn.addEventListener("click", cancelRecording);
saveBtn.addEventListener("click", saveRecording);