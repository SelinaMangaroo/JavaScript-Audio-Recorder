# 🎤 Audio Recorder Web App

This is a **browser-based audio recorder** that allows users to **record, pause, stop, play back, and save audio recordings** using the **MediaRecorder API** and **Web Audio API**. The app also includes **real-time audio visualization**.

![Audio Recorder Screenshot](https://via.placeholder.com/800x400?text=Audio+Recorder)  
*(Replace with an actual screenshot of your app if needed.)*

---

## 🚀 **Features**
✅ **Record audio** using the browser's microphone.  
✅ **Pause and resume** recording anytime.  
✅ **Stop and preview** the recorded audio before saving.  
✅ **Save recording as WebM** (`.webm` format, Opus codec).  
✅ **Audio visualization** using a frequency bar visualizer.  
✅ **Minimalist and user-friendly UI**.

---

## 🛠 **Technologies Used**
- **HTML5** - Structure of the app.
- **CSS3** - Styling and layout.
- **JavaScript (ES6+)** - Core logic for audio recording and visualization.
- **MediaRecorder API** - Enables browser-based audio recording.
- **Web Audio API** - Processes and visualizes audio data.

---

## 📂 **Project Structure**
audio-recorder/ │── index.html # Main HTML file │── styles.css # Styling for the app │── script.js # JavaScript functionality │── README.md # Documentation (this file)


---

## 🎬 **Demo**
Try the live demo: [GitHub Pages Link](#)  
*(Replace `#` with the actual GitHub Pages URL if deployed.)*

---

## 📥 **Installation & Setup**
### **🔹 Clone the Repository**
```sh
git clone https://github.com/your-username/audio-recorder.git
cd audio-recorder
```

### 🔹 Open in a Browser
Simply open index.html in your web browser.

---

## 📌 Usage Guide
1️⃣ Click "▶️ Record" to start recording audio.
2️⃣ Click "⏸️ Pause" to pause and "▶️ Resume" to continue.
3️⃣ Click "⏹️ Finish" to stop recording.
4️⃣ Click "🎧 Audio Preview" to listen to the recorded audio.
5️⃣ Click "💾 Save" to download the recording as a WebM file.
6️⃣ Click "❌ Cancel" to discard the recording and reset.


--- 

## ⚙️ How It Works
- The MediaRecorder API captures and stores the microphone audio.
- The Web Audio API analyzes and visualizes the live audio feed.
- The recorded data is stored in chunks and combined into a WebM Blob.
- The user can play back and download the final audio file.

---

## 📜 License
This project is licensed under the MIT License.
See LICENSE for details.

