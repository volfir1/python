from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError

from base.models import Batch

class UserManager(BaseUserManager):
    def create_user(self, enrollment_number, first_name, password, **extra_fields):
        if not enrollment_number:
            raise ValueError(_("The Enrollment Number must be set"))
        if not first_name:
            raise ValueError(_("The First Name must be set"))
            
        # Normalize the enrollment number to ensure consistent format
        enrollment_number = enrollment_number.strip().upper()
        
        user = self.model(
            enrollment_number=enrollment_number,
            first_name=first_name.strip(),
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, enrollment_number, first_name, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('user_type', User.TEACHER)  # Superusers default to teacher type
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        
        return self.create_user(enrollment_number, first_name, password, **extra_fields)

class User(AbstractUser):
    # Constants for user types
    STUDENT = 'S'
    TEACHER = 'T'
    USER_TYPE_CHOICES = [
        (STUDENT, _('Student')),
        (TEACHER, _('Teacher')),
    ]
    
    # Remove the username field as we're using enrollment_number instead
    username = None
    
    # Main fields
    enrollment_number = models.CharField(
        _('enrollment number'),
        max_length=9,
        unique=True,
        help_text=_('Required. 9 characters. Letters and numbers only.'),
        error_messages={
            'unique': _("A user with that enrollment number already exists."),
        },
    )
    first_name = models.CharField(
        _('first name'),
        max_length=50,
        blank=False,
        help_text=_('Required. 50 characters or fewer.')
    )
    last_name = models.CharField(
        _('last name'),
        max_length=50,
        blank=True
    )
    user_type = models.CharField(
        _('user type'),
        max_length=1,
        choices=USER_TYPE_CHOICES,
        default=STUDENT
    )
    
    USERNAME_FIELD = 'enrollment_number'
    REQUIRED_FIELDS = ['first_name']
    
    objects = UserManager()
    
    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
    
    def clean(self):
        super().clean()
        # Additional validation can be added here
        if len(self.enrollment_number) != 9:
            raise ValidationError(_('Enrollment number must be exactly 9 characters.'))
    
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.enrollment_number})"

class Student(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='student_profile'
    )
    batch = models.ForeignKey(
        Batch,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name=_('batch'),
        related_name='students'
    )
    
    class Meta:
        verbose_name = _('student')
        verbose_name_plural = _('students')
    
    def clean(self):
        if self.user.user_type != User.STUDENT:
            raise ValidationError(_('User must be of type Student'))
    
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f'{self.user.get_full_name()} - {self.batch or "No Batch"}'

class Teacher(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='teacher_profile'
    )
    
    class Meta:
        verbose_name = _('teacher')
        verbose_name_plural = _('teachers')
    
    def clean(self):
        if self.user.user_type != User.TEACHER:
            raise ValidationError(_('User must be of type Teacher'))
    
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.user.get_full_name()