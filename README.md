
# Plantillas 2

  
This documentation is to help you understand the project's structure.
This project will runs on React and requires Node and NPM or YARN to be installed.

The [repository](https://github.com/stanlee321/plantillas-2) holds the source code for the frontend of Planillas version 2. The project is bootstraped with `create-react-app` with TypeScript.

## Technologies to be used:
* React 16.8 >
* TypeScript for development
* React Hooks
### Thirth Party packages
* [reactive-forms](https://www.npmjs.com/package/react-reactive-form)
* [Styled Components](https://styled-components.com/)
* Native HTTP client if Server is RESTAPI  or [Apollo Client](https://www.apollographql.com/docs/react/development-testing/static-typing/) if server is GaphQL

## Template and UI/UX Schema to be used

We are going to follow this theme design


![Theme](https://github.com/stanlee321/shards-dashboard-react/raw/master/assets/demo-preview.gif "Logo Title Text 1")

You can find the theme source code [here](https://github.com/stanlee321/shards-dashboard-react). The end result will follow responsive design.


## Views and Popups

A detailed description of Views, PopUps and menus to be built are [here](https://docs.google.com/document/d/1J8nfOJyIYLSttPdb1ZrhEs5Q3ScjppdN2Ot_nkQrz1A/edit?usp=sharing) .

## Backend Recomendations

With the idea of ​​the scalability of the project, it is hoped that a Server can be prepared for all kinds of deployments. We recomend the [following link ](https://www.educative.io/edpresso/graphql-vs-rest). Based on that we propose the following modifications for the actual REST endpoints


## Database
We sugest to store the JSON information in NoSql format using `mongodb`  since we are updating individual fields from the client side and this operations are easy implemented in NoSQL  terms.

## API's
We sugest to change the design of the endpoints to a GraphQl schema, since this is more scalable and easy to interact from the Client side,  we show here down a re-implementation of the `Contactos` REST endpoint as GraphQL endpoint.

Also GraphQl is independent to the database.
####  `Contactos` in GraphQL
Actually  `Contactos` REST endpoint can be simplified using GraphQl schema to

**From the server**

This is a snippet code for the `typesFile.js` .
```graphql

// typesFile.js

Type Contacto {
	id_contacto: ID!
	nombres: String
	apellidos: String
	cargo: String
	entidad: String
	sigla: String
	direccion: String
	grado: String
	tipo_entidad: String
	telefono: Int
	departamento: String
	estado: String
	_usuario_creacion: Int
	_usuario_modificacion: String
	_fecha_creacion: String
	_fecha_modificacion: String
}

Input InputContacto {
	nombres:String
	apellidos: String
	cargo: String
	telefono: Int
	tipo_entidad: String!
	entidad: String
	sigla: String
	direccion: String
	estado: String
	departamento: String
	grado: String
	_usuario_creacion: Int
	_fecha_creacion: String
	_fecha_modificacion: String
}

Query {
	contacto(id_contacto: ID!, inputContacto: InputContacto): Contacto!
	getContactos(order:Bool, limit=Int, page:Int, tipo_entidad: String): [Contacto]!
}	

# All the POST,PUT,DELETE operations can be accesed using only this two mutations
Mutation {
	crear_contact( inputContacto: InputContacto ): Contacto
	updateContact( id_contacto: ID!, toUpdate: InputContacto ): Contacto
}


# Create the Resolvers using the Apollo serverSide Client
```


**From the client side ...**

We only will call to this `query `or `mutations` from our GraphQl Client and create, update or access only the required field on demand.

```graphql

query Contacto($id: ID!, $inputContacto: InputContacto ) {
	contacto(id: $id,nombres:  inputContacto: $inputContacto ) {
		id_contacto
		nombres
		apellidos
		cargo
		...
		...any field on demand...

	}
}

```
```graphql

query GetContactos($order:Bool, $limit:Int, $page:Int, $tipo_entidad: String) {
	getContactos(order: $order, limit:$limit, page:$page, tipo_entidad: $tipo_entidad ) {
		id_contacto
		nombres
		apellidos
		cargo
	...
		...any field on demand...
	}
}

```

```graphql

mutation UpdateContact($id_contacto: ID!, $toUpdate: InputContacto ) {
	updateContactupdateContact(id_contacto: $id_contacto, toUpdate: $toUpdate) {
		id_contacto
		nombres
		apellidos
		cargo
		...
		...any field on demand...

	}
}

```


```graphql

mutation Crear_contact($inputContacto: InputContacto ) {
	crear_contact(inputContacto: $inputContacto) {
		id_contacto
		nombres
		apellidos
		cargo
		...
		...any field on demand...

	}
}

```

The posibilitie to open a Socker with the `Subscription` method in is open to any field of interest.

 