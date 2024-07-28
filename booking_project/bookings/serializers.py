from rest_framework import serializers
from .models import Flat, Booking

class FlatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flat
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
