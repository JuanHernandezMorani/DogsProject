const { Temper } = require("../db.js");
const dotenv = require('dotenv');
const  axios  = require('axios');
dotenv.config({ path: '../../.env'});

const api = process.env.API_KEY

const getTempers = async () => {
  try{
         await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api}`)
    .then(json => json.data.map(async (temper)=>{

        if(!temper.temperament){temper.temperament = 'Unknown'}

        const info = temper.temperament.split(', ')

       for(let i = 0; i < info.length; i++){
         Temper.findOrCreate({
          where:{
           name: info[i],
          }
        })
    }
  }
))}
catch(e){console.log(e)}
}

module.exports = {
    getTempers,
}