/* eslint-disable no-restricted-syntax */
load('api_gpio.js');
load('api_dht.js');
load('api_timer.js');
load('api_config.js');
load('api_mqtt.js');
load('api_sys.js');
load('api_adc.js');

let board = {
  id: Cfg.get('board.id'),
  led: Cfg.get('board.led'),
  dht11: Cfg.get('board.dht11'),
  thermistor: Cfg.get('board.thermistor'),
  constants: {
    ESP32_MAX_ADC: 4095,
    THERMISTOR_COEFFICENT: 3950,
    THERMISTOR_NOMINAL: 10000,
    TEMPERATURE_NOMINAL: 20
  },
  devices: {},
  credentials: {
    clientId: Cfg.get('mqtt.client_id')
  }
};

function setup(board, callback) {
  // diagnostics
  print('Device ID: ', board.id);
  print('Thermistor pin: ', board.thermistor);
  print('DHT-11 pin: ', board.dht11);
  print('LED pin: ', board.led);

  // set blinking light
  GPIO.set_mode(board.led, GPIO.MODE_OUTPUT);
  GPIO.blink(board.led, 1000, 1000);

  // set up adc
  let adcEnabled = ADC.enable(board.thermistor) === 1;
  print('ADC enabled: ', adcEnabled);

  // check up mqtt
  let mqtConnected = MQTT.isConnected();
  print('MQTT connected: ', mqtConnected);

  // create dht
  let dht = DHT.create(board.dht11, DHT.DHT11);
  board.devices.dht = dht;

  // run callback
  print('board initialized, running callback...');
  callback(board);
}

function readAnalog(board) {
  let reading = ADC.read(board.thermistor);
  print('ADC from thermistor: ', reading);
  reading = (board.constants.ESP32_MAX_ADC / reading)  - 1;
  reading = 10000 / reading; // 10k ohms
  // print('Thermistor resistance: ', reading);
  let temperature = reading / board.constants.THERMISTOR_NOMINAL;
  temperature = Math.log(temperature);
  temperature /= board.constants.THERMISTOR_COEFFICENT;
  temperature += 1.0 / (board.constants.TEMPERATURE_NOMINAL + 273.15);
  temperature = 1 / temperature;
  let celsius = temperature - 273.15;
  // celsius = Math.round(celsius);
  print('Analog temperature (C): ', celsius);
  let fahrenheit = (celsius * 1.8) + 32;
  // fahrenheit = Math.round(fahrenheit);
  print('Analog temperature (F): ', fahrenheit);

  return { celsius: celsius, fahrenheit: fahrenheit };

}

function readDigital(board) {
  let dht = DHT.create(board.dht11, DHT.DHT11);
  let celsius = dht.getTemp();
  // celsius = Math.round(celsius);
  print('Digital temperature (C): ', celsius);
  let fahrenheit = (celsius * 1.8) + 32;
  // fahrenheit = Math.round(fahrenheit);
  print('Digital temperature (F): ', fahrenheit);

  return { celsius: celsius, fahrenheit: fahrenheit };
}

function publish(clientId, data) {
  print('Client ID ', clientId);
  let topic = '/losant/' + clientId + '/state';
  let message = JSON.stringify({ data: data });
  let result = MQTT.pub(topic, message, 1);
  print(result? 'MQTT message published' : 'MQTT message failed to publish');

}

setup(board, function() {
  Timer.set(600000, true, function(board) {
    let data = {};
    let analogTemperature = readAnalog(board);
    let digitalTemperature = readDigital(board);

    if(analogTemperature.celsius || analogTemperature.fahrenheit) {
      data.analogTemperature = analogTemperature.fahrenheit;
    }

    if(digitalTemperature.celsius || digitalTemperature.fahrenheit) {
      data.digitalTemperature = digitalTemperature.fahrenheit;
    }

    if(data.analogTemperature || data.digitalTemperature) {
      publish(board.credentials.clientId, data);
    }

    data = {};
    analogTemperature = 0;
    digitalTemperature = 0;

  }, board);
});


