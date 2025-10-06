import React from 'react';
import './Timetable.css';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = ['9am-10am', '10am-11am', '11am-12pm', '1pm-2pm', '2pm-3pm', '3pm-4pm', '4pm-5pm'];

const subjects = {
  'Monday': ['Mathematics', 'English', 'Psychology', 'Design', 'Mathematics', 'English', 'Psychology'],
  'Tuesday': ['Biology', 'Design', 'English', 'Mathematics', 'Biology', 'Design', 'English'],
  'Wednesday': ['Design', 'Mathematics', 'Biology', 'English', 'Design', 'Mathematics', 'Biology'],
  'Thursday': ['English', 'Psychology', 'Mathematics', 'Biology', 'English', 'Psychology', 'Design'],
  'Friday': ['Psychology', 'Biology', 'Design', 'Psychology', 'English', 'Biology', 'Design']
};

const Timetable = () => {
  return (
    <div className="timetable-container">
      <h2>Weekly Class Timetable</h2>
      <div className="timetable-grid">
        {/* Header Row */}
        <div className="header-cell empty"></div>
        {days.map(day => (
          <div key={day} className="header-cell">{day}</div>
        ))}

        {times.map((time, rowIndex) => (
          <React.Fragment key={time}>
            {/* Insert Lunch Break after 11am-12pm (i.e. after index 2) */}
            {rowIndex === 3 && (
              <>
                <div className="time-cell">12pm-1pm</div>
                <div className="lunch-break" colSpan={5}>Lunch Break</div>
              </>
            )}

            <div className="time-cell">{time}</div>
            {days.map(day => {
              const subject = subjects[day][rowIndex];
              return (
                <div key={`${day}-${time}`} className={`subject-cell ${subject.toLowerCase()}`}>
                  {subject}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
