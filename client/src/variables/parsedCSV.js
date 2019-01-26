import Papa from 'papaparse';
import axios from 'axios';

let gasPriceWt2, gasPriceWt3, gasPriceWt4; 
let gasPriceMt2, gasPriceMt3, gasPriceMt4;
let gasPriceAt2, gasPriceAt3, gasPriceAt4;
let gasPrice = {};


  axios.get(`https://raw.githubusercontent.com/plebeiathon/gasLEEK/master/data/cvs/PET_PRI_GND_A_EPM0_PTE_DPGAL_W/Data%202-Table%201.csv`)
    .then(res => {
      gasPriceWt2 = Papa.parse(res.data, {
        delimiter: ',',
        header: true
      });
    });

console.log("post-test");


export default gasPrice;