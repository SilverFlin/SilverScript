# Proxy Server

The most basic proxy that asks for a fake authentication in the header of the HTTP request.

## Getting Started

Install all the dependencies
```
npm install
```

Build the project
```
npm run build
```

Start the project
```
npm start
```

## How to use

The API used is the [Cat Facts API](https://catfact.ninja/). You are able to use any endpoint from there, e.g. `/fact`.

Try to make a call under 
```
http://localhost:3000/SilverProxy/fact
```
You could use the `curl` command or make the request though [Postman](https://www.postman.com/).

You should not be able to receive a response, that is because an authentication is needed.

If you are using `curl`, just add a `-H` flag with `"Authentication: <your-name>"` as parameter.
```
curl -H "Authentication: <your-name>" localhost:3000/SilverProxy/fact
```
Now you should have a response from [Cat Facts API](https://catfact.ninja/).
