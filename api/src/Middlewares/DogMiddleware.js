const { Dog, Temper, Breed_group } = require("../db.js");
const dotenv = require('dotenv');
const  axios  = require('axios');
const { getTempers } = require("./TemperMiddleware.js");
const { getBreed_groups } = require("./BreedGroupMiddleware.js");
dotenv.config({ path: '../../.env'})

const api = process.env.API_KEY

const getDogsApi = async () => {
  try{
    const dogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api}`)
    const dgs = await dogsApi.data.map(async (dog) =>{
      let existT = await Temper.findOne({where: {id: 1}});
      let existBg = await Breed_group.findOne({where: {id: 1}});

      if(!existT || !existBg){
        await getTempers()
        await getBreed_groups()
      }

      let temperamentArray = [];
        if (dog.temperament) {
            temperamentArray = dog.temperament.split(", ");
        }
         
      let breedGroupArray = [];
      if(dog.breed_group){breedGroupArray.push(dog.breed_group)}

        let weightMin = dog.weight.metric.split(" - ")[0];
        let weightMax = dog.weight.metric.split(" - ")[1];
        let heightMin = dog.height.metric.split(" - ")[0];
        let heightMax = dog.height.metric.split(" - ")[1];
        let lifeAgeMin = dog.life_span.split(" - ")[0];
        let lifeAgeMax = dog.life_span.split(" - ")[1];
        if(dog.life_span.includes('–')){
          lifeAgeMin = dog.life_span.split(" – ")[0];
          lifeAgeMax = dog.life_span.split(" – ")[1];
        }

        let idsT = [];
        for(let i = 0; i < temperamentArray.length; i++){
          let tempers = await Temper.findOne({where:{name: [temperamentArray[i]]}})
          let id = tempers.id
          idsT.push(id)
        }
        let idsBg = [];
        for(let i = 0; i < breedGroupArray.length; i++){
          let breed_groups = await Breed_group.findOne({where:{name: [breedGroupArray[i]]}})
          let id = breed_groups.id
          idsBg.push(id)
        }
      if(lifeAgeMax){
        let removeStr = lifeAgeMax.split(' ')
        lifeAgeMax = removeStr[0]
      }
      if(!Number(lifeAgeMin)){
        let removeStr = lifeAgeMin.split(' ')
        lifeAgeMin = removeStr[0]
        lifeAgeMax = Number(lifeAgeMin) + 2
      }
      let newDog = await Dog.create({
            name: dog.name,
            image: dog.image.url,
            weightMin: weightMin ? weightMin : 18,
            weightMax: weightMax ? weightMax : (Number(weightMin) + 3),
            heightMin: heightMin ? heightMin : 4,
            heightMax: heightMax ? heightMax : (Number(heightMin) + 2),
            life_ageMin: lifeAgeMin,
            life_ageMax: lifeAgeMax,
            bred_for: dog.bred_for ? dog.bred_for : 'not specified',
            origin: dog.origin ? dog.origin : 'Unkown',
            fan: false,
        })

   if(idsT.length === 0){idsT.push(118)}
   if(idsBg.length === 0){idsBg.push(3)}

  await newDog.addTempers(idsT);
  await newDog.addBreed_groups(idsBg);

    });
    return dgs
    } catch(e){
      return e
    }
}

module.exports = {
  getDogsApi,
}