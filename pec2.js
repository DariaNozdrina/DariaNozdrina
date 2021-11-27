export function callback(number, arrSymbols) {

    let arrmap = arrSymbols.map(function(element) { return element.symbol })
    let arrsymbolmap = arrmap.sort()
    let args = [];
    for (let i = 0; i < number; i++) {
        args.push(arrsymbolmap[i])
    }
    console.log(args)
}

export function listCoins(number, callback) {

    let req = new XMLHttpRequest();
    req.open('GET', 'https://api.coingecko.com/api/v3/coins/list/', true);
    req.onreadystatechange = function(aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {

                let arrSymbols = JSON.parse(req.responseText)

                callback(number, arrSymbols)

            } else {
                console.log("Error loading page\n");
            }
        }
    };
    req.send(null);
    return req;
}

export function listCoinsPromise() {
    let req = new XMLHttpRequest();
    req.open('GET', 'https://api.coingecko.com/api/v3/coins/list/', true);
    req.onreadystatechange = function(aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                let arraySimbols = JSON.parse(req.responseText);

                let arrsymbolEmpty = [];
                for (let i = 0; i < number; i++) {
                    arrsymbolEmpty.push(arraySimbols[i].symbol);
                }
                arrsymbolEmpty.sort()
                console.log(arrsymbolEmpty)


            } else {
                console.log("Error loading page\n");
            }
        }
    };
    req.send(null);
    return req;
}

export function serialize(a, b, c) {

    let total = a.concat(b).concat(c);
    const promise1 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, a);
    });
    const promise2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, b);
    });
    const promise3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, c);
    });
    const allPromise = Promise.all([promise1, promse2, promise3]);

    allPromise.then(values => {
        console.log(total);
    }).catch(error => {
        console.log("error");
    });

    return res;
}


export function getTopPrice(number) {

    let req = new XMLHttpRequest();
    req.open('GET', 'https://api.coingecko.com/api/v3/simple/price', true);
    req.onreadystatechange = function(aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {

                let arrSymbols = JSON.parse(req.responseText)
                $url = 'https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USD';
                $data = file_get_contents($url);
                $priceInfo = json_decode($data);

                callback(number, arrSymbols)

            } else {
                console.log("Error loading page\n");
            }
        }
    };
    req.send(null);
    return req;
}
//getprice function
export function getpPrice(id) {

    let req = new XMLHttpRequest();
    req.open('GET', 'https://api.coingecko.com/api/v3/simple/price', true);
    req.onreadystatechange = function(aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {

                let arrSymbols = JSON.parse(req.responseText)
                $url = 'https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USD';
                $data = file_get_contents($url);
                $priceInfo = json_decode($data);

                callback(number, arrSymbols)

            } else {
                console.log("Error loading page\n");
            }
        }
    };
    req.send(null);
    return req;
}