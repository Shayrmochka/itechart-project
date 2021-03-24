import express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const cors = require("cors");
const app: express.Application = express();

//app.use(express.json({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/company", require("./routes/company.routes"));
app.use("/api/order", require("./routes/order.routes"));

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
