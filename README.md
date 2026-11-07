
# RC Tools Secure Backend

Secure API backend for RC Tools Android Application.

## Features

- Firebase Authentication
- User ID Token Verification
- Private API Credential Storage
- Helmet Security Headers
- Request Body Size Protection
- Health Check Endpoint
- Render Deployment Support
- API Access Protection

## Project Structure

```text
rc-tools-backend/
├── server.js
├── package.json
├── render.yaml
├── .gitignore
└── README.md
```

## Requirements

- Node.js
- GitHub Account
- Render Account
- Firebase Project

## Environment Variables

Configure these variables in Render Dashboard:

| Variable | Description |
|---|---|
| PORT | Server Port |
| FIREBASE_DATABASE_URL | Firebase Database URL |
| FIREBASE_SERVICE_ACCOUNT | Firebase Admin Service Account JSON |
| STEXS_API_KEY | STEXSMS Private API Key |
| DONGVAN_API_KEY | DongVan Private API Key |
| RC_API_KEY | RC Private API Key |

Never upload private API credentials to GitHub.

## Installation

```bash
npm install
```

## Start Server

```bash
npm start
```

## API Endpoints

### Health Check

```http
GET /health
```

### Backend Status

```http
GET /
```

### User Profile

```http
GET /api/profile
Authorization: Bearer FIREBASE_ID_TOKEN
```

### Provider API

```http
POST /api/provider/:name
Authorization: Bearer FIREBASE_ID_TOKEN
```

Provider integration is not enabled yet.

## Firebase Authentication

The backend verifies Firebase ID tokens using Firebase Admin SDK.

Unauthenticated requests are rejected.

## Deployment on Render

1. Login to Render.
2. Select New Web Service.
3. Connect GitHub.
4. Select rc-tools-backend.
5. Select Node Runtime.
6. Build Command: `npm install`
7. Start Command: `npm start`
8. Add required Environment Variables.
9. Deploy the service.

## Security Notes

- Never expose private API keys in Android APK.
- Never commit Firebase Service Account JSON.
- Use Firebase Authentication.
- Restrict database access with Firebase Security Rules.
- Configure API rate limits before production.
- Validate all incoming requests.
- Rotate exposed API credentials.
- Use HTTPS for API communication.

## Important

This is the initial backend skeleton.

STEXSMS, DongVan and RC provider integrations must be configured using their verified API documentation before production use.

## Project

RC Tools Secure Backend

Version: 1.0.0
