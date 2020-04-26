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



async function play2048(){
    let driver = await new Builder().forBrowser("firefox").build();
    
    await driver.get("https://play2048.co/");
    //await driver.sendKeys(Key.DOWN, Key.RETURN);
    //await driver.sendKeys(key.ARROW_DOWN, Key.RETURN);

    const container = driver.findElement(By.tagName("body"));

    //cierro el mensaje de bienvenida
    await driver.findElement(By.className("notice-close-button")).click();

    
    

    
    

    

    
    let lost = false;
    let vuelta = 0;
    let movimiento = 0;

    do{
        vuelta++;
        //console.log('vuelta ' + vuelta);

        var elements = await driver.findElements(By.className("tile"));
        var dataset = await getDataset(elements);
        

        if(dataset !== undefined){

            console.log(dataset);
            
            for(i=0; i<15;i++){
                container.sendKeys(Key.ARROW_UP);
                container.sendKeys(Key.ARROW_RIGHT);
            } 
    
            container.sendKeys(Key.ARROW_LEFT);
            container.sendKeys(Key.ARROW_UP);
            container.sendKeys(Key.ARROW_RIGHT);
        }

        /*
        //funciona
        var promise = driver.findElement(By.className("retry-button"))
        
        promise.then(function(e){
            driver.findElement(By.className("retry-button")).click();
        });

        */


    }while(!lost); 
    
    





    



    //margen_derencho(container);
    
    
    
    //await driver.findElement(By.name("q")).sendKeys("Algo", Key.RETURN);
    console.log("ok")
}

play2048();

async function getDataset(elements){
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



async function margen_derencho(container){
    console.log("margen derecho")
    for(i=0; i<100;i++){
        await container.sendKeys(Key.ARROW_UP);
        await container.sendKeys(Key.ARROW_RIGHT);
    }
}

async function left(container){
    console.log("left")
    for(i=0; i<4;i++){
        await container.sendKeys(Key.ARROW_LEFT);
        await container.sendKeys(Key.ARROW_LEFT);
    }
}