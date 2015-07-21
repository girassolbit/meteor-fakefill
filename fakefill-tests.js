Tinytest.add('Fakefill - SimpleSchema should be available', function(test) {
	test.isTrue(typeof SimpleSchema !== 'undefined');
});

Tinytest.add('Detection of String field names - Should fill up email field without SimpleSchema.RegEx.Email as type', function(test){
	var doc = Fakefill.fromSchema(new SimpleSchema({
		authorEmail: {
			type: String,
			label: 'Author\'s email. String.'
		}
	}));

	test.isTrue(SimpleSchema.RegEx.Email.test(doc.authorEmail), 'Generated value was ' + doc.authorEmail);	
});


Tinytest.add('Detection of String field names - Should fill up email field with SimpleSchema.RegEx.Email as type', function(test){
	var doc = Fakefill.fromSchema(new SimpleSchema({
		authorEmail: {
			type: SimpleSchema.RegEx.Email,
			label: 'Author\'s email. RegEx.'
		}
	}));

	test.isTrue(SimpleSchema.RegEx.Email.test(doc.authorEmail), 'Generated value was ' + doc.authorEmail);
});


Tinytest.add('Detection of String field names - Should fill up name field with faker.name.userName()', function(test){
	var doc = Fakefill.fromSchema(new SimpleSchema({
		name: {
			type: String,
			label: 'User name'
		}
	}));

	test.isTrue(/[a-z_0-9]+/ig.test(doc.name), genErrMsg(doc.name));
});

Tinytest.add('Detection of Number field names - Should generate number without min/max defined', function(test){
	var doc = Fakefill.fromSchema(new SimpleSchema({
		userVisits: {
			type: Number,
			label: 'User visits counter' 
		}
	}));

	test.isTrue(typeof doc.userVisits === 'number', genErrMsg(doc.userVisits));
});


function genErrMsg(val){
	return 'Generated value was ' + val;
}