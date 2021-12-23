
# Groupaly API

Backend code base for Groupaly


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`FIREBASE` Enclose your firebse `serviceAccountKey.json` content.



## API Reference

#### Get random quote
**Note:** This uses quoteable api to retreive quote. 

```http
  GET /qoute
```
#### Get user data

```http
  GET /users/get
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userid`      | `string` | **Required**. User's id to be fetched |

#### Create user

```http
  POST /users/get
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userid`      | `string` | **Required**. User's id of the user to be created. |
| `username`| `string` | **Required**. Name of the user to be created. |


