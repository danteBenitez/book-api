import { connect } from "mongoose";
import { envConfig } from "../config/env.js";

export const connectToDB = () => connect(envConfig.DB.URI);
