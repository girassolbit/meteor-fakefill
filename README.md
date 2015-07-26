Fakefill
========

Create a random fake data such as names, addresses, and phone numbers based in your SimpleSchema

## Installation

Install using Meteor's package management system:

```bash
> meteor add gbit:fakefill
```

## How to use

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


### Mongo.Collection instances
You can call Fakefill from your Collection namespace

### Colection.fakefill.gen
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
This method doesn't insert nothing to your collection, just returns a array with
random documents.

### Collection.fakefill.insert
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

	var docs = Authors.fakefill.insert(10); //
	=> [ { profile: { firstName: '...', lastName: '...', email: '...' }, ..., ..., ... } ]
```
This method inserts the number you specified of random document to your collection



### Faker
This package includes faker.js, so you can use it too calling `faker`.

### Pull request
Accepting pull requests that increase Fakefill perfomance.