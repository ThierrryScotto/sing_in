const app = require("./server/app");
const LoginController = require("./controllers/login");
const UserController = require("./controllers/user");

app.get("/", (req, res, next) => {
  res.send("You are connected!")
})

app.post("/createUser", UserController.createUser);
app.post("/login", LoginController.checkLogin);

