from django.db import models
from django.core.exceptions import ValidationError

class Flat(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Booking(models.Model):
    flat = models.ForeignKey(Flat, on_delete=models.CASCADE)
    checkin = models.DateField()
    checkout = models.DateField()

    def __str__(self):
        return f"{self.flat.name} ({self.checkin} to {self.checkout})"

    def clean(self):
        if self.checkin >= self.checkout:
            raise ValidationError('Check-out date must be after check-in date.')
        overlapping_bookings = Booking.objects.filter(
            flat=self.flat,
            checkin__lt=self.checkout,
            checkout__gt=self.checkin,
        ).exclude(id=self.id)  # Exclude the current booking in case of updates
        if overlapping_bookings.exists():
            raise ValidationError('The flat is already booked for the specified dates.')

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)