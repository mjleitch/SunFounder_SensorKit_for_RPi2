import onoff from 'onoff';

const {Gpio} = onoff;

// Setup the GPIO pins
const greenPin = new Gpio (27, 'out');
const redPin   = new Gpio (18, 'out');
const btnPin   = new Gpio(17, 'in', 'both', {debounceTimeout: 10});

redPin.writeSync(1);

// Defines listener to handle button presses
btnPin.watch((err, val) => {
    if (err) { throw err; }
    switch(val) {
        case 0: 
            console.log('Button Pressed!');
            redPin.writeSync(0);
            greenPin.writeSync(1);
            break;
        case 1:
            console.log('Button Released!');
            redPin.writeSync(1);
            greenPin.writeSync(0);
            break;
    }
});

// handles cleanup on exit
process.on('SIGINT', () => {
    btnPin.unexport();
    greenPin.unexport();
    redPin.unexport();
});

/* 
   def Led(x):
	if x == 0:
		GPIO.output(redPin, 1)
		GPIO.output(greenPin, 0)
	if x == 1:
		GPIO.output(redPin, 0)
		GPIO.output(greenPin, 1)
*/
function toggleLed(value) {
    switch(value) {
        case 0:
            // red light should turn on
            // green light should turn off
            break;
        case 1:
            // red light should turn off 
            // green light should turn on 
            break;
    }
    return;
}

/*
def Print(x):
	if x == 0:
		print '    ***********************'
		print '    *   Button Pressed!   *'
		print '    ***********************'
*/
function log(value) {
    switch(value){
        case 0:
            console.log('***********************');
            console.log('*   Button Pressed!   *');
            console.log('***********************');
            break;
        case 1: break;
            console.log('***********************');
            console.log('*  Button Released!   *');
            console.log('***********************');
            break;
    }
}

