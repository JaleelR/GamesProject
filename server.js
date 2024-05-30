const app = require("./backend-app"); 
const { PORT } = require("./config"); 

app.listen(PORT, '0.0.0.0', function () {
    console.log(`Started on port ${PORT}`)
});