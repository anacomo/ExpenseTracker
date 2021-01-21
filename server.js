const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");


app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(
   bodyParser.urlencoded({
      extended: true,
   })
);
app.use(bodyParser.json());
app.use(cors());


function generateID() {
   return Math.random().toString(36).substring(3);
}

// crud api

// read all
app.get("/posts", (req, res) => {
   console.log(1);
   res.send(readJSONFile());
});

// read One
app.get("/posts/:id", (req, res) => {

   const postsList = readJSONFile();
   let found = 0;
   for (i in postsList)
      if (postsList[i].id == req.params.id) {
         res.send(postsList[i])
         found = 1;
         break;
      }
   if (found == 0)
      res.status(404).send({
         message: "Not found"
      })
})


// create
app.post("/posts", (req, res) => {
   const postsList = readJSONFile();
   req.body.id = generateID();
   postsList.push(req.body);
   writeJSONFile(postsList);
   res.redirect("/index.html");
});

// update
app.put("/posts/:id", (req, res) => {
   const postsList = readJSONFile();
   var found = 0;
   for (var i = 0; i < postsList.length; i++)
      if (postsList[i].id == req.params.id) {
         found = 1;
         postsList[i].name = req.body.name;
         postsList[i].type = req.body.type;
         postsList[i].value = req.body.value;
         postsList[i].date = req.body.date;
         res.send(postsList[i]);
         break;
      }
   writeJSONFile(postsList);
   if (found == 0)
      res.send("Not found");
   res.redirect("/index.html");
})

// Delete
app.delete("/posts/:id", (req, res) => {
   const postsList = readJSONFile();
   for (let i = 0; i < postsList.length; i++)
      if (postsList[i].id == req.params.id) {
         console.log("found");
         postsList.splice(i, 1);
         break;
      }
   writeJSONFile(postsList);
   res.status(200);
   res.redirect("back");
});

function readJSONFile() {
   return JSON.parse(fs.readFileSync("database.json"))["posts"];
}

function writeJSONFile(content) {
   fs.writeFileSync(
      "database.json",
      JSON.stringify({
            posts: content,
         },
         null
      ),
      "utf-8",
      (err) => {
         if (err) {
            console.log(err);
         }
      }
   );
}

app.listen(port, () => console.log("This app is listening on port ${port}"));