from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes 
from rest_framework import status
# from rest_framework.permissions import IsAuthenticated

from .serializers import CourseSerializer, TimeTableSerializer
from .models import Course, TimeTable

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def courseList(request):
   user = request.user
   courses = Course.objects.all()
   serializer = CourseSerializer(courses, many=True)
   return Response(serializer.data)

@api_view(['GET'])
def get_timetable(request, batch):
    try:
        day = request.GET.get('day')
        print(f"\n--- Timetable Request ---")
        print(f"Batch requested: {batch}")
        print(f"Day requested: {day}")
        
        # Debug: Print all batches in system
        all_batches = Batch.objects.all()
        print("\nAll batches in system:")
        for b in all_batches:
            print(f"- {b.name}")
        
        # Get timetables
        queryset = TimeTable.objects.filter(batch__name=batch)
        print(f"\nFound {queryset.count()} timetable entries for batch {batch}")
        
        if day is not None:
            try:
                day = int(day)
                queryset = queryset.filter(day=day)
                print(f"After day filter: {queryset.count()} entries")
            except ValueError:
                return Response(
                    {"detail": "Invalid day parameter"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # Debug: Print found timetables
        print("\nMatching timetables:")
        for tt in queryset:
            print(f"- {tt.course.name} ({tt.class_type}) on {tt.get_day_display()} at {tt.start_time}-{tt.end_time}")
        
        serializer = TimeTableSerializer(queryset, many=True)
        return Response(serializer.data)

    except Exception as e:
        print(f"Error in get_timetable: {str(e)}")
        import traceback
        traceback.print_exc()
        return Response(
            {"detail": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def get_teacher_timetable(request):
   try:
       day = request.GET.get('day')
       teacher = request.user.teacher
       
       queryset = TimeTable.objects.filter(teacher=teacher)
       
       if day is not None:
           try:
               day = int(day)
               queryset = queryset.filter(day=day)
           except ValueError:
               return Response(
                   {"detail": "Invalid day parameter"},
                   status=status.HTTP_400_BAD_REQUEST
               )
       
       serializer = TimeTableSerializer(queryset, many=True)
       return Response(serializer.data)

   except Exception as e:
       print(f"Error in get_teacher_timetable: {str(e)}")
       return Response(
           {"detail": str(e)},
           status=status.HTTP_500_INTERNAL_SERVER_ERROR
       )