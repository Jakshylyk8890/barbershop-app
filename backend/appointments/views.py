from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime, timedelta, time
from .models import Appointment, Service, Barber
from .serializers import AppointmentSerializer, BarberSerializer, ServiceSerializer

from django.db import transaction, IntegrityError
from rest_framework import status

class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class BarberListView(generics.ListAPIView):
    queryset = Barber.objects.filter(is_active=True)
    serializer_class = BarberSerializer


class AvailableTimeSlotsView(APIView):
    def get(self, request):
        date_str = request.query_params.get('date')
        barber_id = request.query_params.get('barber_id')
        service_id = request.query_params.get('service_id')

        # Validate date
        try:
            appointment_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        except (ValueError, TypeError):
            return Response({"error": "Invalid or missing date"}, status=400)

        # Default interval if no service provided
        interval = timedelta(minutes=60)

        if service_id and service_id.isdigit():
            try:
                service = Service.objects.get(id=int(service_id))
                interval = timedelta(minutes=service.duration_minutes)
            except Service.DoesNotExist:
                return Response({"error": "Invalid service_id"}, status=400)

        # Collect booked times
        booked_ranges = []
        if barber_id and barber_id.isdigit():
            appointments = Appointment.objects.filter(
                barber_id=int(barber_id),
                appointment_date=appointment_date
            ).select_related('service')

            for appt in appointments:
                start = datetime.combine(appointment_date, appt.appointment_time)
                duration = timedelta(minutes=appt.service.duration_minutes)
                end = start + duration
                booked_ranges.append((start, end))

        # Generate slots
        start_time = time(10, 0)
        end_time = time(21, 0)
        current = datetime.combine(appointment_date, start_time)
        end_dt = datetime.combine(appointment_date, end_time)

        available = []
        all_slots = []
        booked = set()

        while current + interval <= end_dt:
            slot_str = current.strftime('%H:%M')
            all_slots.append(slot_str)

            slot_end = current + interval

            # Check for overlap
            is_conflict = any(
                booked_start < slot_end and current < booked_end
                for booked_start, booked_end in booked_ranges
            )

            if is_conflict:
                booked.add(slot_str)
            else:
                available.append(slot_str)

            current += interval

        return Response({
            "available": available,
            "booked": list(booked),
            "all": all_slots
        })


class AppointmentCreateView(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def create(self, request, *args, **kwargs):
        try:
            # Atomic transaction prevents race conditions
            with transaction.atomic():
                return super().create(request, *args, **kwargs)
        except IntegrityError:
            return Response(
                {"error": "This time slot is already booked. Please select a different time."},
                status=status.HTTP_400_BAD_REQUEST
            )


class MyAppointmentsView(APIView):
    def get(self, request):
        name = request.query_params.get('name')
        phone = request.query_params.get('phone')

        if not name or not phone:
            return Response({"error": "Missing name or phone"}, status=400)

        upcoming = Appointment.objects.filter(
            customer_name__iexact=name.strip(),
            phone_number=phone.strip(),
            appointment_date__gte=date.today()
        ).order_by('appointment_date', 'appointment_time')

        serializer = AppointmentSerializer(upcoming, many=True)
        return Response(serializer.data)