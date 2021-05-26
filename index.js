import Express from 'express';
let app = Express();
let port = 5000;

import fs from 'fs';
let data = JSON.parse(fs.readFileSync("data.json", "utf8"));

app.use(Express.json());

app.get('/', (req, res) => {
    res.send("hello");
});

app.post('/', (req, res) => {
    let postData = req.body;
    // console.log(typeof postData);
    data.push(postData);
    // Writing to our JSON file
    fs.writeFile("data.json", JSON.stringify(data), () => {
        console.log("New data added");
    });
    console.log(data);
    res.send("post method called");
});

app.listen(port, () => console.log('server has been started at port ' + port));