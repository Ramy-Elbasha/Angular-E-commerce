<?php

namespace App\Http\Controllers;

use App\Models\item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\UnauthorizedException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = item::all();
        return response()->json(['data' => $items], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'Title' => 'required|string|max:255',
            'Price' => 'required|numeric|min:0',
            'Category' => 'required|string',
            'Description' => 'nullable|string',
            'ImageURL' => 'nullable|url'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $validated = $validator->validated();
        $validated["user_id"] = Auth()->id();
        item::create($validated);
        return response()->json(['Message' => "success", 'data' => $validated], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = item::find($id);
        if (!$data) {
            return response()->json(['message' => "Not Found"], 404);
        }
        return response()->json(['data' => $data], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user=Auth()->user();
        $item = item::find($id);
        if (!$item) {
            throw new NotFoundHttpException();
        }
        if($user->id!=$item->user_id)
        {
            throw new UnauthorizedException();
        }

        $validator=Validator::make($request->all(),[
            'Title' => 'required|string|max:255',
            'Price' => 'required|numeric|min:0',
            'Category' => 'required|string',
            'Description' => 'nullable|string',
            'ImageURL' => 'nullable|url'
        ]);
        if($validator->fails())
        {
            return response()->json(['message' => $validator->errors()], 400);
        }
        $item=item::find($id)->update($request->all());
        return response()->json(['message'=>"Updated successfully",'data'=>$item],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user=Auth()->user();
        $item=item::find($id);
        if(!$item)
        {
            throw new NotFoundHttpException();
        }
        if($user->id!=$item->user_id)
        {
            throw new UnauthorizedException();
        }
        $item=item::find($id)->delete();
        return response()->json(['message'=>"deleted successfully"],200);
    }

    public function getUserItems()
{
    $user = auth()->user();

    if (!$user) {
        return response()->json(['error' => 'Unauthenticated'], 401);
    }

    $items = Item::where('user_id', $user->id)->get();

    if ($items->isEmpty()) {
        return response()->json(['data' => 'empty']);
    }

    return response()->json(['data' => $items]);
}

}
