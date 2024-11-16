import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import ClassListItem from "./ClassListItem";

const TimeTableList = () => {
  const [timeTable, setTimeTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTimeTable = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!user) {
          throw new Error('Please log in to view the timetable');
        }

        // Debug logging
        console.log('Current user:', {
          type: user.user_type,
          batch: user.batch,
          name: `${user.first_name} ${user.last_name}`,
          enrollment: user.enrollment_number
        });

        const day = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
        console.log('Current day:', day);

        let response;

        // Teacher timetable
        if (user.user_type === 'T') {
          console.log('Fetching teacher timetable');
          response = await axios.get('/api/courses/time-table/teacher/', {
            params: { day }
          });
        }
        // Student timetable
        else if (user.user_type === 'S') {
          if (!user.batch) {
            throw new Error('No batch assigned. Please contact administrator.');
          }
          console.log('Fetching student timetable for batch:', user.batch);
          response = await axios.get(`/api/courses/time-table/${user.batch}/`, {
            params: { day }
          });
        }
        else {
          throw new Error('Invalid user type');
        }

        console.log('API Response:', response);

        if (response.data && Array.isArray(response.data)) {
          setTimeTable(response.data);
        } else {
          console.error('Invalid response format:', response.data);
          throw new Error('Invalid response format from server');
        }
      } catch (err) {
        console.error('Timetable fetch error:', {
          message: err.message,
          response: {
            status: err.response?.status,
            statusText: err.response?.statusText,
            data: err.response?.data
          },
          request: {
            url: err.config?.url,
            method: err.config?.method
          }
        });
        setError(err.response?.data?.detail || err.message || 'Failed to load timetable');
      } finally {
        setLoading(false);
      }
    };

    fetchTimeTable();
  }, [user]);

  if (loading) {
    return (
      <div className="animate-pulse p-4">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              {user?.batch && (
                <p className="mt-2 text-xs text-red-600">
                  Current batch: {user.batch}
                </p>
              )}
            </div>
          </div>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!timeTable || timeTable.length === 0) {
    return (
      <div className="p-4">
        <div className="bg-gray-50 border-l-4 border-gray-300 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">No classes scheduled for today</p>
              {user?.batch && (
                <p className="mt-2 text-xs text-gray-500">
                  Batch: {user.batch}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Today's Classes</h1>
      <div className="space-y-4">
        {timeTable.map((cls) => (
          <ClassListItem key={cls.id} cls={cls} />
        ))}
      </div>
    </div>
  );
};

export default TimeTableList;