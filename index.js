const {Builder, By, Key, Util} = require("selenium-webdriver");
//const game = require("./game.js");
//console.log(game.getName())


/* 
async function example2(){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("https://google.com/");
    await driver.findElement(By.name("q")).sendKeys("Voy a buscar algo", Key.RETURN);
}

example2();
*/

const MOVEUP = 1;
const MOVEDOWN = 2;
const MOVELEFT = 3;
const MOVERIGHT = 4

var dataset = [];
var dataset_history = [];


let play2048 = async() =>{
    let driver = await new Builder().forBrowser("firefox").build();
    
    await driver.get("https://play2048.co/");
    //await driver.sendKeys(Key.DOWN, Key.RETURN);
    //await driver.sendKeys(key.ARROW_DOWN, Key.RETURN);

    const container = driver.findElement(By.tagName("body"));

    //cierro el mensaje de bienvenida
    await driver.findElement(By.className("notice-close-button")).click();

    
    

    
    

    

    
    let lost = false;
    let vuelta = 0;

    do{
        vuelta++;
        console.log('vuelta ' + vuelta);

        var elements = await driver.findElements(By.className("tile"));
        dataset = await getDataset(elements);


        if(dataset !== undefined){

            //console.log(dataset);
            dataset_history.push(dataset);

            let movement = await getMovement();

            switch (movement) {
                case MOVELEFT:
                    await container.sendKeys(Key.ARROW_LEFT);
                    break;
                case MOVERIGHT:
                    await container.sendKeys(Key.ARROW_RIGHT);
                    break;
                case MOVEUP:
                    await container.sendKeys(Key.ARROW_UP);
                    break;
                case MOVEDOWN:
                    await container.sendKeys(Key.ARROW_DOWN);
                    break;    
            }


        }else{
            console.log("No hay dataset para mover")
        }

        /*

        //funciona
        var promise = driver.findElement(By.className("retry-button"))
        
        promise.then(function(e){
            driver.findElement(By.className("retry-button")).click();
        });

        */



    }while(!lost); 
    
    
}

play2048();


/**
 * 
 * @param {*} dataset 
 * @returns movement
 */
 let getMovement = async() =>{

    if(!isRowFull(1)){
        return (areEqual(dataset, dataset_history[dataset_history.length -2]))? MOVERIGHT : MOVEUP;
    }else{
        return (areEqual(dataset, dataset_history[dataset_history.length -2]))? MOVERIGHT : MOVELEFT;
    }

}

/**
 * 
 * @param {number} row 
 */
let isRowFull = row =>{
    return dataset.slice((row*4)-4,row*4).every(element => element > 0);
}





let getDataset = async(elements) =>{
    var promise_arrays = [];
    
    elements.forEach(function(element, index) {
        //console.log(element)
        promise_arrays.push(element.getAttribute("class"))
        
    });

    return Promise.all(promise_arrays).then(function(resolvedList){
        //ejemplo de datos ["tile tile-4 tile-position-1-2"]

        //genero las 16 posiciones vacias 
        var dataset = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

        resolvedList.forEach(function(r){

            values = r.split(" ");
            position_value = parseInt(values[1].replace('tile-', ''));
            col_x_y = values[2].split("-");

            fila = parseInt(col_x_y[3]);
            columna = parseInt(col_x_y[2]);

            position = (((fila - 1 ) * 4) ) + columna;
            //le resto 1 por la key 0 del array
            dataset[position - 1] = position_value;
        })
        
        return dataset;

    }).catch(function(e){
        //Esta moviendo
    });
}


let areEqual = (array1, array2) =>{
    return (JSON.stringify(array1)==JSON.stringify(array2));
}
