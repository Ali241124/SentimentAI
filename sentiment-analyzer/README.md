# 😊 Sentiment Analyzer (BERT + FastAPI + React)

![Sentiment Analyzer](https://img.shields.io/badge/Status-Active-brightgreen)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-00a393)
![PyTorch](https://img.shields.io/badge/PyTorch-2.0%2B-ee4c2c)

An end-to-end AI-powered web application that analyzes customer reviews and predicts their sentiment (Positive, Neutral, or Negative) using a fine-tuned Transformer model. The system features a **React** frontend for real-time inference, a **FastAPI** backend for high-performance API routing, and state-of-the-art **Hugging Face BERT** models for Natural Language Processing.

---

## 🎯 Features

- **Multi-class Sentiment Classification:** Accurately categorizes text into Positive 😊, Neutral 😐, or Negative 😞.
- **Transformer-based NLP:** Uses a pre-trained Hugging Face pipeline (DistilBERT) for robust contextual understanding.
- **High-Performance REST API:** Built with FastAPI and Uvicorn for asynchronous request handling.
- **Modern Web Interface:** A sleek, dark-themed React application styled with Tailwind CSS v4.
- **Real-Time Confidence Scoring:** Displays visual progress bars indicating the model's confidence level for every prediction.
- **Custom Model Training Pipeline:** Includes a `train.py` script to fine-tune your own BERT models on custom datasets (e.g., Amazon Reviews).

---

## 🏗️ Project Architecture

```text
User Review 
   ↓ (HTTP POST)
React Frontend (Vite + Tailwind)
   ↓ (REST API)
FastAPI Backend
   ↓ (Inference)
Hugging Face BERT Pipeline
   ↓ (JSON Response)
Sentiment & Confidence Score Displayed
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/sentiment-analyzer.git
cd sentiment-analyzer
```

### 2. Setup the Backend (FastAPI + AI Model)
Navigate to the backend directory, create a virtual environment, and start the server:

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\Activate.ps1
# Mac/Linux
source venv/bin/activate

# Install dependencies (This may take a few minutes as PyTorch is large)
pip install -r requirements.txt

# Start the FastAPI server
uvicorn app:app --reload
```
The API will be available at `http://127.0.0.1:8000`. You can view the interactive API documentation at `http://127.0.0.1:8000/docs`.

### 3. Setup the Frontend (React + Vite)
Open a new terminal window, navigate to the frontend directory, and start the Vite development server:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
The web application will be accessible at `http://localhost:5173`.

---

## 🧠 Training Your Own Model (Optional)
The backend includes a `train.py` script that demonstrates how to fine-tune a BERT model using the Hugging Face `Trainer` API.

It is configured to download a sample of the **Amazon Reviews** dataset using `kagglehub`.

To train:
1. Ensure your virtual environment is activated.
2. Run the script:
```bash
python train.py
```
*(Note: Training transformer models locally on a CPU can be extremely slow. It is highly recommended to run this script on a machine with a GPU or in Google Colab).*

---

## 🛠️ Technology Stack
- **AI/ML:** PyTorch, Hugging Face Transformers, Datasets, Scikit-learn
- **Backend:** Python, FastAPI, Uvicorn, Pydantic
- **Frontend:** React, Vite, Tailwind CSS v4, Axios
- **Data Processing:** Pandas, NumPy

---

## 🚀 Future Improvements
- [ ] Add Emotion Detection (Happy, Angry, Sad, Excited).
- [ ] Implement Aspect-Based Sentiment Analysis.
- [ ] Multilingual support.
- [ ] Analytics dashboard for tracking overall sentiment trends.
- [ ] Cloud Deployment (Docker, AWS, or Hugging Face Spaces).

---

## 📄 Professional Portfolio Summary
> Developed an end-to-end sentiment analysis platform using a fine-tuned BERT model for multi-class classification of product reviews. Built a FastAPI backend for real-time inference and a responsive React frontend for interactive sentiment prediction, leveraging Hugging Face Transformers and PyTorch. Demonstrated full-stack AI deployment capabilities integrating modern web frameworks with deep learning APIs.
