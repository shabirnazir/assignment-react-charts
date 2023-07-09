// Desc: Entry point for the server
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.SERVER_PORT || 4000;
const path = require("path");
const { connectDB } = require("./src/Loaders/database.loader");
const Population = require("./src/Schemas/population");
const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
connectDB();
const io = require("socket.io")(server);

// Serve static files from the "public" directory
app.use(express.static("public"));
app.use(express.json());
// Serve the React build files
app.use(express.static(path.join(__dirname, "build")));

// API endpoint for adding data
app.post("/api/data", (req: any, res: any) => {
  const population = new Population(req.body);
  population
    .save()
    .then(() => {
      Population.find({})
        .then((data: object) => {
          io.emit("data", data);
          res.json({ message: "Data added successfully" });
        })
        .catch((err: object) => {
          console.log(err);
          res.status(500).json({ error: "An error occurred" });
        });
    })
    .catch((err: object) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred" });
    });
});

// Serve the React app for all other routes
app.get("*", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

io.on("connection", (socket: any) => {
  Population.find({})
    .then((data: object) => {
      socket.emit("data", data);
    })
    .catch((err: object) => {
      console.log(err);
    });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
