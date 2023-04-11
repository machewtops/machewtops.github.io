const container = document.getElementById("container");

// toggle between black and white
const buttonStates = [];
// click counter
var clickCount = 0;

for (let i = 1; i <= 100; i++) {
  const button = document.createElement("button");
  button.textContent = "";

  // Set the initial state of the button to white
  buttonStates[i] = "white";

  button.addEventListener("mouseover", () => {
    if (buttonStates[i] === "white" && clickCount % 2 === 0) {
      button.style.backgroundColor = "black";
      buttonStates[i] = "black";
    } 
    else if (buttonStates[i] === "blue" && clickCount % 2 === 1) {
      button.style.backgroundColor = "red";
      buttonStates[i] = "red";
    } 
    else if (buttonStates[i] === "white" && clickCount % 2 === 1) {
      button.style.backgroundColor = "red";
      buttonStates[i] = "red";
    } 
    else if (buttonStates[i] === "red" && clickCount % 2 === 1) {
      button.style.backgroundColor = "blue";
      buttonStates[i] = "blue";
    } 
    else if (buttonStates[i] === "black" && clickCount % 2 === 1) {
      button.style.backgroundColor = "blue";
      buttonStates[i] = "blue";
    } 
    else if (buttonStates[i] === "red" && clickCount % 2 === 0) {
      button.style.backgroundColor = "black";
      buttonStates[i] = "black";
    } 
    else {
      button.style.backgroundColor = "white";
      buttonStates[i] = "white";
    }
  });

  button.addEventListener("click", () => {
    console.log(`button ${i} was clickity clacked on. why are u clicking?`)
    clickCount++;
  });

  container.appendChild(button);
}
