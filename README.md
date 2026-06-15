# Url-Shortener

## Description
Url-Shortener is a Full Stack Project Developed By Er.Prabhat Bhusal. This project is developed using React and tailwind as frontend and Django-Rest Framework and Python as backend and uses Postgresql as database to store the link date and time as well as their hash value and how many times the user has clicked the url with hash value to showcase that in a chart within a week with a refresh button

## How To Run
There are two way to run the this projects:Docker or in house Locally  

### With Docker

### Without Docker
- To run application do the following:
1. Folder directory 
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
4. Frontend (open new terminal)
```js
cd frontend
npm run dev
```
---

## Rate Limiter Implementation

---

# API Documentation

## Endpoints

### POST /api/shortenurl/
**Request:**
**Response:**

### GET /api/{alias}/
### GET /api/urls/
### GET /api/analytics/{alias}/