const dotenv =  require("dotenv");

dotenv.config();

const config = {

    NODE_ENV : process.env.NODE_ENV,
    PORT : process.env.PORT,
    DB : process.env.DB,
    PASSWORD : process.env.PASSWORD
    
}

module.exports = config;