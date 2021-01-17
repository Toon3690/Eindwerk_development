# Eindwerk_development

Check if you got an ergonomic working pose behind your laptop. Based on the position of the nose, this will be decided.

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

### Endpoints

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


<!-- ### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo -->

## Running the tests

Navigate back to the api folder `cd api` and run the test `npm test`

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [JEST](https://jestjs.io/en/)
* [Docker](https://docs.docker.com/)
* [Knex](http://knexjs.org/)
* [NPM](https://www.npmjs.com/)
* [Tablplus](https://tableplus.com/) - Database management
* [Fork](https://git-fork.com/)
## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Toon Raskin** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc

