const express = require("express");
const authRouter = require("./routes/auth");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const { User } = require("./models/index");
const passportLocal = require("./passports/passport.local");
const expressLayouts = require("express-ejs-layouts");
const port = 3000;
const app = express();
app.get("/", (req, res) => {
  res.send("Trang chủ");
});

app.use(
  session({
    secret: "f8",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(expressLayouts);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use("local", passportLocal);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  const user = await User.findByPk(id);
  // truy vấn tới database để trả về thông tin user
  done(null, user);
});

app.set("view engine", "ejs");
// set engine

app.set("views", __dirname + "/views");
// setup đường dẫn folder chứa views

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
