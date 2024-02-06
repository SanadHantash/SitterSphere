const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");

const port = 8080;


app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


app.listen(port, () => {
  console.log(`server runnning in port ${port}`);
});
