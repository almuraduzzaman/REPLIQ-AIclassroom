const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());

const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    // console.log(authorization);
    if (!authorization) {
        return res.status(401).send({ error: true, message: 'unauthorized access' });
    }
    // bearer token
    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: true, message: 'unauthorized access' })
        }
        req.decoded = decoded;
        next();
    })
};



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qe4grrt.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        client.connect();

        //DB Collections-----------------------------------------------------------------
        const usersCollection = client.db("REPLIQ").collection('users');
        const courseCollection = client.db("REPLIQ").collection('courses');
        const selectedClassCollection = client.db("REPLIQ").collection('selectedClasses');
        //--------------------------------------------------------------------------------

        app.post('/jwt', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
            res.send({ token })
        });

        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            if (user?.role !== 'admin') {
                return res.status(403).send({ error: true, message: 'forbidden message' });
            }
            next();
        };



        // users related apis
        app.get('/users', verifyJWT, verifyAdmin, async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        });


        // single entry in users database 
        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user?.email }
            const existingUser = await usersCollection.findOne(query);

            if (existingUser) {
                return res.send({ message: 'user already exists' })
            }

            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        //delete a user
        app.delete('/deleteUsers/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const result = await usersCollection.deleteOne(filter);
            res.send(result);
        });

        // useAdmin hook 
        app.get('/users/admin/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;

            if (req.decoded.email !== email) {
                res.send({ admin: false })
            }

            const query = { email: email }
            const user = await usersCollection.findOne(query);
            const result = { admin: user?.role === 'admin' }
            res.send(result);
        })


        // courses APIs
        // all courses 
        app.get('/courses', async (req, res) => {
            const courses = await courseCollection.find().toArray();
            res.send(courses);
        });

        // popular courses load on homepage 
        app.get('/popularCourses', async (req, res) => {

            const ids = ['64e58d04e0fae13baca87045', '64e58d04e0fae13baca87046', '64e58d04e0fae13baca87056', '64e58d04e0fae13baca8704b', '64e58d04e0fae13baca8704a', '64e58d04e0fae13baca87057'];

            const courses = await courseCollection.find({ _id: { $in: ids.map(id => new ObjectId(id)) } }).toArray();
            res.send(courses);
        })

        //single course details 
        app.get('/courses/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const filter = { _id: new ObjectId(id) };
            const courses = await courseCollection.find(filter).toArray();
            res.send(courses);
        });


        // search field 
        const result = courseCollection.createIndex({ title: 1 }, { name: "title" });

        app.get('/getCourseByName/:text', async (req, res) => {
            const searchText = req.params.text;
            const result = await courseCollection.find({
                $or: [
                    { title: { $regex: searchText, $options: 'i' } }
                ]
            }).toArray();

            res.send(result);
        })


        // insert a course to db 
        app.post('/upload-course', async (req, res) => {
            const data = req.body;
            const result = await courseCollection.insertOne(data);
            res.send(result);
        })


        //delete a course
        app.delete('/deleteClasses/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await courseCollection.deleteOne(query);
            res.send(result);
        })


        // selected classes APIs 
        app.get('/orderList', async (req, res) => {
            const result = await selectedClassCollection.find().toArray();
            res.send(result);
        });

        app.get('/selectedClasses', verifyJWT, async (req, res) => {
            const email = req.query.email;
            if (!email) {
                res.send([]);
            }

            const decodedEmail = req.decoded.email;
            if (email !== decodedEmail) {
                return res.status(403).send({ error: true, message: 'forbidden access' })
            }

            const query = { email: email };
            const result = await selectedClassCollection.find(query).toArray();
            res.send(result);
        });


        app.post('/selectedClasses', async (req, res) => {
            const item = req.body;
            const result = await selectedClassCollection.insertOne(item);
            res.send(result);
        });


        app.delete('/selectedClasses/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await selectedClassCollection.deleteOne(query);
            res.send(result);
        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('ai-classroom server is running');
})

app.listen(port, () => {
    console.log(`ai-classroom server is running on port ${port}`);
})