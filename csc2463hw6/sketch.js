let synth1, filt, rev, polySynth, noise1, noise2, ampEnv1, ampEnv2, filt1, filterSlider;
let activeKey = null;

let keyNotes = {
  'a': 'A4',
  's': 'B4',
  'd': 'C5',
  'f': 'D5',
  'g': 'E4'
}

let keyNotes1 = {
  'q': 'D4',
  'w': 'F4',
  'e': 'A4',
  'r': 'G4',
}

function setup() {
  createCanvas(400, 400);
  filt = new Tone.Filter(1500, "lowpass").toDestination();
  rev = new Tone.Reverb(2).connect(filt);
  distortion = new Tone.Distortion(0).toDestination();
  filt.connect(distortion);
  synth1 = new Tone.Synth({
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.9,
      release: 0.3
    }
  }).connect(rev);
  synth1.portamento.value = 0.5;
  polySynth = new Tone.PolySynth(Tone.Synth).connect(rev);
  polySynth.set({
    envelope: {
      attack: 0.1,
      decay: 0.1,
      sustain: 1,
      release: 0.1
    },
    oscillator: {
      type: 'sawtooth'
    }
  })
  polySynth.volume.value = -6;
  ampEnv1 = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.5,
    sustain: 0,
    release: 0.1
  }).toDestination();
  filt1 = new Tone.Filter(1500, "highpass").connect(ampEnv1);
  noise1 = new Tone.Noise('pink').start().connect(filt1)

  filterSlider = createSlider(100, 5000, 1500);
  filterSlider.position(15, 250);
  filterSlider.style('width', '280px');

  distortionSlider = createSlider(0, 1, 0, 0.01);
  distortionSlider.position(15, 350);
  distortionSlider.style('width', '280px');
  distortionSlider.input(() => { distortion.distortion = distortionSlider.value(); });

  reverbSlider = createSlider(0, 10, 2, 0.1); 
  reverbSlider.position(15, 300);
  reverbSlider.style('width', '280px');
  reverbSlider.input(() => { rev.decay = reverbSlider.value(); }); 

}

function draw() {
  filt.frequency.value = filterSlider.value();
  background(220);
  text("keys a-g are the monophonic synth.  \nkeys q-r are the polyphonic synth. \nkey z is the noise.", 20, 30)
  text("filter frequency slider: " + filterSlider.value() + " Hz", 20, 240);
  text("distortion amount slider: " + distortionSlider.value(), 20, 290);
  text("reverb amount slider: " + reverbSlider.value(), 20, 340);

}

function keyPressed() {
  let pitch = keyNotes[key];
  let pitch1 = keyNotes1[key];
  if (pitch && key !== activeKey) {
    synth1.triggerRelease();
    activeKey = key;
    synth1.triggerAttack(pitch);
  } else if (pitch1) {
    polySynth.triggerAttack(pitch1);
  } else if (key === "z") {
    ampEnv1.triggerAttackRelease(0.1);
  }
}

function keyReleased() {
  let pitch1 = keyNotes1[key];
  if (key === activeKey) {
    synth1.triggerRelease();
    activeKey = null;
  } else if (pitch1) {
    polySynth.triggerRelease(pitch1);
  }
}