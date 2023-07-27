const { SerialPort } = require("serialport");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Abre la conexión al puerto seteado para la placa
const port = new SerialPort({ path: "COM1", baudRate: 9600 }, function (err) {
  if (err) {
    return console.log("Error: ", err.message);
  }
});

port.on('open', function() {
//Abre el input para que el usuario pueda ingresar, por consola, el número de relay (1, 2, 3, 4)
readline.question("Ingrese qué relay quiere encender: ", (relay) => {
  let relayOn = parseInt(relay);
  let byte;

  if(relayOn < 1 || relayOn > 4){
    readline.close();
    return console.log(`El relay ${relayOn} no existe`);
  }

  switch (relayOn) {
    case 0:
      byte = 0;
      break;
    case 1:
      byte = 2;
      break;
    case 2:
      byte = 9;
      break;
    case 3:
      byte = 33;
      break;
    case 4:
      byte = 129;
      break;
  }

  const buffer = Buffer.from([byte]);

  const timeoutDuration = 1000; // 5 seconds (in milliseconds)
  
  port.write(buffer, function (err) {
    if (err) {
      return console.log("Error on write: ", err.message);
    }
    if(relayOn != 0){
      console.log(`Relay ${relayOn} encendido por ${timeoutDuration/1000}s`);
    }else{
      console.log(`Relays apagados`)
    }
  });
  // Set a timeout to turn off the relay after 5 seconds (adjust as needed)
  setTimeout(() => {
    const offBuffer = Buffer.from([0]); // Sending 0 to turn off the relay
    port.write(offBuffer, (err) => {
      if (err) {
        console.log("Error on write: ", err.message);
      } else {
        console.log("Relay apagado");
      }
      port.close(); // Close the serial port after writing data
      readline.close(); // Close the readline interface
    });
  }, timeoutDuration);
});
})