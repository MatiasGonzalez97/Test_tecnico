const validador = require('../helper/helper');
const path = require('path')
const csvWriter = require('csv-writer');
const db = require('../models/index.js');
const { BadRequestError, InternalError } = require('../helper/errorHandler.js')
const personService = {
    create : async (body, file) => {
        try{
            const {last_name, name, age, dni, street, city, street_number} = body;

            const duplicatedUser = await validador.validate_existent_user(dni);

            if(duplicatedUser){
                throw new BadRequestError("User already exists", 404);
            }   

            let response;
            const result = await db.User.create({
                lastName : last_name,
                firstName : name,
                age : age,
                picture : file,
                dni: dni
            });

            const address = await db.Address.create({
                street: street,
                street_number,
                city,
                userId: result.dni
            });
            

            if(!result) {
                throw new InternalError();
            }
            response = {"status":201, "res": result}
            return response;
        }catch(err){
            return { res: err.message, status: err.status };
        }
    },
    getAll : async () => {
        try{
            const result = await db.User.findAll({
                include: [{
                    model: db.Address,
                    as: 'address'
                }]
            });
            if(result.length <= 0) {
                throw new BadRequestError("Users not found", 404);
            }
            response = {"status":200, "res": result}
            return response;
        }catch(err){
            return { res: err.message, status: err.status };
        }
    },
    find : async (params) => {
        const {name, age, dni} = params;
        const where = {}
        if(name)
            where.firstName = name
        if(age)
            where.age = age
        if(dni)
            where.dni = dni
        
        try{
            const result = await db.User.findAll({
                where: where,
                include: [{
                    model: db.Address,
                    as: 'address'
                }]
            });
            console.log(result);
            if(result.length <= 0) {
                throw new BadRequestError("User not found", 404);
            }
            response = {"status":200, "res": result}
            return response;
        }catch(err) {
            return { res: err.message, status: err.status };
        }
    },
    findOne : async (params) => {
        const { dni } = params;
        try{
            const result = await db.User.findOne({
                where: {
                    dni: dni
                },
                include: [{
                    model: db.Address,
                    as: 'address'
                }]
            });
            if(!result) {
                throw new BadRequestError("User not found", 404);
            }
            response = {"status":200, "res": result}
            return response;
        }catch(err) {
            return { res: err.message, status: err.status };
        }
    },
    delete : async (params) => {
        const { dni } = params;
        try{
            const result = await db.User.destroy({
                where: {
                    dni: dni
                }
            });
            if(!result) {
                throw new BadRequestError("User not found", 404);
            }   
            response = {"status":204, "res": null}
            return response;
        }catch(err) {
            return { res: err.message, status: err.status };
        }
    },
    edit: async (params, body) => {
        try{
            const {last_name, name, age} = body;
            const { dni } = params;
            const person = await db.User.findOne({
                where: {
                    dni: dni
                }
            });
            if(!person){
                throw new BadRequestError("User not found", 404);
            }

            if(last_name)
                person.lastName = last_name;
            if(name)
                person.firstName = name;
            if(age)
                person.age = age;

            const updated = await person.save();

            if(updated) {
                response = {"status":200, "res": updated}
            }
            return response;
        }catch(err){
            return { res: err.message, status: err.status };
        }
       
    },
    export: async(req, res) => {
        try{
            const result = await db.User.findAll({
                raw : true
            });
            if(result.length <= 0) {
                return {"status": 400, "res": "Not found"}
            }

            const writer = csvWriter.createObjectCsvWriter({
                path: path.resolve('./exports', 'exported.csv'),
                header: [
                { id: 'name', title: 'Name' },
                { id: 'last_name', title: 'Last name' },
                { id: 'age', title: 'Age' },
                { id: 'dni', title: 'DNI' },
                ],
            });

            await writer.writeRecords(result).then(()=>{
                console.log('Finished!')
            })
            const file = `./exports/exported.csv`;
            res.download(file);
        }catch(err){
            return { res: err.message, status: err.status };
        }
    },
    addAddressToUser: async(params, body) => {
        try{
            const {street, city, street_number} = body;
            const { dni } = params;
            const result = await db.Address.create({
                street: street,
                street_number,
                city,
                userId: dni
            });
            
            if(!result) {
                throw new InternalError();
            }
            response = {"status":201, "res": result}
            return response;

        }catch(error) {
            return { res: err.message, status: err.status };
        }
    }
}

module.exports = personService;