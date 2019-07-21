A dead simple hello-world

# Notes
Get the `OWNER_EXT_ID` on Twitch Dev.
```bash
curl -H "Client-ID: <client id>" -X GET "https://api.twitch.tv/helix/users?login=<owner name>"
```
# Resources
- [Twitch extension - Boilerplate](https://github.com/twitchdev/extensions-hello-world)
- [Firebase]()
- [Cloud Firestore - Realtime Database](https://firebase.google.com/docs/database/rtdb-vs-firestore?authuser=0)

# Structure of the `.env` file
```
TWITCH_EXT_SECRET=
TWITCH_CLIENT_ID=
TWITCH_OWNER_EXT_ID=
FIREBASE_APP_ID=
FIREBASE_PROJECT_ID=
FIREBASE_API_KEY=
FIREBASE_DATABASE_URL=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABSE_URL=
FIREBASE_SENDER_ID=
```