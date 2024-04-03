const config = require("../config/config");
const app = require("./express"); 
const mongoose = require("mongoose");

mongoose.connect(config.mongouri)
    .then(() => console.log("MongoDb Connected"))
    .catch(err => console.error(err));

app.listen(config.port, err => {
    if (err) {
        console.error(err);
    }
    console.info(`Server connected on port: http://localhost:${config.port}`); 
});
