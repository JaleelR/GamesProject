/* Handles authentication on app using supabase */

 const { NotFoundError, UnauthorizedError } = require("../express-error");
const { supabase } = require('../config-supa'); 
const express = require('express');
const router = express.Router(); 



/*
POST /signup

-supabase.auth.signup 
-- signs user up using method from supabase
-- (email, password) => creates a verified user for authentication for later sign ins and session useage

-Insert
--inserts data into database for new user
 (username, profile_picture, password, location, age) => creates new row in users table
*/

/* 
- show user once singed up  

- check for dupes

- check all columns are filled 

- password 6 words 

- add correct errors

- document
*/

router.post("/signup", async (req, res, next) => {
    try {
        const { email, username, profile_picture, password, location, age } = req.body;
        console.log("Request body:", req.body);

        // Sign up the user using Supabase authentication
        const { data: user, error: signupError } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (signupError) {
            console.error('Error signing up:', signupError);
            return res.status(500).json({ error: signupError.message });
        }

        console.log("User signed up:", user.user);

        // Insert user data into the database
        const { data: insertData, error:insertError } = await supabase
            .from('users')
            .insert({
                
                username: username,
                profile_picture: profile_picture,
                password: password, 
                location: location,
                age: age
            });

        if (insertError) {
            console.error("Error inserting user data:", insertError);
            return res.status(500).json({ error: insertError.message });
        }

        console.log(`User data inserted for ${username}  ${insertData}`);
        res.status(201).json({ message: `User signed up successfully: ${username}` });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});



/* 
- show user once singed in 

- check all columns are filled 

- check for correct email and password 
- add correct errors

- document
*/

/*
POST /signin

-supabase.auth.signInWithPassword
-- signs in user using method from supabase
-- (email, password) => authenticates user 
*/
router.post("/signin", async (req, res, next) => { 
    const { email, password } = req.body;
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email, 
            password: password
        })
        if (error) { 
            console.log(`sign in error ${error}`)
            return res.status(400).json("There was a problem signign in")
        }
        const { user, session } = data 
        console.log("user",  user); 
        console.log("User signed in successfully!",  user);
        return res.status(200).json("Successfully logged in!")
    } catch (error) {
       return res.json(`error ${error}`)
    }
})






module.exports = router
