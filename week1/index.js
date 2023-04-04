// console.log("This is the index.js file")

// const fs = require("fs");

// console.log("1 - Program Start");
// fs.readFile('package.json', (err, data) => {
//   if (err) console.error(err);
//   console.log('2 - done reading file');
//   console.log(data.toString);
// });

// console.log("3 - Program Ended");

// 이 예제에서 "3 - Program Ended"이 "2 - done reading file"보다 먼저 출력되는 이유
// "1 - Program Start"와 "3 - Program Ended"는 fs.readFile() 함수의 콜백 함수가 실행되기 전에 이미 출력됩니다.

// fs.readFile() 함수는 비동기 함수로서, 파일을 읽어오는 작업이 백그라운드에서 수행되므로, fs.readFile() 함수가 실행되는 동안 다른 작업이 수행될 수 있습니다. 따라서 "1 - Program Start"가 출력되고, fs.readFile() 함수가 실행됩니다. 그러면 백그라운드에서 파일을 읽어오는 작업이 시작됩니다. 이때, "3 - Program Ended"를 출력합니다. 그리고 파일을 모두 읽어오면, fs.readFile() 함수의 콜백 함수가 실행되어 "2 - done reading file"와 파일의 내용을 출력합니다.

// 즉, 출력 결과가 "1 - Program Start", "3 - Program Ended", "2 - done reading file" 순서로 출력되는 것은, fs.readFile() 함수가 비동기 함수이기 때문입니다. 만약 fs.readFileSync() 함수를 사용하여 동기식으로 파일을 읽어왔다면, 출력 결과는 "1 - Program Start", 파일의 내용, "3 - Program Ended", "2 - done reading file" 순서로 출력되었을 것입니다.

// const fs = require("fs");

// console.log("1 - Program Start");
// fs.readFile('package.json', (err, data) => {
//   if (err) console.error(err);
//   console.log('2 - done reading file');
//   console.log(data.toString());
// });

// console.log("3 - Program Ended");

// 이 코드는 data.toString 대신 data.toString()를 사용하고 있습니다. 이 부분은 data의 문자열 변환 결과를 출력하기 위해 toString() 메서드를 호출해야 하는데, toString 메서드를 호출하지 않고 그 자체로 data.toString를 출력하려고 하면 에러가 발생합니다.

// 즉, 아래의 코드는 data.toString()를 출력하는 것이므로 올바른 결과를 출력할 수 있습니다.

const fs = require("fs");
const http = require("http"); 
const querystring = require('node:querystring');

const doneReading = (err, data) => {
  if (err) console.error(err);
  console.log('2 - done reading file');
  console.log(data.toString());
};

console.log("1 - Program Start");
fs.readFile('../package.json', doneReading);
console.log("3 - Program Ended");

// 템플릿 리터럴 Template literal
// classicfunction();

// function classicfunction() {
//   console.log('classic version')
// }

// 클래식 버전:
// const greeting = "Hello";
// const name = "John";
// console.log(greeting + " " + name + "!");

// 템플릿 리터럴 버전:
// const greeting = "Hello";
// const name = "John";
// console.log(`${greeting} ${name}!`);



// Variable
// var: 함수 유효 범위를 가지는 변수를 선언하며, 초기화 없이 선언 가능하고, 재할당 가능하다.
// let: 블록 유효 범위를 가지는 변수를 선언하며, 초기화 없이 선언 가능하고, 재할당 가능하다.
// const: 블록 유효 범위를 가지는 상수를 선언하며, 반드시 초기화를 해야 하고, 재할당이 불가능하다.


// Node.js Web Server
// const http = require("http"); 
// http.createServer((req,res) => {
//   console.log('sending response')
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Aloha world');
// }).listen(process.env.PORT || 3000);

//Web Server Routes

http.createServer((req,res) => {
    let url = req.url.split("?");
    let query = querystring.parse(url[1]);
  console.log(query)
    let path = url[0].toLowerCase();
  
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(`Home page for ${query.name}`);
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About page');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
    }    
}).listen(process.env.PORT || 3000);