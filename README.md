# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run (client)

In the project directory, run:

- `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Run (server)

In the project directory, run:

- `cd server` - opens the server folder
- `tsc` - generates /dist folder
- `yarn start` - runs the app in the development mode on http://localhost:4000

## Setup .env file

create .env file in /dist folder using .env.example

## Autofill database

In the project directory, run:

- `cd server` - opens the server folder
- `tsc` - generates /dist folder
- `yarn createDB` - the script will create and write test data to the database


## Short description

Online platform for providing cleaning services.

## Short description

The user can register an account, log in using an existing account or using a Google account.

Registered user can order cleaning from the company if the company provides the necessary services. After ordering cleaning you need to wait for a response from the cleaning company. 
The user can leave reviews about the company if he liked something or did not like it. This mark will affect the average rating of the company. 
You can view the list of existing companies in the "Companies" tab.
Users can edit their profile, change their personal information, or delete their profile. Please note that when you delete a profile, all data, orders, and reviews will be deleted along with it.

If you want to register a company, you need to enter all the necessary information and select the list of services that you provide. After receiving a cleaning order from the user, the company can approve or reject it. Approved orders are placed in the company's email and calendar. The Company may also change the personal information on the personal page and delete your profile.

The site has an admin panel. Only administrators have access to it. Through the admin panel, you can block user and company accounts.

The site has a telegram bot for logging information and notifying administrators about important actions on the site.