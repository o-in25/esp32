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
  constants: {
    ESP32_MAX_ADC: 4095,
    THERMISTOR_COEFFICENT: 3950,
    THERMISTOR_NOMINAL: 10000,
    TEMPERATURE_NOMINAL: 20,
    SECOND_IN_MS: 1000,
    MINUTE_IN_MS: 60000,
    MAX_BUFFER_SIZE: 1000
  },
  devices: {},
  buffer: [],
  pins: {
    led: Cfg.get('board.led'),
    dht11: Cfg.get('board.dht11'),
    thermistor: Cfg.get('board.thermistor'),
  },
  credentials: {
    clientId: Cfg.get('mqtt.client_id')
  }
};

function onSetup(board, callback) {
  // diagnostics
  print('Device ID: ', board.id);
  print('Thermistor pin: ', board.pins.thermistor);
  print('DHT-11 pin: ', board.pins.dht11);
  print('LED pin: ', board.pins.led);

  // set blinking light
  GPIO.set_mode(board.pins.led, GPIO.MODE_OUTPUT);
  GPIO.blink(board.pins.led, 1000, 1000);

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
  print('board initialized, running callback...');

  callback(board);
}

function readAnalog(board) {
  let reading = ADC.read(board.pins.thermistor);
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
  let fahrenheit = (celsius * 1.8) + 32;
  return {
    temperature: fahrenheit
  };

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

onSetup(board, function() {
  // set up mqtt subscription
  let topic = '/losant/' + board.credentials.clientId + '/command';
  MQTT.sub(topic, function(connection, topic, message) {
    print('MQTT message: ', message);
  }, null);

  // read dht every 10 min
  Timer.set(board.constants.MINUTE_IN_MS * 10, true, function(board) {
    let reading = readDigital(board);
    if(reading && reading.temperature || reading.humidity) {
      mqttPublish(board.credentials.clientId, { digitalTemperature: reading.temperature, humidity: reading.humidity});
    }
  }, board);

  // read thermistor every sec
  Timer.set(board.constants.SECOND_IN_MS, true, function(board) {
    let reading = readAnalog(board);
    if(reading && reading.temperature) {
      print('Analog reading (F): ', reading.temperature);
      if(board.buffer.length < board.constants.MAX_BUFFER_SIZE) {
        board.buffer.push(reading.temperature);
      }
    }
  }, board);

  // read buffer every 10 min
  Timer.set(board.constants.MINUTE_IN_MS * 10, true, function(board) {
    if(board.buffer.length) {
      let sum = 0;
      for(let i = 0; i < board.buffer.length; i++) {
        sum += board.buffer[i];
      }
      sum /= board.buffer.length;
      if(sum) {
        print('Buffer size: ', board.buffer.length);
        mqttPublish(board.credentials.clientId, { analogTemperature: sum });
        board.buffer = [];
      }
    }
  }, board);


});


