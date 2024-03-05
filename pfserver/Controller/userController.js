const users = require('../models/userSchema')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    console.log("inside user controller:register function");
    const { username, email, password } = req.body

    try {
        const existingUser = await users.findOne({ email: email })
        console.log("existing user");
        console.log(existingUser);
        if (existingUser) {
            res.status(406).json("Account already exists")

        }
        else {
            const newUser = new users({
                username: username,
                email: email,
                password: password,
                github: "",
                linkedin: "",
                profile: ""
            })
            await newUser.save()
            res.status(200).json("registration request received successfully ")
        }


    } catch (err) {
        res.status(401).json("Register req failed due to ", err)
    }

}

exports.login = async (req, res) => {
    console.log("inside login controller:register function")
    const { email, password } = req.body
    console.log(email);
    console.log(password);

    try {
        const existingUser = await users.findOne({ email: email, password: password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, 'supersecretekey12345')
            console.log(token);
            res.status(200).json({
                existingUser,
                token
            })
        }
        else {
            res.status(406).json("invalid email id or password")
        }
    }
    catch (err) {
        res.status(401).json("login req failed due to ", err)
    }
}
