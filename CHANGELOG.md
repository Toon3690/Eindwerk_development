# Changelog
Changes are documented here, with the last made changes on top.


## V 1.1.0
### Extra
```
-  CODE-OF-CONDUCT.md
-  CONTRIBUTING.md
-  CHANGELOG.md
```
## V 1.0.0

### Endpoints
```
- `PATCH /sessions/:uuid` Patch/update a specific session by uuid
- `PATCH /measurements/:uuid` Patch/update a specific measurement by uuid

- `DELETE /sessions/:uuid` Delete a specific session by uuid
- `DELETE /measurements/:uuid` Delete a specific measurement by uuid
```
### Tests
```
-  End-To-End test
```
### Extra
```
-  Deploy.js and index.html for position of nose
```
## V 0.6.0

### Endpoints
```
- `GET /sessions/:uuid` Get a specific session
- `GET /measurements/:uuid` Get a specific measurement

- `POST /sessions` Post a session or sessions (uuid, feedback)
- `POST /measurements` Post a measurement or measurements (uuid, xWaarde, yWaarde, session_id)
```
### Tests
```
-  Integration test updated
```
### Extra
```
-  DatabaseHelper.js
```


## V 0.1.0

### Endpoints
```
- `GET /sessions` Get all the sessions, these are the feedback on your pose
- `GET /measurements` Get all the measurements, the positions of your nose with the id of the session
```
### Tests
```
-  Integration test
```
### Extra
```
-  Helpers.js
-  Dockerfiles
```

