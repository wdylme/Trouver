<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        "city_id",
        "category_id",
        "image",
        "name",
        "description",
        "address",
        "date",
        "time_start",
        "time_end",
        "cost",
        "contact"
    ];

    protected $appends = [
        "is_favorite"
    ];

    public function getIsFavoriteAttribute()
    {
        $favorite = Favorite::where("user_id", Auth::id())->where("event_id", $this->id)->first();
        if ($favorite) {
            return $favorite->id;
        }

        return false;
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
