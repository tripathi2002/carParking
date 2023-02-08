// Import pakage
const express = require('express');
const fs = require('fs');

let cars = JSON.parse(fs.readFileSync('./data/cars.json', 'utf-8'));
let app = express();


app.use(express.json());                // add request body to callback
app.use(express.static('./public'));    // using static folder

app.post('/login', (req, res)=>{
    console.log(req.body)
    res.status(200).json({
        status: "sucess"
    });
})

app.get('/cars', (req, res)=>{
    res.status(200).json({
        status: "sucess",
        data: {cars: cars}
    });
});


app.get('/cars/:id', (req, res)=>{
    
    var id = req.params.id*1;
    var car = cars.find(el => el.id === id); 
   

    res.status(200).json({
        status: "sucess",
        data: { car: car}
    });
    // res.status(200).send("bye");
    // console.log(car);
});
// 

app.post('/cars', (req, res)=>{
        let newId = cars[cars.length-1].id*1+1;
    // console.log(req.body);

    let car = req.body;
    let plate = car.plate;
 
    function update(input) {
        var firstPart = input.substring(0,3);
        var secondPart = input.substring(3);
        return firstPart + " - " + secondPart;
    };

    plate = update(plate);
    car.plate = plate;

    car = Object.assign({id: newId}, car);

    cars.push(car);
    
    // fs.writeFileSync('./data/cars.json', JSON.stringify(cars), 'utf-8');
    fs.writeFile('./data/cars.json', JSON.stringify(cars), ()=>{
        console.log('save succesfully..');
        res.status(200).send("created..");
    });
});

app.delete('/cars/:id', (req, res)=>{
    // console.log(req.params.id);
    let id = req.params.id*1;
    let carToDepart = cars.find(el => el.id === id);
    
    let index = cars.indexOf(carToDepart);

    cars.splice(index, 1);
    /* 
    // for arrange the id in order
    cars.forEach(element => {
        element.id = cars.indexOf(element)+1;
    });
     */
    // console.log(cars);

    fs.writeFile('./data/cars.json', JSON.stringify(cars), ()=>{
        res.status(200).send("Departed successfully.......");
    });
});

let port = 3000;
app.listen(port, ()=>{
    console.log("Server started...");
});