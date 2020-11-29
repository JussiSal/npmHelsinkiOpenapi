HOA-events
==========

Package to get events easily from http://open-api.myhelsinki.fi

## Installation

```sh
$ npm install hoa-events
```

```js
const hoa = require('hoa-events');
```

## Methods

NOTE: All function are asynchronous.

getAllEvents();

getTodaysEvents();

getOngoingEvents();

getEventsStarts();

getTags();

getEventsWithTags();

## Usage

#### getAllEvents()

With getAllEvents() you can get all events on MyHelsinki open API.

```js
var events = await hoa.getAllEvents();
```

#### getTodaysEvents()

With getTodaysEvents() you can get all events starting today.
```js
var events = await hoa.getTodaysEvents();
```

#### getOngoingEvents()

With getOngoingEvents() you can get all events that are currently ongoing. 
```js
var events = await hoa.getOngoingEvents();
```

#### getEventsStarts(date)

With getEventsStarts() you can get all events that starts on a given day. This functhion takes a Date object as parameter.
```js
var date = new Date(Date.parse('2020-11-30'));
var events = await hoa.getEventsStarts(date);
```

#### getTags()

With getTags() you can get all tags the events can have.
```js
var tags = await hoa.getTags();
```

#### getEventsWithTags(array)

With getEventsWithTags(array) you can get all events that include at least one of the given tags. In the parameter of the function give an array of one or more tags you want the events to have.
```js
var events = await hoa.getEventsWithTags(['health','trips']);
```



