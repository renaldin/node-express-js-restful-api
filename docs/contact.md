# Contact API Spec

## Create Contact API

Endpoint : POST /api/contact

Headers : 
- Authorization : token

Request Body :

***json
{
    "first_name": "Renaldi",
    "last_name": "Noviandi",
    "email": "renaldi@gmail.com",
    "phone": "0898234325532"
}

Request Body Success :

***json
{
    "message": "Succesfully contact created",
    "data": {
        "id": 1,
        "first_name": "Renaldi",
        "last_name": "Noviandi",
        "email": "renaldi@gmail.com",
        "phone": "0898234325532"
    }
}

Request Body Error :

***json
{
    "errors": "Email is not valid format"
}

## Update Contact API

Endpoint : PUT /api/contact/:id

Headers : 
- Authorization : token

Request Body :

***json
{
    "first_name": "Renaldi",
    "last_name": "Noviandi",
    "email": "renaldi@gmail.com",
    "phone": "0898234325532"
}

Request Body Success :

***json
{
    "message": "Succesfully contact updated",
    "data": {
        "id": 1,
        "first_name": "Renaldi",
        "last_name": "Noviandi",
        "email": "renaldi@gmail.com",
        "phone": "0898234325532"
    }
}

Request Body Error :

***json
{
    "errors": "Email is not valid format"
}

## Get Contact API

Endpoint : GET /api/contact/:id

Headers : 
- Authorization : token

Request Body Success :

***json
{
    "message": "Ok",
    "data": {
        "id": 1,
        "first_name": "Renaldi",
        "last_name": "Noviandi",
        "email": "renaldi@gmail.com",
        "phone": "0898234325532"
    }
}

Request Body Error :

***json
{
    "errors": "Contact is not found"
}

## Search Contact API

Endpoint : GET /api/contact

Headers : 
- Authorization : token

Query Params :
- name : Search by fisrt_name or last_name, optional, using like
- email : Search by email, optional, using like
- phone : Search by phone, optional, using like
- page : number og page, default 1
- size : Size per page, default 10

Request Body Success :

***json
{
    "paging": {
        "page": 1,
        "total_page": 3.
        "total_item": 30,
    },
    "data": [
        {
            "id": 1,
            "first_name": "Renaldi",
            "last_name": "Noviandi",
            "email": "renaldi@gmail.com",
            "phone": "0898234325532"
        }
    ]
}

Request Body Error :

***json
{
    "errors": "Data not found"
}

## Remove Contact API

Endpoint : DELETE /api/contact/:id

Headers : 
- Authorization : token

Request Body Success :

***json
{
    "message": "Successfully contact deleted",
    "data": 1
}

Request Body Error :

***json
{
    "errors": "Contact is not found"
}


