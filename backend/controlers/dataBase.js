const mongoose = require('mongoose')

const connectDataBase = () => {
    mongoose.connect(process.env.MONGO_URL).then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
}).catch((err) => {
        throw err;
    })
}
module.exports = connectDataBase 