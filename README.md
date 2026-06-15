# Url-Shortener

## Description
Url-Shortener is a Full Stack Project Developed By Er.Prabhat Bhusal. This project is developed using React and tailwind as frontend and Django-Rest Framework and Python as backend and uses Postgresql as database to store the link date and time as well as their hash value and how many times the user has clicked the url with hash value to showcase that in a chart within a week with a refresh button

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
There are two way to run the this projects:Docker or in house Locally  

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
- Frontend : http://localhost:5173
- Backend :http://localhost:8000 

4. To stop the application
```bash
    docker compose down
```

### Without Docker
- To run application do the following:
1. Clone the Repository
```bash
    git clone https://github.com/prabhatbhusal/Url-Shortener.git
    cd Url-Shortener
    cd backend
```

2. Database - Postgresql
```bash
    sudo pg_ctlcluster 18 main start
```
3. Backend - Django
```python
    source venv/bin/activate
    python manage.py runserver
```
4. Frontend - React (open new terminal)
```js
    cd frontend
    npm run dev
```
---

## Rate Limiter Implementation
- First of all, I tracked the client request,ipaddress and time to make sure whether client is from same IP address or not then the backend records the         timestamp of each request and calculates the remaining wait time so that if the client enter's same or different urls 5 times within  1 minute of time then the API returns a 429 Too Many Requests response. which is too many request and in frontend a countdown timer of the remaining wait time is calculated based on the oldest request within the last 60 seconds then actual remaining time is provided. 
---

# API Documentation

## Endpoints

### POST /api/shortenurl/
- Request:It request user url with https/http
- Response:It provide a localhost/{alias} link,if the link is already in database it simply replies with url already shortened and if input field is empty replies with the url is required also also check rate limit and if the new data is newly create a link with alias is provided.
Error code are HTTP_429_TOO_MANY_REQUESTS,HTTP_400_BAD_REQUEST,HTTP_201_CREATED.



### GET /api/{alias}/
- Request:The user put's the alias in it's localhost address which it will take the user to original  URL
- Response:For Success it provides orignal URl failure:no URL found
### GET /api/urls/
- Request:No request is made as the data are already stored in the database.
- Response:Provides all the url links by clicking  the button  HTTP_200_OK
### GET /api/analytics/{alias}/
- Request:Whichever url the user clicks the chart asks for specific alias to look for click count and date
- Response:Provides data to chartjs in which it displays click count and clicked date in graph.