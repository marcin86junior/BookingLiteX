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

    TO BE DONE
	python manage.py test


Docker:
-------

    TO BE DONE
	Create new folder "interBANK" and open it:
	git clone https://github.com/marcin86junior/interBANK .
	cd inter_project\
	"Open Doker Desktop"
	change format file in \inter_project\docker-entrypoint.sh    CRLF->LF (save!)
	add SECRET_KEY = 'xxx' in settings.py
	docker-compose up
	http://127.0.0.1:8000/
	Test:
	docker-compose run web python3 manage.py test


Instructions:
-------

    TO BE DONE


Tests:
-------

    TO BE DONE


Todo list:
-------

    TO BE DONE
