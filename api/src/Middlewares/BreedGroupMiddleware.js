const { Breed_group } = require("../db.js");
const dotenv = require('dotenv')
const  axios  = require('axios')
dotenv.config({ path: '../../.env'})

const api = process.env.API_KEY

const getBreed_groups = async () => {
  try{
         await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api}`)
    .then(json => json.data.map(async (dog)=>{

        if(!dog.breed_group){dog.breed_group = 'Unknown'}

        const info = dog.breed_group

         Breed_group.findOrCreate({
          where:{
           name: info,
          }
        })
  }
))}
catch(e){console.log(e)}
}

module.exports = {
    getBreed_groups,
}