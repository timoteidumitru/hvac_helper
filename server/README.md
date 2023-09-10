## HVAC Helper App

### Project guide

```
#### Install modules for server(backend)
npm install

#### Once modules installed, if you have typescript installed on your machine use:
npm run build -> this command will compile the build for backend

### After running build command you can use:
npm run start -> will start server for backend which is running on: http://localhost:9090

#### Install modules for cliend(frontend), from root folder use following command:
cd client && npm install

#### Once modules have been installed(on frontend) use command:
npm run start -> will start server for client side on: http://localhost:3000

### Once you're here you can test the app in your browser.

### Hope you enjoy of this little MERN app I've made.
```

### Technologies used:

#### Frontend:

- React CLI version 18+
- SASS and MaterialUI for style
- Context APi as state management
- React Router Dom v6.8 for routing system

#### Backend:

- Node/Express with Typescript
- Joi - for data validation
- Mongoose ORM for connection to MongoDB atlas
- DotEnv - for use of environment variables
- chalk for prettier logs

#### Tools/Extensions

- Prettier for code formatter
- Auto Rename Tags - self explained
- DotENV - support for environment variables
- ES7+ React/Redux for fast scafolding of components

#### Steps so far:

- UI for login page
- UI for register page
- Basic of Routing system implementation
- Build API for create/login user
- Adding ContextAPI as state management
- Persist user through refresh page make use of localStorage
- Implement drawer on Dashboard
