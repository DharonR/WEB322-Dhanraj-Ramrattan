const EventEmitter = require("events");

const trafficLights = new EventEmitter();

//Array and index for array to hold colors
const lightColors = ['Red', 'Yellow', 'Green'];
let currentLightIndex = 0; //default is set to the index for Red

function changeLights() {
    trafficLights.emit('changeColor', lightColors[currentLightIndex]);
    console.log("Current Light: ", lightColors[currentLightIndex]);
    currentLightIndex++;
    if(currentLightIndex == 3){ currentLightIndex = 0;};
}

if (currentLightIndex < 3){
    if (currentLightIndex == 0){
        setInterval(changeLights, 5000);
    }
    else if (currentLightIndex == 1){
        setInterval(changeLights, 2000);
    }
    else if (currentLightIndex == 2){
        setInterval(changeLights, 5000);
    }
};

// EventEmitter function
trafficLights.on('changeColor', (color) => {
    console.log('Current Light: ', color);
})

//Start
console.log("Current Light: ", lightColors[currentLightIndex]);