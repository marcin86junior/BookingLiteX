from rest_framework import serializers
from .models import Flat, Booking

class FlatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flat
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    previous_booking_id = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = '__all__'

    def get_previous_booking_id(self, obj):
        previous_booking = Booking.objects.filter(
            flat=obj.flat,
            checkout__lte=obj.checkin
        ).order_by('-checkout').first()
        
        return previous_booking.id if previous_booking else None
