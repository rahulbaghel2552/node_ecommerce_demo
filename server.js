const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const PORT = process.env.PORT || 3000;

//assets

const staticPath = path.join(__dirname,'public');
const resourcesPath = path.join(__dirname,'resources/views');
console.log(staticPath);
console.log(resourcesPath);

app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.render("home");
});


// set template engine
app.use(expressLayout);
app.set('view engine','ejs');
app.set('views',resourcesPath);



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
