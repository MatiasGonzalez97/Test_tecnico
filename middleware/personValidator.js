const validador = require('../helper/helper');
module.exports = (req, res, next) => {
    const {last_name, name, age, dni} = req.body;
    const { _, error } = validador.validate_person({last_name, name, age, dni});
    if(error) {
        res.status(400).send({ res: error.details[0].message })
        return;
    }
    next();
}