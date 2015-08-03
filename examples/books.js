Books = new Mongo.Collection('books');

Books.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: 'Book name'
	},

	ISBN: {
		type: String
	},

	authorName: {
		type: String,
		label: 'Author\'s name'
	} 
}));

/****************** FIXTURE ******************/

var generated = Books.fakefill.insert(10);

console.log(generated);