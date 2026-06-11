from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI(title="SentimentAI API")

# Setup CORS to allow React frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load a pre-trained sentiment analysis model from Hugging Face
# This provides instant functionality without needing to train a model first
print("Loading model...")
sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
print("Model loaded!")

class Review(BaseModel):
    text: str

@app.post("/predict")
def predict(review: Review):
    # Get prediction from the pipeline
    result = sentiment_pipeline(review.text)[0]
    
    # Map the model's labels to our expected output
    label = result['label']
    score = result['score']
    
    if label == "POSITIVE":
        sentiment = "Positive"
    elif label == "NEGATIVE":
        sentiment = "Negative"
    else:
        sentiment = "Neutral" # DistilBERT SST-2 is binary, but we map it this way just in case.

    return {
        "sentiment": sentiment,
        "confidence": score
    }

@app.get("/")
def read_root():
    return {"message": "Welcome to SentimentAI API. POST to /predict to analyze sentiment."}
