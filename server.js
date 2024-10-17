const express = require("express")
const userRouter = require("./routes/user")
const path = require("path") ;
const loginRouter = require("./routes/login.js")
const {requireAuth} = require("./middleware/authMiddleware") 
const bodyParser = require("body-parser") ;
const app = express()
const port = 5000
app.use(express.json())
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/js", express.static(path.join(__dirname, "/public/js")));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/lib", express.static(__dirname + "/public/lib"));
app.use("/scss", express.static(__dirname + "/public/scss"));
app.use("/fonts", express.static(__dirname + "/public/fonts"));
app.use("/img", express.static(__dirname + "/public/img"));
app.use("/partials", express.static(__dirname + "/public/partials"));
app.use("/login",loginRouter);

app.get("/", (req, res) => {
    res.render("index");
  })
  app.get("/about", (req, res) => {
    res.render("about");
  })
  app.get("/login", (req, res) => {
    res.render("login");
  })
  app.get("/register", (req, res) => {
    res.render("register");
  })
  app.get("/dashboard", (req, res) => {
    res.render("dashboard",{currentPage: "dashboard"});
  })
  app.get("/orders", (req, res) => {
    res.render("orders",{currentPage: "orders"});
  })
  app.get("/new-order", (req, res) => {
    res.render("new-order",{currentPage: "new-order"});
  })
  app.get("/writers", (req, res) => {
    res.render("writers",{currentPage: "writers"});
  })

  app.get("/profile", (req, res) => {
    res.render("profile",{currentPage: "profile"});
  })
  app.get("/team", (req, res) => {
    res.render("team");
  })
  app.get("/service", (req, res) => {
    res.render("service");
  })
  app.get("/testimonial", (req, res) => {
    res.render("testimonial");
  })
  app.get("/booking", (req, res) => {
    res.render("booking");
  })
  app.get("/contact", (req, res) => {
    res.render("contact");
  })
  app.use((req, res, next) => {
    res.render("404",{ currentPage: '404' })
  });
  const serverRunning = ()=>{
    console.log(`Server is running on port ${port}`)
}
app.listen(port, serverRunning)