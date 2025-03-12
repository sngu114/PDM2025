let basicSynth, filt, LFOfilt, panner, fmSynth, values, noise1, noiseEnv, filt1, values1;

let img;
let showImage = false;
let showText = true;

function preload() {
  img = loadImage("picture/helicopter.gif");
}

function setup() {
  createCanvas(400, 400);
  panner = new Tone.AutoPanner({
    frequency: 10,
    depth: 1
  }).toDestination().start();

  filt = new Tone.Filter(400, "bandpass", -24).connect(panner);

  LFOfilt = new Tone.LFO({
    frequency: 5, 
    min: 300, 
    max: 800
  }).start();
  LFOfilt.connect(filt.frequency);

  fmSynth = new Tone.FMSynth({
    harmonicity: 1.5,
    modulationIndex: 25,
    oscillator: {type: "triangle"},
    modulation: {type: "sine"}

  }).connect(filt);

  //values = new Float32Array([1, 0.02, 0.3, 15, 15, 0.3, 1]);

  filt1 = new Tone.AutoFilter({
    frequency: 5,
    depth: 0.8,
    baseFrequency: 1000,
    octaves: 2
  }).toDestination().start();


  noiseEnv = new Tone.AmplitudeEnvelope({
    attack: 0.005,
    decay: 0.05,
    sustain: 0.5,
    release: 0.2
  }).connect(filt1);

  noise1 = new Tone.Noise("white").connect(noiseEnv).start();
  //values1 = new Float32Array([-96, -30, -30, -12, 0, -12, 0, 0, -6, -12, -30, -96]);
}

function draw() {
  background(220);
  if(showText) {

    textSize(20);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Click to fly helicopter", width / 2, 200);
    text("VOLUME WARNING", width / 2, 250);

  }
  if (showImage){

  image(img, 50, 50, 300, 300);
  }
}

function mouseClicked() {
  if (!showImage) {

    showImage = true;
    showText = false;
    fmSynth.triggerAttack(random(300, 500));
    noiseEnv.triggerAttack();

    setTimeout(() => {
      fmSynth.triggerRelease();
      noiseEnv.triggerRelease();
    }, 9000);
  }

}

function keyPressed() {
  if (key === "a") {
    noiseEnv.triggerAttackRelease(30);
    noise1.volume.setValueCurveAtTime(values1, Tone.now(), 30)
    console.log('testing')
  }
}