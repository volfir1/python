from django.urls import path
from . import views

urlpatterns = [
    path('', views.courseList),
    path('time-table/<str:batch>/', views.get_timetable, name='timetable'),
      path('time-table/teacher/', views.get_teacher_timetable, name='teacher_timetable'),
]