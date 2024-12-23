import 'dotenv/config'
import mongoose from "mongoose";

async function main() {
    await mongoose.connect(process.env.DATABASE_URL)

}


main().catch(err => console.log(err));