import express = require("express");
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from "cors";
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"
import companyRoutes from "./routes/company.routes"
import orderRoutes  from "./routes/order.routes"
import feedbackRoutes from "./routes/feedback.routes"
import servicesRoutes from "./routes/services.routes"
import socialRoutes from "./routes/social.routes"
dotenv.config()
const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/service", servicesRoutes);
app.use("/api/social-auth", socialRoutes);

const PORT: number = +process.env.port || 4000;

async function start() {
  try {
    await mongoose.connect(process.env.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`Server working on port: ${PORT}`));
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit();
  }
}
start();
