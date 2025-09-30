BookingLX (Django+React app)
=====================

Overview
--------

BookingLX is simple banbooking web application created using Django REST Framework.

Requirements:
-------------

	Python 3.10.8
	Django 4.2
	Djangorestframework==3.14.0

Installation:
-------------

	Create new folder "BookingLX" and open it:
	git clone https://github.com/marcin86junior/BookingLX .
	python -m venv myvenv
	.\myvenv\Scripts\activate
	pip install -r requirements.txt
	cd booking_project\
	python manage.py migrate
	add SECRET_KEY = 'xxx' in settings.py
	python .\manage.py runserver
	http://127.0.0.1:8000/
	python manage.py test

    Run frontend: (2nd terminal)
    cd frontend\
    npm install
    npm install axios react-router-dom
    npm start
    The frontend should now be running at `http://localhost:3000/`.


Docker:
-------

	Create new folder "BookingLite" and open it:
	git clone https://github.com/marcin86junior/BookingLX .
	add SECRET_KEY = 'xxx' in settings.py
	change format file in \booking_project\docker-entrypoint.sh    CRLF->LF (save!)
	docker-compose up --build
