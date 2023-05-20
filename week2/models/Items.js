import mongoose from 'mongoose';
import { connectionString } from "../credentials.js";
const { Schema } = mongoose;
// import { Maybuck } from './schema';
// For security, connectionString should be in a separate file and excluded from git

mongoose.connect(connectionString, {
    dbName: 'classproject',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const maybucksSchema = new Schema({
 id: Number,
 name: { type: String, required: true },
 price: Number,
 calorie: Number
});

export const Maybuck = mongoose.model('Maybuck', maybucksSchema);
