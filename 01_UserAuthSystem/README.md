# User Auth System

System that has an authentication using oauth, cookie-based session, an end-point that supports basic authorization (to-be logged in), and the use of an encrypted connection with TLS.

It uses Google authentication; thus, the credentials (Client Id and Client Secret) are needed inside a `.env` file. These credentials are available [here](https://developers.google.com/identity/protocols/oauth2).

Also, two cookie keys are needed there, the values aren't important (in this project, at least).

You could copy the `.env.example` file that stores placeholders for the necessary credentials and keys.

Last but not least, you need to create a `cert.pem` and `key.pem` files to use the encrypted connection. To do so, you could create a Self-Signed Certificated running the next command.
```
openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365
```

## Getting Started

## Install all the dependencies
```
npm i
```

### Build the project
```
npm run build
```

### Start the project
> Ensure that you have the `.env` configured, and the certificates.

```
npm start
```

## How to use

1. Go to https://localhost:3000 to load the home page (ensure that you use the https, otherwise, it would not load).
2. Try to use the "secret" link, it should not work if you haven't logged in.
3. Log in (using the "Login" button, lol).
4. Now the secret link should work.





