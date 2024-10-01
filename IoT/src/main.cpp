#include <DHT.h>
#include <Arduino.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>
#include <PubSubClient.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <stdlib.h> 

#define DHTPIN 5 // DHT11 data pin (GPIO4)
#define DHTTYPE DHT11
// #define MQTT_SERVER "192.168.128.1" // Wifi IP
// #define MQTT_SERVER "172.20.10.2" // Wifi IP
#define MQTT_SERVER "192.168.1.191" // Wifi IP
#define MQTT_PORT 2222
#define MQTT_TOPIC "iot_NgocYen" // Chủ đề duy nhất
const char *ssid = "Hiep";       // Wifi name
const char *password = "123456788@"; // Wifi password

// const char *ssid = "nopassword";       // Wifi name
// const char *password = "88888888"; // Wifi password

const int fan = 12;
const int light = 27;
const int ac = 25;
const int add = 33;

const int photoPin = 34;


WiFiClient espClient;
PubSubClient client(espClient);

// DHT sensor
DHT dht(DHTPIN, DHTTYPE);

unsigned long lastMsgTime = 0;
const long interval = 2000;

void setup_wifi()
{
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  { // Wait for connection
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char *topic, byte *payload, unsigned int length)
{
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");

  // Convert payload to String safely
  String message;
  for (unsigned int i = 0; i < length; i++)
  {
    message += (char)payload[i];
  }
  Serial.println(message);

//   // Parse the message as JSON
  StaticJsonDocument<256> doc;
  DeserializationError error = deserializeJson(doc, message);

  if (error)
  {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    return;
  }

  // Kiểm tra loại thông điệp: thay đổi trạng thái thiết bị từ FE gửi
  if (doc.containsKey("action_from_nodeJS"))
  {
    const char *device = doc["device"];
    const char *action = doc["action"];
    bool stateChanged = false;
    // Xử lý yêu cầu bật/tắt thiết bị
    if (strcmp(device, "fan") == 0)
    {
      if (strcmp(action, "on") == 0)
      {
        digitalWrite(fan, HIGH);
        Serial.println("Fan: ON");
         
      }
      else if (strcmp(action, "off") == 0)
      {
        digitalWrite(fan, LOW);
        Serial.println("Fan: OFF");
        stateChanged = true;
      }
    }
    else if (strcmp(device, "light") == 0)
    {
      if (strcmp(action, "on") == 0)
      {
        digitalWrite(light, HIGH);
        Serial.println("Light: ON");
        stateChanged = true;
      }
      else if (strcmp(action, "off") == 0)
      {
        digitalWrite(light, LOW);
        Serial.println("Light: OFF");
        stateChanged = true;
      }
    }
    else if (strcmp(device, "ac") == 0)
    {
      if (strcmp(action, "on") == 0)
      {
        digitalWrite(ac, HIGH);
        Serial.println("Air Condition: ON");
        stateChanged = true;
      }
      else if (strcmp(action, "off") == 0)
      {
        digitalWrite(ac, LOW);
        Serial.println("Air Condition: OFF");
        stateChanged = true;
      }
    }
    // Đọc trạng thái thiết bị và gửi thông tin cập nhật
        StaticJsonDocument<256> doc;
        doc["changeSuccess"] = true;
        doc["device"] = device;
        doc["status"] = action;
        char jsonBuffer[512];
        serializeJson(doc, jsonBuffer);
        client.publish(MQTT_TOPIC, jsonBuffer); 
  }
}
 void setup()
 {
   Serial.begin(115200);
   dht.begin();
   Wire.begin();

   setup_wifi();
   client.setServer(MQTT_SERVER, MQTT_PORT);
   client.setCallback(callback);

   pinMode(fan, OUTPUT);
   pinMode(light, OUTPUT);
   pinMode(ac, OUTPUT);
   pinMode(add , OUTPUT);

   digitalWrite(fan, HIGH);
   digitalWrite(light, HIGH);
   digitalWrite(ac, HIGH);
   digitalWrite(add, HIGH);

   // Đăng ký chủ đề duy nhất để nhận tất cả thông báo
   client.subscribe(MQTT_TOPIC);
 }

 void reconnect()
 {
   while (!client.connected())
   {
     Serial.print("Attempting MQTT connection...");
     if (client.connect("ArduinoClient" , "b21dccn809" , "123456"))
     {
       Serial.println("connected");
        // Subscribe to the unified topic
       client.subscribe(MQTT_TOPIC);
     }
     else
     {
       Serial.print("failed, rc=");
       Serial.print(client.state());
       Serial.println(" try again in 5 seconds");
       delay(1000);
     }
   }
 }
 void loop()
 {
   if (!client.connected())
   {
     reconnect();
   }
   client.loop();
   unsigned long currentMillis = millis();
   if (currentMillis - lastMsgTime >= interval) {
     lastMsgTime = currentMillis;

   float humidity = dht.readHumidity();
   float temperature = dht.readTemperature();
   float lux = (analogRead(photoPin)/4) + 1;

  //  if(lux >= 1){
  //   if(digitalRead(add) == HIGH)digitalWrite(add , LOW);
  //   else digitalWrite(add , HIGH);
  //  }

   if (isnan(humidity) || isnan(temperature))
   {
     Serial.println("Failed to read from DHT sensor!");
     return;
   }

    // Đọc trạng thái thiết bị và gửi thông tin cập nhật
   StaticJsonDocument<256> doc;
   doc["humidity"] = humidity;
   doc["temperature"] = temperature;
   doc["lux"] = lux;
   doc["fan"] = (digitalRead(fan) == HIGH) ? 1 : 0;
   doc["light"] = (digitalRead(light) == HIGH) ? 1 : 0;
   doc["ac"] = (digitalRead(ac) == HIGH) ? 1 : 0;

   char jsonBuffer[512];
   serializeJson(doc, jsonBuffer);
   client.publish(MQTT_TOPIC, jsonBuffer); // Gửi thông tin thiết bị và cảm biến
   }
 }


