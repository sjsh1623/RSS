# app/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer

# ✅ BGE 모델로 교체
model = SentenceTransformer('BAAI/bge-large-en')

app = FastAPI()

class EmbedRequest(BaseModel):
    text: str

@app.post("/embed")
def embed(req: EmbedRequest):
    vec = model.encode(req.text).tolist()
    return {"embedding": vec}