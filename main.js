//var faker = require('./faker.js');
 
const players = document.getElementById("players");
const number = document.getElementById("number");

function begin() {
  start(number.value);
  document.getElementById("pic").style = "display: block";

}

class Gladiator {
    constructor(health, power, speed, name) {
        this.name = name;
        this.initial_health = health;
        this.health = health;
        this.initial_power = power;
        this.power = power;
        this.initial_speed = speed;
        this.speed = this.initial_speed * (this.health/this.initial_health);   
    }
    attackTo (arr) {
        let miliseconds = 5000 / this.speed;
        let timeOut;
        let filteredArr = arr.filter((gladiator) => { 
            return gladiator.name != this.name;
        });
        timeOut = setTimeout(() => {
            let random_index = Math.floor(Math.random() * filteredArr.length);
            let opponent = filteredArr[random_index];
           
            hit.call(this, arr, opponent);
        }, miliseconds);
    } 
    stopHitting () {
        clearTimeout(this.timeout)
    }
    continueHitting (arr) {
        this.attackTo(arr);
    }
}

let health = () => Math.round(Math.random() * 20 + 80) ;
let power = () => (Math.random() * 3 + 2).toFixed(1);
let speed = () => (Math.random() * 4 + 1).toFixed(3);
let name = () => faker.name.findName();

function createGladiatorArr(size) {
    let glArr = [];
    for (i = 0; i < size; i++) {
        let gladiator = new Gladiator(health(), power(), speed(), name());
        glArr.push(gladiator);
    }
    return glArr;
} 

function start(size) {
   let gladiatorsArr = createGladiatorArr(size);
   gladiatorsArr.forEach(gl => {
        gl.attackTo(gladiatorsArr);
    });
}

function hit(arr, opponent) {

    if(arr.length > 1) {
        
        players.innerHTML +=`<p class="list-group-item list-group-item-light p-1" >[${this.name} x ${Math.round(this.health)}] hits [${opponent.name} x ${Math.round(opponent.health)}] with power ${this.power}</p>`

        // console.log(`[${this.name} x ${Math.round(this.health)}] hits` +
        //  ` [${opponent.name} x ${Math.round(opponent.health)}] with power ${this.power}`);

        opponent.health -= this.power;
        if (opponent.health >= 15 && opponent.health <= 30) {
            opponent.speed * 3;
        }
        else if (opponent.health <= 0) {

            return stopGame(arr, opponent)
        }
        continueGame(arr);
    }
}

function stopGame(arr, opponent) {
    stopTimeOut(arr);
    console.log( "***The Game Is Stopped***");
    let decision = caesar();

    if (decision === 0) {
        players.innerHTML += `<p class="list-group-item list-group-item-danger p-2"> [${opponent.name}] is dead`;
        // console.log(`---> [${opponent.name}] is dead`);
        arr.splice(arr.indexOf(opponent), 1);
        // console.log(arr.length);

        if (arr.length === 1) {
            players.innerHTML += `<p class="list-group-item list-group-item-success p-2">[${arr[0].name}] won the battle with health x${arr[0].health}</p>`;
            // return console.log(`---> [${arr[0].name}] won the battle with health x${arr[0].health}`);  
            return;
        }
    } 
    else {
        opponent.health += 50;
        players.innerHTML += '<p class="list-group-item list-group-item-warning p-2">Caesar decided that [' + 
            opponent.name + '] will continue with health ' + Math.round(opponent.health) +"</p>";
        // console.log("---> Caesar decided that " + opponent.name + " will continue with health " + Math.round(opponent.health));
    }
    continueGame(arr); 
}

function stopTimeOut(arr) {
    arr.forEach(gl => {
        gl.stopHitting();   
    });
}

function continueGame (arr) {
    arr.forEach((gl) => {
        gl.continueHitting(arr);
    });
}

function caesar() {
    return Math.round(Math.random());
}

