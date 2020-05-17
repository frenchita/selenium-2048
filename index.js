const {Builder, By, Key, Util} = require("selenium-webdriver");

const MOVEUP = 1;
const MOVEDOWN = 2;
const MOVELEFT = 3;
const MOVERIGHT = 4

var dataset = [];


let play2048 = async() =>{
    let driver = await new Builder().forBrowser("firefox").build();
    
    await driver.get("https://play2048.co/");
    const container = driver.findElement(By.tagName("body"));

    var lost = false;

    do{

        var elements = await driver.findElements(By.className("tile"));
        dataset = await getDataset(elements);

        if(dataset !== undefined){
            console.log(dataset);

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
            //console.log("No hay dataset para mover")
        }

    }while(!lost); 
    
    
}

play2048();


/**
 * 
 * @param {*} dataset 
 * @returns movement 1 to 4
 */
 let getMovement = async() =>{

    return Math.floor(Math.random() * 4); 

}








let getDataset = async(elements) =>{
    var promise_arrays = [];
    
    elements.forEach(function(element, index) {
        //console.log(element)
        promise_arrays.push(element.getAttribute("class"))
        
    });

    return Promise.all(promise_arrays).then(function(resolvedList){
        //genero las 16 posiciones vacias 
        dataset = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

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
