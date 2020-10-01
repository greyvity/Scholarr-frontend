var gapi = window.gapi;
const CLIENT_ID =
  "449634065841-hchrinrngi2fl26jsnggvoc3qbqg5pe1.apps.googleusercontent.com";
const API_KEY = "AIzaSyBH49rpYqpE44Cm5DB1RuMg5pONdz6NoOo";
var DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
var SCOPES = "https://www.googleapis.com/auth/calendar.events";

const handleClick = (type, data) => {
  gapi.load("client:auth2", async () => {
    console.log("Client Loaded ");

    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    });

    gapi.client.load("calendar", "v3", () => console.log("Calendar Loaded"));
    console.log(gapi.client);

    const instance = await gapi.auth2.getAuthInstance();
    console.log(instance);
    const user = await gapi.auth2.getAuthInstance().signIn();

    if (user) {
      switch (type) {
        case "listEvents": {
          listUpcomingEvents();
          break;
        }
        case "addEvent": {
          addNewEvent(data);
          break;
        }
        case "updateEvent": {
          deleteEvent();

          break;
        }
        case "deleteEvent": {
          deleteEvent();
          break;
        }
        default: {
          console.log("default");
        }
      }
    }
  });
};

const listUpcomingEvents = () => {
  gapi.client.calendar.events
    .list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime",
    })
    .then((response) => {
      const events = response.result.items;
      console.log("EVENTS: ", events);
    });
};

const addNewEvent = async (event) => {
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

export { handleClick, listUpcomingEvents, addNewEvent, deleteEvent };
