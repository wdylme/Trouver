<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function index()
    {
        $favorites = Auth::user()->favorites;

        return response()->json([
            "favorites" => $favorites
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "event_id" => "required|integer|exists:events,id"
        ]);

        Favorite::create([
            "user_id" => Auth::id(),
            "event_id" => $request->event_id
        ]);

        return response()->json([
            "message" => "Событие добавлено в избранное!"
        ]);
    }

    public function delete(Request $request) 
    {   
        $favorite = Favorite::where("event_id", $request->event_id)->where("user_id", Auth::id())->first();

        $favorite->delete();

        return response()->json([
            "message" => "Событие удалено из избранного!"
        ]);
    } 
}
