import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-jn@&kv+=q9b^l!b0!+h1o2r=f%ttp)3p=@2uh!-eusxd^=9t_k'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Application definition
INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'appointments',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'barbershop.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'backend/appointments/templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'barbershop.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Localization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'backend/appointments/static'),
]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Default primary key type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS
CORS_ALLOW_ALL_ORIGINS = True

# Jazzmin Admin Customization
JAZZMIN_SETTINGS = {
    "site_title": "ТОЧКА Admin",
    "site_header": "ТОЧКА Barbershop",
    "site_brand": "ТОЧКА Barbershop",
    "welcome_sign": "Добро пожаловать в панель администратора",
    "site_logo": "img/admin-logo.JPEG",
    "login_logo": "img/admin-logo.jpeg",         # Logo shown on login page
    "site_logo_classes": "img-circle",
    "login_logo_dark": "img/admin-logo.jpeg",    # Optional: for dark mode
    "custom_css": "css/custom_admin.css",


    "copyright": "© ТОЧКА",

    "custom_css": "css/custom_admin.css",
    "custom_js": "js/custom_admin.js",

    "show_sidebar": True,
    "navigation_expanded": True,

    "theme": "default",
    "custom_css": "css/custom_admin.css",
    "custom_js": "js/custom_admin.js",

    "ui_tweaks": {
        "navbar": "white",                # Top nav background
        "accent": "primary",              # Highlight color
        "sidebar": "primary",             # Sidebar background (primary = blue)
        "theme": "flatly",                # Optional Bootstrap theme
        "dark_mode_theme": None,
        "button_classes": {
            "primary": "btn btn-primary",
            "secondary": "btn btn-light"
        }
    },

    "icons": {
        "appointments.Appointment": "fas fa-calendar-check",
        "appointments.Barber": "fas fa-user-scissors",
        "appointments.Service": "fas fa-cut",
    },

    "default_icon_parents": "fas fa-layer-group",
    "default_icon_children": "fas fa-circle",

    "hide_apps": [],
    "hide_models": [],

    "order_with_respect_to": [
        "appointments.Appointment",
        "appointments.Barber",
        "appointments.Service",
    ],

    "topmenu_links": [
        {"name": "Home", "url": "/", "permissions": ["auth.view_user"]},
    ],
}
