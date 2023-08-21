//DOM VARIABLES
const input = document.getElementById('input');
const fromSelector = document.getElementById('fromCurrency');
const toSelector = document.getElementById('toCurrency');
import {currency} from './currencies.js'; // my reference error need to fix
const swapBtn = document.getElementById('swap');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');
//API 
const apiKey = `da572db07a1b789d4aecfc06`;
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

//function to embed all data in select element 
const fromCurrency = (select) => {
    currency.forEach(currencyApi => {
        //create option
            const option = document.createElement('option');    
            option.value = currencyApi;
            option.textContent = currencyApi;
        //append it to fromSelector
        select.appendChild(option);

    })
}
fromCurrency(fromSelector);
const toCurrency = (select) => {
    currency.forEach(currencyApi => {
        //create option
            const option2 = document.createElement('option');    
            option2.value = currencyApi;
            option2.textContent = currencyApi;
        //append it to fromSelector
            select.appendChild(option2);

    })
}
toCurrency(toSelector);


//fetch the API
const exchangeFunc = () => {
    //create selector variable with value
    var fromConvert = fromSelector.value;
    var toConvert = toSelector.value;
    var amount = input.value;

    if (amount || amount !== NaN) {
        fetch(apiUrl).then(response => response.json()).then(data => {
            console.log(data);
            const fromconvertAmount = data.conversion_rates[fromConvert];
            const toconvertAmount = data.conversion_rates[toConvert];
            const resultAmount = (amount / fromconvertAmount) * toconvertAmount;
            var printResult = result;
            //display result to the dom
           
            printResult.value = `${amount} ${fromConvert} = ${Math.round(resultAmount)} ${toConvert}`

        })
    } 
    else if (!input.value || input.value == NaN) {
        alert('Please put a number!')
    }

}
//convert Button
convertBtn.addEventListener('click', () => {exchangeFunc();});
//swaap selector value
swapBtn.addEventListener('click', () => {swaapFunc();})

const swaapFunc = () => {
    [fromSelector.value, toSelector.value] = [toSelector.value, fromSelector.value];
    
}