faker 		= Npm.require('faker');
_ 			= Npm.require('underscore');
fuzzy		= Npm.require('clj-fuzzy').metrics.sorensen;

GetMethods = {
	get: function(obj, holders){
		var mainMethods = _.reject( _.keys(obj), function(name){ 
			return name === "random" || name === "helpers" || name === "date" 
				|| name === "fake" || name === "locales" || name === "locale" || name === "localeFallback" || name === "definitions"; 
		});

		var methods = [];
		_.each(mainMethods, function(name){
			if(_.isObject(obj[name]) && !_.isFunction(obj[name])){
				methods = methods.concat( GetMethods.get(obj[name], name) );
			} else {
				if(holders){
					GetMethods.holders[name] = holders;
				}

				methods.push(name);					
			}
		});

		return methods;		
	},

	holders: {}
}

GetMethods.holders = {};
var fakerMethods = GetMethods.get(faker);

Fuzzy = {
	filter: function(string, list, debug){
		list = list.sort(function(a, b){
			return fuzzy(string, a) < fuzzy(string, b) ? 1 : -1;
		});

		if(debug){
			console.log('debugging', 'comparison score for ' + string);
			list = _.map(list, function(item){
				return item + ' -> ' + fuzzy(string, item);
			});
		}	

		return list;
	},

	getWinner: function(string, list){
		return this.filter(string, list)[0];
	}
}

FieldHandlers = {
	string: function(field, fieldName){
		return this.callFakerProperMethod(fieldName);
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


	callFakerProperMethod: function(fieldName){
		var method = Fuzzy.getWinner(fieldName, fakerMethods);
		if(GetMethods.holders[method]){
			return faker[GetMethods.holders[method]][method]();
		}		
	}
}

