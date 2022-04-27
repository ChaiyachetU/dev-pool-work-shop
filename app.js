const nameInputEl = document.getElementById("name");
const sortBtnEl = document.getElementById("sort");
const resetBtnEl = document.getElementById("reset");
const gryffindorValueEl = document.getElementById("gryffindorValue");
const hufflepuffValueEl = document.getElementById("hufflepuffValue");
const ravenclawValueEl = document.getElementById("ravenclawValue");
const slytherinValueEl = document.getElementById("slytherinValue");

sortBtnEl.onclick = sortingHat;
resetBtnEl.onclick = reset;

function getName() {
  return nameInputEl.value.trim();
}

function getHouses() {
  return JSON.parse(localStorage.getItem("houses"));
}

function checkHouses() {
  const houses = getHouses();
  console.log(houses);

  let housesForRandom = [];

  if (houses) {
    for (const house in houses) {
      if (houses[house] < 13) {
        housesForRandom.push(house);
      }
    }
  } else {
    housesForRandom = ["gryffindor", "hufflepuff", "ravenclaw", "slytherin"];
  }

  return housesForRandom;
}

function sumStudents() {
  // get students from local storage
  const students = getHouses();
  let sum = 0;

  if (students) {
    sum = Object.values(students).reduce((a, b) => a + b);
  }

  console.log(sum);
  return sum;
}

function addStudentToHouse(house) {
  // update student to house in local storage
  let houses = {};

  if (getHouses()) {
    houses = getHouses();
  }

  houses[house] = (houses[house] || 0) + 1;
  localStorage.setItem("houses", JSON.stringify(houses));

  console.log(getHouses());
}

function showStudents() {
  const hourses = getHouses();

  if (!hourses) {
    gryffindorValueEl.innerText = "0";
    hufflepuffValueEl.innerText = "0";
    ravenclawValueEl.innerText = "0";
    slytherinValueEl.innerText = "0";
  } else {
    gryffindorValueEl.innerText = hourses.gryffindor ? hourses.gryffindor : "0";
    hufflepuffValueEl.innerText = hourses.hufflepuff ? hourses.hufflepuff : "0";
    ravenclawValueEl.innerText = hourses.ravenclaw ? hourses.ravenclaw : "0";
    slytherinValueEl.innerText = hourses.slytherin ? hourses.slytherin : "0";
  }
}

function randomHouse() {
  const houses = checkHouses();

  console.log("houses for random : " + houses);

  return houses[Math.floor(Math.random() * houses.length)];
}

function chooseHouse() {
  const chooseHouse = randomHouse();
  return chooseHouse;
}

function sortingHat() {
  const name = getName();
  console.log(name.length);

  if (name && sumStudents() < 50) {
    const house = chooseHouse(name);

    console.log(house);

    addStudentToHouse(house);

    alert(`${name} เจ้าได้อยู่บ้าน ${house}`);

    showStudents();

    // reset input field
    nameInputEl.value = "";
  } else if (!(sumStudents() < 50)) {
    sortBtnEl.style.display = "none";
    resetBtnEl.style.display = "inline-block";
    alert("ข้าได้ทำการคัดสรรครบทุกคนแล้ว!");
  } else {
    alert("บอกชื่อเจ้ามาด้วย!");
  }
}

function reset() {
  nameInputEl.value = "";
  sortBtnEl.style.display = "inline-block";
  resetBtnEl.style.display = "none";

  const houses = {
    gryffindor: 0,
    hufflepuff: 0,
    ravenclaw: 0,
    slytherin: 0,
  };

  localStorage.setItem("houses", JSON.stringify(houses));

  showStudents();
}

(function main() {
  if (!getHouses()) {
    const houses = {
      gryffindor: 0,
      hufflepuff: 0,
      ravenclaw: 0,
      slytherin: 0,
    };

    localStorage.setItem("houses", JSON.stringify(houses));
  }

  showStudents();
})();
