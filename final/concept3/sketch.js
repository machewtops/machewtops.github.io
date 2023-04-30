let audioFiles = {};

function preload() {
  audioFiles["vegynshort.mp3"] = loadSound("vegynshort.mp3");
  audioFiles["exoshort.mp3"] = loadSound("exoshort.mp3");
  audioFiles["lightleakshort.mp3"] = loadSound("lightleakshort.mp3");
  audioFiles["tookaturnshort.mp3"] = loadSound("tookaturnshort.mp3");
  audioFiles["inmyheadshort.mp3"] = loadSound("inmyheadshort.mp3");
  audioFiles["athothagogoshort.mp3"] = loadSound("athothagogoshort.mp3");
}

function setup() {
  const vegynImage = document.querySelectorAll("#vegyn");
  const exoImage = document.querySelectorAll("#exo");
  const lightleakImage = document.querySelectorAll("#lightleak");
  const loukemanImage = document.querySelectorAll("#loukeman");
  const takevanImage = document.querySelectorAll("#takevan");
  const machinegirlImage = document.querySelectorAll("#machinegirl");

  vegynImage.forEach((image) => {
    image.addEventListener("mouseover", () => {
      audioFiles["vegynshort.mp3"].play();
      audioFiles["vegynshort.mp3"].loop();
    });

    image.addEventListener("mouseout", () => {
      audioFiles["vegynshort.mp3"].stop();
    });
  });

  exoImage.forEach((image) => {
    image.addEventListener("mouseover", () => {
      audioFiles["exoshort.mp3"].play();
      audioFiles["exoshort.mp3"].loop();
    });

    image.addEventListener("mouseout", () => {
      audioFiles["exoshort.mp3"].stop();
    });
  });

  lightleakImage.forEach((image) => {
    image.addEventListener("mouseover", () => {
      audioFiles["lightleakshort.mp3"].play();
      audioFiles["lightleakshort.mp3"].loop();
    });

    image.addEventListener("mouseout", () => {
      audioFiles["lightleakshort.mp3"].stop();
    });
  });

  loukemanImage.forEach((image) => {
    image.addEventListener("mouseover", () => {
      audioFiles["tookaturnshort.mp3"].play();
      audioFiles["tookaturnshort.mp3"].loop();
    });

    image.addEventListener("mouseout", () => {
      audioFiles["tookaturnshort.mp3"].stop();
    });
  });

  takevanImage.forEach((image) => {
    image.addEventListener("mouseover", () => {
      audioFiles["inmyheadshort.mp3"].play();
      audioFiles["inmyheadshort.mp3"].loop();
    });

    image.addEventListener("mouseout", () => {
      audioFiles["inmyheadshort.mp3"].stop();
    });
  });

  machinegirlImage.forEach((image) => {
    image.addEventListener("mouseover", () => {
      audioFiles["athothagogoshort.mp3"].play();
      audioFiles["athothagogoshort.mp3"].loop();
    });

    image.addEventListener("mouseout", () => {
      audioFiles["athothagogoshort.mp3"].stop();
    });
  });
}
