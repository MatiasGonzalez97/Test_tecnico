const validador = require('../helper/helper');
const path = require('path')
const csvWriter = require('csv-writer');
const db = require('../models/index.js');

const personService = {
    create : async (body, file) => {
        try{
            const {last_name, name, age, dni, street, city, street_number} = body;

            const duplicatedUser = await validador.validate_existent_user(dni);

            if(duplicatedUser){
                return {"status": 400, "res": "User already exists"}
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
            
            console.log(address);

            if(result) {
                response = {"status":201, "res": result}
            } else {
                response = {"status": 422, "res" : "Not found"}
            }
            return response;
        }catch(err){
            console.log('aca')
            console.log(err);
            response = {"status":500,"res":err};
            return response;
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
            if(result.length > 0) {
                response = {"status":200, "res": result}
            } else {
                response = {"status": 422, "res" : "Not found"}
            }
            return response;
        }catch(err){
            response = {"status":500,"res":err};
            return response; 
        }
    },
    find : async (params) => {
        console.log(params);
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
            if(result) {
                response = {"status":200, "res": result}
            } else {
                response = {"status": 422, "res" : "Not found"}
            }
            return response;
        }catch(err) {
            response = {"status":500,"res":err};
            return response;  
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
            if(result) {
                response = {"status":200, "res": result}
            } else {
                response = {"status": 422, "res" : "Not found"}
            }
            return response;
        }catch(err) {
            console.log(err);
            response = {"status":500,"res":err};
            return response;  
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
            if(result) {
                response = {"status":204, "res": null}
            } else {
                response = {"status": 422, "res" : "Not found"}
            }
            return response;
        }catch(err) {
            response = {"status":500,"res":err};
            return response;  
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
                return {"status": 404, "res": "User not found"}
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
            response = {"status":500,"res":err};
            return response;  
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
            response = {"status":500,"res":err};
            return response;  
        }
    },
    addAddressToUser: async(params, body) => {
        try{
            const {street, city, street_number} = body;
            const { dni } = params;
            console.log(street, city, street_number, dni);
            const result = await db.Address.create({
                street: street,
                street_number,
                city,
                userId: dni
            });
            
            if(result) {
                response = {"status":201, "res": result}
            } else {
                response = {"status": 422, "res" : "Error trying to save in DB"}
            }
            return response;

        }catch(error) {
            response = {"status":500,"res":err};
            return response;  
        }
    }
}

module.exports = personService;