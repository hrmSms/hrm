/**
 * http://www.codeproject.com/Tips/201899/String-Format-in-JavaScript
 * @param args
 * @returns
 */
String.prototype.format = function(args) {
  var str = this;
  return str.replace(String.prototype.format.regex, function(item) {
    var intVal = parseInt(item.substring(1, item.length - 1));
    var replace;
    if (intVal >= 0) {
      replace = args[intVal];
    } else if (intVal === -1) {
      replace = "{";
    } else if (intVal === -2) {
      replace = "}";
    } else {
      replace = "";
    }
    return replace;
  });
}
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");

String.prototype.trimAll = function() {
  return this.replace(/^\s+|(\s+(?!\S))/mg, " ").trim();
}

/**
 * Normalize a string
 * @returns
 */
String.prototype.normalize = function() {
  return this.replace(/\s{2,}/g, ' ');
}

/**
 * Insert a string at specified position
 * @param position
 * @param str
 * @returns
 */
String.prototype.insert = function(position, str) {
  return [this.slice(0, position), str, this.slice(position)].join('');
}

/**
 * Deaccent a string. Require accent.js
 * @returns
 */
String.prototype.deaccent = function() {
  return deaccent(this, false);;
}

/**
 * CamelCase a string with accents
 * @returns
 */
String.prototype.toProperCase = function(opt_lowerCaseTheRest) {
  return this.toLowerCase().replace(/(^|[\s\xA0])[^\s\xA0]/g, function(s){ return s.toUpperCase(); });
};

/**
 * Remove all elements from an array
 * http://stackoverflow.com/questions/1232040/how-to-empty-an-array-in-javascript
 */
Array.prototype.removeAll = function() {
  while(this.length > 0) {
    this.pop();
  }
}

Array.prototype.clone = function() {
  return this.slice(0);
};

/**
 * Common utilities
 */
/**
 * Check an object is empty ({}) or not
 */
function isEmpty(obj){
  for(var i in obj){ return false;}
   return true;
}

/* Miscellaneous functions */
// Convert a string into integer hash
// Reference djb2 algorithm: http://erlycoder.com/49/javascript-hash-functions-to-convert-string-into-integer-hash-
_hash = function(str) {
  var hash = 5381;
  var char;
  for (var i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
  }
  return hash;
}

// Trim a string of leading and trailing spaces.
_trim = function(str) {
  return str.toString().replace(/^ +/, '').replace(/ +$/, '');
}

// Parse a string as a natural number (>=0).
_stringToNaturalNumber = function(str) {
  return Math.max(0, parseInt(str, 10) || 0);
}

// Return true if an object has all of the passed arguments as properties.
_has = function(obj) {
  for(var i = 1; i < arguments.length; i = i + 1) {
    if(!_defined(obj[arguments[i]])) {
      return false;
    }
  }
  return true;
}

// Return true if all of the passed arguments are defined.
_defined = function() {
  for(var i = 0; i < arguments.length; i = i + 1) {
    if(typeof arguments[i] === 'undefined') {
      return false;
    }
  }
  return true;
}

// Log something to the browser console, if it exists. The argument "show"
// is a Boolean (default = true) that determines whether to proceed.
_console = function(msg, show) {
  show = (_defined(show, console)) ? show : true;
  if(show && console.log) {
    console.log(msg);
  }
  return false;
}

/**
 * Get start date and end date of a range
 * @param date
 * @param type
 * @param extra
 * @returns {Array} [0]: start date; [1]: end date
 */
function get_date_range(date, type, extra) {
  var curr = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  var firstDate = curr;
  var lastDate = curr;
  if (type === 'w') {
    curr.setDate(curr.getDate() + (7 * extra));
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    firstDate = new Date(curr.setDate(first));
    lastDate = new Date(firstDate);
    lastDate.setDate(lastDate.getDate() + 6); // last day is the first day + 6
  } else if (type === 'm') {
    var month = date.getMonth() + extra;
    var extraYear = 0;
    if (month > 11) {
      extraYear = Math.floor(month / 11);
      month = (month % 11) - 1;
    }
    curr = new Date(date.getFullYear() + extraYear, month, 1);
    var y = curr.getFullYear(), m = curr.getMonth();
    firstDate = new Date(y, m, 1);
    lastDate = new Date(y, m + 1, 0);
  } else if (type === 'y') {
    curr.setYear(date.getFullYear() + extra);
    var y = curr.getFullYear();
    firstDate = new Date(y, 0, 1);
    lastDate = new Date(y, 11, 31);
  } else {
    console.log("Type '" + type + "' is not supported. Only 'w','m','y' are allowed.");
  }
  return [ firstDate, lastDate ];
}
