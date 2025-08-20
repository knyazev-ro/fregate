<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registry extends Model
{
    /** @use HasFactory<\Database\Factories\RegistryFactory> */
    use HasFactory;

    protected $fillable = [
        'author_id',
        'small_business_entity_id',
        'supervisory_authority_id',
        'start_verification',
        'end_verification',
        'duration',
    ];

    protected $casts = [
        'start_verification' => 'datetime',
        'end_verification' => 'datetime',
    ];

    public function smallBusinessEntity()
    {
        return $this->belongsTo(SmallBusinessEntity::class);
    }

    public function supervisoryAuthority()
    {
        return $this->belongsTo(SupervisoryAuthority::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
