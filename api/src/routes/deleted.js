const { Router } = require("express");
const { Dog } = require("../db.js");

const router = Router();

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    let dogFind = Dog.findOne({where: {id: id}})
    if(dogFind){
        await Dog.destroy({
            where: { id: id },
        });
        res.status(200).send({ message: 'Deleting dog' });
    } else {
        res.status(404).send({ message: 'Error 412: cant delete dog' });
    }
});

module.exports = router;