# Address API Spec

## Create Address API

Endpoint : POST /api/contact/:contactId/addresses

Headers :
- Authorization : token

Request Body :

***json
{
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
}

Request Body Success :

***json
{
    "message": "Succesfully address created",
    "data": {
        "id": 1,
        "street": "Jalan apa",
        "city": "Kota apa",
        "province": "Provinsi apa",
        "country": "Negara apa",
        "postal_code": "Kode pos"
    }
}

Request Body Error :

***json
{
    "errors": "Country is required"
}

## Update Address API

Endpoint : PUT /api/contact/:contactId/addresses/:addressId

Headers :
- Authorization : token

Request Body :

***json
{
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
}

Request Body Success :

***json
{
    "message": "Succesfully address updated",
    "data": {
        "id": 1,
        "street": "Jalan apa",
        "city": "Kota apa",
        "province": "Provinsi apa",
        "country": "Negara apa",
        "postal_code": "Kode pos"
    }
}

Request Body Error :

***json
{
    "errors": "Country is required"
}

## Get Address API

Endpoint : GET /api/contact/:contactId/addresses/:addressId

Headers :
- Authorization : token

Request Body Success :

***json
{
    "data": {
        "id": 1,
        "street": "Jalan apa",
        "city": "Kota apa",
        "province": "Provinsi apa",
        "country": "Negara apa",
        "postal_code": "Kode pos"
    }
}

Request Body Error :

***json
{
    "errors": "Contact is not found"
}

## List Addresses API

Endpoint : GET /api/contact/:contactId/addresses

Headers :
- Authorization : token

Request Body Success :

***json
{
    "data": [
        {
            "id": 1,
            "street": "Jalan apa",
            "city": "Kota apa",
            "province": "Provinsi apa",
            "country": "Negara apa",
            "postal_code": "Kode pos"
        },
        {
            "id": 2,
            "street": "Jalan apa",
            "city": "Kota apa",
            "province": "Provinsi apa",
            "country": "Negara apa",
            "postal_code": "Kode pos"
        }
    ]
}

Request Body Error :

***json
{
    "errors": "Contact is not found"
}

## Remove Address API

Endpoint : DELETE /api/contact/:contactId/addresses/:addressId

Headers :
- Authorization : token

Request Body Success :

***json
{
    "message": "Succesfully address deleted",
    "data": 1
}

Request Body Error :

***json
{
    "errors: "Address is not found"
}
