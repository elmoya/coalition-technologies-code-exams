<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class JsonService
{
    public $jsonFile = 'database/json/products.json';

    public function __construct()
    {
        //
    }

    public function readJSON()
    {
        if (!Storage::exists($this->jsonFile)) return [];
        return json_decode(Storage::get($this->jsonFile), true) ?? [];
    }

    public function saveJSON($data)
    {
        $products = $this->readJSON();
        $products[] = $data;
        Storage::put($this->jsonFile, json_encode($products, JSON_PRETTY_PRINT));
    }

}