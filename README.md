
# Plantillas v2
@Author: Stanley Salvatierra
@Fecha: 12/03/2020
@Company: deepmicrosystems.com
  
This documentation is to help you understand the project's structure.
This project will runs on React and requires Node and NPM or YARN to be installed.

The [repository](https://github.com/stanlee321/plantillas-2) holds the source code for the frontend of Plantillas version 2. The project is bootstraped with `create-react-app` with TypeScript.

## Technologies to be used:
* React 16.8 >
* TypeScript for development
* React Hooks
### Third Party packages
* [reactive-forms](https://www.npmjs.com/package/react-reactive-form)
* [Styled Components](https://styled-components.com/)
* Native HTTP client if Server is RESTAPI  or [Apollo Client](https://www.apollographql.com/docs/react/development-testing/static-typing/) if server is GaphQL

Se justifica la utilizacion de `TypeScript` de nuestro lado como una buena practica y la futura mantencion del codigo por cualquiera. 

Se justifica la utilzacion de  `reactive-forms` por ser el equivalente de la antigua libreria `formly` en Angular.

Utilizamos `Styled Components` porque consideramos que es la mejor manera de interactuar con CSS dentro de JavaScript siguiendo las mejores practicas.



## Views, Menus and Popups

Una descripcion detallada de Views, PopUps y Menus a ser contruidos estan [aqui](https://docs.google.com/document/d/1J8nfOJyIYLSttPdb1ZrhEs5Q3ScjppdN2Ot_nkQrz1A/edit?usp=sharing) .

## Backend Recomendations

Con la idea inicial de la escalabilidad del proyecto, se espera que el servidor pueda ser facilmente desplegado para cualquier tipo de clientes. 
De esta manera recomendamos que se considere la implementacion de un servidor GraphQL, ventajas y desventajas de un servidor GraphQL pueden ser encontrado en el [following link ](https://www.educative.io/edpresso/graphql-vs-rest).


### Database
We sugest to store the JSON information in NoSql format using `mongodb`  since we are updating individual fields from the client side and this operations are easy implemented in NoSQL  terms from the server side.

### API's

Sugerimos el cambio de endpoints REST a un esquema GraphQl, ya que de esta manera es mucho mas facil para el lado del cliente consumir e interactuar con la informacion del lado del servidor. Queremos mostrar a continuacion una reimplementacion del endpoint REST `Contactos` en terminos de GraphQL del lado del Servidor y Cliente.  Como nota adicional, GraphQL es independiente al tipo de base de datos que se utilize.

####  `Contactos` in GraphQL

Actualmente  `Contactos` REST endpoint puede ser simplificado con el siguiente esquema en GraphQL

**From the server side**

This is a snippet code for the `typesFile.js` .
```graphql

// typesFile.js

# Object definition

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

# Custom input definition

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

# All classical GETS
Query {
	contacto(id_contacto: ID!, inputContacto: InputContacto): Contacto!
	getContactos(order:Bool, limit=Int, page:Int, tipo_entidad: String): [Contacto]!
}	

# All the POST,PUT,DELETE operations can be accesed using only this two mutations
Mutation {
	crear_contact( inputContacto: InputContacto ): Contacto
	updateContact( id_contacto: ID!, toUpdate: InputContacto ): Contacto
}


# Socket if required...
Subscription {

}
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
	getContactos(order: $order, limit:$limit, page:$page,
                                tipo_entidad: $tipo_entidad ) {
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
La posibilidad de abrir un Socket con el metodo `Subscription` para escuchar a cualquier field esta abierta segun las necesidades.
Esperando que se pueda tomar en cuenta la implementacion del servidor en GraphQL, estamos abiertos a todas las sugerencias tambien que nos puedan dar de su lado.

