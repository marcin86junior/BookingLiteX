from .models import Flat, Booking
from .serializers import FlatSerializer, BookingSerializer
from django.shortcuts import render
from django.db.models import OuterRef, Subquery
from rest_framework import generics, viewsets


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class FlatViewSet(viewsets.ModelViewSet):
    queryset = Flat.objects.all()
    serializer_class = FlatSerializer


class BookingListView(generics.ListAPIView):
    serializer_class = BookingSerializer

    def get_queryset(self):
        subquery = Booking.objects.filter(
            flat=OuterRef('flat'), 
            checkin__lt=OuterRef('checkin')
        ).order_by('-checkin').values('id')[:1]

        queryset = Booking.objects.annotate(
            previous_booking_id=Subquery(subquery)
        ).order_by('flat', 'checkin')

        return queryset


def index(request):
    return render(request, 'bookings/index.html')
