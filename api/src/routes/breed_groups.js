const { Router } = require("express");
const { Breed_group } = require("../db.js");
const { getBreed_groups } = require("../Middlewares/BreedGroupMiddleware.js");

const router = Router();

router.get('/', async (req,res)=>{
    await getBreed_groups()
    let breedG = await Breed_group.findAll({order:['name']})
    return res.send(breedG)
})

module.exports = router;