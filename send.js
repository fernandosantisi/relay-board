const { SerialPort } = require('serialport')

const port = '/dev/ttyUSB1';

const buffer = Buffer.from([0b11111111])

console.log(buffer)

const com = new SerialPort({
  path: port,
  baudRate: 19200,
  autoOpen: false,
});


com.on('open', function () {
  com.write(buffer, function (err) {
    if (err) {
      return console.log("Error on write: ", err.message);
    }

    console.log("Message sent successfully");
    // Wait for some time (e.g., 100ms) and then close the port
    setTimeout(() => {
      com.close((err) => {
        if (err) {
          console.error('Error closing the port:', err.message);
        } else {
          console.log('Port closed successfully.');
        }
      });
    }, 100);
  });
});

com.on('error', function (err) {
  console.error("Error on opening the port: ", err.message);
});
