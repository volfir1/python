import React from 'react';
import { Clock, BookOpen, Users, GraduationCap } from 'lucide-react';

const ClassListItem = ({ cls }) => {
  // Format time to 12-hour format
  const formatTime = (timeStr) => {
    try {
      const time = new Date(`2000-01-01T${timeStr}`);
      return time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Time formatting error:', error);
      return timeStr;
    }
  };

  // Get class status based on current time
  const getStatus = () => {
    try {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      const [startHour, startMinute] = cls.start_time.split(':');
      const [endHour, endMinute] = cls.end_time.split(':');
      
      const startTimeMinutes = parseInt(startHour) * 60 + parseInt(startMinute);
      const endTimeMinutes = parseInt(endHour) * 60 + parseInt(endMinute);
      
      if (currentTime < startTimeMinutes) {
        return {
          label: 'Upcoming',
          color: 'bg-blue-100 text-blue-800'
        };
      } else if (currentTime >= startTimeMinutes && currentTime <= endTimeMinutes) {
        return {
          label: 'Ongoing',
          color: 'bg-green-100 text-green-800'
        };
      } else {
        return {
          label: 'Completed',
          color: 'bg-gray-100 text-gray-800'
        };
      }
    } catch (error) {
      console.error('Status calculation error:', error);
      return {
        label: 'Unknown',
        color: 'bg-gray-100 text-gray-800'
      };
    }
  };

  const status = getStatus();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">
              {cls.course.code} - {cls.course.name}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full ${status.color}`}>
              {status.label}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{formatTime(cls.start_time)} - {formatTime(cls.end_time)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="capitalize">{cls.class_type}</span>
            </div>

            {cls.teacher && cls.teacher.user && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {cls.teacher.user.first_name} {cls.teacher.user.last_name}
                </span>
              </div>
            )}
            
            {cls.batch && cls.batch.length > 0 && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {Array.isArray(cls.batch) 
                    ? cls.batch.map(b => b.name).join(', ')
                    : cls.batch.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassListItem;