const mongoose = require("mongoose");

const ConnectDatabase = () =>{
    mongoose.connect(process.env.DB_LOCAL_URL,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true
    }).then(con=>{
        console.log(`mongodb connected with Host on ${con.connection.host}.`)
    })
}

module.exports= ConnectDatabase;

