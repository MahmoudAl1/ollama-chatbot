from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from .schemas import ChatRequest
from .services.ollama_service import generate_response, stream_response


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://127.0.0.1:5500",
    "http://0.0.0.0:5500",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Hello, Ollama!"}


@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        reply = await generate_response(request.message)

        return {"reply": reply}

    except RuntimeError as error:
        raise HTTPException(
            status_code=503,
            detail=str(error)
        )


@app.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    return StreamingResponse(
        stream_response(request.message),
        media_type="text/plain"
    )