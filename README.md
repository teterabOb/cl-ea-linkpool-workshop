# Chainlink NodeJS External Adapter 

Basado en el template https://github.com/thodges-gh/CL-EA-NodeJS-Template.git

Estamos utilizando la api de 

https://www.climatiq.io/

Documentación

https://www.climatiq.io/docs

Sección de Flights

https://www.climatiq.io/docs#travel-flights

## Request

```bash
curl -X POST "content-type: application" "http://localhost:8080/" --data ‘{"id": 1, "from": "ONT", "to": "SCL","passengers": 300,"class": "unknown" } }’
```

## Creating your own adapter from this template

Clone this repo and change "ExternalAdapterProject" below to the name of your project

```bash
git clone https://github.com/thodges-gh/CL-EA-NodeJS-Template.git ExternalAdapterProject
```

Enter into the newly-created directory

```bash
cd ExternalAdapterProject
```

You can remove the existing git history by running:

```bash
rm -rf .git
```

## Install Locally

Install dependencies:

```bash
yarn
```

### Run

Natively run the application (defaults to port 8080):

```bash
yarn start
```

## Call the external adapter/API server

```bash
curl -X POST -H "content-type:application/json" "http://localhost:8080/" --data '{"id": 1, "data": {"from": "ONT", "to": "SCL","passengers": 300,"classFlight": "unknown" } }'
```