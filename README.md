BookingLite (Django+React app)
=====================

Overview
--------

BookingLITE is simple banbooking web application created using Django REST Framework.

Requirements:
-------------

	Python 3.10.8
	Django 4.2
	Djangorestframework==3.14.0

Installation:
-------------


	Create new folder "BookingLite" and open it:
	git clone https://github.com/marcin86junior/BookingLiteX .
	python -m venv myvenv
	.\myvenv\Scripts\activate
	pip install -r requirements.txt
	cd booking_project\
	python manage.py migrate
	add SECRET_KEY = 'xxx' in settings.py
	python .\manage.py runserver
	http://127.0.0.1:8000/

    Run frontend: (2nd terminal)
    cd frontend\
    npm install
    npm install axios react-router-dom
    npm start
    The frontend should now be running at `http://localhost:3000/`.


Testing:
--------

	python manage.py test


Docker:
-------

    *Working but should be in 1 docker-compose.yml.
	*Now we heve 2 off docker-compose.yml

	Create new folder "BookingLite" and open it:
	git clone https://github.com/marcin86junior/BookingLiteX .
	add SECRET_KEY = 'xxx' in settings.py

	Running backend:
	change format file in \booking_project\docker-entrypoint.sh    CRLF->LF (save!)
	cd booking_project\
	booking_project> docker-compose up --build

	Running frontend (in new terminal):
	cd..
	change format file in \docker-entrypoint.sh    CRLF->LF (save!)
	main_folder> docker-compose up --build

	Problems with merging to 1 docker-compose.yml:
	main_folder> docker-compose (not working).yml (file+error log)
