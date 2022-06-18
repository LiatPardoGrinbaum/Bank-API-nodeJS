# Bank-API-nodeJS

This project was taken as a part of my participance in Appleseed academy fullstack bootcamp.  
In this project I built a bank API with nodeJS, express, fs. All methods were tested with Postman.  
The bank manager has access to the users of the bank and can perform many operations as described in the following documentation.

## API docomuntation

Bank API , base endpoint:  
https://bank-api-liat.herokuapp.com/api

There are 2 main jsons, one for the users and one for the accounts.  
Each user hold an array for all his/her accounts.  
User object from the users json:  
![user](/images/user.JPG)

The accounts json contain all the users' accounts.  
Account objects from accounts json:  
![accounts](/images/accounts.JPG)

- Get all users data, method: GET :  
   https://bank-api-liat.herokuapp.com/api/users

- Get all Accounts data, method: GET :  
  https://bank-api-liat.herokuapp.com/api/accounts

- Get user by id, method: GET :  
  https://bank-api-liat.herokuapp.com/api/users/:userId  
  for exmaple: https://bank-api-liat.herokuapp.com/api/users/123

- Add new user, method POST: https://bank-api-liat.herokuapp.com/api/users in postman:  
   { "userId": //number, "name": "//string", "accounts": [array with numbers] }
