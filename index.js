const http = require('http');
const fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

const server = http.createServer(function (req,res) {

    if(req.url == '/') {
        res.write('This is Home Page');
        res.end();
    }
    if(req.url == '/about') {
        res.write('This is About Page');
        res.end();
    }
    if(req.url == '/contact') {
        res.write('This is Contact Page');
        res.end();
    }
    if(req.url == '/file-write') {
        fs.writeFile('demo.txt','Hello World',function(error) {
            if(error) throw error;

            else{
                fs.readFile('demo.txt',function (error,data){
                    res.write(data)
                });
            }
        })
        res.end();
    }
    if (req.method === 'POST' && req.url === '/file-upload') {
        upload.single('file')(req, res, (err) => {
            if (err) {
                return res.end('Error uploading file');
            }
            res.end('File uploaded successfully!');
        });
    }else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
      <form action="/file-upload" method="post" enctype="multipart/form-data">
        <input type="file" name="file" />
        <button type="submit">Upload</button>
      </form>
    `);
    }
});

server.listen(5500);
console.log(`Server start on listening port 5500`);