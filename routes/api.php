<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Card API Routes
|--------------------------------------------------------------------------
|
| Here is where you may register API routes for your card. These routes
| are loaded by the ServiceProvider of your card. You're free to add
| as many additional routes to this file as your card may require.
|
*/

Route::group([
    'namespace' => 'Kregel\\NovaNewsCard\\Http\\Controllers',
    'middleware' => 'auth'
], function() {
    Route::get('/news-proxy/top-headlines/{country}/{category}', 'NewsProxyController@topStories');
    Route::get('/news-proxy/everything/{sortBy}', 'NewsProxyController@everything');
    Route::post('/news-proxy/set-api-key', 'NewsProxyController@saveKey');
});
