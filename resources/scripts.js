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



function fixString(string){

  if((string+" ").indexOf("N/A") > -1){
    return "N/A";
  }else{
    return string;
  }

}


function getdata(){

  $('#loading').hide();

  $("#dataTable").append('<tr><th>Name</th><th>Handle</th><th>Type</th><th>Current</th><th>Overall</th><th>Month</th><th>Week</th><th>Today</th></tr>');

  $.each(returnedData, function( index, value){

    $("#dataTable").append('<tr class="net" id="'+value['handle']+'_net"><td rowspan="4" id="'+value['handle']+'_name">'+value['name']+'</td><td rowspan="4" id="'+value['handle']+'_handle">'+value['handle']+'</td><td>Net Activity</td><td>'+fixString(value['counts']['followers'][0]+value['counts']['following'][0]+value['counts']['tweets'][0])+'</td><td>'+fixString(value['counts']['followers'][1]+value['counts']['following'][1]+value['counts']['tweets'][1])+'</td><td>'+fixString(value['counts']['followers'][2]+value['counts']['following'][2]+value['counts']['tweets'][2])+'</td><td>'+fixString(value['counts']['followers'][3]+value['counts']['following'][3]+value['counts']['tweets'][3])+'</td><td>'+fixString(value['counts']['followers'][4]+value['counts']['following'][4]+value['counts']['tweets'][4])+'</td></tr>');

    $("#dataTable").append('<tr class="sub" id="'+value['handle']+'_tweets"><td>Tweets</td><td>'+(value['counts']['tweets'][0])+'</td><td>'+(value['counts']['tweets'][1])+'</td><td>'+(value['counts']['tweets'][2])+'</td><td>'+(value['counts']['tweets'][3])+'</td><td>'+(value['counts']['tweets'][4])+'</td></tr>');

    $("#dataTable").append('<tr class="sub" id="'+value['handle']+'_followers"><td>Followers</td><td>'+(value['counts']['followers'][0])+'</td><td>'+(value['counts']['followers'][1])+'</td><td>'+(value['counts']['followers'][2])+'</td><td>'+(value['counts']['followers'][3])+'</td><td>'+(value['counts']['followers'][4])+'</td></tr>');

    $("#dataTable").append('<tr class="sub" id="'+value['handle']+'_following"><td>Following</td><td>'+(value['counts']['following'][0])+'</td><td>'+(value['counts']['following'][1])+'</td><td>'+(value['counts']['following'][2])+'</td><td>'+(value['counts']['following'][3])+'</td><td>'+(value['counts']['following'][4])+'</td></tr>');

  });

}








// hard coded user add in

$("html").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        addUser();
    }
});

function addUser(){


  var url = serverRootURL+"?q=adduser&firstname="+$('#firstname').val()+'&lastname='+$('#lastname').val()+'&twitterhandle='+$('#twitterhandle').val()+'&groupid=1';
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

            addUpdate();
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function addUpdate(){


  var url = serverRootURL+'?q=manualupdate&handle='+$('#twitterhandle').val()+'&date=2015-12-12 23:55:00&following='+$('#following').val()+'&followers='+$('#followers').val()+'&tweets='+$('#tweets').val();
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

            $('#firstname').focus();

            //addUpdate();
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}














/*  This is used to get the name of a callback function (or any function) as a string. 
    Credit to: http://stackoverflow.com/questions/10624057/get-name-as-string-from-a-javascript-function-reference
*/
Function.prototype.getName = function(){
  // Find zero or more non-paren chars after the function start
  return /function ([^(]*)/.exec( this+"" )[1];
};


