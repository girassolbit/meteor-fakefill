_ = lodash

faker 		= Npm.require('faker');
fuzzy		= Npm.require('clj-fuzzy').metrics.dice;

GetMethods = {
	get: function getMethods(obj, holders){
		// This line is an performance assurance
		if(!_.isEmpty(GetMethods.methods) && !holders){ Log.warn('Fakefill: ', GetMethods.methods); return GetMethods.methods;}

		var mainMethods = _.reject( _.keys(obj), function(name){ 
			return name === "random" 
				|| name === "helpers" 
				|| name === "date" 
				|| name === "fake" 
				|| name === "locales" 
				|| name === "locale" 
				|| name === "localeFallback" 
				|| name === "definitions"
				; 
		});

		var methods = [];
		_.each(mainMethods, function(name){
			if(_.isObject(obj[name]) && !_.isFunction(obj[name])){
				methods = methods.concat( getMethods(obj[name], name) );
			} else {
				if(holders){
					GetMethods.holders[name] = holders;
				}

				methods.push(name);					
			}
		});
		
		this.methods = methods;

		return methods;		
	},

	methods: [],

	holders: {}
}

var fakerMethods = GetMethods.get(faker);

Fuzzy = {
	/**
	 * Order a array of names passed by the comparison score
	 * @param  {String} string 	[String to compare with]
	 * @param  {Array} list   	[Array of names]
	 * @param  {Boolean} debug  [log the list with comparison score]
	 * @return {Array}        	[The ordered list]
	 */
	filter: function(string, list, debug){
		list = list.sort(function(a, b){
			return fuzzy(string, a) < fuzzy(string, b) ? 1 : -1;
		});

		if(debug){
			Log.info('debugging', 'comparison score for ' + string);
			Log.info(_.map(list, function(item){
				return item + ' -> ' + fuzzy(string, item);
			}));
		}	

		return list;
	},
	/**
	 * Return the first element of the ordered list
	 */
	getWinner: function(string, list, debug){
		return this.filter(string, list, debug)[0];
	}
}

FieldHandlers = {
	string: function(field, fieldName){
		return this.callFakerProperMethod(fieldName);
	},

	number: function(field){
		if(field.max){
			var max = field.max.constructor === Function ? field.max() : field.max;
			return faker.random.number(max);
		} else {
			return faker.random.number(100);
		}
	},

	schemaRegEx: function(field, fieldName){
		var methodName;
		_.each(_.keys(SimpleSchema.RegEx), function(name){
			if(field.type === SimpleSchema.RegEx[name]) {
				methodName = name;
			}
		});	

		if(!methodName) throw new Error('RegEx unrecognized.');	

		return this.callFakerProperMethod(methodName);
	},

	requiresAllowedValues: function(field, fieldName){
		var arr = field.allowedValues.constructor === Function ?
				field.allowedValues() : field.allowedValues;
		return faker.random.arrayElement(arr);
	},

	callFakerProperMethod: function(fieldName){
		var method = Fuzzy.getWinner(fieldName, fakerMethods);
		if(GetMethods.holders[method]){
			return faker[GetMethods.holders[method]][method]();
		}		
	},

	// This piece of code was taken from 
	// https://github.com/aldeed/meteor-autoform/blob/devel/utility.js#L207
	// Thanks for aldeed, I'll buy you a coke later, dude.
	expandObj: function expandObj(doc) {
		var newDoc = {}, subkeys, subkey, subkeylen, nextPiece, current;
		_.each(doc, function(val, key) {
		  subkeys = key.split(".");
		  subkeylen = subkeys.length;
		  current = newDoc;
		  for (var i = 0; i < subkeylen; i++) {
			subkey = subkeys[i];
			if (typeof current[subkey] !== "undefined" && !_.isObject(current[subkey])) {
			  break; //already set for some reason; leave it alone
			}
			if (i === subkeylen - 1) {
			  //last iteration; time to set the value
			  current[subkey] = val;
			} else {
			  //see if the next piece is a number
			  nextPiece = subkeys[i + 1];
			  nextPiece = parseInt(nextPiece, 10);
			  if (isNaN(nextPiece) && !_.isObject(current[subkey])) {
				current[subkey] = {};
			  } else if (!isNaN(nextPiece) && !_.isArray(current[subkey])) {
				current[subkey] = [];
			  }
			}
			current = current[subkey];
		  }
		});
		return newDoc;	
	}
}

