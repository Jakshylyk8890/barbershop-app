# from rest_framework import serializers
# from .models import Appointment, Barber

# class AppointmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Appointment
#         fields = '__all__'

# class BarberSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Barber
#         fields = ['id', 'name']


from rest_framework import serializers
from .models import Service, Barber, Appointment

class ServiceSerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta:
        model = Service
        fields = '__all__'

class BarberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Barber
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'
