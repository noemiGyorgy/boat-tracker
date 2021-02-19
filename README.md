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

Start the application:

```
node server
```

### Database

Set up a PostgreSQL database. Tables will be dropped and created when the position-server starts.

### Server

The [position-server](https://github.com/noemiGyorgy/position-server) application receives the position of the boat and stores it in a PostgreSQL database. The user can stop recording these data from the UI.

```
git clone git@github.com:noemiGyorgy/position-streamer.git
```

Install the packages:

```
npm install
```

In root set up these environment variables:

```
DB_USER=<username>
DB_HOST=localhost
DB_NAME=<database>
DB_PASSWORD=<password>
DB_PORT=5432
PORT=4000
STREAMER=http://localhost:5000
FRONTEND=http://localhost:3000
```

Start the application:

```
node server
```

### Front end

Clone the frontend from this repository:

```
git@github.com:noemiGyorgy/boat-tracker.git
```

Install the packages:

```
npm install
```

In root set up these environment variables:

```
REACT_APP_SERVER=http://localhost:4000
```

Start the application:

```
npm start
```

## Usage

Navigate to the frontend: http://localhost:3000/

The position streamer accepts a **csv** file with columns named lat,lon,heading (coordinates and the direction of the boat) and it streams the rows of the file. You can download these files from the **sample-data** directory (position streamer repository). Streaming automatically begins when a file is uploaded.

Upload them here:
http://localhost:5000/

Clicking on the stop/start button, the server stops recording the position of the boat.
