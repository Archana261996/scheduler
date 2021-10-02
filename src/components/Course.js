import React from "react";
import { setData } from "../utilities/firebase";
import {
    getCourseMeetingData,
    getCourseNumber,
    getCourseTerm,
    hasConflict,
    toggle,
  } from "../utilities/times";

  const reschedule = async (course, meets) => {
    if (meets && window.confirm(`Change ${course.id} to ${meets}?`)) {
      try {
        await setData(`/courses/${course.id}/meets`, meets);
      } catch (error) {
        alert(error);
      }
    }
  };
  
  const Course = ({ course, selected, setSelected }) => {
    const isSelected = selected.includes(course);
    const isDisabled = hasConflict(course, selected);
    const style = {
      backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
    };
  
    return (
      <div className="card m-1 p-2" 
          style={style}
          onClick={isDisabled ? null : () =>  setSelected(toggle(course, selected))}
          onDoubleClick={() => reschedule(course, getCourseMeetingData(course))}>
        <div className="card-body">
          <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
          <div className="card-text">{ course.title }</div>
          <div className="card-text">{ course.meets }</div>
        </div>
      </div>
    );
  };

  export default Course;