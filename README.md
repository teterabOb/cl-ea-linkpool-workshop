# Introducción

Este repo es para el workshop de External Adapters para la comunidad hispano hablante. Esta demostración muestra cómo construir un external adapter que se conecta a un nodo Oracle de Chainlink para que sus contratos inteligentes puedan obtener datos arbitrarios de una API externa. Puedes leer sobre los [External Adapters](https://docs.chain.link/docs/external-adapters/) aquí.

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
curl -X POST -H "content-type:application/json" "http://localhost:8080" --data '{"id": 1, "data": {"from": "ONT", "to": "SCL","passengers": 300,"class": "unknown" } }'
```
## Llamar al external adapter/API Server

URL Pública

[API_Endpoint] = https://orca-app-wt4ks.ondigitalocean.app/

```bash
curl -X POST -H "content-type:application/json" "API_ENDPOINT" --data '{"id": 1, "data": {"from": "ONT", "to": "SCL","passengers": 300,"classFlight": "unknown" } }'
```

```bash
curl -X POST -H "content-type:application/json" "https://orca-app-wt4ks.ondigitalocean.app/" --data '{"id": 1, "data": {"from": "ONT", "to": "SCL","passengers": 300,"classFlight": "unknown" } }'
```




