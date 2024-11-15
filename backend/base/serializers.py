from rest_framework.serializers import ModelSerializer
from .models import Announcement, Batch, Notification

class BatchSerialzer(ModelSerializer):
    class Meta:
        model = Batch
        fields = '__all__'

class AnnouncementSerializer(ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'

class NotificationSerializer(ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
    
    def to_representation(self, instance):
        from courses.serializers import CourseSerializer  # Import here to avoid circular import
        data = super().to_representation(instance)
        data['course'] = CourseSerializer(instance.course).data
        return data