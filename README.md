# Boat tracker

The boat tracker application follows the journey of a boat, also it saves the coordinates and the direction of the boat. When the boat finishes its journey, the live track becomes a saved track.

## Prerequisite

### Mockup

The [position streamer](https://github.com/noemiGyorgy/position-streamer) application is a mockup Express.js application.
```
git clone git@github.com:noemiGyorgy/position-streamer.git
```

Install the packages:
```
npm install
```

In the root directory create a ".env" file and set up these environment variables:
```
FRONTEND=https://boat-tracker.netlify.app
SERVER=http://localhost:4000
STREAMER=http://localhost:5000
```

Start the application:
```
node server
```

### Database

Set up a PostgreSQL database. Tables will be dropped and created when the position-server starts.

### Server

The [position-server](https://github.com/noemiGyorgy/position-server) application receives the position of the boat and stores it in a PostgreSQL database. The user can stop the data recording from the UI.
```
git clone git@github.com:noemiGyorgy/position-streamer.git
```

Install the packages:
```
npm install
```
In the root directory create a ".env" file and set up these environment variables:
```
DB_USER=<your_username>
DB_HOST=localhost
DB_NAME=<your_database>
DB_PASSWORD=<your_password>
DB_PORT=5432
PORT=4000
STREAMER=http://localhost:5000
FRONTEND=https://boat-tracker.netlify.app
```

Start the application:
```
node server
```

### Front end

The frontend is deployed here: [https://boat-tracker.netlify.app](https://boat-tracker.netlify.app)

## Usage

**Broadcasting with 1Hz could be slow for testing. I would recommend rewriting delay from 1000ms to 100ms (position-streamer -> server.js -> 33rd line).**

On the top of the sidebar click on "UPLOAD NEW FILE".

The position streamer accepts a **csv** file with columns named lat,lon,heading (coordinates and the direction of the boat) and it streams the rows of the file. You can download these files from the **sample-data** directory (position streamer repository). Streaming automatically begins when a file is uploaded, however the streaming is delayed with 3s, so the browser has time to render the map.

Clicking on the stop/start button, the server stops recording the position of the boat.

Select a recorded track from the list and it will display the journey of the boat.

## Bugs and ideas for improvement

Unselecting tracks doesn't work. I tried to apply the same strategy as I deleted the symbol of the boat, but it didn't worked.

I would create an option of speeding up the live broadcasting.
