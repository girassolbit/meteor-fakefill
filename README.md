Fakefill
========

Magically creates a random fake data such as names, addresses, and phone numbers based in your SimpleSchema. Good for testing fixtures.

## Installation

Install using Meteor's package management system:

```bash
> meteor add gbit:fakefill
```

## Testing (if you clone the package)
```sh 
$ meteor test-packages ./
```

## How to use

### Fakefill goal: easily seed data
Do you want to seed your collection in a single line with zero effort?
```js
// Create for me 10 random users, please.
Users.fakefill.gen(10);
```

### Fakefill.fromSchema(simpleSchemaInstance, overrides)
You can get a random totally filled doc just passing a schema to `Fakefill.fromSchema`.
Fakefill will load all the fields and generate the proper data for each of them.
So just relax and: 
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
But if you're unhappy with the generated data of a field, you can pass an override:
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
}), {
	userName: function(){
		return 'oh my god';
	}
});

=> { username: 'oh my god', email: 'imnotyourfatha@example.net' }
```
That's it.

### Fakefill.genDoc(MongoCollectionInstance, overrides)
This method is just a shortcut for Fakefill(Collection.simpleSchema()) 
```js
	var doc = Fakefill.genDoc(Users);

	=> { username: 'Maria_Juana666', email: 'aycarmela@example.net', ... }
```		

### Fakefill.setLocale(locate)
```js
	Fakefill.setLocale('pt_BR');
```

Set the language locate you want. See the supported locales:

 * de
 * de_AT
 * de_CH
 * en
 * en_AU
 * en_BORK
 * en_CA
 * en_GB
 * en_IE
 * en_IND
 * en_US
 * en_au_ocker
 * es
 * fa
 * fr
 * fr_CA
 * ge
 * it
 * ja
 * ko
 * nb_NO
 * nep
 * nl
 * pl
 * pt_BR
 * ru
 * sk
 * sv
 * tr
 * uk
 * vi
 * zh_CN
 * zh_TW


## Mongo.Collection instances
You can call Fakefill from your Collection namespace

### Collection.fakefill.insert
Do you want to easily seed your collection of 10 fake docs?
Just do it:
```js
	var docs = Authors.fakefill.insert(10); //
	=> [ { profile: { firstName: '...', lastName: '...', email: '...' }, ..., ..., ... } ]
```
This method inserts the number you specified of random documents to your collection

### Colection.fakefill.gen
This method doesn't insert nothing to your collection, just returns a array with
random documents.
```js
	var Authors = new Mongo.Collection('authors');
	Authors.attachSchema(new SimpleSchema({
		profile: {
			type: new SimpleSchema({
				firstName: {
					type: String
				},

				lastName: {
					type: String
				},

				email: {
					type: String
				}
			})
		}
	}));

	var docs = Authors.fakefill.gen(10); //
	=> [ { profile: { firstName: '...', lastName: '...', email: '...' }, ..., ..., ... } ]
```

### Faker
This package includes gbit:faker, so you can use it too calling `faker`.

### Issues
- Fakefill don't fill up correctly schema fields with type [Type]
- Autodetect for field with String type is too slow (hope improve this soon) :(

### Pull request
Accepting pull requests that increase Fakefill perfomance.