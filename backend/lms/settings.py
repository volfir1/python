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
    "site_title": "LMS Portal",
    "site_header": "Learning Management System",
    "site_brand": "LMS",
    "site_logo": None,  # You can add your logo path here
    "login_logo": None,  # Custom logo for login page
    "login_logo_dark": None,  # Logo for dark mode
    "site_logo_classes": "img-circle",
    "site_icon": None,  # Icon for browser tab
    "welcome_sign": "Welcome to LMS Administration",
    "copyright": "LMS © 2024 - Powered by Jazzmin",
    "search_model": ["users.User", "courses.Course", "forum.Discussion"],
    "user_avatar": None,

    # Top Menu Items
    "topmenu_links": [
        {"name": "Home", "url": "admin:index", "permissions": ["auth.view_user"]},
        {"name": "Support", "url": "https://github.com/yourusername/lms", "new_window": True},
        {"model": "users.User"},
        {"app": "courses"},
    ],

    # User Menu Items
    "usermenu_links": [
        {"name": "Profile", "url": "admin:users_user_change", "icon": "fas fa-user"},
        {"name": "Support", "url": "https://github.com/yourusername/lms", "icon": "fas fa-question-circle"},
    ],

    # Side Menu Items
    "show_sidebar": True,
    "navigation_expanded": True,
    "hide_apps": [],
    "hide_models": [],
    "order_with_respect_to": ["users", "courses", "forum"],
    
    # Custom Icons (using FontAwesome)
    "icons": {
        "auth": "fas fa-users-cog",
        "auth.user": "fas fa-user",
        "users.User": "fas fa-user",
        "auth.Group": "fas fa-users",
        "admin.LogEntry": "fas fa-file",
        "courses.Course": "fas fa-graduation-cap",
        "courses.Lesson": "fas fa-book-open",
        "courses.Assignment": "fas fa-tasks",
        "forum.Discussion": "fas fa-comments",
        "forum.Comment": "fas fa-comment",
        "users.Profile": "fas fa-id-card",
    },

    # Icon style
    "default_icon_parents": "fas fa-folder",
    "default_icon_children": "fas fa-file",

    # Related Modal
    "related_modal_active": True,

    # Custom CSS/JS
    "custom_css": None,
    "custom_js": None,
    "show_ui_builder": True,
    "changeform_format": "horizontal_tabs",
    
    # Form Customization
    "changeform_format_overrides": {
        "users.user": "collapsible",
        "auth.group": "horizontal_tabs",
        "courses.course": "horizontal_tabs",
    },

    # Dashboard Customization
    "custom_links": {
        "courses": [{
            "name": "Create Course", 
            "url": "admin:courses_course_add", 
            "icon": "fas fa-plus",
            "permissions": ["courses.add_course"]
        }],
        "users": [{
            "name": "Add User",
            "url": "admin:users_user_add",
            "icon": "fas fa-plus",
            "permissions": ["users.add_user"]
        }]
    },

    # Dashboard Cards
    "show_metrics": True,
    "metrics": [
        {
            "model": "users.User",
            "name": "Users",
            "icon": "fas fa-users",
            "color": "primary"
        },
        {
            "model": "courses.Course",
            "name": "Courses",
            "icon": "fas fa-graduation-cap",
            "color": "success"
        },
        {
            "model": "forum.Discussion",
            "name": "Discussions",
            "icon": "fas fa-comments",
            "color": "info"
        },
    ],
}

# UI Customization with a modern color scheme
JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": False,
    "brand_small_text": False,
    "brand_colour": False,
    "accent": "accent-primary",
    "navbar": "navbar-dark",
    "no_navbar_border": True,
    "navbar_fixed": True,
    "layout_boxed": False,
    "footer_fixed": False,
    "sidebar_fixed": True,
    "sidebar": "sidebar-dark-primary",
    "sidebar_nav_small_text": False,
    "sidebar_disable_expand": False,
    "sidebar_nav_child_indent": True,
    "sidebar_nav_compact_style": True,
    "sidebar_nav_legacy_style": False,
    "sidebar_nav_flat_style": False,
    "theme": "darkly",  # Options: cosmo, cyborg, darkly, flatly, journal, litera, lumen, lux, materia, minty, pulse, sandstone, simplex, slate, solar, spacelab, superhero, united, yeti
    "dark_mode_theme": "superhero",
    "button_classes": {
        "primary": "btn-primary",
        "secondary": "btn-secondary",
        "info": "btn-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
        "success": "btn-success"
    },
    "actions_sticky_top": True,
}

# Optional: Custom CSS for additional styling
JAZZMIN_SETTINGS["custom_css"] = "custom/custom.css"

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