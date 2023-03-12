# Book Store RESTful API
A basic Book Store RESTful API using Express and MongoDB.

## Getting Started

### Install all the dependencies
```sh
npm install
```
### Build the Project
```sh
npm run build
```
### Start the project
```sh
npm start
```

### Run the database
1. Open the terminal
    a. Run `mongod`
2. Open another terminal
    a. Run `mongo`

# API

## Get All books
### Request
`GET /v1/books`

```sh
curl -ki https://localhost:3000/v1/books
```
### Response
```sh
HTTP/1.1 200 OK
... (headers)

[{"_id":"640d340d06e7366f1954a2be","id":0,"title":"Atomic Habits",
"author":"James Clear","isbn":"0735211299","noPages":200,
"language":"English","pubDate":"1918-11-16T07:00:00.000Z","__v":0},
{"_id":"640d340d06e7366f1954a2bf","id":1,"title":"Mistborn 1",
"author":"Brandon Sanderson","isbn":"0735211299","noPages":200,
"language":"English","pubDate":"1913-12-09T07:00:00.000Z","__v":0}]
```

## Get Book by Id
`Get /v1/books/:id`
```sh
curl -ki https://localhost:3000/v1/books/1
```
### Response
```sh
HTTP/1.1 200 OK
... (headers)

{"_id":"640d3631b02d9fd4109f20bd","id":1,"title":"Mistborn 1",
"author":"Brandon Sanderson","isbn":"0735211299","noPages":200,
"language":"English","pubDate":"1913-12-09T07:00:00.000Z","__v":0}
```


--- 
### TODOS
- [X] init server
- [X] Specify Endpoints
- [X] api versioning support
    - [ ] version-specific controllers/services
- [X] HTTPS
- [ ] Documentation
    - [X] Getting Started
    - [ ] env variables / credentials
    - [ ] Endpoints
        - [X] GET
        - [ ] POST
        - [ ] PUT
        - [ ] DELETE
- [X] DB connection
    - [X] temporal data w/js objects
- [ ] Tests
- [ ] Book data
    - [ ] uuid
    - [ ] last updated
    - [ ] created at
    - [ ] Pagination
- [ ] .github/workflows


