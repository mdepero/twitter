// Your scripts go here.


// URL to folder that contains serverfile.php, including '/' on the end
var serverRootURL = "http://ohioporcelain.com/twitter.php";


var xmlhttp;
if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari

  xmlhttp=new XMLHttpRequest();
}else{// code for IE6, IE5

  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}




var returnedData;

function fetchData( callback, v1, v2 ){
  var url = serverRootURL+"?q=" + callback.getName() + "&v1=" +v1+ "&v2=" +v2+ "&t=" + Math.random();
  url = url.replace(" ","%20");
  console.log("SENT URL: "+url);
  xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            returnedData = xmlhttp.responseText;
            console.log("RECEIVED DATA: "+returnedData);
            if(returnedData == "" || returnedData == null){
              alert("ERROR: Could not connect or returned no results.");
              return;
            }

            returnedData = JSON.parse(returnedData);

            callback();
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function getdata(){

  alert(returnedData);

}

















/*  This is used to get the name of a callback function (or any function) as a string. 
    Credit to: http://stackoverflow.com/questions/10624057/get-name-as-string-from-a-javascript-function-reference
*/
Function.prototype.getName = function(){
  // Find zero or more non-paren chars after the function start
  return /function ([^(]*)/.exec( this+"" )[1];
};


