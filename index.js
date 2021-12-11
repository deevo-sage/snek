
const root = document.getElementById("root");
const pointsDiv = document.getElementById("points");
const styles = document.getElementById("styles");
let direction = 2;
const gridArr = [];
let end = 0;
let y = 10,
  x = 16;
const arrLength = x * y;
const snek = [0];
let food = Math.floor(Math.random() * arrLength);

let points = 0;
let speed = 200;
const directionPoints = [-1, -x, 1, x];
let myInterval = () => {};
for (let i = 0; i < arrLength; i++) {
  const ele = document.createElement("div");
  ele.style.width = 100 / x + "%";
  ele.style.height = 100 / y + "%";
  ele.style.boxSizing = "border-box";
  ele.style.border = "1px solid black";
  gridArr.push(ele);
  root.appendChild(ele);
}
const moveSnek = () => {
  gridArr[snek[0]]?.classList?.remove("snekHead");
  if (snek.length !== 1)
    gridArr[snek[snek.length - 1]]?.classList?.remove("snekBody");
  for (let i = snek.length - 1; i > 0; i--) {
    snek[i] = snek[i - 1];
    gridArr[snek[i]]?.classList?.add("snekBody");
  }
  if (direction === 2) {
    if ((snek[0] + 1) % x === 0) {
      snek[0] -= x;
    }
  } else if (direction === 0) {
    if (snek[0] % x === 0) {
      snek[0] += x;
    }
  }
  snek[0] += directionPoints[direction];
  if (snek[0] > arrLength) {
    snek[0] -= arrLength;
  } else if (snek[0] < 0) {
    snek[0] += arrLength;
  }
};
const updatePoints = () => {
  pointsDiv.innerHTML = "Points : " + points;
};
const itterate = () => {
  moveSnek();
  updatePoints();
  gridArr.forEach((item, i) => {
    if (snek.includes(i) && i !== snek[0]) {
      item.classList.add("snekBody");
    }
    if (snek[0] === food) {
      gridArr[food].classList.remove("food");
      points++;
      food = Math.floor(Math.random() * arrLength);
      snek.push(snek[snek.length - 1] - directionPoints[direction]);
    }
    if (i === food) {
      item.classList.add("food");
    }
    if (i === snek[0]) {
      item.classList.add("snekHead");
    }
  });
  checkifDed();
};
myInterval = setInterval(itterate, speed);
const checkifDed = () => {
  const x = [...snek];
  delete x[0];
  if (x.includes(snek[0])) {
    clearInterval(myInterval);
    alert("u're ded to me now");
  }
};
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction !== 3) direction = 1;
      break;
    case "ArrowDown":
      if (direction !== 1) direction = 3;
      break;
    case "ArrowLeft":
      if (direction !== 2) direction = 0;
      break;
    case "ArrowRight":
      if (direction !== 0) direction = 2;
      break;
    default:
      break;
  }
});
