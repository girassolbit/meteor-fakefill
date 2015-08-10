Fakefill = {
	/**
	 * Return a doc filled up with random values according to a Schema
	 * @param  {SimpleSchema instance} schema
	 * @param  {object} overrides  - here you can pass the fields you want to be treated by your own
	 * @param  {options} - here you can pass:
	 *         { omit: ['someField', 'someOtherField'] };
	 * @return {object} - a generated random doc
	 */
	fromSchema: function(schema, overrides, options){
		var doc = {}, 
			schemaFields = schema._schema;
		options = _.extend({}, options);

		if(options.omit)
		schemaFields = _.omit(schemaFields, function(val, field){
			return _.includes(options.omit, field);
		});

		_.each(schemaFields, function(field, fieldName){
			if(overrides && overrides[fieldName]){
				if(_.isFunction(overrides[fieldName]))
					doc[fieldName] = overrides[fieldName]();
				else 
					doc[fieldName] = overrides[fieldName];					
				return;
			}
			
			// FIX: Doesn't accepting [Array] types
			if(field.type === Object || field.type === Array) return;

			doc[fieldName] = Fakefill.randomField(field, fieldName);
		});

		// Here shoud expand the object doc;
		doc = FieldHandlers.expandObj(doc);
		return doc;
	},

	randomField: function(field, fieldName){
		var field;

		if(field.allowedValues){
			field = FieldHandlers.requiresAllowedValues(field);
		} else if( field.type === String ){
			field = FieldHandlers.string(field, fieldName);
		} else if( _.isRegExp(field.type) ){
			field = FieldHandlers.schemaRegEx(field, fieldName)
		} else if( field.type === Number ){
			field = FieldHandlers.number(field);
		} else if(field.type === Boolean){
			field = faker.random.boolean();
		}		

		return field;
	},
	
	/**
	 * Return a doc filled up with random values according to Schema in a collection
	 * @param  {Mongo.Collection instance} collection - any collection you want
	 * @param  {object} overrides  - here you can pass the fields you want to be treated by your own
	 * @return {object} - a generated random doc to you use
	 */
	genDoc: function(collection, overrides, options){
		if(collection.simpleSchema){
			return Fakefill.fromSchema(collection.simpleSchema(), overrides, options);
		} else {
			throw new Error('There\'s no schema attached to ' + collection._name + ' collection.');
		}
	},

	setLocale: function(locale){
		faker.locate = locale;
	}
}

Mongo.Collection.prototype.fakefill = function(){
	var collection = this;

	return {
		gen: function(total, overrides, options){
			var docs = _.times(total, function(){
				var doc = Fakefill.genDoc(collection, overrides, options);				
				return doc;
			});

			return docs;
		},

		insert: function(total, overrides, options){
			var genDocs = this.gen(total, overrides, options);
			_.each(genDocs, function(doc){
				collection.insert(doc);
			});

			return genDocs;
		},

		insertIfEmpty: function( total, overrides, options){
			if( !collection.findOne() )
				this.insert(total, overrides, options);
		}
	}
}