import gpio from 'rpi-gpio';

const gpiop = gpio.promise;

gpiop.setup(11, gpio.DIR_OUT)
    .then(() => {
        return gpiop.write(11, true);
    })
    .catch((err) => {
        console.log('Error: ', err.toString());
    });

process.on('SIGINT', gpiop.destroy);
