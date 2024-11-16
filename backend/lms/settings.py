from pathlib import Path
from datetime import timedelta
import os
import dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

dotenv_file = os.path.join(BASE_DIR, ".env")
if os.path.isfile(dotenv_file):
    dotenv.load_dotenv(dotenv_file)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ['SECRET_KEY']

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

AUTH_USER_MODEL = 'users.User'


# Application definition

INSTALLED_APPS = [
    'jazzmin',
    'colorfield',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',

    'base',
    'users',
    'courses',
    'forum',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

ROOT_URLCONF = 'lms.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

JAZZMIN_SETTINGS = {
    # Core Settings
    "site_title": "Learning Hub",
    "site_header": "Learning Hub",
    "site_brand": "LH",
    "site_logo": None,
    "login_logo": None,
    "login_logo_dark": None,
    "site_icon": None,
    "welcome_sign": "Welcome to Learning Hub",
    "copyright": "Learning Hub © 2024",
    
    # Navigation
    "show_sidebar": True,
    "navigation_expanded": False,
    "hide_apps": [],
    "hide_models": [],
    "order_with_respect_to": ["users", "courses", "base", "forum"],
    
    # Top Navigation
    "topmenu_links": [
        {"name": "Home", "url": "admin:index", "permissions": ["auth.view_user"]},
        {"model": "users.User"},
        {"model": "courses.Course"},
        {"model": "courses.TimeTable"},
    ],
    
    # User Menu
    "usermenu_links": [
        {
            "name": "Profile",
            "url": "admin:users_user_change",
            "icon": "fas fa-user-circle"
        },
        {
            "name": "Settings",
            "url": "admin:index",
            "icon": "fas fa-cog"
        },
    ],
    
    # UI Components
    "show_ui_builder": True,
    "changeform_format": "horizontal_tabs",
    "related_modal_active": True,
    
    # Icons
    "icons": {
        "auth": "fas fa-users-cog",
        "users.User": "fas fa-user-graduate",
        "auth.Group": "fas fa-users",
        "courses.Course": "fas fa-graduation-cap",
        "courses.Lesson": "fas fa-book-reader",
        "courses.Assignment": "fas fa-tasks",
        "forum.Discussion": "fas fa-comments",
        "forum.Comment": "fas fa-comment-alt",
        "users.Profile": "fas fa-id-card",
    },
    
    # Custom Links
    "custom_links": {
        "courses": [{
            "name": "Add Course", 
            "url": "admin:courses_course_add", 
            "icon": "fas fa-plus-circle",
            "permissions": ["courses.add_course"]
        }],
    },
    
    # Custom CSS/JS
    "custom_css": True,
    "custom_js": True,
    
    # Show UI builder
    "show_ui_builder": True,
}
JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": False,
    "brand_small_text": False,
    "brand_colour": False,
    "accent": "accent-indigo",
    "navbar": "navbar-white navbar-light",
    "no_navbar_border": True,
    "navbar_fixed": True,
    "layout_boxed": False,
    "footer_fixed": False,
    "sidebar_fixed": True,
    "sidebar": "sidebar-light-indigo",
    "sidebar_nav_small_text": False,
    "sidebar_disable_expand": False,
    "sidebar_nav_child_indent": True,
    "sidebar_nav_compact_style": False,
    "sidebar_nav_legacy_style": True,
    "sidebar_nav_flat_style": False,
    "theme": "default",
    "dark_mode_theme": None,
    "button_classes": {
        "primary": "btn-outline-primary",
        "secondary": "btn-outline-secondary",
        "info": "btn-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
        "success": "btn-outline-success"
    }
}
# Custom CSS for enhanced styling
custom_css = """
/* Global Styles */
:root {
    --primary-color: #6366F1;
    --secondary-color: #4F46E5;
    --success-color: #22C55E;
    --background-color: #F9FAFB;
    --text-color: #1F2937;
    --border-radius: 0.75rem;
    --transition: all 0.3s ease;
}

body {
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Navbar Styling */
.navbar {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.9) !important;
    border-bottom: 1px solid rgba(229, 231, 235, 0.5) !important;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
}

/* Sidebar Styling */
.main-sidebar {
    background: white;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.nav-sidebar .nav-item > .nav-link {
    padding: 0.75rem 1rem;
    margin: 0.25rem 0.7rem;
    border-radius: var(--border-radius);
    transition: var(--transition);
}

.nav-sidebar .nav-item > .nav-link:hover {
    background-color: #F3F4F6;
    color: var(--primary-color);
}

.nav-sidebar .nav-item > .nav-link.active {
    background-color: #EEF2FF;
    color: var(--primary-color);
}

/* Card Styling */
.card {
    border: none;
    border-radius: var(--border-radius);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: var(--transition);
}

.card:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card-header {
    background-color: transparent;
    border-bottom: 1px solid #E5E7EB;
    padding: 1.5rem;
}

/* Button Styling */
.btn {
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-weight: 500;
    transition: var(--transition);
}

.btn-primary {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

.btn-primary:hover {
    background-color: var(--secondary-color);
    border-color: var(--secondary-color);
}

/* Form Controls */
.form-control {
    border-radius: 0.5rem;
    border: 1px solid #E5E7EB;
    padding: 0.5rem 1rem;
    transition: var(--transition);
}

.form-control:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
}

/* Table Styling */
.table {
    border-radius: var(--border-radius);
    overflow: hidden;
}

.table thead th {
    background-color: #F9FAFB;
    border-bottom: 1px solid #E5E7EB;
    font-weight: 600;
    padding: 1rem;
}

.table tbody td {
    padding: 1rem;
    vertical-align: middle;
}

/* Search Bar */
.navbar .form-control {
    background-color: #F3F4F6;
    border: none;
    border-radius: 0.75rem;
    padding: 0.5rem 1rem;
}

.navbar .form-control:focus {
    background-color: white;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
}

/* Breadcrumb */
.breadcrumb {
    padding: 1rem 0;
    margin: 0;
    background: transparent;
}

.breadcrumb-item + .breadcrumb-item::before {
    content: "›";
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #F3F4F6;
}

::-webkit-scrollbar-thumb {
    background: #D1D5DB;
    border-radius: 3px;
}

/* Action Buttons */
.actions-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    border-radius: 0.5rem;
    margin-right: 0.5rem;
}

/* Stats Cards */
.small-box {
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: var(--transition);
}

.small-box:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Animations */
.nav-item, .card, .btn {
    transition: all 0.2s ease-in-out;
}

/* Modern Select Styling */
select.form-control {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px 12px;
    appearance: none;
}
"""

JAZZMIN_SETTINGS["custom_css"] = custom_css

WSGI_APPLICATION = 'lms.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    # {
    #     'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    # },
    # {
    #     'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    # },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')  # Add this line

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static')
]

# Media files (Uploaded files)
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

ALLOWED_HOSTS = ['*']

X_FRAME_OPTIONS = "SAMEORIGIN"
SILENCED_SYSTEM_CHECKS = ["security.W019"]


# Optional: Custom theme settings
ADMIN_INTERFACE = {
    'THEME': {
        'COLORS': {
            'PRIMARY': '#0B3954',  # Professional blue
            'SECONDARY': '#087E8B',
            'ACCENT': '#BFD7EA',
            'ERROR': '#FF5A5F',
        }
    }
}