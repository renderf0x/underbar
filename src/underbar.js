/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {

  	return val;

  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
  	if(n > array.length){
  		return array;
  	}else{
  		return n === undefined ? array[array.length - 1] : array.slice(array.length - n, array.length);
  	}
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
  	if(Array.isArray(collection)){ // If we're dealing with an array
		for(var i = 0; i < collection.length; i++){
		iterator(collection[i], i, collection);
		}
	}else{ // is an Object
		for(var key in collection){
			iterator(collection[key], key, collection);
		}
	}

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
  	var results =  [];
  	_.each(collection, function(item, index){
  		if(test(item)){
  			results.push(item);
  		}
  	});

  	return results;

  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    return _.filter(collection, function(item){
    	if (!test(item)) return item;
    });

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
  	var resultArray = [];

  	_.each(array, function(item){
  		if (_.indexOf(resultArray, item) === -1){
  			resultArray.push(item);
  		}

  	})

  	return resultArray;

  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    // note - currently implemented just for arrays; would need additional lines to handle
    // objects
    var results = [];
    for(var i = 0; i < collection.length; i++){
    	results.push(iterator(collection[i]));
    }

    return results;

  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by functionOrKey on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  	//assuming we're getting arrays as input
  	var isFunc = (typeof functionOrKey == "function");
  	return _.map(collection, function(value){
  		return (isFunc ? functionOrKey : value[functionOrKey]).apply(value, args);
  		});
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    //if array
    if (Array.isArray(collection)){
      var total;
      var previousValue = (accumulator !== undefined? accumulator : collection[0]);
      for (var i = 0; i < collection.length; i++){
        total = iterator(previousValue, collection[i]);
        previousValue = total;
      }
      return total;
    } else {
        var total;
        var previousValue = (accumulator !== undefined? accumulator : collection[0]);
        for (var i in collection){
          total = iterator(previousValue, collection[i]);
          previousValue = total;
        }
        return total;
    }


  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (collection.length < 1) return true;
    if (iterator === undefined){
      iterator = _.identity;
    }

    return Boolean(_.reduce(collection, function(passedTest, item){
      if (!passedTest){
        return false;
      }
      return iterator(item);

    }, true));

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (iterator === undefined){
      iterator = _.identity;
    }

    return Boolean(_.reduce(collection, function(passedTest, item){
      if (passedTest){
        return true;
      }
      return iterator(item);

    }, false));

  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {

      var extensions = Array.prototype.slice.call(arguments, 1);

      for (var i = 0; i < extensions.length; i++){
        for (var key in extensions[i]){
          obj[key] = extensions[i][key];
        }
      }

      return obj;

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {

    var extensions = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < extensions.length; i++){
        for (var key in extensions[i]){
          if (obj[key] === undefined){
            obj[key] = extensions[i][key];
            }
        }
      }

      return obj;

  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    var previousArgs = [];
    var previousResults = [];
    var result;

    return function(){
      var args = Array.prototype.slice.call(arguments)[0]; //obviously, this will only work with the
                                                          //primitive params as above
      if (previousArgs.indexOf(args) === -1){
          result = func.apply(this, arguments);
          previousArgs.push(args);
          previousResults.push(result);
      }else{
          var index = previousArgs.indexOf(args);
          result = previousResults[index];
      }
      return result;
    };


  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

    var args = Array.prototype.slice.call(arguments, 2);

    setTimeout(function(){
      func.apply(this, args);
    }, wait);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {

    var temp = array.slice(0);

    for (var i = 0; i < temp.length; i++){
      var randomPoint = Math.floor(Math.random() * temp.length);
      var swap = temp[randomPoint];
      temp[randomPoint] = temp[i];
      temp[i] = swap;
    }

    return temp;

  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {

    var results = collection.slice(0);

    console.log('Results at start equal: ' + JSON.stringify(results));

    for (var i = 0; i < results.length; i++){
      var testValue = results[i][iterator];
      console.log('testValue set at: ' + testValue);
      for (var j = i + 1; j < results.length; j++){
        var compareValue = results[j][iterator];
        if(testValue > compareValue){
          console.log(testValue + ' tested as larger than ' + compareValue );
          var temp = results[i];
          results[i] = results[j];
          results[j] = temp;
        }
      }
    }
 
    return results;

  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {

    var largestLength = 0;
    var results = [];

    for (var i = 0; i < arguments.length; i++){
      if(arguments[i].length > largestLength){
        largestLength = arguments[i].length;
      }
    }

    //console.log("largestLength:" + largestLength);

    for (var j = 0; j < largestLength; j++){ //counts array position
      var subArray =  [];
      //console.log("Value of j is:" + j);
      for (var k = 0; k < arguments.length; k++){ //counts which array to iterate over
        if (j < arguments[k].length){
          subArray.push(arguments[k][j]);
        }else{
          subArray.push(undefined);
        }
      }
      results.push(subArray);
    }

    return results;

  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {

    var result = (result || []);

    var descend = function(theArray){

      for (var i = 0; i < theArray.length; i++){
        if(Array.isArray(theArray[i])){
          descend(theArray[i]);
        }else{
          result.push(theArray[i]);
        }
      }
    }

    descend(nestedArray);

    return result;

  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {

    var results = [];

    for (var i = 0; i < arguments[0].length; i++){ //because all values must be in the first array too
      var testValue = arguments[0][i];
      var isCommon = true;

      for (var j = 0; j < arguments.length; j++){
        if (_.indexOf(arguments[j], testValue) === -1){
          isCommon = false;
        }
      }
      if (isCommon){
        results.push(testValue);
      }
    }

    return results;

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {

    var results = []; //test cond. is _.difference([1, 2, 3, 4], [2, 30, 40], [1, 11, 111])

    for (var i = 0; i < arguments[0].length; i++){ //copied from above, just changing the test
      var testValue = arguments[0][i];
      var isCommon = false;

      for (var j = 1; j < arguments.length; j++){
        if (_.indexOf(arguments[j], testValue) > -1){
          isCommon = true;
        }
      }

      //console.log("isCommon is " + isCommon + " for " + testValue);
      if (!isCommon){
        results.push(testValue);
      }
    }

    return results;

  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {

    var previous = null;
    var timer = null;
    var returnValue;

    return function(){
      if (!timer && !previous){ //means that it's the first time
        previous = Date.now();
        returnValue = func.apply(this, arguments);
      }else if (!timer && (wait - (Date.now() - previous)) <= 0){ //timer has run down
        returnValue = func.apply(this, arguments);
        previous = Date.now();
      }else if ((wait - (Date.now() - previous)) > 0){ //other timer-y stuff
        if(timer) clearTimeout(timer);
        var remaining = wait - (Date.now() - previous);
        timer = setTimeout(function(){
          returnValue = func.apply(this, arguments);
          previous = Date.now();
        }, remaining);

      }
      return returnValue;
    };

  };

}).call(this);
