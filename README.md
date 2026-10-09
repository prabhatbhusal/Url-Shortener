<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F172A,50:1E3A8A,100:38BDF8&height=200&section=header&text=Url-Shortener&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Short%20links.%20Real%20analytics.&descAlignY=58&descSize=18" alt="Url-Shortener banner" width="100%" />

<a href="https://github.com/prabhatbhusal/Url-Shortener">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=20&duration=3000&pause=800&color=38BDF8&center=true&vCenter=true&width=600&lines=Shorten+long+URLs+in+one+click+%F0%9F%94%97;Track+clicks+with+weekly+charts+%F0%9F%93%8A;Rate-limited+to+keep+the+API+safe+%F0%9F%9B%A1%EF%B8%8F;React+%2B+Django+REST+%2B+PostgreSQL+%F0%9F%9A%80" alt="Typing animation" />
</a>

<br/>

<img src="https://skillicons.dev/icons?i=react,ts,tailwind,vite,django,python,postgres,docker,githubactions&theme=dark" alt="Tech stack" />

<br/><br/>

<img src="https://img.shields.io/github/stars/prabhatbhusal/Url-Shortener?style=for-the-badge&color=38BDF8" alt="Stars" />
<img src="https://img.shields.io/github/forks/prabhatbhusal/Url-Shortener?style=for-the-badge&color=1E3A8A" alt="Forks" />
<img src="https://img.shields.io/github/last-commit/prabhatbhusal/Url-Shortener?style=for-the-badge&color=0F172A" alt="Last commit" />

<p>
Url-Shortener is a Full Stack Project Developed By <b>Er. Prabhat Bhusal</b>. This project is developed using React and Tailwind as frontend and Django-Rest Framework and Python as backend and uses PostgreSQL as database to store the link date and time as well as their hash value and how many times the user has clicked the url with hash value to showcase that in a chart within a week with a refresh button.
</p>

<a href="#-how-to-run">How To Run</a> •
<a href="#%EF%B8%8F-how-it-works">How It Works</a> •
<a href="#%EF%B8%8F-rate-limiter-implementation">Rate Limiter</a> •
<a href="#-api-documentation">API Documentation</a>

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0F172A,100:38BDF8&height=3" width="100%" alt="divider" />

## ✨ Features

| | Feature | Description |
|:-:|---|---|
| 🔗 | **URL Shortening** | Turn any `http`/`https` link into a short `localhost/{alias}` link |
| ♻️ | **Duplicate Detection** | Already-shortened URLs are recognised instead of duplicated |
| 📊 | **Click Analytics** | Weekly click chart per link, powered by Chart.js, with a refresh button |
| 🛡️ | **Rate Limiting** | 5 requests per minute per IP, with a live countdown on the frontend |
| 🐳 | **Dockerised** | One command spins up frontend, backend and database |
| ⚙️ | **CI** | GitHub Actions workflow on every push |

<!-- 🎬 Tip: record a short screen capture of the app (e.g. with ScreenToGif or Kap),
     save it as assets/demo.gif, then uncomment the block below. -->
<!--
<div align="center">
  <img src="assets/demo.gif" alt="App demo" width="85%" />
</div>
-->

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0F172A,100:38BDF8&height=3" width="100%" alt="divider" />

## 🏗️ How It Works

```mermaid
flowchart LR
    U([👤 User]) -->|Paste long URL| F[⚛️ React + Tailwind]
    F -->|POST /api/shortenurl/| B[🐍 Django REST API]
    B -->|Check rate limit| RL{🛡️ 5 req / min?}
    RL -->|Exceeded| E[⛔ 429 Too Many Requests]
    RL -->|OK| DB[(🐘 PostgreSQL)]
    DB -->|alias + timestamps| B
    B -->|Short link| F
    F -->|Weekly click data| C[📊 Chart.js]
```

### Redirect & analytics flow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant FE as React Frontend
    participant API as Django API
    participant DB as PostgreSQL

    User->>API: GET /api/{alias}/
    API->>DB: Look up alias
    DB-->>API: Original URL
    API->>DB: Record click (date & time)
    API-->>User: Redirect to original URL

    User->>FE: Click a link in the list
    FE->>API: GET /api/analytics/{alias}/
    API->>DB: Count clicks for last 7 days
    DB-->>API: Click counts per day
    API-->>FE: JSON data
    FE-->>User: Render weekly chart
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0F172A,100:38BDF8&height=3" width="100%" alt="divider" />

## 📁 Project Structure

<details>
<summary><b>Click to expand</b></summary>

```text
URL-SHORTENER/
├── .github/
│   └── workflows/
│       └── ci.yml
├── backend/
│   ├── core/
│   ├── urlshortener/
│   │   ├── __pycache__/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── venv/
│   ├── db.sqlite3
│   ├── Dockerfile
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── docker-compose.yml
└── README.md
```

</details>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0F172A,100:38BDF8&height=3" width="100%" alt="divider" />

## 🚀 How To Run

There are two ways to run this project: Docker or locally.

### 🐳 With Docker

1. Clone the Repository

    ```bash
    git clone https://github.com/prabhatbhusal/Url-Shortener.git
    ```

2. Build and Start all the services:

    ```bash
    docker compose up --build
    ```

3. Access the application:
    - Frontend: http://localhost:5173
    - Backend: http://localhost:8000

4. To stop the application

    ```bash
    docker compose down
    ```

### 💻 Without Docker

1. Clone the Repository

    ```bash
    git clone https://github.com/prabhatbhusal/Url-Shortener.git
    cd Url-Shortener
    cd backend
    ```

2. Database - PostgreSQL

    ```bash
    sudo pg_ctlcluster 18 main start
    ```

3. Backend - Django

    ```bash
    source venv/bin/activate
    python manage.py runserver
    ```

4. Frontend - React (open new terminal)

    ```bash
    cd frontend
    npm run dev
    ```

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0F172A,100:38BDF8&height=3" width="100%" alt="divider" />

## 🛡️ Rate Limiter Implementation

First of all, I tracked the client request, IP address and time to make sure whether the client is from the same IP address or not. Then the backend records the timestamp of each request and calculates the remaining wait time, so that if the client enters the same or different URLs 5 times within 1 minute, the API returns a `429 Too Many Requests` response. In the frontend, a countdown timer of the remaining wait time is calculated based on the oldest request within the last 60 seconds, and the actual remaining time is shown.

```mermaid
stateDiagram-v2
    direction LR
    [*] --> Allowed
    Allowed --> Allowed: request (count < 5 in last 60s)
    Allowed --> Blocked: 5th request within 60s
    Blocked --> Blocked: request → 429 + countdown
    Blocked --> Allowed: oldest request expires
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0F172A,100:38BDF8&height=3" width="100%" alt="divider" />

## 📖 API Documentation

| Method | Endpoint | Purpose |
|:-:|---|---|
| ![POST](https://img.shields.io/badge/POST-F59E0B?style=flat-square) | `/api/shortenurl/` | Create a short link |
| ![GET](https://img.shields.io/badge/GET-22C55E?style=flat-square) | `/api/{alias}/` | Redirect to the original URL |
| ![GET](https://img.shields.io/badge/GET-22C55E?style=flat-square) | `/api/urls/` | List all shortened URLs |
| ![GET](https://img.shields.io/badge/GET-22C55E?style=flat-square) | `/api/analytics/{alias}/` | Weekly click data for a link |

### Endpoints

#### `POST /api/shortenurl/`
- **Request:** The user's URL with `https`/`http`.
- **Response:** Provides a `localhost/{alias}` link. If the link is already in the database it replies that the URL is already shortened; if the input field is empty it replies that the URL is required. It also checks the rate limit, and if the data is new, a link with an alias is created.
- **Status codes:** `HTTP_201_CREATED`, `HTTP_400_BAD_REQUEST`, `HTTP_429_TOO_MANY_REQUESTS`

#### `GET /api/{alias}/`
- **Request:** The user puts the alias in the localhost address, which takes the user to the original URL.
- **Response:** On success, redirects to the original URL. On failure: no URL found.

#### `GET /api/urls/`
- **Request:** No request body, as the data is already stored in the database.
- **Response:** Provides all the URL links when the button is clicked. `HTTP_200_OK`

#### `GET /api/analytics/{alias}/`
- **Request:** Whichever URL the user clicks, the chart asks for that specific alias to look up click count and date.
- **Response:** Provides data to Chart.js, which displays click count and clicked date in a graph.

<div align="center">

<br/>

**Made with ❤️ by Er. Prabhat Bhusal**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:38BDF8,50:1E3A8A,100:0F172A&height=120&section=footer" alt="footer" width="100%" />

</div>
