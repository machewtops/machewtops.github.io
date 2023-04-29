let audioFiles = {};

function preload() {
  audioFiles["vegynshort.mp3"] = loadSound("vegynshort.mp3");
  audioFiles("exoshort.mp3") = loadSound("exoshort.mp3");
  audioFiles("lightleakshort.mp3") = loadSound("lightleakshort.mp3");
  audioFiles("tookaturnshort.mp3") = loadSound("tookaturnshort.mp3");
  audioFiles("inmyheadshort.mp3") = loadSound("inmyheadshort.mp3");
  audioFiles("athothagogoshort.mp3") = loadSound("athothagogoshort.mp3");
}

function setup() {
  const vegynImage = document.querySelectorAll("#vegyn");
  const exoImage = document.querySelectorAll("#exo");
  const lightleakImage = document.querySelectorAll("#lightleak");
  const loukemanImage = document.querySelectorAll("#loukeman");
  const takevanImage = document.querySelectorAll("#takevan");
  const machinegirlImage = document.querySelectorAll("#machinegirl");
  vegyn=loadSound("vegynshort.mp3");
  exo=loadSound("exoshort.mp3");
  lightleak=loadSound("lightleakshort.mp3");
  tookaturn=loadSound("tookaturnshort.mp3");
  inmyhead=loadSound("inmyheadshort.mp3");
  athothagogo=loadSound("athothagogoshort.mp3");

  vegynImage.forEach((image) => {
    image.addEventListener("mouseover", () => {
      vegyn.play();
      vegyn.loop();
    });

    image.addEventListener("mouseout", () => {
      vegyn.stop();
    });
  });

  exoImage.forEach((image) => {
    image.addEventListener("mouseover", () => {
      exo.play();
      exo.loop();
    });

    image.addEventListener("mouseout", () => {
      exo.stop();
    });

    lightleakImage.forEach((image) => {
        image.addEventListener("mouseover", () => {
            lightleak.play();
            lightleak.loop();
        });
    
        image.addEventListener("mouseout", () => {
            lightleak.stop();
        });
    });

    loukemanImage.forEach((image) => {
        image.addEventListener("mouseover", () => {
            tookaturn.play();
            tookaturn.loop();
        });
    
        image.addEventListener("mouseout", () => {
            tookaturn.stop();
        });
    });

    takevanImage.forEach((image) => {
        image.addEventListener("mouseover", () => {
            inmyhead.play();
            inmyhead.loop();
        });
    
        image.addEventListener("mouseout", () => {
            inmyhead.stop();
        });
    });

    machinegirlImage.forEach((image) => {
        image.addEventListener("mouseover", () => {
            athothagogo.play();
            athothagogo.loop();
        });
    
        image.addEventListener("mouseout", () => {
            athothagogo.stop();
        });
    });
});
}
