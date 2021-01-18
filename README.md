# PoseCorrecter

Check if you got an ergonomic working pose behind your laptop. This will be decided by the position of your nose in front of the webcam.
<p>&nbsp;</p>

## Why is it useful
More and more people have all sorts of pain because of the pose they take-on when working behind their computer. This api would be able to send notifications when you unconciously (or conciously) would take on a bad sitting position.
<p>&nbsp;</p>

## Getting Started

Follow these instructions to get your own version running.

1. Clone or download this repository.
2. Navigate to the api folder `cd api` Install Node Package Manager `npm install`
3. Navigate to the root folder `cd ../` in the terminal and start the docker-compose. Install docker [here](https://docs.docker.com/desktop/) 
```
Docker-compose build
```
```
Docker-compose up
```

### Endpoints:

Access the endpoints like this:

- `GET /sessions` Get all the sessions, these are the feedback on your pose
- `GET /measurements` Get all the measurements, the positions of your nose with the id of the session

- `GET /sessions/:uuid` Get a specific session
- `GET /measurements/:uuid` Get a specific measurement

- `POST /sessions` Post a session or sessions (uuid, feedback)
- `POST /measurements` Post a measurement or measurements (uuid, xWaarde, yWaarde, session_id)

- `PATCH /sessions/:uuid` Patch/update a specific session by uuid
- `PATCH /measurements/:uuid` Patch/update a specific measurement by uuid

- `DELETE /sessions/:uuid` Delete a specific session by uuid
- `DELETE /measurements/:uuid` Delete a specific measurement by uuid

### Sessions
The sessions contain the information if a position is good or bad (feedback). They would be linked to the measurements.
### Measurements
The measurements contain the information about the x and y position of the nose in front of the screen. They also contain a session_id to know if the position is good or bad.




<p>&nbsp;</p>


## Running the tests

Navigate back to the api folder `cd api` and run the test `npm test`
<p>&nbsp;</p>

## Where can i find help

use the issue and discussion tab if you would like to receive help. More information can be found in the Contributing guidelines.

<p>&nbsp;</p>

## Project status
The project is still under construction.

<p>&nbsp;</p>

## Github flow
We make use of the Github Flow. This is because it is a small project, currently being worked on by one person. Also because we can deploy it so much faster. All the changes happen through pull requests so others can review it.
If you want to work on the project, get familiar with the [Github flow](https://guides.github.com/introduction/flow/).

<p>&nbsp;</p>


## Built With

* [JEST](https://jestjs.io/en/)
* [Docker](https://docs.docker.com/)
* [Knex](http://knexjs.org/)
* [NPM](https://www.npmjs.com/)
* [Tablplus](https://tableplus.com/) - Database management
* [Fork](https://git-fork.com/)
## Contributing

Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us.

<p>&nbsp;</p>

## Changelog

In the Changelog all the made changes are stored.

<p>&nbsp;</p>

## Authors

* **Toon Raskin** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

<p>&nbsp;</p>

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


