<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SmallBusinessEntity extends Model
{
    /** @use HasFactory<\Database\Factories\SmallBusinessEntityFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function registries()
    {
        return $this->hasMany(Registry::class);
    }

}
