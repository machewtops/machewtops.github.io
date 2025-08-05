let audioFiles = {};

const tracks = [
  { id: 'vegyn', file: 'vegynshort.mp3' },
  { id: 'exo', file: 'exoshort.mp3' },
  { id: 'lightleak', file: 'lightleakshort.mp3' },
  { id: 'loukeman', file: 'tookaturnshort.mp3' },
  { id: 'takevan', file: 'inmyheadshort.mp3' },
  { id: 'machinegirl', file: 'athothagogoshort.mp3' },
  { id: 'phoebe', file: 'phoebeshort.mp3' },
  { id: 'methmath', file: 'methmathshort.mp3' },
  { id: 'mgna', file: 'mgnashort.mp3' },
  { id: 'thegarden', file: 'thegardenshort.mp3' },
  { id: 'mitski', file: 'mitskishort.mp3' },
  { id: 'silkrhodes', file: 'silkrhodesshort.mp3' },
  { id: 'draingang', file: 'draingangshort.mp3' },
  { id: 'sematary', file: 'semataryshort.mp3' }
];

function preload() {
  tracks.forEach(t => {
    audioFiles[t.file] = loadSound(t.file);
  });
}

function setup() {
  tracks.forEach(({ id, file }) => {
    document.querySelectorAll(`#${id}`).forEach(image => {
      const play = () => {
        const snd = audioFiles[file];
        if (!snd.isPlaying()) {
          snd.loop();
        }
      };

      const stop = () => {
        const snd = audioFiles[file];
        if (snd.isPlaying()) {
          snd.stop();
        }
      };

      ['mouseover', 'touchstart'].forEach(evt => image.addEventListener(evt, play));
      ['mouseout', 'touchend', 'touchcancel'].forEach(evt => image.addEventListener(evt, stop));
    });
  });
}

