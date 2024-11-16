# migrations/0003_add_teacher_fields.py
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_student_options_alter_teacher_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='teacher',
            name='department',
            field=models.CharField(blank=True, default='', max_length=100, verbose_name='department'),
        ),
        migrations.AddField(
            model_name='teacher',
            name='years_of_teaching',
            field=models.PositiveIntegerField(default=0, verbose_name='years of teaching'),
        ),
    ]