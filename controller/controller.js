import fs from "fs";
import { dirname, join } from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataFile = join(__dirname, "../models/data.json");
const id = uuidv4().slice(0, 5);

const readDataFile = () => {
  const data = fs.readFileSync(dataFile, "utf8");
  return JSON.parse(data);
};

const writeDataFile = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// Get all users
export const getAllUsers = (req, res, next) => {
  try {
    const users = readDataFile();
    res.json({
      message: "Successfully Get All Users",
      users: users,
    });
  } catch (error) {
    next(new Error("Data not found"));
  }
};

// Get one user
export const getUser = (req, res, next) => {
  try {
    const users = readDataFile();
    const user = users.find((user) => user.id === req.params.id);
    if (user) {
      res.json({
        message: `${user.name} details Data Get Successfully`,
        data: users,
      });
    } else {
      return res.status(404).json({ message: "USER NOT FOUND" });
    }
  } catch (error) {
    next(new Error("Something Went Wrong"));
  }
};

// Create user
export const createUser = (req, res, next) => {
  try {
    const users = readDataFile();
    const newUser = { id: id, ...req.body };
    users.push(newUser);
    writeDataFile(users);
    res
      .status(201)
      .json({ message: `${newUser.name} Add Successfully`, data: newUser });
  } catch (error) {
    next(new Error("Something Went Wrong"));
  }
};

// Update user
export const updateUser = (req, res, next) => {
  try {
    const users = readDataFile();
    const selectedUser = users.findIndex(
      (userID) => req.params.id === userID.id
    );
    if (selectedUser !== -1) {
      users[selectedUser] = { ...users[selectedUser], ...req.body };
      writeDataFile(users);
      res.status(200).json(users[selectedUser]);
    } else {
      return res.status(404).json({ message: "User not found!!!" });
    }
  } catch (error) {
    next(new Error("Something Went Wrong"));
  }
};

// Delete user
export const deleteUser = (req, res, next) => {
  try {
    const users = readDataFile();
    const userIndex = users.findIndex((index) => req.params.id === index.id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      writeDataFile(users);
      res.status(200).json({ message: "User Deleted Successfully" });
    } else {
      return res.status(404).json({ message: "User Not Found !!!" });
    }
  } catch (error) {
    next(new Error("Something Went Wrong"));
  }
};
