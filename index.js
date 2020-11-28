const fetch = require('node-fetch');
// asd = require('./index'); asd.getTodaysEvents();
// asd = require('./index'); asd.getOngoingEvents();
// asd = require('./index'); asd.getEventsWithTags(['health','trips']);

module.exports.getAllEvents = async function () {
    let events = await eventsGet();
    return events;
};

module.exports.getTodaysEvents = async function () {
    let events = await eventsGet();
    let todaysEvents = [];
    for (let x of events){
        let eventDate = new Date(Date.parse(x.event_dates.starting_day))
        if (dateIsToday(eventDate)) {
            todaysEvents.push(x);
        }
    }
    return todaysEvents;
};

module.exports.getOngoingEvents = async function () {
    let events = await eventsGet();
    let ongoingEvents = [];
    let today = new Date();
    today.setTime(today.getTime() + (2*60*60*1000))
    for (let x of events){
        let eventStart = new Date(Date.parse(x.event_dates.starting_day));
        let eventEnd = new Date(Date.parse(x.event_dates.ending_day));
        if (today >= eventStart && today <= eventEnd) {
            ongoingEvents.push(x);
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

async function eventsGet() {
    let events;
    await fetch('http://open-api.myhelsinki.fi/v1/events/')
        .then(res => res.json())
        .then(json => json.data)
        .then(data => events = data)
    return events;
}

function dateIsToday(date) {
    let today = new Date()
    date.setTime(date.getTime() - (2*60*60*1000))
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
};