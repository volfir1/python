from rest_framework.serializers import ModelSerializer
from .models import Course, TimeTable
from base.models import Batch

class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'code']

class TimeTableSerializer(ModelSerializer):
    course = CourseSerializer()
    
    class Meta:
        model = TimeTable
        fields = ['id', 'course', 'teacher', 'batch', 'day', 'start_time', 'end_time', 'class_type']
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Manually serialize teacher data
        if instance.teacher:
            data['teacher'] = {
                'id': instance.teacher.id,
                'user': {
                    'id': instance.teacher.user.id,
                    'enrollment_number': instance.teacher.user.enrollment_number,
                    'first_name': instance.teacher.user.first_name,
                    'last_name': instance.teacher.user.last_name,
                }
            }
        # Serialize batch data
        data['batch'] = [{'id': batch.id, 'name': batch.name} for batch in instance.batch.all()]
        return data