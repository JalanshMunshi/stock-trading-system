# Stock Trading System

## Key Components

`/server/index.js` sets up the entire backend by adding all the dependencies of the node backend. This file also has the main cron job for changing the stock prices.
`/server/api` has the API end-points for all the pages of the application. 
`/server/db` sets up the database for this project and `server/db/models` has all the relations. 

`/client/src` has all the UI components for the application. 

## Installation

1. Install [Node.js](https://nodejs.org/en/download/) for your system. 
2. Install [PostgreSQL](https://www.postgresql.org/download/) and [pgAdmin](https://www.pgadmin.org/download/).
3. Open pgAdmin and create a new database named `stock-trading`. 
4. Open the Command Prompt on your system.
5. Navigate to `/server/config/db.config.js` and modify the file as per your PostgreSQL setup on your machine. Primarily the username and password. 
6. Navigate to `/server` and run `npm install`.
7. Navigate to `/client` and run  `npm install`.
8. Navigate to the `root` directory of the project.
9. Open 2 command prompts in the root directory.
10. In one terminal, run `node server/index.js`.
11. In another terminal run `cd client` followed by `npm start`. 

If everything goes well, you should be able to see the `Stocks` page of the application. 

For deploying, run `npm build` inside the `client` directory. Upload the entore project on [Heroku](https://www.heroku.com/) or [Netlify](https://app.netlify.com/) and adjust the settings as per your requirement. 
