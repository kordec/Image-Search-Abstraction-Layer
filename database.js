const db = require('mongodb')
const client = db.MongoClient()
let collection = undefined
const uri = process.env.MONGODB_URI
	
function get(key, cb) {
  try {
    collection.find(key).toArray(function(err, results) {
      if(err) console.log(err)
      else cb(results)
    })
      
  } catch (ex) {
    console.log(ex)
  }
}

function insert(value, cb) {
  try {
		collection.insert(value, function(err, inserted) {
			if(err) console.log(err)
			else {
        if(cb) cb(inserted.ops[0])
			}
		})
	} catch (ex) {
	  	console.log(ex)
	}
}

function connect() {
	try {
		client.connect(uri, function(err, db) {
			if(err) console.log(err)
			else {
				collection = db.collection(process.env.COLLECTION)
			}
		})
	} catch (ex) {
		console.log(ex)
	}
}

module.exports = {
  get: get,
  insert: insert,
  connect: connect,
}