const express = require("express");
const cookieParser = require("cookie-parser");
const ConnectDB = require("./config/db");
const app = express();
const Port = 8888;

app.use(express.json());
app.use(cookieParser());

//routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

ConnectDB()
  .then(() => {
    console.log("DB Connected");

    app.listen(Port, () => {
      console.log("Server started");
    });
  })
  .catch((e) => console.error(e));
