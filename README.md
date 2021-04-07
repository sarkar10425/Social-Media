# Social-Media

## Backend

### To run the backend of this project, do the following:

##### create .env with the following code (update credentials). Make sure to create .env in the root directory of the project. backend/.env

```
MONGOURI=mongodb://localhost:27017/socialmedia
PORT=8080
JWT_SECRET=XXXXX 
CLIENT_URL=http://localhost:3000
APP_EMAIL=XXXXX@XXXX.com
APP_PASSWORD=XXXXXXXX
```

##### Then run the following commands to start up the app

```
cd backend
npm install
npm run dev
```


## Frontend

### To run the frontend of this project, do the following:

##### create .env with the following code (update credentials). Make sure to create .env in the root of the project, not inside /src. frontend/.env

```
REACT_APP_API_URL=http://localhost:8080
REACT_APP_GOOGLE_OAUTH=xxxxxx.apps.googleusercontent.com
```

##### Then run the following commands to start up the app

```
cd frontend
npm install
npm start
```

