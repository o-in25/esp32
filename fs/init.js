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
  thermistor: Cfg.get('board.thermistor')
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

  // run callback
  print('board initialized, running callback...');
  callback(board);
}

function readAdc(board) {
  let reading = ADC.read(board.thermistor);
  print('ADC raw reading: ', reading);
  let voltage = 3.3 * reading / 255;
  let resistance = 10000 * voltage / 3.3 - voltage;
  let log = ffi('int ffiLog(int)');
  let temperature = 1 / (((log(resistance/10000)) / 3950) + (1 / (273.15 + 25)));
  let celsius = temperature - 273.15;
  let fahrenheit = (celsius * 1.8) + 32;
  print('Value (C): ', celsius);
  print('Value (F): '. fahrenheit);
  return {fahrenheit: fahrenheit, celsius: celsius};
}

setup(board, function() {
  Timer.set(5000, Timer.REPEAT, readAdc(board));
});


