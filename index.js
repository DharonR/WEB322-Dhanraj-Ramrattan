const EventEmitter = require("events");

const trafficLights = new EventEmitter();

//Array and index for array to hold colors
const lightColors = ['Green', 'Yellow', 'Red'];
let currentLightIndex = 0; //default is set to the index for Red

function changeLights() {
    trafficLights.emit('changeColor', lightColors[currentLightIndex]);
    console.log("Current Light: ", lightColors[currentLightIndex]);
    currentLightIndex++;
    if(currentLightIndex == 3){ currentLightIndex = 0;}
}



// setInterval(() => {
//     if (currentLightIndex == 0 || currentLightIndex == 2){
//         setInterval(changeLights, 5000);
//     }
//     else {
//         setInterval(changeLights, 2000);
//     }
// }, 5000);

// if (currentLightIndex < 3){
//     if (currentLightIndex == 0 || currentLightIndex == 2){
//         setInterval(changeLights, 5000);
//     }
//     else {
//         setInterval(changeLights, 2000);
//     }
// };

// EventEmitter function
trafficLights.on('changeColor', (color) => {
    //console.log('Current Light: ', color);
})

//Start
console.log("Current Light: ", lightColors[2]);
