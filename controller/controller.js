import fs from "fs";
import { dirname, join } from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataFile = join(__dirname, "../models/data.json");
const id = uuidv4().slice(0,5)

const readDataFile = () => {
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data);
};

const writeDataFile = (data) => {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};


// Get all users
export const getAllUsers = (req, res) => {
    const users = readDataFile();
    res.json({
        message: "Successfully Get All Users",
        users: users
    });
};


// Get one user
export const getUser = (req, res, next) => {
    const users = readDataFile();
    const user = users.find((user) => user.id === req.params.id);
    if (!user) {
        next(Error("USER NOT FOUND IN THE APP"))
        res.json({ message: "USER NOT FOUND" })
    }
    res.json(user);
};


// Create user
export const createUser = (req, res) => {
    const users = readDataFile();
    const newUser = { id: id, ...req.body };
    users.push(newUser);
    writeDataFile(users);
    res.status(201).json(newUser);
};


//update user
export const updateUser = (req, res,next) => {
    const users = readDataFile();
    const selectedUser = users.findIndex((userID) => req.params.id === userID.id);
    if (selectedUser === -1) {
        next(Error("User Not Found"))
        res.status(404).json({message:"User not found!!!"});
    }
    users[selectedUser] = { ...users[selectedUser], ...req.body };
    writeDataFile(users);
    res.status(200).json(users[selectedUser]);
};


//delete user
export const deleteUser = (req, res,next) => {
    const users = readDataFile();
    const userIndex = users.findIndex((index) => req.params.id === index.id);
    if (userIndex === -1) {
        next(Error("User Not Found !!!"))
        return res.status(404).json({message:"User Not Found !!!"});
    }
    users.splice(userIndex, 1);
    writeDataFile(users);
    res.status(200).json("User Delete Successfully");
};
