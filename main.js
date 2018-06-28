var faker = require('./faker.js');

class Gladiator {
    constructor(health, power, speed, name) {
        this.name = name;
        this.initial_health = health;
        this.health = health;
        this.initial_power = power;
        this.power = power;
        this.initial_speed = speed;
        this.speed = speed;
    }
    attackTo (arr) {
        let miliseconds;
        let ownIndex;
        for (let gladiator of arr) {
            if (gladiator.name === this.name) {
                ownIndex = arr.indexOf(gladiator);
            }
        }
        this.interval = setInterval(() => {
            miliseconds = 1000 * 5/(arr[ownIndex].speed);
            
            let random_index = Math.floor(Math.random() * arr.length);
            let opponent = arr[random_index];
           
            hit.call(this, arr, opponent);
        }, miliseconds)    
    }  
    stopHitting () {
        clearInterval(this.interval)
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

    opponent.health -= this.power;
    console.log(`[${this.name} x ${this.health}] hits [${opponent.name} x ${opponent.health}] with power ${this.power}`);
    opponent.speed = opponent.initial_speed * ((opponent.health) / (opponent.initial_health));

    if (opponent.health >= 15 && opponent.health <= 30) {
        opponent.speed * 3;
    }
    else if (opponent.health <= 0) stopGame(arr, arr.indexOf(opponent));
}

function stopGame(arr, index) {

    stopInterval(arr);
    console.log( "***The Game Is Stopped***");

    let decision = caesar();

    if (decision === 0) {
        console.log(`---> [${arr[index].name}] is dead`);
        arr.splice(index, 1);
        console.log(arr.length);

        if (arr.length === 1) {
            return console.log(`---> [${arr[0].name}] won the battle with health x${arr[0].health}`);  
        }
        continueGame (arr);
    } 
    else {
        arr[index].health += 50;
        console.log("---> Caesar decided that " + arr[index].name + " will continue with health " + arr[index].health);
        continueGame (arr); 
    }     
}

function stopInterval(arr) {
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

start(7);

