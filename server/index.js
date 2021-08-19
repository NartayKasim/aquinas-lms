const
    express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    jwt = require('jsonwebtoken');

const
    usersController = require('./controllers/usersController'),
    coursesController = require('./controllers/coursesController');


require('dotenv').config({ path: '../.env' });

const app = express();
app.use(express.json());

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
})
    .then(db => {
        app.set('db', db);
        console.log('>    POSTGRES DATABASE:', "\x1b[32m", 'CONNECTED', "\x1b[0m  ", '<\n',);
    })
    .catch(error => console.log("\x1b[31m", error, "\x1b[0m"));

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: SESSION_SECRET,
        cookie: {
            maxAge: (1000 * 60 * 60 * 24 * 365)
        }
    })
);

app.get('/api/auth/me', usersController.getUser);
app.post('/api/auth/register', usersController.register)
app.post('/api/auth/login', usersController.login);
app.post('/api/auth/logout', usersController.logout);

app.get('/api/getcourses/', coursesController.getCourses);
app.post('/api/createcourse/', coursesController.createCourse);
app.post('/api/createunit/', coursesController.createUnit)
app.put('/api/renamecourse/', coursesController.renameCourse);
app.put('/api/renamecoursedescription', coursesController.renameCourseDescription);
app.put('/api/renameunit', coursesController.renameUnit);
app.put('/api/renameunitdescription', coursesController.renameUnitDescription);
app.put('/api/movemoduleup', coursesController.moveModuleUp);
app.put('/api/movemoduledown', coursesController.moveModuleDown);
app.post('/api/createnewmodule', coursesController.createNewModule);
app.delete('/api/deletemodule', coursesController.deleteModule)
app.delete('/api/deleteunit/', coursesController.deleteUnit)






function authenticateToken(req, res, next) {
    const authHeader = req.headers('authorization');
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user;
        next()
    })
}


app.listen(SERVER_PORT, () => console.log(`\n>       SERVER PORT:`, "\x1b[32m", `${SERVER_PORT}        `, "\x1b[0m", `  <`,));