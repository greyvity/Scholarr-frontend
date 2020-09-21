import React from "react";

function Events({ event, deleteEvent, updateEvent }) {
  return (
    <div className="events">
      {event.summary}
      <i
        className="fas fa-pen"
        onClick={() => {
          updateEvent(event.id);
        }}
      ></i>
      <i className="fas fa-trash" onClick={(e) => deleteEvent(event.id)}></i>
      {event.hangoutLink ? (
        <a target="_blank" rel="noopener noreferrer" href={event.hangoutLink}>
          <i className="fas fa-link"></i>
        </a>
      ) : (
        ""
      )}
    </div>
  );
}

export default Events;
