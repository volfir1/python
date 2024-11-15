# Generated by Django 4.2.7 on 2024-11-12 19:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0016_rename_announcements_announcement'),
        ('users', '0001_initial'),
        ('courses', '0002_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TimeTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day', models.PositiveSmallIntegerField(choices=[(0, 'Sunday'), (1, 'Monday'), (2, 'Tuesday'), (3, 'Wednesday'), (4, 'Thursday'), (5, 'Friday'), (6, 'Saturday')])),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('class_type', models.CharField(choices=[('lecture', 'Lecture'), ('lab', 'Lab')], max_length=7)),
                ('batch', models.ManyToManyField(related_name='batch_timetables', to='base.batch')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='course_timetables', to='courses.course')),
                ('teacher', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='teacher_timetables', to='users.teacher')),
            ],
            options={
                'verbose_name_plural': 'time table',
                'ordering': ['day', 'start_time'],
            },
        ),
    ]