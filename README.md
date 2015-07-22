Fakefill
========

Create a random fake document based in a SimpleSchema (more documentation are coming, fellas)

Current methods of Fakefill object:

### Fakefill.fromSchema(simpleSchemaInstance)
```js
	var doc = Fakefill.fromSchema(new SimpleSchema({
		userName: {
			type: String,
			label: 'Site username'
		},

		email: {
			type: SimpleSchema.RegEx.Email,
			label: 'Your email'
		}
	}));

	=> { username: 'Maria_Juana666', email: 'imnotyourfatha@example.net' }
```
### Fakefill.genDoc(MongoCollectionInstance)
```js
	var doc = Fakefill.genDoc(Users);

	=> { username: 'Maria_Juana666', email: 'aycarmela@example.net', ... }
```		

### Faker
This package includes faker.js, so you can use it too calling `faker`.