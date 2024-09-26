# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

***json
{
    "username": "renaldin",
    "password": "rahasia",
    "name": "Renaldi Noviandi"
}

Response Body Success :

***json
{
    "message": "Ok",
    "data": {
        "username": "renaldin",
        "name": "Renaldi Noviandi"
    }
}

Response Body Error :

***json
{
    "message": "Not Ok",
    "error": "Username already registered"
}

## Login User API

Endpoint : POST /api/users/login

Request Body :

***json
{
    "username": "renaldin",
    "password": "rahasia"
}

Response Body Success :

***json
{
    "message": "Login success",
    "data": {
        "token": "unique-token"
    }
}

Response Body Error :

***json
{
    "message": "Login failed",
    "errors": "Username or password wrong"
}

## Update User API

Endpoint : PATCH /api/users/current

Headers :
- Authorization : token

Request Body :

***json
{
    "name": "Renaldi Noviandi Lagi",
    "password": "new password"
}

Response Body Success :

***json
{
    "message": "Update success",
    "data": {
        "username": "renaldin",
        "name": "Renaldi Noviandi Lagi"
    }
}

Response Body Error :

***json
{
    "message": "Update faield",
    "errors": "Name length max 100"
}

## Get User API

Endpoint : GET /api/users/current

Headers :
- Authorization : token

Response Body

***json
{
    "message": "Ok",
    "data": {
        "username": "renaldin",
        "name": "Renaldi Noviandi"
    }
}

Response Body Error :

***json
{
    "message": "Unauthorized"
    "errors": "Unauthorized"
}

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :
- Authorization : token

Response Body Success :

***json
{
    "message": "Logout success",
    "data": {}
}

Response Body Error :

***json
{
    "message": "Unauthorized",
    "errors": "Unauthorized"
}