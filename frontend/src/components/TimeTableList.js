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
      if (!user) {
        setLoading(false);
        return;
      }

      // Debug user info
      console.log('Current user:', {
        type: user.user_type,
        batch: user.batch,
        name: `${user.first_name} ${user.last_name}`,
        enrollment: user.enrollment_number
      });

      try {
        setLoading(true);
        const day = new Date().getDay();

        if (user.user_type === 'S') {
          if (!user.batch || user.batch === 'No') {
            setError('No batch assigned to your account. Please contact administrator.');
            setLoading(false);
            return;
          }

          const response = await axios.get(`/api/courses/time-table/${user.batch}/`, {
            params: { day }
          });
          
          console.log('Timetable response:', response.data);
          setTimeTable(response.data);
        } else if (user.user_type === 'T') {
          const response = await axios.get('/api/courses/time-table/teacher/', {
            params: { day }
          });
          setTimeTable(response.data);
        }
      } catch (err) {
        console.error('Timetable fetch error:', err);
        setError(err.response?.data?.detail || 'Failed to load timetable');
      } finally {
        setLoading(false);
      }
    };

    fetchTimeTable();
  }, [user]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>{error}</p>
        {(!user?.batch || user?.batch === 'No') && (
          <p className="text-sm mt-2">
            Your batch information is missing. Please ensure you're assigned to a batch.
          </p>
        )}
      </div>
    );
  }

  if (timeTable.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-500">No classes scheduled for today</p>
        {user?.batch && (
          <p className="text-sm text-gray-400 mt-2">
            Batch: {user.batch}
          </p>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="animate-pulse p-4">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="text-sm text-blue-500 mt-2"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!user || timeTable.length === 0) {
    return (
      <div className="p-4 text-gray-500">
        <p>No classes scheduled for today</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-3">Today's Classes</h1>
      <div className="flex flex-col gap-y-3">
        {timeTable.map((cls) => (
          <ClassListItem key={cls.id} cls={cls} />
        ))}
      </div>
    </div>
  );
};

export default TimeTableList;