Tinytest.add('Fakefill - SimpleSchema should be available', function(test) {
	test.isTrue(typeof SimpleSchema !== 'undefined');
});

Tinytest.add('Detection of String field names - Should fill up email field', function(test){
	var doc = Fakefill.fromSchema(new SimpleSchema({
		authorEmail: {
			type: String,
			label: 'Author\'s email. String.'
		}
	}));

	test.isTrue(SimpleSchema.RegEx.Email.test(doc.authorEmail), genErrMsg(doc.authorEmail));	
});

Tinytest.add('Detection of String field names - Should fill up email field with SimpleSchema.RegEx.Email as type', function(test){
	var doc = Fakefill.fromSchema(new SimpleSchema({
		authorEmail: {
			type: SimpleSchema.RegEx.Email,
			label: 'Author\'s email. RegEx.'
		}
	}));

	test.isTrue(SimpleSchema.RegEx.Email.test(doc.authorEmail), genErrMsg(doc.authorEmail));
});

Tinytest.add('Detection of String field names - Should fill up email field with field type [String] ', function(test){
	var doc = Fakefill.fromSchema(new SimpleSchema({
		authorEmail: {
			type: [String],
			label: 'Author\'s email. String.'
		}
	}));

	test.isTrue(SimpleSchema.RegEx.Email.test(doc['authorEmail.$']), genErrMsg(doc.authorEmail));	
});

Tinytest.add('Detection of String field names - Should fill up name field with faker.internet.userName()', function(test){
	var doc = Fakefill.fromSchema(new SimpleSchema({
		name: {
			type: String,
			label: 'User name'
		}
	}));

	test.isTrue(/[a-z_.0-9]+/ig.test(doc.name), genErrMsg(doc.name));
});

Tinytest.add('Detection of Number field types - Should generate number without min/max defined', function(test){
	var doc = Fakefill.fromSchema(new SimpleSchema({
		userVisits: {
			type: Number,
			label: 'User visits counter' 
		}
	}));

	test.isTrue(typeof doc.userVisits === 'number', genErrMsg(doc.userVisits));
});

Tinytest.add('Detection of Number field types - Should generate number respecting its defined max', function(test){
	var doc = Fakefill.fromSchema(new SimpleSchema({
		total: {
			type: Number,
			max: 10,
			label: 'Total' 
		}
	}));

	test.isTrue(typeof doc.total === 'number' && doc.total <= 10, genErrMsg(doc.userVisits));
});

Tinytest.add('Detection of Boolean field types - Should generate any boolean value', function(test){
	var doc = Fakefill.fromSchema(new SimpleSchema({
		agree: {
			type: Boolean,
			label: 'Agree' 
		}
	}));

	test.isTrue(typeof doc.agree === "boolean", genErrMsg(doc.agree));
});

// Tinytest.add('Recursive Schemas - Should respect and fill the nested fields', function(test){
// 	var doc = Fakefill.fromSchema(new SimpleSchema({
// 		profile: {
// 			type: new SimpleSchema({
// 				firstName: {
// 					type: String
// 				},

// 				lastName: {
// 					type: String
// 				},

// 				email: {
// 					type: String
// 				}
// 			})
// 		}
// 	}));
// });

Tinytest.add('Allowed Values - Should pick a value from allowedValues array', function(test){
	var cities = ['Teresina', 'Pouso Alegre'];
	var doc = Fakefill.fromSchema(new SimpleSchema({
		bestCities: {
			type: String,
			allowedValues: cities
		}
	}));

	test.isTrue( cities.indexOf(doc.bestCities) !== -1 );
});

Tinytest.add('Allowed Values - Should pick a value from allowedValues function', function(test){
	var cities = ['Teresina', 'Pouso Alegre'];
	var doc = Fakefill.fromSchema(new SimpleSchema({
		bestCities: {
			type: String,
			allowedValues: function(){
				return cities;
			}
		}
	}));

	test.isTrue( cities.indexOf(doc.bestCities) !== -1 );
});

Tinytest.add('Overrides - Should call override method', function(test){
	var doc = Fakefill.fromSchema(new SimpleSchema({
		userName: {
			type: String
		}
	}), {
		userName: function(){
			return faker.name.findName();
		}
	});

	test.isTrue(/([a-z]+)\s([a-z+])/gi.test(doc.userName), genErrMsg(doc.userName));
});


function genErrMsg(val){
	return 'Generated value was ' + val;
}