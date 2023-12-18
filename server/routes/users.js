import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModal } from '../modals/user.modals.js';

const router = express.Router();

router.post("/register", async (req, res) => {
    const { userName, password } = req.body;
    const user = await UserModal.findOne({ userName });

    // If user tries to register with an existing username
    if (user) {
        return res.json({ message: ` Please Resgister with a new login name ${userName} already exists` })
    }

    // When user users a new username
    const hashedPassword = await bcrypt.hash(password, 12);

    // Adding this new user to our database
    const newUser = new UserModal({ userName, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User Registered Sucessfully!" });
});

router.post("/login", async (req, res) => {
    const { userName, password } = req.body; //password added
    const user = await UserModal.findOne({ userName });

    if (!user) {
        return res.json({ message: `${userName} doesnot exist` });
    }

    // if user enters correct login id we need to verify user enters a correct password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) { //if user has entered an incorrect password
        return res.json({ message: "Please enter the correct password!!!" });
    }

    // Now since user has entered both username and password correct
    // When a user logs in, a server can generate a JWT token containing information about the user (such as user ID, username, or roles) and sign it using a secret key. This token is then sent to the client, and the client includes it in subsequent requests to authenticate the user.

    const token = jwt.sign({ userID: user._id }, "secret");
    res.json({ token, userID: user._id });

});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, "secret", (err) => {
            if (err)
                return res.sendStatus(403);
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};

