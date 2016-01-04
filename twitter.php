<?PHP

$tw_username = 'mattdepero'; 
$data = file_get_contents('https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names='.$tw_username); 
$parsed =  json_decode($data,true);
$tw_followers =  $parsed[0]['followers_count'];

echo $tw_followers;

?>