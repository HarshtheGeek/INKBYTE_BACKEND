# INKBYTE

InkByte is the backend service for **InkByte**, a mobile application that provides concise summaries of YouTube videos and AI-powered learning features. The backend handles video transcription, summary generation, flashcard generation, Feynman-style explanations, and semantic evaluation.

**Live Application:** https://app-inkbyte.netlify.app/

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/d723e273-4b44-456a-a85d-8a71d6764f84"
    alt="InkByte Demo"
    width="800"
  />
</p>

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Usage](#usage)
* [API Endpoints](#api-endpoints)
* [Contributing](#contributing)
* [License](#license)

## Features

* Summarizes YouTube videos using embeddings and AI processing
* Generates AI-powered flashcards from any topic
* Generates simplified explanations using the Feynman learning technique
* Evaluates user explanations using semantic similarity and cosine similarity
* Stores and caches results using **Redis** for faster responses
* Handles user requests through secure REST APIs
* Scalable backend architecture using **Node.js** and **Express**

## Tech Stack

* **Node.js** – Backend runtime environment
* **Express.js** – Web framework for routing and APIs
* **Firebase** – User authentication and database
* **Redis** – Caching frequently requested summaries
* **Embedding Models** – Semantic similarity and AI-powered video understanding
* **Flutter** – Mobile frontend (client app)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/inkbyte-backend.git
cd inkbyte-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with your environment variables (see below).

4. Start the server:

```bash
npm start
```

or for development with hot reload:

```bash
npm run dev
```

> **Note:** `.env` is added to `.gitignore` to keep sensitive keys secure.

## Usage

Start the server and connect your Flutter app to the backend API endpoints.

## API Endpoints

| Method | Endpoint                 | Description                                           |
| ------ | ------------------------ | ----------------------------------------------------- |
| POST   | `/api/summarize`         | Generate a concise summary from a YouTube URL         |
| POST   | `/api/flashcards`        | Generate AI-powered flashcards for a given topic      |
| POST   | `/api/feynmann`          | Generate a simplified Feynman-style explanation       |
| POST   | `/api/feynman-embedding` | Evaluate a user's explanation using cosine similarity |
| GET    | `/api/feynmann`          | Fetch a generated Feynman explanation                 |
| GET    | `/api/summary/:id`       | Fetch a cached video summary by ID                    |
| GET    | `/api/health`            | Health check endpoint                                 |

### Example Requests

**Generate Flashcards**

```http
POST /api/flashcards
Content-Type: application/json

{
  "topic": "Operating systems"
}
```

**Generate Feynman Explanation**

```http
POST /api/feynmann
Content-Type: application/json

{
  "topic": "What is an operating system?"
}
```

**Evaluate User Explanation**

```http
POST /api/feynman-embedding
Content-Type: application/json

{
  "feynmanQueryResponse": "...",
  "feynmanUserResponse": "..."
}
```

**Generate Video Summary**

```http
POST /api/summarize
Content-Type: application/json

{
  "videoUrl": "https://www.youtube.com/watch?v=example"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Open a Pull Request

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
