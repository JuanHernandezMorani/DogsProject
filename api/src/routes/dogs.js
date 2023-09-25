const { Router } = require("express");
const { Dog, Temper, Breed_group } = require("../db.js");
const { getDogsApi } = require("../Middlewares/DogMiddleware.js");

const router = Router();

router.get('/', async (req,res)=>{
    let exist = await Dog.findOne({where:{id: 1}})
    if(!exist){
        await getDogsApi()
    }
const { name } = req.query
let all = await Dog.findAll({
    order: ['id'],
    include: [{
        model: Temper,
        attributes: ['name'],
        through: {
            attributes: [],
        },
    },
    {
        model: Breed_group,
        attributes: ['name'],
        through: {
            attributes: [],
        },
    }
]
})
if(name){
    let dogName = all.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
    if(dogName.length > 0){
    return   res.status(200).send(dogName)
    } else {
    return   res.status(404).send('Error 404: name not found')
    }
} else {
   return res.status(200).send(await all)
}
})

router.get('/:id', async (req, res)=>{
 const { id } = req.params
 let dog = await Dog.findOne({
    where: {id: id},
    include: [{
        model: Temper,
        attributes: ['name'],
        through: {
            attributes: [],
        },
    },
    {
        model: Breed_group,
        attributes: ['name'],
        through: {
            attributes: [],
        },
    }
]
})
 if(dog){
    res.status(200).send(dog)
 } else {
    res.status(404).send(`Error 404: Cant found dog with id: ${id}`)
 }
})

router.post('/', async (req,res)=>{
    let { 

        name, heightMin, heightMax, weightMin, 
        weightMax, life_ageMin, life_ageMax, 
         Tempers, image, origin, bred_for, Breed_groups,
    } = req.body

    if(!name){return res.status(409).send('Name is require')}
 
    const existe = await Dog.findOne({ where: { name: name }})
    if (existe) return res.status(409).send("Dog already exist");

    const dog = await Dog.create({
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_ageMin,
        bred_for: bred_for ? bred_for : 'not specified',
        origin: origin ? origin : 'not specified',
        life_ageMax,
        image: image ? image : "https://img.favpng.com/19/10/9/question-mark-symbol-sign-computer-icons-png-favpng-T3t3e8dw8dHkGeyPW3MKvVewM.jpg",
      });
      if(Breed_groups.length === 0){Breed_groups = ["Unknown"]}
      if(Tempers.length === 0){Tempers = ["Unknown"]}
      let associatedBreedgroup = await Breed_group.findAll({
        where: {name: Breed_groups}
      })
      let associatedTemp = await Temper.findAll({
        where: { name: Tempers},
    })
    await dog.addBreed_group(associatedBreedgroup)
    await dog.addTemper(associatedTemp)
    res.status(200).send('Dog created successfully')
})

module.exports = router;

