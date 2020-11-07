# API Documentation

All routes respond with a `Content-Type` of `application/json`. The only accepted request body format is `application/json` and it must be specified in a `Content-Type` header, otherwise the server will respond with a `415 Unsupported Media Type`.

## `GET /products`

Responds with list of all products as a JSON array. Response is an empty array with status `200 OK` if there are no products in the database.

## `GET /products/:id`

Responds with the specified product as a JSON object, or status `404 Not found` if a product with the given `id` is not found.

## `POST /products`

Creates a new product. Takes in the following parameters:

Name     | Type     | Description
---------|----------|--------------
`name`   | `String` | Name of the product.
`brand`  | `String` | Brand/manufacturer of the product.
`price`  | `Number` | Price in euros (€).
`desc`   | `String` | A short description.
`img`    | `String` | URL to the image. **Optional**, defaults to placeholder.
`stock`  | `Number` | How many items in stock? **Optional**, defaults to zero.

On success, responds with `201 Created`, an empty body and a `Location` header pointing to where the newly created product is. If incorrect values are given, responds with `422 Unprocessable Entity`.

## `PUT /products/:id`

Modifies an existing product, which has the given `id`. Takes in the same parameters as `POST /products` but all parameters are considered optional, since they already have values. On success, responds with `200 OK` and the updated product. If incorrect values are given, responds with `422 Unprocessable Entity`. If a product with the given `id` is not found, responds with `404 Not found`.

## `DELETE /products/:id`

Deletes an existing product. On success, responds with `204 No content`. If a product with the given `id` is not found, responds with `404 Not found`.
