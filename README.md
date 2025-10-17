# INKBYTE_BACKEND

InkByte is the backend service for **InkByte**, a mobile application that provides concise summaries of YouTube videos. This backend handles video transcription, summary generation, and API endpoints for the mobile app.

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
* Stores and caches results using **Redis** for faster responses
* Handles user requests via secure REST APIs
* Scalable architecture with **Node.js** and **Express**

## Tech Stack

* **Node.js** – Backend runtime environment
* **Express.js** – Web framework for routing and APIs
* **Firebase** – User authentication and database
* **Redis** – Caching frequently requested summaries
* **Embedding Models** – AI-powered video understanding
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

Start the server and connect your Flutter app to the backend API endpoints. Example requests:

```http
POST /api/summarize
Content-Type: application/json

{
  "videoUrl": "https://www.youtube.com/watch?v=example"
}
```

Response:

```json
{
  "summary": "This is a concise summary of the video."
}
```

## API Endpoints

| Method | Endpoint         | Description                         |
| ------ | ---------------- | ----------------------------------- |
| POST   | /api/summarize   | Generate summary from a YouTube URL |
| GET    | /api/summary/:id | Fetch cached summary by ID          |
| GET    | /api/health      | Health check endpoint               |

> Add more endpoints as needed for your mobile app.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Open a Pull Request

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.


Do you want me to do that?
