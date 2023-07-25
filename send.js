const { SerialPort } = require('serialport')
const port = new SerialPort({ path: 'COM1', baudRate: 9600 }, function (err) {
  if (err) {
    return console.log('Error: ', err.message)
  }
})

const buffer = Buffer.from([9])

setTimeout(() => {

  port.write(buffer, function(err) {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log(buffer)
  })
  port.close()
}, "1000");
