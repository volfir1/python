from rest_framework import serializers
from .models import User, Student, Teacher
from base.serializers import BatchSerialzer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'enrollment_number', 'first_name', 'last_name']

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    batch = BatchSerialzer()
    class Meta:
        model = Student
        fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Teacher
        fields = '__all__'

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Add custom claims
        token['user_type'] = user.user_type
        
        # Add batch info for students
        if user.user_type == 'S':
            try:
                student = user.student
                if student.batch:
                    token['batch'] = student.batch.name
            except:
                token['batch'] = None
        
        return token