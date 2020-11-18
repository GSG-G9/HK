const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const {handlePublicFiles,handleSearch}=require("./handler/handler");

const router = (request, response) => {
  const endpoint = request.url;

  if (endpoint === "/") {
    const filePath = path.join(__dirname, "..", "public", "index.html");
    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(500);
        response.end();
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(file);
      }
    });
  }else if(endpoint === "/500.html"){
    const filePath = path.join(__dirname, "..", "public", "500.html");
    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(500);
        response.end();
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(file);
      }
    });
  }else if (endpoint.includes("/public")) {
    handlePublicFiles(request, response, endpoint, (error,response) =>{
        response.writeHead(500);
        response.end();
    });
  } else if (endpoint === "/search" ) {
    let allData = "";
    request.on("data", (chunkOfData) => {
      allData += chunkOfData;
    });

    request.on("end", () => {
      const receivedData = querystring.parse(allData);
      console.log(receivedData);
      const filePath = path.join(__dirname, "./data/word.txt");
      fs.readFile(filePath, "utf8", (error, file) => {
        if (error) {
          response.writeHead(500);
          response.end();
        } else {
            handleSearch(file,)

          fs.writeFile(filePath, JSON.stringify(newData), (error) => {
            if (error) {
              response.writeHead(500, { "Content-Type": "text/html" });
              response.end("<h1>server error</h1>");
            }
            response.writeHead(302, {
              Location: "/",
            });
            response.end();
          });
        }
      });
    });
 } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("<h1>page not found</h1>");
    response.end();
  }
};

module.exports = router;