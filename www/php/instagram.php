<?php

  // to generate the token should it expire
  // http://dmolsen.com/2013/04/05/generating-access-tokens-for-instagram/

  function fetchData($url){
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($ch, CURLOPT_TIMEOUT, 20);
      $result = curl_exec($ch);
      curl_close($ch);
      return $result;
  }

  function parseData($result) {
    $json = array();
    foreach ($result->data as $post) {
        $d = array(
            'id' => $post->id,
            'tags' => $post->tags,
            'images' => $post->images,
            'type' => $post->type,
            'location' => $post->location->name,
            'link' => $post->link,
            'timestamp' => $post->created_time
        );
        array_push($json,$d);
    }
    return $json;
  }

  $filename = "./data/".date("mdY")."_insta.json";

  function cacheExists() {
      $filename = "./data/".date("mdY")."_instacache.json";
      return file_exists($filename);
  }

  if(cacheExists()) {
  	$json = file_get_contents($filename);
  } else {
    $result = fetchData("https://api.instagram.com/v1/users/233559774/media/recent/?access_token=1471.2529a78.f57268a06ada4272a64c98c3a70803da");
    $result = json_decode($result);
    $json = parseData($result);
    file_put_contents($filename,json_encode($json));
  }


  header('Content-Type: application/json');
  echo json_encode($json);

