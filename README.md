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

Build and rebbot JavaScript"
```mos put fs/init.js && mos call Sys.Reboot```

Commands:

  ui                   Start GUI

  build                Build a firmware from the sources located in the current directory

  clone                Clone a repo

  flash                Flash firmware to the device

  flash-read           Read a region of flash

  flash-write          Write a region of flash

  console              Simple serial port console

  ls                   List files at the local device's filesystem

  get                  Read file from the local device's filesystem and print to stdout

  put                  Put file from the host machine to the local device's filesystem

  rm                   Delete a file from the device's filesystem

  ota                  Perform an OTA update on a device

  config-get           Get config value from the locally attached device

  config-set           Set config value at the locally attached device

  call                 Perform a device API call. "mos call RPC.List" shows available methods

  create-fw-bundle     Create or modify a firmware ZIP bundle from disparate parts.

  debug-core-dump      Debug a core dump

  aws-iot-setup        Provision the device for AWS IoT cloud

  azure-iot-setup      Provision the device for Azure IoT Hub

  gcp-iot-setup        Provision the device for Google IoT Core

  watson-iot-setup     Provision the device for IBM Watson IoT Platform

  mdash-setup          Provision the device for mDash

  update               Self-update mos tool; optionally update channel can be given (e.g. "latest", "release", or some exact version)

  license              License device

  license-save-key     Save license server key

  wifi                 Setup WiFi - shortcut to config-set wifi...

  help                 Show help. Add --full to show advanced commands

  version              Show version

  atca-get-config      Get ATCA chip config

  atca-set-config      Set ATCA chip config

  atca-lock-zone       Lock config or data zone

  atca-set-key         Set key in a given slot

  atca-gen-key         Generate a random key in a given slot

  atca-get-pub-key     Retrieve public ECC key from a given slot

  atca-gen-csr         Generate a random key in a given slot and generate a certificate request file

  atca-gen-cert        Generate a random key in a given slot and issue a certificate

  esp32-efuse-get      Get ESP32 eFuses

  esp32-efuse-set      Set ESP32 eFuses

  esp32-encrypt-image  Encrypt a ESP32 firmware image

  esp32-gen-key        Generate and program an encryption key

  eval-manifest-expr   Evaluate the expression against the final manifest

  git-credentials      Git credentials helper mode

  ports                Show serial ports

Global Flags:

      --add_dir_header                      If true, adds the file directory to the header of the log messages

      --alsologtostderr                     log to standard error as well as files

      --arch string                         Deprecated, please use --platform instead

      --atca-slot int                       When using ATCA, use this slot for key storage.

      --attr stringArray                    manifest attribute, can be used multiple times

      --auth-file string                    Where to store license server auth key (default "~/.mos/auth.json")

      --aws-cert-file string                Certificate/public key file

      --aws-enable-greengrass               Enable AWS Greengrass support

      --aws-iot-policy string               Attach this policy to the generated certificate (default "mos-default")

      --aws-iot-thing string                Attach the generated certificate to this thing. By default uses device ID. Set to '-' to not attach certificate to any thing.

      --aws-key-file string                 Private key file

      --aws-mqtt-server string              If not specified, calls DescribeEndpoint to get it from AWS

      --aws-profile string                  AWS profile to use

      --aws-region string                   AWS region to use. If not specified, uses the default

      --azure-auth-method string            Azure IoT Device authentication method: x509_thumbprint, x509_ca, shared_private_key (default "x509_thumbprint")

      --azure-cert-file string              Certificate/public key file

      --azure-connection-string string      Azure connection string

      --azure-device-id string              Azure IoT device ID. If not set, taken from the device itself.

      --azure-device-status string          Azure IoT Device status upon creation (default "enabled")

      --azure-hub-host-name string          Azure IoT hub host name

      --azure-hub-name string               Azure IoT hub name

      --azure-key-file string               Private key file

      --azure-resource-group string         Azure resource group

      --azure-skip-cli-check                Skip Azure CLI check, assume it's ok

      --baud-rate int                       Serial port speed (default 115200)

      --binary-libs-dir string              Directory to put binary libs under. Default is build_dir/objs

      --board string                        Board name.

      --build-cmd-extra stringArray         extra make flags, added at the end of the make command. Can be used multiple times.

      --build-dir string                    Directory to put build output under. Default is project_dir/build

      --build-docker-extra stringArray      extra docker flags, added before image name. Can be used multiple times: e.g. --build-docker-extra -v --build-docker-extra /foo:/bar.

      --build-docker-no-mounts              if set, then mos will not add bind mounts to the docker invocation. For build to work, volumes will need to be provided externally via --build-docker-extra, e.g. --build-docker-extra=--volumes-from=outer

      --build-dry-run                       do not actually run the build, only prepare

      --build-image string                  Override the Docker image used for build.

      --build-info string                  

      --build-parallelism int               build parallelism. default is to use number of CPUs.

      --build-params string                 build params file

      --build-target string                 target to build with make (default "all")

      --build-var strings                   Build variable in the format "NAME=VALUE". Can be used multiple times.

      --ca-cert-file string                 CA certificate file name

      --ca-key-file string                  CA key file name (for cert signing)

      --catch-core-dumps                    Catch and save core dumps (default true)

      --cc3200-format-slfs-size int         Format SLFS for this flash size (bytes) (default 1048576)

      --cc3220-bpi-binary string            Path to BuildProgrammingImage binary. If not set will try looking in the default TI dir.

      --cdef strings                        C/C++ define in the format "NAME=VALUE". Can be used multiple times.

      --cert-cn string                      Common name for the certificate. By default uses device ID.

      --cert-days int                       new cert validity, days

      --cert-file string                    Certificate file name

      --cert-template string                cert template to use

      --cert-type string                    Type of the key for new cert, RSA or ECDSA. Default is ECDSA.

      --cert-validity duration              Generated certificate validity (default 87648h0m0s)

      --cflags-extra stringArray            extra C flag, appended to the "cflags" in the manifest. Can be used multiple times.

  -C, --chdir string                        Change into this directory first

      --checksums strings                    (default [sha1])

      --chunk-size int                      Chunk size for operations (default 512)

      --clean                               Perform a clean build, wipe the previous build state

      --commit-timeout duration             If set, update must be explicitly committed within this time after finishing (default 5m0s)

      --compress                            

      --credentials string                  Credentials to use when accessing protected resources such as Git repos and their assets. Can be comma-separated list of host:token entries or refer to a file @/path/to/credentials (one entry per line).

      --csr-template string                 CSR template to use

      --cxxflags-extra stringArray          extra C++ flag, appended to the "cxxflags" in the manifest. Can be used multiple times.

      --deps-dir string                     Directory to fetch libs, modules into

      --deps-versions string                If specified, this file will be consulted for all libs and modules versions

      --description string                  

      --device-id string                    Device ID

      --device-pass string                  Device pass/key

      --dry-run                             Do not apply changes, print what would be done (default true)

  -X, --enable-extended                     Deprecated. Enable extended commands

      --esp-baud-rate uint                  Data port speed during flashing. 0 - don't change (== --esp-rom-baud-rate) (default 921600)

      --esp-boot-after-flashing             Boot the firmware after flashing (default true)

      --esp-data-port string                If specified, this port will be used to send data during flashing. If not set, --port is used.

      --esp-enable-compression              Compress data while writing to flash. Usually makes flashing faster. (default true)

      --esp-erase-chip                      Erase entire chip before flashing

      --esp-flash-params string             Flash chip params. Either a comma-separated string of mode,size,freq or a number. Mode must be one of: qio, qout, dio, dout. Valid values for size are: 2m, 4m, 8m, 16m, 32m, 16m-c1, 32m-c1, 32m-c2. If left empty, an attempt will be made to auto-detect. freq is SPI frequency and can be one of 20m, 26m, 40m, 80m

      --esp-minimize-writes                 Minimize the number of blocks to write by comparing current contents with the images being written (default true)

      --esp-rom-baud-rate uint              Data port speed when talking to ROM loader (default 115200)

      --esp32-enable-flash-encryption       Enable flash encryption. This sets a typical set of eFuse options used with flash encryption.

      --esp32-encryption-key-file string    If specified, this file will be used to encrypt data before flashing. Encryption is only applied to parts with encrypt=true.

      --esp32-fake-fuses                    Use fake eFuse controller implementation, for testing

      --esp32-flash-address uint32          

      --esp32-flash-crypt-conf uint32       Value of the FLASH_CRYPT_CONF eFuse setting, affecting how key is tweaked. (default 15)

      --esp32-protect-key                   Write and read-protect the key inside the device. (default true)

      --extra-attr stringArray              manifest extra attribute info to be added to ZIP

      --firmware string                     Firmware .zip file location (file of HTTP URL) (default "build\\fw.zip")

      --flash-timeout duration              Maximum flashing time (default 1m0s)

      --force                               Use the force

      --format string                       Config format, hex or json

      --fs-op-attempts int                  Chunk size for operations (default 3)

      --full                                Show full help, including advanced flags

      --fw-elf-file string                  Path to teh firmware ELF file

      --gcp-cert-file string                Certificate/public key file

      --gcp-key-file string                 Private key file

      --gcp-project string                  Google IoT project ID

      --gcp-region string                   Google IoT region

      --gcp-registry string                 Google IoT device registry

      --gcp-rpc-create-topic                Create RPC topic plumbing if needed

      --gdb-server-cmd string                (default "/usr/local/bin/serve_core.py")

      --gen-dir string                      Directory to put generated output under. Default is build_dir/gen

      --gh-token string                     Deprecated, please use --credentials

      --hexdump int[=16]                    Output console as hexdump

      --http-addr string                    Web UI HTTP address (default "127.0.0.1:1992")

      --hw-flow-control                     Enable hardware flow control (CTS/RTS)

  -i, --input string                        

      --inverted-control-lines              DTR and RTS control lines use inverted polarity

      --keep-fs                             When flashing, skip the filesystem parts

      --keep-temp-files                     keep temp files after the build is done (by default they are in ~/.mos/tmp)

      --key-file string                     Key file name

      --level int                           Config level; default - runtime (default -1)

      --lib stringArray                     location of the lib from mos.yaml, in the format: "lib_name:/path/to/location". Can be used multiple times.

      --lib-extra stringArray               Extra libs to add to the app being built. Value should be a YAML string. Can be used multiple times.

      --libs-dir strings                    Directory to find libs in. Can be used multiple times.

      --libs-update-interval duration       how often to update already fetched libs (default 1h0m0s)

      --license-server string               License server address (default "https://license.mongoose-os.com")

      --license-server-key string           License server key

      --local                               Local build.

      --log_backtrace_at traceLocation      when logging hits line file:N, emit a stack trace (default :0)

      --log_dir string                      If non-empty, write log files in this directory

      --log_file string                     If non-empty, use this log file

      --log_file_max_size uint              Defines the maximum size a log file can grow to. Unit is megabytes. If the value is 0, the maximum file size is unlimited. (default 1800)

      --logtostderr                         log to standard error instead of files

  -l, --long                                Long output format.

      --manifest string                    

      --mgrpc-compat-args                   Use args field in the RPC frame, for compatibility with older firmware

      --migrate                             Migrate data from the previous version if needed (default true)

      --module stringArray                  location of the module from mos.yaml, in the format: "module_name:/path/to/location". Can be used multiple times.

      --modules-dir string                  Directory to store modules into

      --mos-src-path string                 Path to mos fw sources

      --name string                        

      --no-input                            Do not read from stdin, only print device's output to stdout

      --no-libs-update                      if true, never try to pull existing libs (treat existing default locations as if they were given in --lib)

      --no-platform-check                   override platform support check

      --no-reboot                           Save config but don't reboot the device.

      --no-save                             Don't save config and don't reboot the device

      --one_output                          If true, only write logs to their native severity level (vs also writing to each lower severity level)

  -o, --output string                      

      --pass string                         Cloud password or token

      --pid string                           (default "mos")

      --platform string                     Hardware platform

      --port string                         Serial port where the device is connected. If set to 'auto', ports on the system will be enumerated and the first will be used. (default "auto")

      --prefer-prebuilt-libs                if both sources and prebuilt binary of a lib exists, use the binary

      --reconnect                           Enable reconnection

      --repo string                         Path to the mongoose-os repository; if omitted, the mongoose-os repository will be cloned as ./mongoose-os

      --rpc-creds string                    Either "username:passwd" or "@filename" which contains username:passwd

      --rpc-uart-no-delay                   Do not introduce delay into UART over RPC

      --rs-erase-chip                       Erase chip when flashing

      --save-build-stat                     save build statistics (default true)

      --server string                       FWBuild server (default "https://build.mongoose-os.com")

      --set-control-lines                   Set RTS and DTR explicitly when in console/RPC mode (default true)

      --sign-key stringArray                Signing private key file name. Can be used multiple times for multipl signatures.

      --skip_headers                        If true, avoid header prefixes in the log messages

      --skip_log_headers                    If true, avoid headers when opening log files

      --source-glob strings                 glob to use for source dirs. Can be used multiple times. (default [*.c,*.cpp])

      --src-dir string                      

      --start-browser                       Automatically start browser (default true)

      --state-file string                   Where to store internal mos state (default "~/.mos/state.json")

      --stderrthreshold severity            logs at or above this threshold go to stderr (default 2)

      --stm32-stflash-path string           Path to the st-flash utility (from the https://github.com/texane/stlink package). If set to empty, will not attempt to use ST-Flash. (default "st-flash")

      --strict-deps-versions                If set, then --deps-versions will be in strict mode: missing deps will be disallowed (default true)

      --subject string                      Subject for CSR or certificate

      --temp-dir string                     Directory to store temporary files (default "~/.mos/tmp")

      --timeout duration                    Timeout for the device connection and call operation (default 20s)

      --timestamp string[="true"]           Prepend each line with a timestamp in the specified format. A number of specifications are supported:simple 'yes' or 'true' will use UNIX Epoch + .microseconds; the Go way of specifying date/time format, as described in https://golang.org/pkg/time/, including the constants (so --timestamp=UnixDate will work, as will --timestamp=Stamp); the strftime(3) format (see http://strftime.org/) (default "StampMilli")

      --try-once                            When saving the config, do it in such a way that it's only applied on the next boot

      --uid string                          

      --update-timeout duration             Timeout for entire update operation (default 10m0s)

      --use-atca                            Use ATCA (ATECCx08A) to store private key.

      --use-go-git                          use internal Git library (go-git)

      --use-shell-git                       use external git binary instead of internal implementation

      --user string                         Cloud username

  -v, --v Level                             number for the log level verbosity

      --verbose                             Verbose output

      --vmodule moduleSpec                  comma-separated list of pattern=N settings for file-filtered logging

      --watson-api-auth-token string        IBM cloud API auth token

      --watson-api-host-name string         IBM cloud API host name

      --watson-api-key string               IBM cloud API key

      --watson-device-auth-token string     IBM cloud device auth token

      --watson-device-id string             IBM cloud device ID

      --watson-device-type string           IBM cloud device type (default "mos")

      --watson-messaging-host-name string   IBM cloud host name

      --watson-org-id string                IBM cloud organization ID (default "quickstart")

      --web-root string                     UI Web root to use instead of built-in

      --write-key string                    Write key file