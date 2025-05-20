from django.contrib import admin
from .models import Appointment, Barber, Service


# ✅ Branding for the Admin Panel
admin.site.site_header = "ТОЧКА Barbershop"
admin.site.site_title = "ТОЧКА Admin"
admin.site.index_title = "Управление записями и клиентами"

# ✅ Inline Appointments in Barber Admin (Tabular View)
class AppointmentInline(admin.TabularInline):
    model = Appointment
    extra = 0
    can_delete = False
    readonly_fields = (
        'appointment_date',
        'appointment_time',
        'customer_name',
        'phone_number',
        'service',
    )
    ordering = ('appointment_date', 'appointment_time')
    show_change_link = True


# ✅ Barber Admin
@admin.register(Barber)
class BarberAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name',)
    inlines = [AppointmentInline]
    ordering = ('name',)


# ✅ Service Admin
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'duration_minutes', 'price')
    search_fields = ('name',)
    ordering = ('name',)


# ✅ Appointment Admin
@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        'customer_name',
        'phone_number',
        'barber',
        'service',
        'appointment_date',
        'appointment_time',
    )
    list_filter = (
        'barber',
        'service',
        'appointment_date',
    )
    search_fields = (
        'customer_name',
        'phone_number',
        'barber__name',
        'service__name',
    )
    ordering = ('-appointment_date', '-appointment_time')
