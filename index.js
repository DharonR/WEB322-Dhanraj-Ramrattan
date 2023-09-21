const EventEmitter = require("events");

const trafficLights = new EventEmitter();

//Array and index for array to hold colors
const lightColors = ['Red', 'Green', 'Yellow'];
let currentLightIndex = 0; //default is set to the index for Red

function changeLights() {
    trafficLights.emit('changeColor', lightColors[currentLightIndex]);
    // console.log("Current Light: ", lightColors[currentLightIndex]);

    let delay = 5000;
    if(lightColors[currentLightIndex] === 'Yellow'){
        delay = 2000;
    }

    setTimeout(() => {
        currentLightIndex = (currentLightIndex + 1) % 3;
        changeLights();
    }, delay);
}

changeLights();



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
    console.log('Current Light: ', color);
})

//Initial Statement
console.log("Current Light: ", lightColors[0]);
