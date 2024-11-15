from django.db import models
from users.models import Student, Teacher
from base.models import Batch  # Import Batch model

class Course(models.Model):
    name = models.CharField(max_length=100, blank=False)
    code = models.CharField(max_length=8, blank=False)
    student = models.ManyToManyField(Student)

    def __str__(self) -> str:
        return self.name

class TimeTable(models.Model):
    LECTURE = 'lecture'
    LAB = 'lab'

    CLASS_TYPE_CHOICES = [
        (LECTURE, 'Lecture'),
        (LAB, 'Lab'),
    ]

    SUNDAY = 0
    MONDAY = 1
    TUESDAY = 2
    WEDNESDAY = 3
    THURSDAY = 4
    FRIDAY = 5
    SATURDAY = 6

    DAY_CHOICES = [
        (SUNDAY, 'Sunday'),
        (MONDAY, 'Monday'),
        (TUESDAY, 'Tuesday'),
        (WEDNESDAY, 'Wednesday'),
        (THURSDAY, 'Thursday'),
        (FRIDAY, 'Friday'),
        (SATURDAY, 'Saturday'),
    ]

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_timetables')
    teacher = models.ForeignKey(
        'users.Teacher', 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='teacher_timetables'
    )
    batch = models.ManyToManyField(Batch, related_name='batch_timetables')
    day = models.PositiveSmallIntegerField(choices=DAY_CHOICES, blank=False)
    start_time = models.TimeField()
    end_time = models.TimeField()
    class_type = models.CharField(
        max_length=7,
        choices=CLASS_TYPE_CHOICES,
    )

    class Meta:
        ordering = ['day', 'start_time']
        verbose_name_plural = "time table"

    def __str__(self):
        return f'{self.course} {self.class_type} on {self.get_day_display()} at {self.start_time}'

    def clean(self):
        from django.core.exceptions import ValidationError
        if self.start_time >= self.end_time:
            raise ValidationError('End time must be after start time')

    def clean(self):
        from django.core.exceptions import ValidationError
        
        # Validate end time is after start time
        if self.start_time and self.end_time and self.start_time >= self.end_time:
            raise ValidationError({'end_time': 'End time must be after start time'})
        
        # Validate batch is not empty
        if not self.batch.exists():
            raise ValidationError({'batch': 'At least one batch must be selected'})
        
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
    