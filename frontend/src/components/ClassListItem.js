import { FiClock } from "react-icons/fi";
import PropTypes from 'prop-types'; // Add this import
import { formatTime } from "../utils/helpers";

const ClassListItem = ({ cls }) => {
  if (!cls || !cls.course || !cls.teacher) {
    return null;
  }

  return (
    <div className="bg-white rounded-md px-4 py-2 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-y-3">
        {/* Course Code and Time */}
        <div className="text-sm text-slate-500 flex justify-between items-center">
          <span className="font-medium">{cls.course.code}</span>
          <span className="flex gap-x-1 items-center">
            <FiClock className="text-slate-400" />
            <span>
              {formatTime(cls.start_time)} - {formatTime(cls.end_time)}
            </span>
          </span>
        </div>

        {/* Course Name */}
        <h1 className="text-md font-semibold text-slate-800">
          {cls.course.name}
        </h1>

        {/* Teacher Name */}
        <p className="text-slate-600">
          {cls.teacher.user.first_name} {cls.teacher.user.last_name}
        </p>

        {/* Optional: Class Type if available */}
        {cls.class_type && (
          <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full w-fit">
            {cls.class_type}
          </span>
        )}
      </div>
    </div>
  );
};

ClassListItem.propTypes = {
  cls: PropTypes.shape({
    course: PropTypes.shape({
      code: PropTypes.string.isRequired, // Changed .required to .isRequired
      name: PropTypes.string.isRequired
    }).isRequired,
    teacher: PropTypes.shape({
      user: PropTypes.shape({
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    class_type: PropTypes.string
  }).isRequired
};

export default ClassListItem;