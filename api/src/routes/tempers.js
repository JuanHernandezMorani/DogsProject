const { Router } = require("express");
const { Temper } = require("../db.js");
const { getTempers } = require("../Middlewares/TemperMiddleware.js");

const router = Router();

router.get('/', async (req,res)=>{
    await getTempers()
    let temp = await Temper.findAll({order:['name']})
    return res.send(temp)
})

module.exports = router;