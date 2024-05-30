CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    username TEXT UNIQUE NOT NULL, 
    profile_picture TEXT, 
    password TEXT NOT NULL
); 

