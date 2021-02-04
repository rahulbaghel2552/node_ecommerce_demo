const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const PORT = process.env.PORT || 3000;

//assets

const staticPath = path.join(__dirname,'public');
const resourcesPath = path.join(__dirname,'resources/views');
app.use(express.static(staticPath));

// set template engine
app.use(expressLayout);
app.set('view engine','ejs');
app.set('views',resourcesPath);




app.get("/", (req, res) => {
  res.render("home");
});

app.get("/cart", (req, res) => {
  res.render("customers/cart");
});

app.get("/login", (req, res) => {
  res.render("auth/login");
});

app.get("/register", (req, res) => {
  res.render("auth/register");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
