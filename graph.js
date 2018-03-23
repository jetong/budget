var values = [];

for(var i = 0; i < sessionStorage.length; i++) {
  var key = sessionStorage.key(i);
  if(key != 'income') {
    var value = sessionStorage[key];
    values.push(value);
    console.log(values);
  }
}


