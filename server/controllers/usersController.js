const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

module.exports = {
    // called from: src/utilities/requireAuth.js
    // used in requireAuth HOC to hydrate redux state; redirect url path:
    getUser: (req, res) => {
        if (!req.session.user) {
            return res.status(404).send(req.session.user)
        }
        res.status(200).send(req.session.user)
    },

    // called from: src/components/common/Register.js
    register: async (req, res) => {
        const { first_name, last_name, email, password, is_instructor } = req.body;

        const db = req.app.get('db');
        const dbCheck = await db.user.find_user([email]);
        const userExists = dbCheck[0];
        console.log(userExists)

        if (userExists) {
            return res.status(401).send('An account with that email already exists.')
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const registerUser = await db.user.register_user([first_name, last_name, email, hash, is_instructor]);
        const user = registerUser[0];
        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            id: user.id,
            isInstructor: is_instructor
        }
        return res.status(201).send(req.session.user);
    },

    // called from: src/components/common/Login.js
    login: async (req, res) => {
        const { email, password } = req.body;

        const db = req.app.get('db');
        const findUser = await db.user.find_user([email]);
        const user = findUser[0];

        if (!user) {
            return res.status(401).send('Email or password mismatch.')
        }

        const isAuthenticated = bcrypt.compareSync(password, user.password);

        if (!isAuthenticated) {
            return res.status(401).send('Email or password mismatch.')
        }

        req.session.user = {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            userID: user.user_id,
            isInstructor: user.is_instructor
        }
        res.status(200).send(req.session.user);
    },

    // called from: src/components/common/Nav.js
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}