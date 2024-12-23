import mongoose from '../index.js';


const wordTaskSchema = new mongoose.Schema({
    date: Date,
    u_id: Number,
    sent: {type: Boolean, default: false}
});


const WordTask = mongoose.model('WordTask', wordTaskSchema);
export default WordTask;