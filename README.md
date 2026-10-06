# Local AI Chatbot

A lightweight local AI chatbot built with **Python, FastAPI, Ollama, and JavaScript**.

The project demonstrates how to build an AI application that communicates with a locally running Large Language Model (LLM) through an HTTP API, with real-time response streaming to the browser.

## Architecture

```text
Browser
   │
   │ HTTP Request
   ▼
FastAPI Backend
   │
   │ HTTP Request
   ▼
Ollama
   │
   ▼
Local LLM
   │
   │ Streaming Response
   ▼
FastAPI
   │
   │ Streaming Response
   ▼
Browser
```

## Current Features

* Local LLM inference using Ollama
* FastAPI backend
* Asynchronous HTTP communication with Ollama
* Real-time response streaming
* Simple modern chat interface
* Frontend built with HTML, CSS, and JavaScript
* Pydantic request validation
* Basic HTTP error handling
* No external AI API required

## Tech Stack

### Backend

* Python
* FastAPI
* Uvicorn
* HTTPX
* Pydantic

### AI

* Ollama
* Qwen 2.5 0.5B

### Frontend

* HTML
* CSS
* JavaScript
* Fetch API
* Web Streams API

## Project Structure

```text
ollama-chatbot/
│
├── backend/
│   └── app/
│       ├── __init__.py
│       ├── main.py
│       ├── schemas.py
│       └── services/
│           ├── __init__.py
│           └── ollama_service.py
│
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
│
├── .gitignore
├── README.md
└── requirements.txt
```

## How It Works

The frontend sends the user's message to the FastAPI backend.

FastAPI forwards the request to Ollama, which runs the local language model.

Instead of waiting for the complete response, Ollama streams generated text back to FastAPI. FastAPI then streams the response to the browser, allowing the user to see the answer as it is generated.

## Requirements

* Python 3.10+
* Ollama
* A locally installed Ollama model
* Modern web browser

## Installation

Clone the repository:

```bash
git clone https://github.com/MahmoudAl1NAME/ollama-chatbot.git
cd ollama-chatbot
```

Create a virtual environment:

```bash
python3 -m venv .chatvenv
source .chatvenv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Make sure Ollama is installed and running.

Pull the model:

```bash
ollama pull qwen2.5:0.5b
```

## Running the Backend

From the project root:

```bash
uvicorn backend.app.main:app --reload
```

The FastAPI server will run on:

```text
http://127.0.0.1:8000
```

API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

## Running the Frontend

Open another terminal:

```bash
cd frontend
python3 -m http.server 5500
```

Then open:

```text
http://127.0.0.1:5500
```

## Project Status

**Currently in development.**

The current version focuses on establishing the core AI application architecture and real-time LLM streaming.

Planned improvements include:

* Conversation history
* System prompts
* Better error handling
* Improved chat experience
* RAG and vector databases
* Tool calling
* AI agents
* Production deployment

## Purpose

This project is being built as a hands-on exploration of **AI Engineering**, focusing on how to turn a local language model into a usable application rather than only interacting with the model through a command line.


