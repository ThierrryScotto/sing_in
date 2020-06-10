const app = require("./server/app")
const UserController = require("./controllers/user");

app.get("/", (req, res, next) => {
  res.send("You are connected!")
})

app.post("/createUser", UserController.createUser);
