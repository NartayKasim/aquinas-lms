const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = require('mongodb').ObjectID;

require('dotenv').config({ path: '../.env' });

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE_NAME } = process.env;

const mongoURI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.sz1wt.mongodb.net/${MONGO_DATABASE_NAME}?retryWrites=true&w=majority`;

module.exports = {

    // COURSE CONTROL:
    // match ALL courses with session's userID:
    getCourses: (req, res) => {
        const userID = req.session.user.userID;
        const isInstructor = req.session.user.isInstructor;
        console.log(isInstructor)

        if (isInstructor) {
            MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
                .then(client => {
                    const products = [];
                    client
                        .db()
                        .collection('courses')
                        .find()
                        .forEach(courseDocument => {
                            if (courseDocument.userID === Number(userID)) {
                                products.push(courseDocument)
                            }
                        })
                        .then(() => {
                            res.status(200).send(products)
                            client.close();
                        })
                })
                .catch(() => console.log('there was an error'))
        }
        else {
            MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
                .then(client => {
                    const products = [];
                    client
                        .db()
                        .collection('courses')
                        .find()
                        .forEach(courseDocument => {
                            if (courseDocument.students.includes(Number(userID))) {
                                products.push(courseDocument)
                            }
                        })
                        .then(() => {
                            res.status(200).send(products)
                            client.close();
                        })
                })
                .catch(() => console.log('there was an error'))
        }

    },

    renameCourse: (req, res) => {
        const { courseParam, courseTitle } = req.body;
        const formatID = new ObjectID(courseParam);

        // UNCOMMENT WHEN DONE TESTING:
        // if (!req.session.user) {
        //     return res.status(404).send(console.log('not logged in'))
        // }

        MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(client => {
                client
                    .db()
                    .collection('courses')
                    .findOneAndUpdate({ _id: formatID }, { $set: { title: courseTitle } }, { returnDocument: "after" })
                    .then(response => res.status(200).send(response))
            })
            .catch(err => console.log(err));
    },

    renameCourseDescription: (req, res) => {
        const { courseParam, courseDescription } = req.body;
        const formatID = new ObjectID(courseParam);

        // UNCOMMENT WHEN DONE TESTING:
        // if (!req.session.user) {
        //     return res.status(404).send(console.log('not logged in'))
        // }

        MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(client => {
                client
                    .db()
                    .collection('courses')
                    .findOneAndUpdate({ _id: formatID }, { $set: { description: courseDescription } }, { returnDocument: "after" })
                    .then(response => res.status(200).send(response))
            })
            .catch(err => console.log(err));
    },

    renameUnit: (req, res) => {
        const { courseParam, title, unitTitle } = req.body;
        const formatID = new ObjectID(courseParam);


        MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(client => {
                client
                    .db()
                    .collection('courses')
                    .findOneAndUpdate({ _id: formatID, "content.title": title }, { $set: { "content.$.title": unitTitle } }, { returnDocument: "after" })
                    .then(response => res.status(200).send(response))

            })
            .catch(err => console.log(err));

    },

    renameUnitDescription: (req, res) => {
        const { courseParam, description, unitDescription } = req.body;
        const formatID = new ObjectID(courseParam);

        MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(client => {
                client
                    .db()
                    .collection('courses')
                    .findOneAndUpdate({ _id: formatID, "content.description": description }, { $set: { "content.$.description": unitDescription } }, { returnDocument: "after" })
                    .then(response => res.status(200).send(response))

            })
            .catch(err => console.log(err));

    },

    deleteUnit: (req, res) => {
        const { courseParam, unitTitle } = req.body;
        const formatID = new mongodb.ObjectId(courseParam);

        MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(client => {
                client
                    .db()
                    .collection('courses')
                    .findOneAndUpdate({ _id: formatID }, { $pull: { "content": { "title": unitTitle } } }, { returnDocument: "after" })
                    .then(response => res.status(200).send(response))
            })
            .catch(err => console.log(err))
    },


    // create course from request's body: 
    createCourse: (req, res) => {
        const { courseTitle } = req.body;

        const course =
        {
            "title": courseTitle,
            "type": "course",
            // "userID": req.session.userID,
            "userID": 1,
            "description": "",
            "isPublished": false,
            "content": []
        }

        MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(client => {
                client
                    .db()
                    .collection('courses')
                    .insertOne(course,
                        function (error, response) {
                            if (error) {
                                res.status(500).send('there was an error with database communication')
                                client.close()
                            }
                            else {
                                res.status(200).send(response.ops[0])
                                client.close()
                            }
                        })

            })
    },

    createUnit: (req, res) => {
        const { courseParam, unitTitle } = req.body;
        const formatID = new mongodb.ObjectId(courseParam)

        const unit =
        {
            "title": unitTitle,
            "type": "unit",
            // "userID": req.session.userID,
            "userID": 1,
            "description": "",
            "content": [],
        }

        MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(client => {
                client
                    .db()
                    .collection('courses')
                    .findOneAndUpdate({ _id: formatID }, { $push: { content: unit } }, { returnDocument: "after" })
                    .then(response => res.status(200).send(response))
            })
            .catch(err => console.log(err));
    },

    moveModuleUp: (req, res) => {
        const { courseParam, oldContent, unitContent } = req.body;
        const formatID = new mongodb.ObjectId(courseParam);

        MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(client => {
                client
                    .db()
                    .collection('courses')
                    .findOneAndUpdate({ _id: formatID, "content.content": oldContent }, { $set: { "content.$.content": unitContent } }, { returnDocument: "after" })
                    .then(response => res.status(200).send(response))

            })
            .catch(err => console.log(err));
    },

    moveModuleDown: (req, res) => {
        const { courseParam, oldContent, unitContent } = req.body;
        const formatID = new mongodb.ObjectId(courseParam);

        MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(client => {
                client
                    .db()
                    .collection('courses')
                    .findOneAndUpdate({ _id: formatID, "content.content": oldContent }, { $set: { "content.$.content": unitContent } }, { returnDocument: "after" })
                    .then(response => res.status(200).send(response))

            })
            .catch(err => console.log(err));
    },

    createNewModule: (req, res) => {
        const { courseParam, oldContent, unitContent } = req.body;
        const formatID = new mongodb.ObjectId(courseParam);

        MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(client => {
                client
                    .db()
                    .collection('courses')
                    .findOneAndUpdate({ _id: formatID, "content.content": oldContent }, { $set: { "content.$.content": unitContent } }, { returnDocument: "after" })
                    .then(response => res.status(200).send(response))

            })
            .catch(err => console.log(err));

    },

    deleteModule: (req, res) => {
        const { courseParam, oldContent, unitContent } = req.body;
        const formatID = new mongodb.ObjectId(courseParam);

        MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(client => {
                client
                    .db()
                    .collection('courses')
                    .findOneAndUpdate({ _id: formatID, "content.content": oldContent }, { $set: { "content.$.content": unitContent } }, { returnDocument: "after" })
                    .then(response => res.status(200).send(response))

            })
            .catch(err => console.log(err));

    }
}