Fakefill
========

Create a random fake document based in a SimpleSchema (more documentation are coming, fellas)

Current methods of Fakefill object:
	- Fakefill.fromSchema(simpleSchemaInstance)
		`javascript
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
		`
	- Fakefill.genDoc(MongoCollectionInstance)
		`javascript
			var doc = Fakefill.fromSchema(Schemas.User);

			=> { username: 'Maria_Juana666', email: 'aycarmela@example.net', ... }
		`		

