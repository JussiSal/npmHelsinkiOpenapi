const fetch = require('node-fetch');

module.exports.getAllEvents = async function () {
    let events = await eventsGet();
    return events;
};

module.exports.getTodaysEvents = async function () {
    let events = await eventsGet();
    let todaysEvents = [];
    let today = new Date();
    for (let event of events) {
        let eventDate = new Date(Date.parse(event.event_dates.starting_day));
        eventDate.setTime(eventDate.getTime() - (2 * 60 * 60 * 1000));
        if (dateMatches(today, eventDate)) {
            todaysEvents.push(event);
        }
    }
    return todaysEvents;
};

module.exports.getOngoingEvents = async function () {
    let events = await eventsGet();
    let ongoingEvents = [];
    let today = new Date();
    for (let event of events) {
        let eventStart = new Date(Date.parse(event.event_dates.starting_day));
        eventStart.setTime(eventStart.getTime() - (2 * 60 * 60 * 1000));
        let eventEnd = new Date(Date.parse(event.event_dates.ending_day));
        eventEnd.setTime(eventEnd.getTime() - (2 * 60 * 60 * 1000));
        if (today >= eventStart && today < eventEnd) {
            ongoingEvents.push(event);
        }
    }
    return ongoingEvents;
};

module.exports.getEventsWithTags = async function (tagArray) {
    let events;
    let tagsString = tagArray.join();
    await fetch('http://open-api.myhelsinki.fi/v1/events/?tags_search=' + tagsString)
        .then(res => res.json())
        .then(json => json.data)
        .then(data => events = data)
    return events;
};

module.exports.getTags = async function () {
    let tagsData;
    let tags = [];
    await fetch('http://open-api.myhelsinki.fi/v1/events/')
        .then(res => res.json())
        .then(json => json.tags)
        .then(data => tagsData = data)
    for (const key in tagsData) {
        tags.push(tagsData[key]);
    }
    return tags;
};

module.exports.getEventsStarts = async function (date) {
    let events = await eventsGet();
    let eventsStart = [];
    for (let event of events) {
        let eventDate = new Date(Date.parse(event.event_dates.starting_day));
        eventDate.setTime(eventDate.getTime() - (2 * 60 * 60 * 1000));
        if (dateMatches(date, eventDate)) {
            eventsStart.push(event);
        }
    }
    return eventsStart;
};

async function eventsGet() {
    let events;
    await fetch('http://open-api.myhelsinki.fi/v1/events/')
        .then(res => res.json())
        .then(json => json.data)
        .then(data => events = data)
    return events;
}

function dateMatches(date, eventstart) {
    return date.getDate() === eventstart.getDate() &&
        date.getMonth() === eventstart.getMonth() &&
        date.getFullYear() === eventstart.getFullYear();
};