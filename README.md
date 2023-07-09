# JS-enabled demo Mongoose OS firmware

This is the JS demo Mongoose OS app. It gets installed by default at
[Mongoose OS installation step](https://mongoose-os.com/docs/). It has
a lot of functionality enabled - cloud integrations, JavaScript engine, etc.
Its main purpose is to demonstrate the capabilities of Mongoose OS.

#### MOS CLI Commands:

Local build: 

```mos build --local --platform ESP32 --deps-dir deps/ --libs-dir deps/ --verbose```


Config set (LED GPIO 5 example)

```mos config-set board.led=5```