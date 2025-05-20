
# from django.urls import path
# from .views import AppointmentCreateView  # ✅ use this if that's what you have

# urlpatterns = [
#     path('appointments/', AppointmentCreateView.as_view(), name='create-appointment'),
# ]

# from django.urls import path
# from .views import AppointmentListCreateView, available_times, available_barbers

# urlpatterns = [
#     path('appointments/', AppointmentListCreateView.as_view(), name='appointments'),
#     path('available-times/', available_times, name='available-times'),
#     path('available-barbers/', available_barbers, name='available-barbers'),
# ]

from .views import MyAppointmentsView
from django.urls import path
from .views import (
    ServiceListView,
    BarberListView,
    AvailableTimeSlotsView,
    AppointmentCreateView
)

urlpatterns = [
    path('services/', ServiceListView.as_view(), name='services'),
    path('barbers/', BarberListView.as_view(), name='barbers'),
    path('timeslots/', AvailableTimeSlotsView.as_view(), name='timeslots'),
    path('appointments/', AppointmentCreateView.as_view(), name='create-appointment'),
    path('my-appointments/', MyAppointmentsView.as_view(), name='my-appointments'),
]
