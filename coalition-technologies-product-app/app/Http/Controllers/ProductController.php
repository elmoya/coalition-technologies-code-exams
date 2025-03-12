<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Services\JsonService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    private $jsonService;

    public function __construct()
    {
        $this->jsonService = new JsonService();
    }

    public function index()
    {
        $products = $this->jsonService->readJSON();
        return view('products', compact('products'));
    }

    public function store(StoreProductRequest $request)
    {
        $data = [
            'name' => $request->input('name'),
            'quantity' => (int) $request->input('quantity'),
            'price' => (float) $request->input('price'),
            'submitted_at' => Carbon::now()->toDateTimeString(),
            'total_value' => (int) $request->input('quantity') * (float) $request->input('price'),
        ];

        $this->jsonService->saveJSON($data);

        return response()->json(['success' => true, 'data' => $this->jsonService->readJSON()]);
        // return redirect('urls.create')->with('success', 'URL has been added');
    }

    public function update(Request $request)
    {
        $products = $this->jsonService->readJSON();

        // Ensure valid ID
        if (!isset($products[$request->id])) {
            return response()->json(['success' => false, 'message' => 'Invalid product ID']);
        }

        // Update the field
        $products[$request->id][$request->field] = $request->value;

        // Recalculate total value if quantity or price is updated
        if ($request->field == 'quantity' || $request->field == 'price') {
            $products[$request->id]['total_value'] = $products[$request->id]['quantity'] * $products[$request->id]['price'];
        }

        // Save the updated data
        Storage::put($this->jsonService->jsonFile, json_encode($products, JSON_PRETTY_PRINT));

        return response()->json(['success' => true, 'data' => $products]);
    }
}
