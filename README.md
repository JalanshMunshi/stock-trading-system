# Stock Trading System

This project was a part of an assigment and the following functionalities were implemented. 

- User can create an account, buy/sell stocks, deposit/withdraw cash from wallet, view their portfolio.
-  An admin user can create a new stock, change market hours and market schedule. 
- Stocks are displayed on the landing page and changes must be visible dynamically. 
- Stock prices randomly fluctuate during the active trading hours. 

Currently, authentication is absent and can be implemented as a future task. 

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
