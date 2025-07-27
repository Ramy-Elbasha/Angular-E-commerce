<?php
return [

    'paths' => ['api/*', 'sanctum/csrf-cookie','login','logout','userItems','user','items','items/*','register'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:4200'], 

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];

