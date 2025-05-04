#include <Arduino.h>

const int JOY_PIN = A0;
const int BUTTON_PIN = 3;
const int LED_PINS[3] = {9, 8, 7};
const int buzzerPin = 5;
const int NUM_READINGS = 3;

int readings[NUM_READINGS];
int readIndex = 0;
int total = 0;
int average = 0;
int zeroed = 0;

bool zeroing = false;
bool ready = false;
int lives = 3;

void setup() {

  Serial.begin(9600);

  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(buzzerPin, OUTPUT);

  for (int i = 0; i < 3; i++) {

    pinMode(LED_PINS[i], OUTPUT);
    digitalWrite(LED_PINS[i], HIGH);

  }
  
  for (int i = 0; i < NUM_READINGS; i++) {

    readings[i] = 0;
  }

}

void loop() {
  
  int v = analogRead(JOY_PIN);
  total -= readings[readIndex];
  readings[readIndex] = v;
  total += v;
  readIndex = (readIndex + 1) % NUM_READINGS;
  average = round((float)total / NUM_READINGS);

  if (Serial.available()) {

    String msg = Serial.readStringUntil('\n');

    if (msg == "zero") {
      zeroing = true;
    }
    else if (msg == "life" && lives > 0) {
      
      lives--;
      digitalWrite(LED_PINS[lives], LOW);
      tone(buzzerPin, 1000, 300);
    }

    else if (msg == "reset") {

      lives = 3;
      for (int i = 0; i < 3; i++) {
        digitalWrite(LED_PINS[i], HIGH);
      }
    }
  }

  
  if (zeroing) {

    zeroed = average;
    zeroing = false;
    ready = true;
  }

  if (ready) {
    
    int sw = !digitalRead(BUTTON_PIN); 
    Serial.print(average - zeroed);
    Serial.print(",0,");
    Serial.println(sw);
  }

  delay(10);
}
