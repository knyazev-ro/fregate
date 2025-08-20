<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupervisoryAuthority extends Model
{
    protected $fillable = [
        'name',
    ];

    public function registries()
    {
        return $this->hasMany(Registry::class);
    }
}
