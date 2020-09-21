import React, { useState } from "react";
import Events from "./Events";
import { motion } from "framer-motion";

const Calendar = () => {
  const gapi = window.gapi;

  const [events, setEvents] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const CLIENT_ID =
    "449634065841-hchrinrngi2fl26jsnggvoc3qbqg5pe1.apps.googleusercontent.com";
  const API_KEY = "AIzaSyBH49rpYqpE44Cm5DB1RuMg5pONdz6NoOo";
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  function handleClientLoad() {
    gapi.load("client:auth2", initClient);
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient() {
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        function (error) {
          console.log(error);
        }
      );
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      // authorizeButton.style.display = "none";
      // signoutButton.style.display = "block";
      listUpcomingEvents();
      setIsSignedIn(true);
    } else {
      handleAuthClick();
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
    setIsSignedIn(true);
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
    setIsSignedIn(false);
    setEvents([]);
  }

  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  function listUpcomingEvents() {
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      })
      .then(function (response) {
        console.log(response);
        var events = response.result.items;
        setEvents([...events]);
      });
  }

  const addNewEvent = () => {
    const event = {
      summary: "Google I/O 2015",
      location: "800 Howard St., San Francisco, CA 94103",
      description: "A chance to hear more about Google's developer products.",
      start: {
        dateTime: "2020-09-21T09:00:00+05:45",
        timeZone: "Asia/Kathmandu",
      },
      end: {
        dateTime: "2020-09-22T17:00:00+05:45",
        timeZone: "Asia/Kathmandu",
      },
      recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
      attendees: [
        { email: "imageadhikari@gmail.com" },
        { email: "sajag.silwal123@gmail.com" },
        { email: "sthasuraj2@gmail.com" },
      ],
      reminders: {
        useDefault: true,
        // 'overrides': [
        //   {'method': 'email', 'minutes': 24 * 60},
        //   {'method': 'popup', 'minutes': 10}
        // ]
      },
      colorId: 11,
    };

    var request = gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
      sendUpdates: "all",
    });

    request.execute(function (event) {
      console.log(event);
      listUpcomingEvents();
    });
  };

  const deleteEvent = (id) => {
    const request = gapi.client.calendar.events.delete({
      calendarId: "primary",
      eventId: id,
    });

    request.execute(function (event) {
      console.log(event);
      listUpcomingEvents();
    });
  };

  const updateEvent = (id) => {
    const event = {
      summary: "Google I/O 2020",
      start: {
        dateTime: "2020-09-21T09:00:00+05:45",
        timeZone: "Asia/Kathmandu",
      },
      end: {
        dateTime: "2020-09-22T17:00:00+05:45",
        timeZone: "Asia/Kathmandu",
      },
      attendees: [
        { email: "imageadhikari@gmail.com" },
        { email: "sajag.silwal123@gmail.com" },
        { email: "sthasuraj2@gmail.com" },
      ],
      colorId: 10,
    };

    const request = gapi.client.calendar.events.update({
      calendarId: "primary",
      resource: event,
      eventId: id,
    });

    request.execute(function (event) {
      console.log(event);
      listUpcomingEvents();
    });
  };

  return (
    <motion.div exit={{ y: 1000 }} className="calendar-container">
      {isSignedIn ? (
        <>
          <button id="delete" onClick={deleteEvent}>
            Update
          </button>
          <button id="add" onClick={addNewEvent}>
            Add
          </button>
          <button id="events" onClick={listUpcomingEvents}>
            Events
          </button>
          <button id="signout_button" onClick={handleSignoutClick}>
            Sign Out
          </button>
        </>
      ) : (
        <button id="authorize_button" onClick={handleClientLoad}>
          Log In
        </button>
      )}
      {isSignedIn ? (
        events.map((event) => (
          <Events
            key={event.id}
            event={event}
            deleteEvent={deleteEvent}
            updateEvent={updateEvent}
          />
        ))
      ) : (
        <h1 className="upcomingEvents">Please Log in to view Events</h1>
      )}
    </motion.div>
  );
};

export default Calendar;
