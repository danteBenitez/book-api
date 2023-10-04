import { envConfig } from "../config/env.js";
import { connectToDB, sequelize } from "./config.js";
import '../models/Genre.js';

export async function setupDatabase() {
    await connectToDB()
        .then(() => console.log("Se conectó a la base de datosexitosamente"))
        .catch(console.error)

    try {
        
        

    } catch(err) {

    }
}