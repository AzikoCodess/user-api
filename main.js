const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arr2 = ["ali", "vali", "hasan", "to'lqin", "ali", "hasan"];
const randint = [3, 7, 1, 9, 2, 8, 4, 6, 5];
function kattaBeshdan(array) {
    return array.filter(num => num > 5);
}

// console.log(kattaBeshdan(arr));


function topIsm(array) {
    const remDup = [...new Set(array)];
    const len4 = remDup.filter(len => len.length >= 4);
    return len4
}
// console.log(topIsm(arr2));
const arr3 = [3, 7, 1, 9, 2, 8, 4, 6, 5];

function tartiblash(array) {
    return array.sort((a, b) => a - b)
}

// console.log(tartiblash(arr3));

function juftTartiblash(array) {
    const juft = array.filter(num => num % 2 === 0)
    return juft.sort((a, b) => b - a)
}
// console.log(juftTartiblash(arr3));

const users1 = [
    { name: "Ali", age: 17 },
    { name: "Vali", age: 23 },
    { name: "Hasan", age: 15 },
    { name: "Tohir", age: 30 }
];

function yoshdanIsm(array) {
    const age = array.filter(user => user.age > 18)
    return age.map(user => user.name.toUpperCase())

}

// console.log(yoshdanIsm(users));

const products = [
    { name: "Telefon", price: 500, category: "electronics" },
    { name: "Noutbuk", price: 1200, category: "electronics" },
    { name: "Kitob", price: 15, category: "books" },
    { name: "Planshet", price: 800, category: "electronics" },
    { name: "Roman", price: 20, category: "books" }
];

function narxJami(array) {
    const electronic = array.filter(product => product.category === "electronics")
    return electronic.reduce((a, b) => a + b.price, 0)
}
// console.log(narxJami(products))

const result = arr3.reduce((a, b) => a + b, 0) / arr3.length
// console.log(result)
const students1 = [
    { name: "Ali", grades: [80, 90, 70] },
    { name: "Vali", grades: [60, 75, 85] },
    { name: "Hasan", grades: [90, 95, 100] }
];

function ortachaBall(array) {
    return array.map(student => {
        const sum = student.grades.reduce((a, b) => a + b, 0)
        const avg = sum / student.grades.length
        return {name: student.name, avg: avg}
    })
}
// console.log(ortachaBall(students1))

const words = ["olma", "nok", "banan", "gilos", "anor"];

function mmm(array){
    return array.filter(word => word.length > 4).sort((b, a) => a.length - b.length)
}
// console.log(mmm(words))
const users = [
  { name: "Ali", city: "Toshkent" },
  { name: "Vali", city: "Samarqand" },
  { name: "Hasan", city: "Toshkent" },
  { name: "Tohir", city: "Buxoro" },
  { name: "Jasur", city: "Toshkent" }
];

function oliftalarSoni(array){
    return array.filter(user => user.city === "Toshkent").length
}
// console.log(oliftalarSoni(users))
const orders = [
  { id: 1, status: "delivered", amount: 150 },
  { id: 2, status: "pending", amount: 200 },
  { id: 3, status: "delivered", amount: 300 },
  { id: 4, status: "cancelled", amount: 100 },
  { id: 5, status: "delivered", amount: 250 }
];

function jamiSumma(array){
    return array.filter(status => status.status === "delivered").reduce((a, b) => a + b.amount, 0)
}
// console.log(jamiSumma(orders))

const numbers = [1, 2, 3, 4, 5];
function kopKam(array){
    const max = Math.max(...array)
    const min = Math.min(...array)
    return {max, min}
}
// console.log(kopKam(numbers))
const sentence = "men dasturlashni yaxshi ko'raman men";

function uzun(string){
    return string.split(" ").reduce((a, b) => a.length > b.length ? a : b)  
}
// console.log(uzun(sentence))

function sanash(string){
    return string.split(" ").reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1
        return acc
    }, {})
}
// console.log(sanash(sentence))

const students = [
  { name: "Ali", grade: 85 },
  { name: "Vali", grade: 42 },
  { name: "Hasan", grade: 91 },
  { name: "Tohir", grade: 55 },
  { name: "Jasur", grade: 78 }
];

function imtixon(array){
    const passed = array.filter(student => student.grade >= 60).map(student => student.name)
    const failed = array.filter(student => student.grade < 60).map(student => student.name)
    return {passed, failed}
}
// console.log(imtixon(students))


function juftToqSum(array){
    const juft = array.filter(num => num % 2 === 0)
    const toq = array.filter(num => num % 2 !== 0)
    return {
        even: {numbers: juft, sum: juft.reduce((a, b) => a + b, 0)},
        odd: {numbers: toq, sum: toq.reduce((a, b) => a + b, 0)}
    }
}
// console.log(juftToqSum(arr3))

const strr = "helper salomat"
// console.log(strr.split(" "))
const url = "/users/5";
const parts = url.split("/");
// console.log(parts);
// console.log(parts[0]);
// console.log(parts[1]);
// console.log(parts[2]);

const num = orders.find(id => id.id === 3)
// console.log(num)
const url1 = "/users/2";

const id = Number(url1.split("/")[2]);
const user = users.find(u => u.id === id);

console.log(id);   // ?
console.log(user); // ?
