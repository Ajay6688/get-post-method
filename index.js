import Express from 'express';
let app = Express();
let port = 5000;

import fs from 'fs';
let data = JSON.parse(fs.readFileSync("data.json", "utf8"));

app.use(Express.json());

function updateData() {
    fs.writeFile('data.json', JSON.stringify(data), () => {
        console.log("data updated successfully");
    });
}

app.get('/', (req, res) => {
    res.send("This is home page")
});
app.get('/api/data', (req, res) => {
    res.send(data);
});

app.post('api/post', (req, res) => {
    let postData = req.body;

    data.push(postData);
    // Writing to our JSON file
    // fs.writeFile("data.json", JSON.stringify(data), () => {
    //     console.log("New data added");
    // });
    console.log(data);
    res.send("post method called");
});

app.put('/api/update/:id', (req, res) => {
    const id = req.params.id;
    let name = req.body.name;
    let group = req.body.group;
    const index = data.findIndex((user) => {
        return (user.id == id);
    });
    data[index].id = id;
    data[index].name = name;
    data[index].group = group;
    // console.log(data[index]);
    console.log(data);
    updateData();

});

app.delete('/api/delete/:id', (req, res) => {
    let id = req.params.id;
    let index = data.findIndex((user) => {
        return (user.id == id);
    });
    data.splice(index, 1);
    updateData();
    console.log(data);
});
app.listen(port, () => console.log('server has been started at port ' + port));