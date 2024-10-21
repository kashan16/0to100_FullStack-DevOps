import { add, sub } from "./main.mjs";

//variable and block scope
function calculateDiscount(price , discountRate = 0.1) {
    return price - price * discountRate;
}

console.log(calculateDiscount(100));
console.log(calculateDiscount(200,0.2));

//Arrow function and template literals
const greetings = (Name) => 'Hello ' + Name + ' !';
console.log(greetings('Kashan'));


//Desructuring Array and Objects , Spread and Rest operators
function desc() {
    const numbers = [10,20,30,40,50];
    const user = { name : 'Kashan' , age : 21 , occupation : 'Developer' };
    const { name , age , occupation } = user;
    const [a,b,...rest] = numbers;
    console.log(a,b);
    console.log(rest);
    console.log(name,age,occupation);
}

desc();

const arr1 = [1,2,3];
const arr2 = [4,5,6];

function merge(arr1,arr2) {
    const combined = [...arr1,...arr2];
    console.log(combined);
}

merge(arr1,arr2);

function sumAll(...nums) {
    const arr = [...nums];
    let sum = 0;
    for(let i = 0 ; i < arr.length ; i++) {
        sum += arr[i];
    }
    return sum;
}

console.log(sumAll(1,2,3,4,5));

// classes and inheritence
class Person {
    constructor(name , age) {
        this.name = name;
        this.age = age;
    }

    describe() {
        return `${this.name} is ${this.age} years old`;
    }
}

const person1 = new Person('Kashan',21);
console.log(person1.describe());

class Employee extends Person {
    constructor(name , age , position) {
        super(name,age);
        this.position = position;
    }

    describe() {
        return `${this.name} is ${this.age} years old and works as a ${this.position}`;
    }
}
const emp = new Employee('Bob',35,'Manager');
console.log(emp.describe());

// Promise and Async/Await
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Data Fetched') , 2000);
    });
}

fetchData().then((message) => console.log(message));

async function fetchDataAsync() {
    const message = await fetchData();
    console.log(message);
}

fetchDataAsync();

//Modules
console.log(add(10,5));
console.log(sub(10,5));

//Optional Chaining and Nullish Coalescing
const user = {profile : {name : 'Alice'}};
console.log(user.profile?.age ?? 'Age not available');