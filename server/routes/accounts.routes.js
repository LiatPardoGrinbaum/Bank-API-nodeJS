const express = require("express");
const routeAccount = express.Router();
const fs = require("fs");
const path = require("path");
const accountsPath = path.join(__dirname, "../jsons/accounts.json");
const { loadUsers } = require("./users.routes");

//get all accounts data
routeAccount.get("/accounts", (req, res) => {
  try {
    const accounts = loadAccounts();
    res.status(200).send(accounts);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//get specific account data by user id and account id
routeAccount.get("/accounts/:userId/:accountId", (req, res) => {
  try {
    const accounts = loadAccounts();

    const userId = Number(req.params.userId); //req.params.userId typeof is a string
    const accountId = req.params.accountId; //string

    //check match between account and user ids:
    checkForUserAccountMatch(userId, accountId);

    const accountInfo = accounts.find((account) => {
      return account.accountId === accountId;
    });
    if (accountInfo === undefined) throw new Error("Account not found!");
    res.status(200).send(accountInfo);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//deposit cash to a user by userId and accountId and amount:
routeAccount.put("/accounts/:userId/:accountId", (req, res) => {
  try {
    let accounts = loadAccounts();
    const deposit = req.body.newCash; //req.body.cash?
    console.log(deposit);
    const userId = Number(req.params.userId); //req.params.userId typeof is a string
    const accountId = req.params.accountId; //string
    //check match between account and user ids:
    checkForUserAccountMatch(userId, accountId);
    let accountInfo = accounts.find((account) => {
      return account.accountId === accountId;
    });
    console.log(accountInfo);
    if (accountInfo === undefined) throw new Error("Account not found!");
    const newCashAmount = accountInfo.cash + deposit;

    let updatedAccounts = accounts.map((account) => {
      if (account.accountId === accountId) {
        console.log(account);
        const updatedCashAccount = { ...accountInfo, cash: newCashAmount };
        console.log(updatedCashAccount);
        return updatedCashAccount;
      } else {
        return account;
      }
    });
    res.status(200).send(updatedAccounts);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//add new user
// routeAccount.post("/users", (req, res) => {
//   try {
//     const users = loadUsers();
//     const newUser = {
//       userID: req.body.userId || "",
//       name: req.body.name || "",
//       accounts: req.body.accounts || [],
//     };
//     users.push(newUser);
//     saveNewUser(users);
//     res.status(200).send(newUser);
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// });

const loadAccounts = () => {
  try {
    const dataBuffer = fs.readFileSync(accountsPath);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    return data;
  } catch (e) {
    return [];
  }
};

const checkForUserAccountMatch = (userId, accountId) => {
  const users = loadUsers();
  const userToCheck = users.find((user) => user.userId === userId);
  if (userToCheck === undefined) {
    throw new Error("User not found!");
  } else {
    const accountToCheck = userToCheck.accounts.find((account) => {
      return account === accountId;
    });
    if (accountToCheck === undefined) throw new Error("Account not belong to that user!");
  }
};

const saveNewUser = (users) => {
  try {
    const usersJson = JSON.stringify(users);
    console.log("usersJson", usersJson);
    fs.writeFileSync(usersPath, usersJson);
  } catch (e) {
    console.log(e);
  }
};

// const createUser = (name, email) => {
//   const users = loadUsers();
//   // const userById = users.find((user) => user.id === id);
//   // if (!userById) {
//   users.push({
//     name: name,
//     email: email,
//     id: uniqid(),
//   });
//   saveUsers(users);

//   console.log(chalk.green.inverse("Added new user!"));
// };

module.exports = routeAccount;
