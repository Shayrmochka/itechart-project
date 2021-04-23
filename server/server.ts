import express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const cors = require("cors");
const app: express.Application = express();
var passport = require("passport");
var cookieSession = require("cookie-session");
//require("./passport-setup");

//app.use(express.json({ extended: true }));
app.use(cors());
app.use(express.json());

// app.use(
//   cookieSession({
//     name: "itechart-session",
//     keys: ["key1", "key2"],
//   })
// );

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/company", require("./routes/company.routes"));
app.use("/api/order", require("./routes/order.routes"));
app.use("/api/feedback", require("./routes/feedback.routes"));
app.use("/api/service", require("./routes/services.routes"));
app.use("/api/social-auth", require("./routes/social.routes"));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
// app.get(
//   "/api/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
// app.get(
//   "/api/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     res.redirect("/");
//   }
// );

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
