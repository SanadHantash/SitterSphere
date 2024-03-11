const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const port = 8080;

const dashboardRoute = require("./Routes/dashboardRoute");
const userRoute = require("./Routes/userRoutes");
const sitterRoute = require("./Routes/sitterRoute");
const homeRoute = require ("./Routes/homeRoute");
const familyRoute = require("./Routes/familyRoute");
const reactionRoute = require("./Routes/reactionRoute");
const contactusRoute = require("./Routes/contactusRoute");
const userprofileRoute = require("./Routes/userprofileRoute")
app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


app.use(dashboardRoute);
app.use(userRoute);
app.use(sitterRoute);
app.use(homeRoute);
app.use(familyRoute);
app.use(reactionRoute);
app.use(contactusRoute);
app.use(userprofileRoute);

app.listen(port, () => {
  console.log(`server runnning in port ${port}`);
});
