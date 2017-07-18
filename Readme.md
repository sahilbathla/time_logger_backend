# Description

Time Logger basically lets you add time logs of what you were doing in a day

# Web Stack

1) Node (v 6.11.1)

2) Express JS

3) Sequelize


# How to Setup

1) Install node https://nodejs.org/en/download/

2) Rename auth.js.example to auth.js and add your facebook API

Rename config.json.example to config.json to add your database config

3) ./node_modules/.bin/sequelize db:migrate

4) npm install (sudo if required)

5) Make sure you have setup the frontend app - https://github.com/sahilbathla/time_logger_frontend

6) Create symlinks or copy the frontend app to public folder

7) npm start