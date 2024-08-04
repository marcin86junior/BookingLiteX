#!/bin/bash

# Apply database makemigrations
echo "Apply database makemigrations"
python manage.py makemigrations

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate

# Run test
echo "Starting test"
python manage.py test

# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8000
