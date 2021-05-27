import express = require("express");
import mongoose from "mongoose";
import { config } from "./config/config";
import cors from "cors";
const app: express.Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/company", require("./routes/company.routes"));
app.use("/api/order", require("./routes/order.routes"));
app.use("/api/feedback", require("./routes/feedback.routes"));
app.use("/api/service", require("./routes/services.routes"));
app.use("/api/social-auth", require("./routes/social.routes"));

const PORT: number = config.port || 4000;

async function start() {
  try {
    await mongoose.connect(config.mongoUri, {
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
