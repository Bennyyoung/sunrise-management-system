const mongoose = require('mongoose');
const config = require('config');


const connectDB = async () => {
	const CONNECTION_URL = process.env.MONGO_URI
	console.log('Con', CONNECTION_URL)
	try {
    await mongoose.connect(CONNECTION_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
    
		console.log('MongoDB Connected...');
    
	} catch (err) {
    console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;