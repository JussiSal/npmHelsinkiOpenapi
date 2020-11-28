HOA-events
==========

Packaget to get events easily from http://open-api.myhelsinki.fi

## Installation

```sh
$ npm install hoa-events
```

## Loading and configuring the module

```js
const hoa = require('hoa-events');
```

## Methods

NOTE: All function are asynchronous.

getAllEvents()
getTodaysEvents()
getOngoingEvents()
getEventsWithTags()


#### getAllEvents()

getAllEvents() gives you all events on 
```js
var events = await hoa.getAllEvents();
```