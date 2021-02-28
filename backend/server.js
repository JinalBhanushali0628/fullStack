const app = require('./app');
const connectionDB = require('./config/database');
const dotenv = require('dotenv');

//handle uncaught Exception ex. use of variable without declaring variable
process.on('uncaughtException', err =>{
    console.log(`error message : ${err.message}`)
    console.log(`due to some uncaught problem shutting down server`);
    process.exit(1);
})

// setting up config file
dotenv.config({path: 'backend/config/config.env'})

//connection to Database
connectionDB();

const server = app.listen(process.env.PORT,()=>{
    console.log(`listening on ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

// handle unhandled Promise rejection Error -> database Error
process.on('unhandledRejection', err =>{
    console.log(`error message : ${err.message}`)
    console.log(`shutting down server due to some unhandled promise rejection`)
    server.close(()=>{
        process.exit(1);
    })
})



