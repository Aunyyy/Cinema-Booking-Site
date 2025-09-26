# Cinema-Booking-Site

## Start Backend Server
```
# Windows
env\Scripts\Activate.ps1
# Linux
source env/Scripts/activate

cd backend
pip install -r requirements.txt
python manage.py makemigrations   # generates migration files
python manage.py migrate          # applies migrations to the DB
python manage.py runserver        # runs server
```

## Setup Frontend .env
```
VITE_API_URL = ""
# example "http://127.0.0.1:8000"
```

## Start Frontend Server
```
cd frontend
npm run dev 
```

## Home Page
![image](https://github.com/user-attachments/assets/f9106981-4f2c-465c-b819-33687f1dff99)

## Overview Page
![image](https://github.com/user-attachments/assets/30cd3e3d-2726-40ac-afbb-46235e147281)

## Booking Page
![image](https://github.com/user-attachments/assets/1f38a281-c7b0-4487-bf65-f00e189372fb)

