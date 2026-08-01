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

### 4. Deploying on Vercel
This repository is split into a Vite frontend and a Flask backend. Vercel can host the frontend directly, but the Flask API should run on a separate host unless you convert it to a serverless function.

For the Vercel deployment:
1. Set the project root to `frontend/` in Vercel, or use the repo-level `vercel.json`.
2. Add an environment variable named `VITE_API_BASE_URL` that points to your deployed backend, for example `https://your-backend.example.com`.
3. Deploy the frontend build. The app will call the configured API instead of `localhost`.

If you want the full stack on Vercel, the backend must be refactored into a Vercel-compatible serverless API first.

### 5. Deploying the Backend on Render
The simplest backend deployment path is Render.

Use these settings for a new Web Service:
1. Root Directory: `backend`
2. Build Command: `pip install -r requirements.txt`
3. Start Command: `gunicorn server:app --bind 0.0.0.0:$PORT`
4. Add any needed environment variables in the Render dashboard

After deployment, set `VITE_API_BASE_URL` in Vercel to the backend URL Render gives you.

## Project Structure
- `app.py`: Original Streamlit version (kept for reference).
- `server.py`: New Flask backend API.
- `classify.py`: AI classification logic with MobileNetV2 fallback.
- `frontend/`: React application source code.
- `model/`: Directory for pre-trained weights.
