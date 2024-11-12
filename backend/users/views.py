from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import User, Student
from .serializers import UserSerializer, StudentSerializer

# users/views.py
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'enrollment_number'

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['enrollment_number'] = user.enrollment_number
        token['first_name'] = user.first_name
        token['user_type'] = user.user_type
        # Only add batch for students
        if user.user_type == 'S' and hasattr(user, 'student'):
            token['batch'] = user.student.batch.name if user.student.batch else None
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        print("Login attempt with:", request.data)  # Debug print
        try:
            response = super().post(request, *args, **kwargs)
            print("Login successful")  # Debug print
            return response
        except Exception as e:
            print("Login failed:", str(e))  # Debug print
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            # Add these print statements
            print("Request Data:", request.data)
            print("Enrollment Number:", request.data.get('enrollment_number'))
            print("Password:", request.data.get('password'))
            
            response = super().post(request, *args, **kwargs)
            return response
        except Exception as e:
            print("Error details:", str(e))  # Add this to see the actual error
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    serializer_class = MyTokenObtainPairSerializer


    def post(self, request, *args, **kwargs):
        try:
            # Get the enrollment number from request
            enrollment_number = request.data.get('enrollment_number')
            
            # Check if user exists
            try:
                user = User.objects.get(enrollment_number=enrollment_number)
            except User.DoesNotExist:
                return Response(
                    {"detail": "No account found with this enrollment number."},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            # Check for student profile if needed
            if user.user_type == 'S' and not hasattr(user, 'student'):
                return Response(
                    {"detail": "Student profile not found. Please contact administrator."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Proceed with token creation
            response = super().post(request, *args, **kwargs)
            return response

        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

@api_view(['GET'])
def userDetail(request, enrollment_number):
    try:
        user = User.objects.filter(enrollment_number=enrollment_number).first()
        if not user:
            return Response(
                {"detail": "User not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

        if user.user_type == 'S':
            try:
                student = Student.objects.get(user=user)
                serializer = StudentSerializer(student)
                return Response(serializer.data)
            except Student.DoesNotExist:
                return Response(
                    {"detail": "Student profile not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
        else:
            return Response(
                {"detail": "Not a student account"},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Exception as e:
        return Response(
            {"detail": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )