import * as http from 'http';
import * as querystring from 'querystring';
import * as data from './data.js';

const doneReading = (err, data) => {
  if (err) console.error(err);
  console.log('2 - done reading file');
  console.log(data.toString());
}

console.log("1 - Program Start");

//fs.readFile('package.json', doneReading);
http.createServer((req, res) => {
  let url = req.url.split("?");  // separate route from query string

  let query = querystring.parse(url[1]); 
  console.log(query)

  // convert query string to object
  let path = url[0].toLowerCase();

  switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let students = data.getAll();
            console.log(students);
            res.end(`Home page for ${students.length} students `);
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