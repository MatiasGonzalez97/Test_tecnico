
# API CRUD

Api para crear usuarios y direcciones




## Instalacion y configuracion

El proyecto viene con variables de entorno para levantar la base de datos, modificar el archivo ***.env*** con sus credenciales

1° Correr ```npm i``` para instalar dependencias 

2° Levantar una BD Mysql con el script db.sql

3° Correr migraciones con ```npx sequelize-cli db:migrate```

4° Correr ```npm run dev``` para levantar el projecto

La collecion de postman para probar se encuentra adjunta en Test tecnico API CRUD.postman_collection



## Documentación de los Endpoints

Health Check Endpoint
localhost:4000/health 
```Response
Return status 200 and OK
```
## Creacion de usuarios
Method POST ***localhost:4000/api/person***
Request Body
name (text): The first name of the person.
last_name (text): The last name of the person.
age (text): The age of the person.
dni (text): The DNI of the person.
picture (file): A picture of the person.

Response Error
Status: 404
Content-Type: application/json
res: The response data.

Response Ok
```
{
    "res": {
        "lastName": "gonzalez",
        "firstName": "matias",
        "age": "30",
        "picture": "1706192338196.jpg",
        "dni": "123442",
        "updatedAt": "2024-01-25T14:18:58.205Z",
        "createdAt": "2024-01-25T14:18:58.205Z"
    }
}

```


## Obtencion de todos los usuarios 
Response all users stored in database
Request :
localhost:4000/api/person
Response example:
```
{
    "res": [
        {
            "dni": 1234,
            "firstName": "matias",
            "lastName": "gonzalez",
            "age": 30,
            "picture": "1706191413376.jpg",
            "createdAt": "2024-01-25T14:03:33.000Z",
            "updatedAt": "2024-01-25T14:03:33.000Z",
            "deletedAt": null,
            "address": [
                {
                    "id": 6,
                    "street": null,
                    "street_number": null,
                    "city": null,
                    "userId": 1234,
                    "createdAt": "2024-01-25T14:03:33.000Z",
                    "updatedAt": "2024-01-25T14:03:33.000Z",
                    "deletedAt": null
                }
            ]
        },
        ...
    ]
}

```

## Encontrar un usuario
localhost:4000/api/person/{{dni}}


Query Params: URL/{DNI}
Response example

```
{
    "res": {
        "dni": 1234,
        "firstName": "matias",
        "lastName": "gonzalez",
        "age": 30,
        "picture": "1706191413376.jpg",
        "createdAt": "2024-01-25T14:03:33.000Z",
        "updatedAt": "2024-01-25T14:03:33.000Z",
        "deletedAt": null,
        "address": [
            {
                "id": 6,
                "street": null,
                "street_number": null,
                "city": null,
                "userId": 1234,
                "createdAt": "2024-01-25T14:03:33.000Z",
                "updatedAt": "2024-01-25T14:03:33.000Z",
                "deletedAt": null
            }
        ]
    }
}

```

## Eliminar un usuario


localhost:4000/api/person/{{dni}}

Response 
```
status code 204
```

## Editar un usuario

This endpoint allows updating a specific person's information using their ID.
Request
Endpoint

```
PUT localhost:4000/api/person/{dni}
```
Request Body
last_name (string, required): The updated last name of the person.

Or the attribute you want to change

**Response**
```
{
    "res": {
        "dni": 12344,
        "firstName": "matias",
        "lastName": "dasdsadsa",
        "age": 30,
        "picture": "1706191449789.jpg",
        "createdAt": "2024-01-25T14:04:09.000Z",
        "updatedAt": "2024-01-25T14:04:56.959Z",
        "deletedAt": null
    }
}
```
## Exportar
```
localhost:4000/api/person/export/csv
```
Returns a csv file

## Encontrar un user por query params

```
localhost:4000/api/person/find?name=sad
```

The request should include the DNI || name || age as a query parameter.

Response 
```
{
    "res": [
        {
            "dni": 12344,
            "firstName": "matias",
            "lastName": "dasdsadsa",
            "age": 30,
            "picture": "1706191449789.jpg",
            "createdAt": "2024-01-25T14:04:09.000Z",
            "updatedAt": "2024-01-25T14:04:56.000Z",
            "deletedAt": null,
            "address": [
                {
                    "id": 7,
                    "street": null,
                    "street_number": null,
                    "city": null,
                    "userId": 12344,
                    "createdAt": "2024-01-25T14:04:09.000Z",
                    "updatedAt": "2024-01-25T14:04:09.000Z",
                    "deletedAt": null
                }
            ]
        }
    ]
}
```
## Añadir direccion a un usuario

Request Body
url/{userId} (DNI)

street (string, required)

street_number (number, required)

city (string, required)

Body example:
```
{
    "street": "Avenida siempreviva 123",
    "street_number": 22,
    "city": "Los angeles"
}
```
Response example:
```
{
    "res": {
        "id": 8,
        "street": "23e232",
        "street_number": 22,
        "city": "Los angeles",
        "userId": "12344",
        "updatedAt": "2024-01-25T14:07:06.828Z",
        "createdAt": "2024-01-25T14:07:06.828Z"
    }
}
```
