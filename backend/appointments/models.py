# from django.db import models

# class Barber(models.Model):
#     name = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name


# class Appointment(models.Model):
#     customer_name = models.CharField(max_length=100)
#     phone_number = models.CharField(max_length=15)
#     service_requested = models.CharField(max_length=100)
#     appointment_date = models.DateField()
#     appointment_time = models.TimeField()
#     barber = models.ForeignKey(Barber, on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.customer_name} - {self.appointment_date} {self.appointment_time} ({self.barber})"


from django.db import models

class Service(models.Model):
    name = models.CharField(max_length=100)
    duration_minutes = models.PositiveIntegerField(default=60)
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.name

class Barber(models.Model):
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    customer_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    barber = models.ForeignKey(Barber, on_delete=models.CASCADE)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('barber', 'appointment_date', 'appointment_time')

    def __str__(self):
        return f"{self.customer_name} - {self.appointment_date} {self.appointment_time}"
