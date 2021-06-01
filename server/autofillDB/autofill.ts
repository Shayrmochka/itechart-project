import { companies, services, feedbacks, orders, users } from "./data";
import { CleaningCompany } from "../models/CleaningCompany";
import { CleaningService } from "../models/CleaningService";
import { Order } from "../models/Order";
import { Feedback } from "../models/Feedback";
import { User } from "../models/User";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()


const addData = async (data, scheme) => {
  for (let i = 0; i < data.length; i++) {
    const collection = new scheme(data[i]);
    await collection.save();
  }
};

async function start() {
  try {
    await mongoose.connect(process.env.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    await mongoose.connection.db.dropDatabase();

    addData(services, CleaningService);
    addData(users, User);
    addData(companies, CleaningCompany);
    addData(feedbacks, Feedback);
    addData(orders, Order);
  } catch (e) {
    console.log("Error", e.message);
  }
}
start();
