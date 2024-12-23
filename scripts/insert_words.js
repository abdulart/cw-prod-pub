import 'dotenv/config'
import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
    word_id: Number,
    ieroglif: String,
    transcription: String,
    translation: String,
    audio_link: String,
    ed_level: Number
});


const Word = mongoose.model('Word', wordSchema);

async function main() {
    await mongoose.connect(process.env.DATABASE_URL)
    const result = await Word.aggregate([{ $sample: { size: 1 } }]);
    console.log(result)
}


main().catch(err => console.log(err));