<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use PgSql\Lob;

class EventController extends Controller
{

    public function __construct()
    {
        $this->middleware("auth:api")->except("index");
    }

    public function index(Request $request)
    {
        $data = Category::with(["events" => function($query) use ($request) {
            if ($request->has("city_id")) {
                $query->where("city_id", $request->city_id);
            }
            if ($request->has("search")) {
                $query->where("name", "like", "%".$request->search."%");
            }
        }])->get();

        return response()->json($data);
    }

    public function store(Request $request)
    {   
        if (Auth::user()->role->name != "admin") {
            return response()->json("Нет доступа", 403);
        }

        $request->validate([
            'city_id' => 'required|integer|exists:cities,id',
            'category_id' => 'required|integer|exists:categories,id',
            'name' => 'required|string|max:255|unique:events',
            'description' => 'required|string',
            'image_file' => 'required|image',
            'address' => 'required|string',
            'date' => 'required|string',
            'time_start' => 'required|string',
            'time_end' => 'required|string',
            'cost' => 'required|numeric',
            'contact' => 'required|string'
        ]); 

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $path = $file->store();
            $url = Storage::url($path);
            $request->merge(["image" => $url]);
        }

        $event = Event::create($request->all());

        return response()->json([
            'message' => 'Событие успешно добавлено',
            'event' => $event,
        ]);
    }

    public function show(Event $event)
    {
        return response()->json([
            'event' => $event
        ]);
    }

    public function edit(Request $request, Event $event)
    {
        if (Auth::user()->role->name != "admin") {
            return response()->json("Нет доступа", 403);
        }

        $request->validate([
            'city_id' => 'integer|exists:cities,id',
            'category_id' => 'integer|exists:categories,id',
            'name' => 'max:255',
            'description' => 'string',
            'image_file' => 'image',
            'address' => 'string',
            'date' => 'string',
            'time_start' => 'string',
            'time_end' => 'string',
            'cost' => 'numeric',
            'contact' => 'string'
        ]); 

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $path = $file->store();
            $url = Storage::url($path);
            $request->merge(["image" => $url]);
        }

        $event->update($request->all());

        return response()->json([
            'message' => 'Событие успешно обновлено',
            'event' => $event
        ]);
    }

    public function destroy(Event $event)
    {
        if (Auth::user()->role->name != "admin") {
            return response()->json("Нет доступа", 403);
        }

        $event->delete();

        return response()->json([
            'message' => 'Событие успешно удалено'
        ]);
    }
}
