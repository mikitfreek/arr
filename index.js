const http = require('http');
const port = 3000;

const fs = require('fs');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  //res.end('Hello World');
  fs.readFile('./index.html', function(error, content) {
    res.end(content, 'utf-8');
  });
});

server.listen(port, () => {
  console.log(`Server running at PORT:${port}/`);
});

const jsdom = require('jsdom')
const dom = new jsdom.JSDOM("")
const $ = require('jquery')(dom.window)

const axios = require('axios')

let array = [];

async function Run() {
	try {
		const response = await axios.get(
			'https://www.ceneo.pl/Komputery;szukaj-3060+ti;0112-0.htm' //'https://www.reddit.com/r/programming.json'
		)
		//console.log(response.data)

    const div = dom.window.document.createElement("div");
    div.innerHTML = response.data;
    const nodes0 = div.querySelectorAll(".cat-prod-row__name span");
    const nodes1 = div.querySelectorAll(".cat-prod-row__price .value");

    const loop = 3;//nodes0.length;

    for(let i=0; i<loop; i++) {
    //  for(let k=0; i<nodes1.length; i++) { 
        //array.push(nodes[i][k].innerHTML); 
        const array2 = [nodes0[i].innerHTML, nodes1[i].innerHTML];
        array.push(array2); 
    //  }
    }
    
    array.forEach(function(entry) {
      console.log(entry);
    });

    //const title = response.data.querySelector('.cat-prod-row__name span').html//.$('.cat-prod-row__name span').text()
    //console.log('title', title);
	} catch (error) {
		console.error(error)
	}
}
Run()

const io = require('socket.io')(server);

const now = new Date();
let millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 1, 0, 0) - now;
if (millisTill10 < 0) {
     millisTill10 += 86400000/4;
}
setInterval(function() { 
  console.log("It's time!")
  io.on('connection', function (socket) {
    socket.emit('pushNotification', { success: true, msg: array });
  });
}, millisTill10);

