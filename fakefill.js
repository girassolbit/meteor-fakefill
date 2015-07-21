Fakefill = {
	fromSchema: function(schema, override){
		var doc = {};
		
		_.each(schema._schema, function(field, fieldName){
			if( field.type === String ){
				doc[fieldName] = FieldHandlers.string(field, fieldName);
			} else if( _.isRegExp(field.type) ){
				doc[fieldName] = FieldHandlers.schemaRegEx(field, fieldName)
			} else if( field.type === Number ){
				doc[fieldName] = faker.random.number();
			} else if(field.type === Boolean){
				doc[fieldName] = faker.random.boolean();
			}
		});

		return doc;
	},

	// Return a doc filled up with random values according to
	// SimpleSchema definitions
	genDoc: function(collection, override){
		if(collection._c2){
			return Fakefill.fromSchema(collection._c2._schema, override);
		} else {
			throw new Error('There\'s no schema attached to ' + _.capitalize(collection._name) + ' collection.');
		}
	}
}