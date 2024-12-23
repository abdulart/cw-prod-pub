import mongoose from '../index.js';


const wordSchema = new mongoose.Schema({
    word_id: Number,
    ieroglif: String,
    transcription: String,
    translation: String,
    audio_link: String,
    ed_level: Number
});


const Word = mongoose.model('Word', wordSchema);
export default Word;