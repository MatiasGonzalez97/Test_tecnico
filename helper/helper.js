const Joi = require('joi');
const db = require('../models/index.js');

const validate_person = ({ last_name, name, age, dni }) => {
    const schema = Joi.object({
        last_name: Joi.string()
            .min(1)
            .max(32)
            .required(),

        name: Joi.string()
            .min(1)
            .max(32)
            .required(),

        age: Joi.number()
            .required(),
        dni: Joi.number()
            .required()
    }

    );
    return schema.validate({ last_name: last_name, name: name, age: age, dni: dni });
}
const validate_existent_user = async (dni) => {

    const exists = await db.User.findOne({
        where : {
            dni : dni
        }
    });
    return exists ? true : false; 
}
module.exports = {validate_person, validate_existent_user};