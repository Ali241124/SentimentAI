import pandas as pd
import numpy as np
import torch
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from datasets import Dataset
from sklearn.model_selection import train_test_split
import os

import bz2
import kagglehub

def prepare_data(sample_size=2000):
    print("Downloading Amazon Reviews dataset via kagglehub...")
    path = kagglehub.dataset_download("bittlingmayer/amazonreviews")
    train_file = os.path.join(path, "train.ft.txt.bz2")
    
    print(f"Loading dataset from {train_file}...")
    texts = []
    labels = []
    
    # The dataset is huge (3.6 million reviews). We'll read only a subset.
    # __label__1 = Negative (0)
    # __label__2 = Positive (2)
    with bz2.open(train_file, "rt", encoding="utf-8") as f:
        for _ in range(sample_size):
            line = f.readline()
            if not line:
                break
            
            # Extract label and text
            label_str = line[:10]
            text = line[11:].strip()
            
            if label_str == "__label__1":
                labels.append(0) # Negative
            elif label_str == "__label__2":
                labels.append(2) # Positive
                
            texts.append(text)
            
    df = pd.DataFrame({"text": texts, "label": labels})
    
    print(f"Loaded {len(df)} samples for training.")
    
    # Split into train and validation sets
    train_df, val_df = train_test_split(df, test_size=0.2, random_state=42)
    
    return Dataset.from_pandas(train_df), Dataset.from_pandas(val_df)

def main():
    print("Initializing BERT tokenizer and model...")
    # Load the tokenizer
    tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
    
    # Load the model with 3 output labels
    model = BertForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=3)
    
    train_dataset, val_dataset = prepare_data()
    
    def tokenize_function(examples):
        return tokenizer(examples["text"], padding="max_length", truncation=True, max_length=128)
    
    print("Tokenizing datasets...")
    tokenized_train = train_dataset.map(tokenize_function, batched=True)
    tokenized_val = val_dataset.map(tokenize_function, batched=True)
    
    # Define training arguments
    training_args = TrainingArguments(
        output_dir="./results",
        num_train_epochs=3,
        per_device_train_batch_size=8,
        per_device_eval_batch_size=8,
        eval_strategy="epoch", # Replaced evaluation_strategy with eval_strategy
        logging_dir="./logs",
    )
    
    # Initialize the Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_train,
        eval_dataset=tokenized_val,
    )
    
    print("Starting training...")
    # NOTE: Training on CPU can be very slow. Use a GPU if possible.
    trainer.train()
    
    print("Saving model to ./model directory...")
    os.makedirs("./model", exist_ok=True)
    model.save_pretrained("./model")
    tokenizer.save_pretrained("./model")
    print("Training complete!")

if __name__ == "__main__":
    main()
