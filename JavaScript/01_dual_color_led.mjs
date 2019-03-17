import gpio from 'pigpio';

const {Gpio} = gpio;
const colors = [0xFF00, 0x00FF, 0x0FF0, 0xF00F];
const redPin = new Gpio(18, {mode: Gpio.OUTPUT});
const greenPin = new Gpio(17, {mode: Gpio.OUTPUT});

async function main() {
    redPin.pwmFrequency(2000);
    greenPin.pwmFrequency(2000);
    redPin.pwmWrite(0);
    greenPin.pwmWrite(0);
    while (true) {
       await loop();
    }
}

async function loop () {
    for (const color of colors) {
        console.log(color);
        const redDutyCycle = calculateDutyCycle(color >> 8, 0, 255, 0, 100);
        const greenDutyCycle = calculateDutyCycle(color & 0x00FF, 0, 255, 0, 100);
        console.log(redDutyCycle);
        console.log(greenDutyCycle);
        redPin.pwmWrite(redDutyCycle);
        greenPin.pwmWrite(greenDutyCycle);
        await later(500);
    }
    return;
}

function calculateDutyCycle (value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function later(delay) {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });
}

// process.on('SIGINT', gpiop.destroy);
main();
