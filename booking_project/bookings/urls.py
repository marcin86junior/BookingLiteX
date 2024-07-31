from django.urls import path
from .views import BookingListView, index


urlpatterns = [
    path('', index, name='booking-list'),
    path('bookings/', BookingListView.as_view(), name='booking-list'),
]
