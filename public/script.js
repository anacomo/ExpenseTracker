var data;

var modal = document.getElementById("myModal");
var closeBtn = document.getElementsByClassName("close")[0];

// get method = READ
var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.onerror = reqError;
oReq.open("get", "http://localhost:3000/posts", true);
oReq.send();

function reqListener() {
  data = JSON.parse(this.responseText);
  //console.log(data);

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

    if (data[i]["type"] == "outcome") {
      anotherContent.classList.add("outcome");
      anotherContent.classList.add("bigdata");
      ulOut.appendChild(anotherContent);
    } else {
      ulInc.appendChild(anotherContent);
      anotherContent.classList.add("income");
      anotherContent.classList.add("bigdata");
    }
  }
  document.getElementsByTagName("main")[0].appendChild(ulInc);
  document.getElementsByTagName("main")[0].appendChild(ulOut);
  calculateTotal();
}

function reqError(err) {
  console.log("Fetch Error :-S", err);
}

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

function prepareEditEntity(id) {
  modal.style.display = "block";
  document.getElementsByName("name")[1].value = data[id]["name"];
  document.getElementsByName("type")[1].value = data[id]["type"];
  document.getElementsByName("value")[1].value = data[id]["value"];
  document.getElementsByName("id")[1].value = data[id]["id"];
  document.getElementsByName("date")[1].value = data[id]["date"];
  //document.getElementById("cancel_button").hidden = false;
}

function cancelEditEntity() {
  modal.style.display = "none";
  document.getElementsByName("name")[0].value = "";
  document.getElementsByName("type")[0].value = "";
  document.getElementsByName("value")[0].value = "";
  document.getElementsByName("date")[0].value = new Date();
  //document.getElementById("cancel_button").hidden = true;
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

async function calculateTotal() {
  let total = 0;
  for (let i = 0; i < data.length; i++)
    if (data[i]["type"] == "income") total = total + parseInt(data[i]["value"]);
    else total = total - parseInt(data[i]["value"]);
  let totalVal = document.getElementById("total-value");
  if (total > 0) totalVal.style.color = "#2a88ad";
  else totalVal.style.color = "rgb(255, 102, 102)";
  totalVal.innerText = total;
}

// exam task level 1 nr 7
var cookies = [
  "You will take all the exams!",
  "This is a good day for you.",
  "Oh, bugger!",
  "How about never",
  "Run.",
  "If you eat something and no one sees you eat it, it has no calories.",
  "Never do anythong halfway.",
  "Your heart will skip a beat.",
  "Ignore your previous cookie.",
  "I cannot help you, for I am just a cookie.",
  "You will marry a professional athlete - if competitive eating is considered a sport.",
  "Perhaps you've been focusing too much on spending.",
  "Perhaps you've been focusing too much on saving.",
  "You don't have to be faster than a bear, you just have to be faster than the slowest guy running from it.",
  "Enjoy yourself while you can.",
  "If you think we're going to sum up your life on this little piece of html you're crazy.",
  "I see money in your future. It's not yours though.",
  "Three can keep a secret, if you get rid of two.",
  "This cookie is never gonna give you up, never gonna let you down.",
  "If you think no one cares if you are alive, try missing a couple of car payments.",
  "Why not treat yourself to a good time instead of waiting for someone to do it?",
  "If you laugh now, wait until you get home.",
  "You are about to finish reading a fortune cookie",
  "There is no angry way to say bubbles.",
  "The smart thing is to prepare for the unexpected.",
  "Life is a series of choices. Today yours are good ones.",
  "You will soon discover your hidden talent.",
  "Comfort zones are most often expanded through discomfort.",
  "What's the speed of dark?",
  "Good software, like wine, takes time.",
];

function fortuneCookie() {
  let rand = Math.floor(Math.random() * cookies.length);
  let randomCookie = cookies[rand];
  let e = document.getElementById("ravas-text");
  e.innerText = randomCookie;
}
let cookiebutton = document.getElementsByClassName("fa-cookie-bite")[0];


function myAnimation() {
  let x = 0;
  let y = 0;
  cookiebutton.style.position = "absolute";
  cookiebutton.style.left = "100px";
  cookiebutton.style.top = "200px";
  let animation = setInterval(frame, 6);
  let animation2 = setInterval(zig, 1);
  //let animation3 = setInterval(zag, 1);
  function frame() {
    let currentTop = parseInt(cookiebutton.style.top);
    let currentLeft = parseInt(cookiebutton.style.left);
    if (x >= 30) {
      setTimeout(animation);
    } else {
      x += 1;
      y = Math.sqrt(80 - Math.sqrt(x));
      cookiebutton.style.top = currentTop + x + "px";
      cookiebutton.style.left = currentLeft + y + "px";
    }
  }
  let zx = 0;
  function zig(){
    let currentTop = parseInt(cookiebutton.style.top);
    let currentLeft = parseInt(cookiebutton.style.left);
    if(zx > 10){
      setTimeout(animation2);
    }
    else{
      zx += 1;
      cookiebutton.style.top = currentTop - x + "px";
      cookiebutton.style.left = currentLeft + x + "px";
    }
  }
}

cookiebutton.onclick = function () {
  fortuneCookie();
  myAnimation();
}

fortuneCookie();

// exam task level 2 number 3
let index = 0;
let texttitle = " Expense  Tracker";
var speed = 100;

function titleappear() {
  let e = document.getElementById("titleappear");
  if (index <= texttitle.length / 2) {
    e.innerText =
      e.innerText.substr(0, e.innerText.length / 2) +
      texttitle.charAt(index) +
      texttitle.charAt(texttitle.length - index) +
      e.innerText.substr(e.innerText.length / 2, e.innerText.length - 1);
    index++;
    setTimeout(titleappear, speed);
  }
}
titleappear();

// exam level task 6 - schimbarea dinamica a unui formular in functie de inputul utilizatorului
// [] - inrosirea optiunii invalide (pt denumire sa nu aiba caractere speciale, valoarea sa fie pozitiva si data sa fie <= prezent)
// [] - disable la button si la input
// [] - modificarea datii din calendar cu check la today
let checked = [false, false, false, false];

function resetValid() {
  let name = document.getElementsByName("name")[0];
  let type = document.getElementsByName("type")[0];
  let value = document.getElementsByName("value")[0];
  let userDate = document.getElementsByName("date")[0];
  if (name.classList.contains("invalid")) {
    name.classList.remove("invalid");
  }
  if (type.classList.contains("invalid")) {
    type.classList.remove("invalid");
  }
  if (value.classList.contains("invalid")) {
    value.classList.remove("invalid");
  }
  if (userDate.classList.contains("invalid")) {
    userDate.classList.remove("invalid");
  }
  document.getElementById("add_button").disabled = false;
}

function checkValid(index) {
  let name = document.getElementsByName("name")[0];
  let type = document.getElementsByName("type")[0];
  let value = document.getElementsByName("value")[0];
  let userDate = document.getElementsByName("date")[0];
  // verific nume
  invalid = false;
  switch (index) {
    case 1:
      if (!/^[a-zA-Z]/.test(name.value)) {
        name.classList.add("invalid");
        invalid = true;
      }

      break;
    case 2:
      if (!/^[a-zA-Z]/.test(name.value)) {
        name.classList.add("invalid");
        invalid = true;
      }
      break;
    case 3:
      if (!/^[a-zA-Z]/.test(name.value)) {
        name.classList.add("invalid");
        invalid = true;
      }
      if (value.value <= 0) {
        value.classList.add("invalid");
        invalid = true;
      }
      break;
    case 4:
      if (!/^[a-zA-Z]/.test(name.value)) {
        name.classList.add("invalid");
        invalid = true;
      }
      if (value.value <= 0) {
        value.classList.add("invalid");
        invalid = true;
      }
      let date = new Date().toISOString().slice(0, 10);
      let daydate = userDate.value;
      console.log(date);
      console.log(daydate > date);
      console.log(daydate);
      if (daydate > date) {
        userDate.classList.add("invalid");
      }
      break;
  }
  if (invalid == true) {
    // disable the button
    document.getElementById("add_button").disabled = true;
  }
}


function checkClicks() {
  let name = document.getElementsByName("name")[0];
  let type = document.getElementsByName("type")[0];
  let value = document.getElementsByName("value")[0];
  let userDate = document.getElementsByName("date")[0];
  name.onclick = function () {
    resetValid();
  }
  type.onclick = function () {
    resetValid();
    checkValid(4);
  }
  value.onclick = function () {
    resetValid();
    checkValid(4);
  }
  userDate.onclick = function () {
    resetValid();
    checkValid(4);
  }
  document.getElementById("add_button").onclick = function () {
    resetValid();
    checkValid(4);
    if (document.getElementById("add_button").disabled == false) {
      document.getElementById("add_button").onclick = addEntity();
    }
  }
  box = document.getElementById("check");
  if (box.checked) {
    userDate.disabled = true;
    let d = new Date().toISOString().slice(0, 10);
    userDate.value = d;
    console.log(userDate.value);
  } else {
    userDate.disabled = false;
  }
}
window.onclick = function () {
  checkClicks();
}
// console.log(1);
// let d = new Date().toISOString().slice(0, 10);
// console.log(d);

// task de nivel 2 -- schimbarea fontului
if (localStorage["dimension" == null]) {
  document.getElementsByName("text-dimension")[0].value = "medium";
} else {
  document.getElementsByClassName("text-dimension")[0].value = localStorage["dimension"];
}
localStorage.setItem("dimension", document.getElementsByName("text-dimension")[0].value);

function setTextDimension() {
  switch (document.getElementsByName("text-dimension")[0].value) {
    case "small":
      document.getElementsByClassName("header")[0].style.fontSize = "10px";
      document.getElementsByClassName("add-description")[0].style.fontSize = "12px";
      document.getElementsByClassName("add-value")[0].style.fontSize = "12px";
      document.getElementsByClassName("add-type")[0].style.fontSize = "12px";
      document.getElementsByClassName("add-date")[0].style.fontSize = "12px";
      document.getElementsByClassName("add-btn")[0].style.fontSize = "28px";
      localStorage["dimension"] = "small";
      break;
    case "medium":
      document.getElementsByClassName("header")[0].style.fontSize = "12px";
      document.getElementsByClassName("add-description")[0].style.fontSize = "14px";
      document.getElementsByClassName("add-value")[0].style.fontSize = "14px";
      document.getElementsByClassName("add-type")[0].style.fontSize = "14px";
      document.getElementsByClassName("add-date")[0].style.fontSize = "14px";
      document.getElementsByClassName("add-btn")[0].style.fontSize = "30px";
      localStorage["dimension"] = "medium";
      break;
    case "large":
      document.getElementsByClassName("header")[0].style.fontSize = "14px";
      document.getElementsByClassName("add-description")[0].style.fontSize = "16px";
      document.getElementsByClassName("add-value")[0].style.fontSize = "16px";
      document.getElementsByClassName("add-type")[0].style.fontSize = "16px";
      document.getElementsByClassName("add-date")[0].style.fontSize = "16px";
      document.getElementsByClassName("add-btn")[0].style.fontSize = "32px";
      localStorage["dimension"] = "large";
      break;
  }
}
setTextDimension();