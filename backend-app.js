const express = require('express'); 
const cors = require("cors");
const morgan = require("morgan"); 
const { NotFoundError } = require("./express-error"); 
const app = express(); 
app.use(cors()); 
app.use(express.json());
app.use(morgan('tiny')); 



/* 
Handles 404 errors
(if current route request doesnt match any of the defined route requests listed) 
*/
app.use(function (req, res, next) {
    return next(NotFoundError());
});


/* Formats error responses sent to clients  */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
    return res.status(status).json({
        error: { message, status },
    })
});


module.exports = app; 
