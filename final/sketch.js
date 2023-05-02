let audioFiles = {};

function preload() {
  audioFiles["vegynshort.mp3"] = loadSound("vegynshort.mp3");
  audioFiles["exoshort.mp3"] = loadSound("exoshort.mp3");
  audioFiles["lightleakshort.mp3"] = loadSound("lightleakshort.mp3");
  audioFiles["tookaturnshort.mp3"] = loadSound("tookaturnshort.mp3");
  audioFiles["inmyheadshort.mp3"] = loadSound("inmyheadshort.mp3");
  audioFiles["athothagogoshort.mp3"] = loadSound("athothagogoshort.mp3");
  audioFiles["phoebeshort.mp3"] = loadSound("phoebeshort.mp3");
  audioFiles["methmathshort.mp3"] = loadSound("methmathshort.mp3");
  audioFiles["mgnashort.mp3"] = loadSound("mgnashort.mp3");
  audioFiles["thegardenshort.mp3"] = loadSound("thegardenshort.mp3");
  audioFiles["mitskishort.mp3"] = loadSound("mitskishort.mp3");
  audioFiles["silkrhodesshort.mp3"] = loadSound("silkrhodesshort.mp3");
  audioFiles["draingangshort.mp3"] = loadSound("draingangshort.mp3");
  audioFiles["semataryshort.mp3"] = loadSound("semataryshort.mp3");
}

function setup() {
  const vegynImage = document.querySelectorAll("#vegyn");
  const exoImage = document.querySelectorAll("#exo");
  const lightleakImage = document.querySelectorAll("#lightleak");
  const loukemanImage = document.querySelectorAll("#loukeman");
  const takevanImage = document.querySelectorAll("#takevan");
  const machinegirlImage = document.querySelectorAll("#machinegirl");
  const phoebeImage = document.querySelectorAll("#phoebe");
  const methmathImage = document.querySelectorAll("#methmath");
  const mgnaImage = document.querySelectorAll("#mgna");
  const thegardenImage = document.querySelectorAll("#thegarden");
  const mitskiImage = document.querySelectorAll("#mitski");
  const silkrhodesImage = document.querySelectorAll("#silkrhodes");
  const draingangImage = document.querySelectorAll("#draingang");
  const semataryImage = document.querySelectorAll("#sematary");

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

  phoebeImage.forEach((image) => {
    image.addEventListener("mouseover", () => {
      audioFiles["phoebeshort.mp3"].play();
      audioFiles["phoebeshort.mp3"].loop();
    });

    image.addEventListener("mouseout", () => {
      audioFiles["phoebeshort.mp3"].stop();
    });
  });

  methmathImage.forEach((image) => {
    image.addEventListener("mouseover", () => {
      audioFiles["methmathshort.mp3"].play();
      audioFiles["methmathshort.mp3"].loop();
    });

    image.addEventListener("mouseout", () => {
      audioFiles["methmathshort.mp3"].stop();
    });
  });

  mgnaImage.forEach((image) => {
    image.addEventListener("mouseover", () => {
      audioFiles["mgnashort.mp3"].play();
      audioFiles["mgnashort.mp3"].loop();
    });

    image.addEventListener("mouseout", () => {
      audioFiles["mgnashort.mp3"].stop();
    });
  });

  thegardenImage.forEach((image) => {
    image.addEventListener("mouseover", () => {
      audioFiles["thegardenshort.mp3"].play();
      audioFiles["thegardenshort.mp3"].loop();
    });

    image.addEventListener("mouseout", () => {
      audioFiles["thegardenshort.mp3"].stop();
    });
  });

  mitskiImage.forEach((image) => {
    image.addEventListener("mouseover", () => {
      audioFiles["mitskishort.mp3"].play();
      audioFiles["mitskishort.mp3"].loop();
    });

    image.addEventListener("mouseout", () => {
      audioFiles["mitskishort.mp3"].stop();
    });
  });

  silkrhodesImage.forEach((image) => {
    image.addEventListener("mouseover", () => {
      audioFiles["silkrhodesshort.mp3"].play();
      audioFiles["silkrhodesshort.mp3"].loop();
    });

    image.addEventListener("mouseout", () => {
      audioFiles["silkrhodesshort.mp3"].stop();
    });
  });

  draingangImage.forEach((image) => {
    image.addEventListener("mouseover", () => {
      audioFiles["draingangshort.mp3"].play();
      audioFiles["draingangshort.mp3"].loop();
    });

    image.addEventListener("mouseout", () => {
      audioFiles["draingangshort.mp3"].stop();
    });
  });

  semataryImage.forEach((image) => {
    image.addEventListener("mouseover", () => {
      audioFiles["semataryshort.mp3"].play();
      audioFiles["semataryshort.mp3"].loop();
    });

    image.addEventListener("mouseout", () => {
      audioFiles["semataryshort.mp3"].stop();
    });
  });
}
