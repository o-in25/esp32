/* eslint-disable no-restricted-syntax */
load('api_gpio.js');
load('api_dht.js');
load('api_timer.js');
load('api_config.js');
load('api_mqtt.js');
load('api_sys.js');
load('api_adc.js');
load('api_http.js');
load('api_pwm.js');

let board = {
  id: Cfg.get('board.id'),
  constants: {
    ESP32_MAX_ADC: 4095,
    THERMISTOR_COEFFICENT: 3950,
    THERMISTOR_NOMINAL: 10000,
    TEMPERATURE_NOMINAL: 20,
    SECOND_IN_MS: 1000,
    MINUTE_IN_MS: 60000,
    RGB_FREQUENCY: 1000
  },
  devices: {},
  buffer: [],
  pins: {
    button: Cfg.get('board.button'),
    rgb: {
      r: Cfg.get('board.rgb.r'),
      g: Cfg.get('board.rgb.g'),
      b: Cfg.get('board.rgb.b')
    },
    dht11: Cfg.get('board.dht11'),
    thermistor: Cfg.get('board.thermistor')
  },
  credentials: {
    clientId: Cfg.get('mqtt.client_id')
  },
  colors: {
    
  }
};

let hexToDecimal = ffi("int hexToDecimal(char*)");

function onSetup(callback) {
  print('setting up board...');
  print('Device ID: ', board.id);
  print('Thermistor pin: ', board.pins.thermistor);
  print('DHT-11 pin: ', board.pins.dht11);
  print('LED RGB pin: ', JSON.stringify(board.pins.rgb));
  GPIO.set_button_handler(board.pins.button, GPIO.PULL_DOWN, GPIO.INT_EDGE_NEG, 200, onButtonPress, {name: "fal"});

  // set up adc
  let adcEnabled = ADC.enable(board.pins.thermistor) === 1;
  print('ADC enabled: ', adcEnabled);

  // check up mqtt
  let mqtConnected = MQTT.isConnected();
  print('MQTT connected: ', mqtConnected);

  // create dht
  let dht = DHT.create(board.pins.dht11, DHT.DHT11);
  board.devices.dht = dht;

  // run callback
  print('set up done, running callback...');
  callback(board);
}

function readAnalog(board) {
  let reading = ADC.read(board.pins.thermistor);
  reading = (board.constants.ESP32_MAX_ADC / reading)  - 1;
  reading = 10000 / reading; // 10k ohms
  let temperature = reading / board.constants.THERMISTOR_NOMINAL;
  temperature = Math.log(temperature);
  temperature /= board.constants.THERMISTOR_COEFFICENT;
  temperature += 1.0 / (board.constants.TEMPERATURE_NOMINAL + 273.15);
  temperature = 1 / temperature;
  let celsius = temperature - 273.15;
  let fahrenheit = (celsius * 1.8) + 32;
  return fahrenheit;

}

function readDigital(board) {
  let celsius = board.devices.dht.getTemp() || 0;
  let humidity = board.devices.dht.getHumidity() || 0;
  let fahrenheit = (celsius * 1.8) + 32;
  return {
    temperature: fahrenheit,
    humidity: humidity
  };
}

function mqttPublish(clientId, data) {
  let topic = '/losant/' + clientId + '/state';
  let message = JSON.stringify({ data: data });
  let result = MQTT.pub(topic, message, 1);
  print(result? 'MQTT message published' : 'MQTT message failed to publish');
}


function onButtonPress(data, args) {
  print('YOOOOOOOOOOOO', args);

}

function hexToRgb(hex) {
  if(hex.charCodeAt(0) === 35) {
    hex = hex.slice(1, hex.length);
  }
  let red = hex.slice(0, 2);
  red = hexToDecimal(red);
  let green = hex.slice(2, 4);
  green = hexToDecimal(green);
  let blue = hex.slice(4, 6);
  blue = hexToDecimal(blue);
  return {
    r: red,
    g: green,
    b: blue
  };
}

function setRgbLed(board, hex) {
  let rgb = hexToRgb(hex);
  PWM.set(board.pins.rgb.r, board.constants.RGB_FREQUENCY, rgb.r / 255);
  PWM.set(board.pins.rgb.g, board.constants.RGB_FREQUENCY, rgb.g / 255);
  PWM.set(board.pins.rgb.b, board.constants.RGB_FREQUENCY, rgb.b / 255);
}

onSetup(function(board) {
  setRgbLed(board, '#00FF00');
  Timer.set(board.constants.SECOND_IN_MS * 30, true, function(board) {
    let reading = readDigital(board);
    let message = {};
    message.digitalTemperature = reading.temperature || 0;
    message.humidity = reading.humidity || 0;
    print('Digital temperature: ', message.digitalTemperature);
    print('Humidity: ', message.humidity);
    reading = readAnalog(board);
    message.analogTemperature = reading || 0;
    print('Analog temperature: ', reading || 0);
    mqttPublish(board.credentials.clientId, message);
  }, board);
});
