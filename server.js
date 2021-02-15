require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const MongoDbStore = require("connect-mongo")(session);
const Emitter = require("events");

// database connection

const url = "mongodb://localhost/pizza";

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
const connection = mongoose.connection;
connection
  .once("open", (req, res) => {
    console.log("connection sucessful");
  })
  .catch((err) => {
    console.log("connection failed" + err);
  });

//session store

const mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: "sessions",
});

// event emiter

const eventEmitter = new Emitter();
app.set("eventEmitter", eventEmitter);

//session onfig
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
  })
);

// passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//assets
const staticPath = path.join(__dirname, "public");
const resourcesPath = path.join(__dirname, "resources/views");
app.use(express.static(staticPath));
app.use(express.json());

// global middleware

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// set template engine
app.use(express.urlencoded({ extended: false }));
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("views", resourcesPath);

require("./routes/web")(app);

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});






const io = require("socket.io")(server);
io.on("connection", (socket) => {
  // Join
  socket.on("join", (orderId) => {
    socket.join(orderId);
  });
});

eventEmitter.on("orderUpdated", (data) => {
  io.to(`order_${data.id}`).emit("orderUpdated", data);
});

eventEmitter.on("orderPlaced", (data) => {
  io.to("adminRoom").emit("orderPlaced", data);
});
