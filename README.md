# Chainlink NodeJS External Adapter 

Basado en el template https://github.com/thodges-gh/CL-EA-NodeJS-Template.git

## Estamos utilizando la api de 

https://www.climatiq.io/

## Documentación

https://www.climatiq.io/docs

## Sección de Flights

https://www.climatiq.io/docs#travel-flights


## Creating your own adapter from this template

Clone this repo and change "ExternalAdapterProject" below to the name of your project

```bash
git clone https://github.com/thodges-gh/CL-EA-NodeJS-Template.git ExternalAdapterProject
```

Entra al nuevo directorio creado

```bash
cd ExternalAdapterProject
```

Puedes remover el historial repositorio de git ejecutando:

```bash
rm -rf .git
```

## Instalar localmente

Instalar dependencias:

```bash
yarn
```

### Run

Correr la aplicación de manera local (por defecto en el peurto 8080):

```bash
yarn start
```
## Llamar al external adapter/API Server

Localhost

```bash
curl -X POST "content-type: application" "http://localhost:8080/" --data ‘{"id": 1, "from": "ONT", "to": "SCL","passengers": 300,"class": "unknown" } }’
```
## Llamar al external adapter/API Server

Public URL

```bash
curl -X POST -H "content-type:application/json" "https://orca-app-wt4ks.ondigitalocean.app/" --data '{"id": 1, "data": {"from": "ONT", "to": "SCL","passengers": 300,"classFlight": "unknown" } }'
```



