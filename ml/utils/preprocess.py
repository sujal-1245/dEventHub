import pandas as pd
import requests
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
from dotenv import load_dotenv

load_dotenv()

NODE_BACKEND_URL = os.getenv("NODE_BACKEND_URL", "http://localhost:5000/api/events")

def get_events_from_api():
    try:
        resp = requests.get(NODE_BACKEND_URL)
        resp.raise_for_status()
        events = resp.json()
        return pd.DataFrame(events)
    except Exception as e:
        print("Error fetching events:", e)
        return pd.DataFrame()  # empty DF if API fails

def recommend_events(user_interests, top_n=20):
    events_df = get_events_from_api()
    if events_df.empty:
        return []

    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(events_df["desc"])

    if not user_interests:
        return events_df.head(top_n).to_dict(orient="records")
    
    user_text = " ".join(user_interests)
    user_vec = vectorizer.transform([user_text])
    cosine_sim = cosine_similarity(user_vec, tfidf_matrix).flatten()
    events_df["score"] = cosine_sim
    recommended = events_df.sort_values(by="score", ascending=False).head(top_n)
    return recommended.drop(columns="score").to_dict(orient="records")
