from .models import Flat, Booking
from .serializers import FlatSerializer, BookingSerializer
from django.shortcuts import render
from django.db.models import OuterRef, Subquery
from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_create(serializer)
        except ValidationError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_update(serializer)
        except ValidationError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)

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
