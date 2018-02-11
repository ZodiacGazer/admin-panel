const express 	  = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors 		  = require('cors');
const bodyParser  = require('body-parser');
let ObjectId      = require('mongodb').ObjectID;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

const dbUrl = 'mongodb://zodiac:zodiac@ds125318.mlab.com:25318/admin-table';
const dbName = 'admin-table';
let db;

MongoClient.connect(dbUrl)
	.then(client => {
		db = client.db(dbName);
		app.listen(3000, () => {
			console.log('Listening on port 3000 and connected to db: ' + dbName)
		})
	})
	.catch(err => {
		console.warn('Error ', err);
	})


app.get('/api/users', (req, res) => {
	db.collection('users').find().toArray()
		.then(users => {
			res.json({ users: users })
		})
		.catch(err => {
			res.status(500).json({message: 'Server error ' + err})
		})
});

app.post('/api/users', (req, res) => {
	const user = req.body;
	
	db.collection('users').insertOne(user)
		.then(res => db.collection('users').find({_id: res.insertedId}).limit(1).next())
		.then(newUser => {
			res.json(newUser)
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({message: 'Failed adding new user'})
		})
});

app.delete('/api/users/:id', (req, res) => {
	let userId = new ObjectId(req.params.id);
	db.collection('users').deleteOne({ _id: userId })
		.then(deletedUser => {
			if (deletedUser.result.n === 1) {
				res.json({status: 'OK'})
			} else {
				res.json({status: 'Failed to find user!'})
			}
		})
		.catch(err => {
			console.warn(err)
		})
});

app.put('/api/users/:id', (req, res) => {
	let userId = new ObjectId(req.params.id);
	const user = req.body;

	db.collection('users').updateOne({ _id: userId }, {$set : user})
		.then(res => db.collection('users').find({ _id: userId }).limit(1).next())
		.then(updatedUser => {
			res.json(updatedUser)
		})
		.catch(err => {
			console.warn(err);
			res.status(500).json({ message: 'Failed to update user'})
		})
})

