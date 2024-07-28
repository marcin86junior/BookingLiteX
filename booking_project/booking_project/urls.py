# booking_project/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from bookings.views import BookingViewSet, FlatViewSet

router = DefaultRouter()
router.register(r'bookings', BookingViewSet)
router.register(r'flats', FlatViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', include('bookings.urls')),
]
