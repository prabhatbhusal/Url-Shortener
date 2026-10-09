<div align="center">

<h1>Url-Shortener</h1>

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Django_REST-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django REST Framework" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

<p>
Url-Shortener is a Full Stack Project Developed By <b>Er. Prabhat Bhusal</b>. This project is developed using React and Tailwind as frontend and Django-Rest Framework and Python as backend and uses PostgreSQL as database to store the link date and time as well as their hash value and how many times the user has clicked the url with hash value to showcase that in a chart within a week with a refresh button.
</p>

<a href="#how-to-run">How To Run</a> •
<a href="#rate-limiter-implementation">Rate Limiter</a> •
<a href="#api-documentation">API Documentation</a>

</div>

---

## Project Structure

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

## How To Run

There are two ways to run this project: Docker or locally.

### With Docker

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

### Without Docker

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

---

## Rate Limiter Implementation

First of all, I tracked the client request, IP address and time to make sure whether the client is from the same IP address or not. Then the backend records the timestamp of each request and calculates the remaining wait time, so that if the client enters the same or different URLs 5 times within 1 minute, the API returns a `429 Too Many Requests` response. In the frontend, a countdown timer of the remaining wait time is calculated based on the oldest request within the last 60 seconds, and the actual remaining time is shown.

---

## API Documentation

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
