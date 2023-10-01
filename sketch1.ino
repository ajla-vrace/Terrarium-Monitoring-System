#include <ESP8266WiFi.h>
#include<DHT.h>
#include <FirebaseArduino.h>

#define FIREBASE_HOST "seminarski-19d0b-default-rtdb.firebaseio.com" 
#define FIREBASE_AUTH "klKuuUkA8oSNYNW60jl0b9szgvVQUIRpC84cVwT4" 

#define WIFI_SSID "test"                 
#define WIFI_PASSWORD "123456123456" 

DHT dht(D2, DHT11);
void setup() {
  Serial.begin(115200); 
   randomSeed(analogRead(0));
 Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH); 
 if (Firebase.failed()) {
    Serial.print(Firebase.error());
  } else {
    Serial.println("Firebase Connected");
  }
  
  dht.begin();
 connectToWiFi();
 
 pinMode(LED_BUILTIN, OUTPUT);  
  //digitalWrite(LED_BUILTIN, LOW); 

}


void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

 if (!isnan(temperature) && !isnan(humidity)) {
    Serial.print("Temperatura: ");
    Serial.print(temperature);
    Serial.println(" °C");

    Serial.print("Vlažnost: ");
    Serial.print(humidity);
    Serial.println(" %");

    Firebase.setFloat("/temperature", temperature);
    delay(1000);
    Firebase.setFloat("/humidity", humidity);
    delay(1000);
    Serial.println("Podaci pohranjeni na Firebase");
  } else {
    Serial.println("Nemoguće pročitati podatke sa senzora!");
  }

  int diodaValue = Firebase.getInt("/dioda");

  if (diodaValue == 1) {
    Serial.println(diodaValue);
    digitalWrite(LED_BUILTIN, LOW); 
    delay(1000);
  } else {
    Serial.println(diodaValue);
    digitalWrite(LED_BUILTIN, HIGH); 
  }


  delay(2000); 
}
void connectToWiFi() {
  Serial.print("Connecting to WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
Serial.println(WiFi.localIP());
  Serial.println("\nConnected to WiFi");
}
