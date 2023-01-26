const fs = require("fs");
const http = require("http");

const allUsers = [
  {
    id: 1,
    name: "Aung Aung",
    email: "aung1@web.de",
  },

  {
    id: 2,
    name: "Ko Ko",
    email: "koko2@web.de",
  },

  {
    id: 3,
    name: "Bo Bo",
    email: "bobo3@web.de",
  },
];
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/allUsers") {
    const method = req.method;
    //Get method
    if (method === "GET") {
      //Get method
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(allUsers));
      return res.end();
    } else if (method === "POST") {
      //post method

      //get data from front-end
      let newData = "";
      req.on("data", (chunk) => {
        newData += chunk;
      });

      req.on("end", () => {
        //push new-data to allUsers array
        allUsers.push(JSON.parse(newData));

        //response updated allUsers array to front-end
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(allUsers));
        return res.end();
      });
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 | Page Not Found!");
    return res.end();
  }
});

server.listen(3000, () => {
  console.log("Server started: Listening on port 3000");
});
