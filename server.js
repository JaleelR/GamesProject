/* Allows serverside of app server to start running via 
http://localhost:3001
*/

const { app, PORT } = require("./backend-app"); 

app.listen(PORT, '0.0.0.0', function () {
    console.log(`Successfully started server`, PORT)
});