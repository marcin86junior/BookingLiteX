from django.test import TestCase
from .models import Flat, Booking
from rest_framework.test import APIClient
from rest_framework import status
from datetime import date


class Test(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_main_page_display(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Welcome to the Booking App", response.content.decode("utf-8"))

    def test_flat_model(self):
        flat1_data = {"name": "flat-1"}
        response = self.client.post("/api/flats/", flat1_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Flat.objects.filter(name="flat-1").exists())

        flat2_data = {"name": "flat-2"}
        response = self.client.post("/api/flats/", flat2_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Flat.objects.filter(name="flat-2").exists())

    def test_booking_model(self):
        flat1 = Flat.objects.create(name="flat-1")
        flat2 = Flat.objects.create(name="flat-2")

        bookings = [
            {"flat": flat1, "checkin": date(2022, 1, 1), "checkout": date(2022, 1, 13)},
            {"flat": flat1, "checkin": date(2022, 1, 20), "checkout": date(2022, 2, 10)},
            {"flat": flat1, "checkin": date(2022, 2, 20), "checkout": date(2022, 3, 10)},
            {"flat": flat2, "checkin": date(2022, 1, 2), "checkout": date(2022, 1, 20)},
            {"flat": flat2, "checkin": date(2022, 1, 20), "checkout": date(2022, 2, 11)},
        ]

        for booking_data in bookings:
            Booking.objects.create(**booking_data)

        response = self.client.get("/api/bookings/", format="json")
        response_data = response.json()
        print(response_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        expected_data = [
            {'id': 1, 'previous_booking_id': None, 'checkin': '2022-01-01', 'checkout': '2022-01-13', 'flat': 1},
            {'id': 2, 'previous_booking_id': 1, 'checkin': '2022-01-20', 'checkout': '2022-02-10', 'flat': 1},
            {'id': 3, 'previous_booking_id': 2, 'checkin': '2022-02-20', 'checkout': '2022-03-10', 'flat': 1},
            {'id': 4, 'previous_booking_id': None, 'checkin': '2022-01-02', 'checkout': '2022-01-20', 'flat': 2},
            {'id': 5, 'previous_booking_id': 4, 'checkin': '2022-01-20', 'checkout': '2022-02-11', 'flat': 2},
        ]

        self.assertEqual(response_data, expected_data)
