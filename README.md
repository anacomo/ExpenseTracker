# Expense Tracker

### Author: Ana-Maria Comorașu

## Lab Tasks
* HTML and CSS
1. Separate files for HTML and CSS
``` html
/public_html/index.html
/public_html/css/style.css
```

2. Semantic tags in HTML (minimum 4)
``` html
<header> ... </header>
<main> ... </main>
<section> ... </section>
<footer> ... </footer>
```

3. CSS styles should be defined using classes on the elements that should be stilized (min 80%)
4. Minimum 2 column layout using Flexbox / Grid
5. Responsive layout using Media queries

* JavaScript
6. Separate file
``` html
/public_html/js/script.js
```

7. DOM manipulation
``` JavaScript
function reqListener() {
  data = JSON.parse(this.responseText);
  var ulInc = document.createElement("ul");
  var ulOut = document.createElement("ul");
  for (let i = 0; i < data.length; i++) {
    let anotherContent = document.createElement("div");
    let wholeContent = document.createElement("div");
    let buttons = document.createElement("div");

    let name = document.createElement("div");
    let value = document.createElement("div");
    let date = document.createElement("div");
    let edit = document.createElement("d");
    let del = document.createElement("d");

    name.innerText = data[i]["name"];
    value.innerText = data[i]["value"];
    date.innerText = data[i]["date"];
    edit.innerHTML =
      '<button class =  "add-btn" onclick=\'prepareEditEntity(' +
      i +
      ')\'><i class="fas fa-edit"></i></button>';
    del.innerHTML =
      '<button class = "delete" onclick=\'deleteEntity(' +
      i +
      ')\'> <i class="far fa-times-circle"></i></button>';

    name.classList.add("element");
    name.classList.add("name");
    value.classList.add("element");
    value.classList.add("value");
    date.classList.add("element");
    date.classList.add("date");
    wholeContent.classList.add("data");
    buttons.classList.add("buttons");

    wholeContent.appendChild(name);
    wholeContent.appendChild(date);
    wholeContent.appendChild(value);
    anotherContent.appendChild(wholeContent);
    buttons.appendChild(edit);
    buttons.appendChild(del);
    anotherContent.appendChild(buttons);
  }
  document.getElementsByTagName("main")[0].appendChild(ulInc);
  document.getElementsByTagName("main")[0].appendChild(ulOut);
  calculateTotal();
}

```

8. Mouse events
``` JavaScript
document.getElementById("changeName").onclick = function () {
  var txt;
  var person = prompt("Would you like to enter your name?:", "Harry Potter");
  if (person == null || person == "") {
    txt = "you.";
  } else {
    txt = person;
    if (typeof Storage !== "undefined") {
      localStorage.setItem("nume", txt);
      document.getElementById("changeName").innerHTML = localStorage.getItem(
        "nume"
      );
    } else {
      document.getElementById("changeName").innerHTML =
        "Sorry, your browser does not support Web Storage...";
    }
  }
  document.getElementById("changeName").innerHTML = localStorage("key");
};

closeBtn.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
```

9. AJAX (GET, POST, PUT, DELETE)
``` JavaScript
// get method = READ
var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.onerror = reqError;
oReq.open("get", "http://localhost:3000/posts", true);
oReq.send();

// create
async function addEntity() {
  let name = document.getElementsByName("name")[0].value;
  let type = document.getElementsByName("type")[0].value;
  let value = document.getElementsByName("value")[0].value;
  let userDate = document.getElementsByName("date")[0].value;
  let date = new Date(userDate).toISOString().split("T")[0];

  let oReq = new XMLHttpRequest();
  oReq.onload = reqListener;
  oReq.onerror = reqError;
  oReq.open("post", "http://localhost:3000/posts", true);
  oReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  oReq.send(
    "name=" + name + "&type=" + type + "&value=" + value + "&date=" + date
  );
  location.reload();
  calculateTotal();
}

// update
async function editEntity() {
  var name = document.getElementsByName("name")[1].value;
  var type = document.getElementsByName("type")[1].value;
  var value = document.getElementsByName("value")[1].value;
  var date = document.getElementsByName("date")[1].value;
  var id = document.getElementsByName("id")[1].value;
  var oReq = new XMLHttpRequest();
  oReq.onload = reqListener;
  oReq.onerror = reqError;
  await oReq.open("put", "http://localhost:3000/posts/" + id, true);
  await oReq.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  await oReq.send(
    "name=" + name + "&type=" + type + "&value=" + value + "&date=" + date
  );
  location.reload();
  calculateTotal();
}

// delete
async function deleteEntity(id) {
  var oReq = new XMLHttpRequest();
  oReq.onload = reqListener;
  oReq.onerror = reqError;
  await oReq.open(
    "delete",
    "http://localhost:3000/posts/" + data[id]["id"],
    false
  );
  await oReq.send();

  location.reload();
  calculateTotal();
}
```

10. Local storage
```JavaScript
if (typeof Storage !== "undefined") {
      localStorage.setItem("nume", txt);
      document.getElementById("changeName").innerHTML = localStorage.getItem(
        "nume"
      );
    } else {
      document.getElementById("changeName").innerHTML =
        "Sorry, your browser does not support Web Storage...";
    }
  }
  document.getElementById("changeName").innerHTML = localStorage("key");
```

* Backend API
11. Create server 
``` JavaScript
// server.js

const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
```
12. CRUD API
``` JavaScript
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
```
