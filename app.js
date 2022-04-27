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

function getStudents() {
  return JSON.parse(localStorage.getItem("houses"));
}

function checkFullHouse() {
  const students = getStudents();

  let fullHouses = [];

  Object.entries(students).forEach(([key, value]) => {
    if (value === 13) {
      fullHouses.push("key");
    }
  });

  localStorage.setItem("fullHouses", JSON.stringify(fullHouses));

  return fullHouses;
}

function sumStudents() {
  // get students from local storage
  const students = getStudents();
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

  if (getStudents()) {
    houses = getStudents();
  }

  houses[house] = (houses[house] || 0) + 1;
  localStorage.setItem("houses", JSON.stringify(houses));

  console.log(getStudents());
}

function showStudents() {
  const hourses = getStudents();

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
  const allHouses = ["gryffindor", "hufflepuff", "ravenclaw", "slytherin"];

  return allHouses[Math.floor(Math.random() * allHouses.length)];
}

function chooseHouse(name) {
  const house = getStudents();
  if (!house) {
    const chooseHouse = randomHouse();
    return chooseHouse;
  } else {
    if (name.length < 10) {
      const chooseHouse = ["gryffindor", "hufflepuff"][
        Math.floor(Math.random() * ["gryffindor", "hufflepuff"].length)
      ];

      return chooseHouse;
    } else {
      const chooseHouse = ["ravenclaw", "slytherin"][
        Math.floor(Math.random() * ["ravenclaw", "slytherin"].length)
      ];

      return chooseHouse;
    }
  }
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

  localStorage.removeItem("students");

  showStudents();
}

(function main() {
  showStudents();
})();
