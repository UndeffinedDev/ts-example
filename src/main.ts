import * as readline from 'readline';
import * as fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var Iname: string;
var age: number;

type User = {
    name: string;
    age: number;
}

rl.question('What is your name? ', (name) => {
    Iname = name;
    rl.question('What is your age? ', (ageStr) => {
        age = parseInt(ageStr);
        const user: User = {
            name: Iname,
            age: age
        };

        console.log(`Es adulto?: ${isAdult(user)}`);
        fs.appendFile('file.txt', `{ ${user.name}, ${user.age} } \n`, function (err) {
            if (err) throw err;
        });

        rl.close();  
    });
});

function isAdult(user: User) {
    return user.age >= 18;
}
