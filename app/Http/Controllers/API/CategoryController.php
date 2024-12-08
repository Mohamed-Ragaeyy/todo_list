<?php
namespace App\Http\Controllers\API;

use App\Models\Category;
use App\Traits\ResponseData;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class CategoryController extends Controller
{
    use ResponseData;
    public function index()
    {
        try {
            return $this->responseData(Category::all(), 'success', true, 200);

        }catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }
}
