# taskjam
A Project/Task manager built on NestJS + MongoDB + React.

## Usage

### Docker
If you have Docker installed, you can use the following:

```
docker-compose up -d
```


#### How to test
You can use your browser to check that both apps are running:
- Backend: `http://localhost:3000/api/docs`
- Frontend `http://localhost:5173/`

To register a user, use the following URL on the frontend:
`http://localhost:5173/#/register`

You can then use your new credentials on the login page _(root URL)_.

Alternatively, you can use the backend directly:
```
curl --location 'http://localhost:3000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email": "me@company.io",
	"name": "Me Company",
	"password": "mystrongpassword"
}'
```


### Manual
If you don't have docker installed, you'll first want to have a local MongoDB set up. In `backend/src/app.module.ts`, you'll want to replace `mongodb://mongo/nest` with the local URL of your new database.

Then, run each part manually (use separate terminals):

Backend
```
cd backend
yarn
yarn start:dev
```

Frontend
```
cd frontend
yarn
yarn dev
```

## API Docs

Once running, you can browse the API Swagger doc at [https://localhost:3000/api/docs](https://localhost:3000/api/docs).


## References
- `https://marmelab.com/react-admin/`
- `https://github.com/carlomigueldy/nest-js-todo-rest-api`
