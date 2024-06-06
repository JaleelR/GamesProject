
const { NotFoundError, UnauthorizedError } = require("../express-error"); 
const express = require("express"); 
const { supabase } = require('../config-supa'); 
const { AuthInvalidTokenResponseError } = require("@supabase/supabase-js");
const router = express.Router();


/* 
- only admin should be able to use this 

-correct the right error

- correct console.log()

- document
*/


/*
GET /all
-- Gets all users
--  RETURNS username, profile_picture, location, age
*/
router.get('/all', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select("username, profile_picture, location, age");
        console.log(data);
        if (error) {
            throw error;
        }
        console.log(" Fetched users successfully!")
       
        return res.status(200).json({ data });
    } catch (error) {
        console.error("Error fetching users:", error);
       return res.status(500).json({ message: "Error fetching users" });
    }
});



/* 
- only admin or verified user should be able to use this 

- correct the right error

-if no users....


- correct console.log()'s

- document
*/


/*
GET /:username
-- Gets user/users with username provided or with the same letters provided in their username 
--  RETURNS username, profile_picture, location, age
*/

router.get('/:username', async (req, res, next) => {
    try {
        const { username } = req.params; 

    
        const { data, error } = await supabase
            .from('users')
            .select("username, profile_picture, location, age")
            .ilike("username", `%${username}%`); 
        console.log(data);
        if (error) {
            throw error;
        }
        console.log(" Fetched user/users successfully!");
        return res.status(200).json({users: data })
    } catch (error) {
        console.error("Error fetching users:", error);
       return  res.status(500).json({ message: "Error fetching users" });
    }
});



/* 
- only admin or verified current user should be able to use this 

- correct the right error

-if no users found....


- correct console.log()'s

- document
*/


/*
PATCH /:username
-- Updates user with provided columns one wishes to change
--  **optional. Not all are required** (username, profile_picture, location, age) RETURNS username, profile_picture, location, age
*/

router.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const { username, profile_picture, location, age } = req.body; 
        const { data, error } = await supabase
            .from("users")
            .update({
                username: username,
                profile_picture: profile_picture,
                location: location,
                age: age
            })
            .eq('id', id); 
        if (error) {
            throw error;
        }
        console.log(" Updated successfully!");
        return res.status(200).json({ users: data })
   } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Error fetching users" });
   } 
})





/*
- only user should be able to do this 

- check if column is actually there 

- make sure user is actually in db 

-correct the right error

- document
*/


/*
DELETE /:username
-- Deletes a specific user
--  RETURNS `successfully deleted :username!`
*/
router.delete("/:username", async (req, res, next) => {
    const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('username', req.params.username)
        .select();
    console.log(`successfully deleted ${req.params.username}!`)
    res.json({ message: `successfully deleted user` })
    try {
    } catch (error) {
        return res.status(500).json({ error });
    }
}); 








module.exports = router; 