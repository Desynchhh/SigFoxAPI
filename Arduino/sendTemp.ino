#include <SigFox.h>
#include <ArduinoLowPower.h>
#include <DHT.h>
#include <Adafruit_Sensor.h>

#define DHTPIN 7
#define DHTTYPE DHT11
const int sleepTime = 10 * 60 * 1000;
const bool debug = false;

// The DHT11 sensor is capable of measuring temperatures between 0-50 degrees celcius and humidity between 20-90%. Both as floats. 
// margin of error: +-2 degrees & +-5% humidity
DHT dht(DHTPIN, DHTTYPE);

void setup(){
  if(!SigFox.begin()){
    reboot();
  }
  SigFox.end();
  dht.begin();

  if(debug == true){
    Serial.begin(9600);
    while(!Serial) {}
    Serial.println("Debug mode enabled");
    Serial.println();
    SigFox.debug();
  }
}

void loop() {
  sendTemperature();
  if(debug == true){
    delay(sleepTime);
  } else {
    LowPower.sleep(sleepTime);
  }
}

void sendTemperature(){
  // Get humidity %
  int hum = humToBinaryVal(dht.readHumidity());
  // Get temperature in celcius
  int temp = tempToBinaryVal(dht.readTemperature());

  char values[2] = {hum, temp};
  // Start the SigFox module
  SigFox.begin();
  // Wait at least 30ms after first configuration
  delay(100);
  // Clears all pending interrupts
  SigFox.status();
  delay(1);
  // Begin package sending
  SigFox.beginPacket();
  SigFox.write(values, 2);
  // send buffer to SIGFOX network
  int ret = SigFox.endPacket();
  // end the SigFox module
  SigFox.end();

  // DEBUG STUFF
  if(debug == true){
    Serial.println(hum);
    Serial.println(temp);
    if (ret > 0) {
      Serial.println("No transmission");
    } else {
      Serial.println("Transmission ok");
    }
    // Loop forever
    // while(1) {
    //   digitalWrite(LED_BUILTIN, HIGH);
    //   delay(2000);
    //   digitalWrite(LED_BUILTIN, LOW);
    //   delay(2000);
    // }
  }
}

int tempToBinaryVal(float fVal) {
  float rounded = singleDecimal(fVal);
  int binary = rounded / 0.2;
  return binary;
}

int humToBinaryVal(float fVal) {
  return singleDecimal(fVal-20);
}

// Returns a float with only 1 decimal point
float singleDecimal(float val) {
  return round(val * 10.0) / 10.0;
}

void reboot(){
  NVIC_SystemReset();
  while(1);
}
