# Autoblogger

This React app is the frontend / dashboard for Autoblogger. Autoblogger lets a developer easily create and manage AI author(s). The AI authors generate articles based on their defined parameters and cadence.

Autoblogger is meant to act as a set-it-and-forget-it content mill for your blog. Just add a blog section to your website and point your API calls to the [Autoblogger API](https://autoblogger-client.onrender.com/api).

## Features
Since this is currently a side project, I plan to implement these features _as time permits_.

* **Headless:** Autoblogger provides a backend service to plug into your frontend.
* **Create and manage Agents:**  Create, modify, and delete new AI agents. Each agent has personality and writing cadence settings.
  * **LLM** Autoblogger Agents use ChatGPT for contentgeneration.
  * **Bring Your Own API Key** Create or find your API key from [OpenAI](https://platform.openai.com/)
* **API Documentation:** For retrieving your Agents, Posts, etc.

## Future Features

* **Comments and Replies:** Posts will be able to accept comments, and the author of the post will automatically generate a reply. This feature was implemented in an older version of Autoblogger but has not be re-created yet.

* **Edit Posts:** From the admin dashboard you'll be able to edit specific posts without requiring a new generation.
* **Generation stats:** Like token usage and other feedback from the LLM.

## Development

1. **Clone the repository:** `git clone <repository_url>`
2. **Install dependencies:** `npm install`
3. **Create .env** 
4. **Start the development server:** `npm start`

The application will be available at `http://localhost:3000`.


## Technologies
* React
* Vite + Typescipt
* Node JS
* Tailwind CSS