# Waste2Worth – Premium AI Waste Classifier

Waste2Worth is a high-fidelity sustainability application that uses AI to classify waste and provide creative reuse (upcycling) ideas.

## Features
- **AI Classification**: Powered by MobileNetV2 (fallback) to identify Organic, Plastic, Metal, Glass, Paper, and E-waste.
- **Modern UI**: A premium, glassmorphic interface built with React and Framer Motion.
- **Waste-to-Worth Suggestions**: Actionable tips and DIY ideas for every waste category.
- **Educational Content**: Direct links to recycling video guides.

## Tech Stack
- **Frontend**: React (Vite), Framer Motion, Lucide Icons, CSS3 (Glassmorphism).
- **Backend**: Flask, TensorFlow/Keras, Pillow, Flask-CORS.

## Setup Instructions

### 1. Prerequisites
- Python 3.8+
- Node.js 16+

### 2. Backend Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python server.py
```
The server will run on `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```
The app will be available at `http://localhost:5173`.

## Project Structure
- `app.py`: Original Streamlit version (kept for reference).
- `server.py`: New Flask backend API.
- `classify.py`: AI classification logic with MobileNetV2 fallback.
- `frontend/`: React application source code.
- `model/`: Directory for pre-trained weights.
