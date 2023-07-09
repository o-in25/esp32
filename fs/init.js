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
  print('ESP32 max ADC size: ', board.constants.ESP32_MAX_ADC);

  // run callback
  print('board initialized, running callback...');
  callback(board);
}

function readAdc(board) {
  let reading = ADC.read(board.thermistor);
  if(reading <= 0) {
    return;
  }

  print('ADC from thermistor: ', reading);
  reading = (board.constants.ESP32_MAX_ADC / reading)  - 1;
  reading = 10000 / reading; // 10k ohms
  print('Thermistor resistance: ', reading);
  let temperature = reading / board.constants.THERMISTOR_NOMINAL;
  temperature = Math.log(temperature);
  temperature /= board.constants.THERMISTOR_COEFFICENT;
  temperature += 1.0 / (board.constants.TEMPERATURE_NOMINAL + 273.15);
  temperature = 1 / temperature;
  let celsius = temperature - 273.15;
  print('Temperature (C): ', celsius);
}

setup(board, function() {
  Timer.set(1000, true, function(board) {
    readAdc(board);
  }, board);
});


