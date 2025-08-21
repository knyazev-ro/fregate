<?php

namespace App\Imports;

use App\Models\Registry;
use App\Models\SmallBusinessEntity;
use App\Models\SupervisoryAuthority;
use App\Models\User;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadings;

class RegistryImport implements ToModel, WithHeadings, WithSkipDuplicates
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Registry([
            'author_id' => User::query()->where('name', 'like', "%".$row['Author'] . "%")?->first()?->id ?? User::factory()->create([
                'name' => $row['Author'] ?? 'No Name',
            ])->id,
            'small_business_entity_id' => SmallBusinessEntity::query()->where('name', 'like', "%". $row['Small Business Entity'] . "%")?->first()?->id ?? SmallBusinessEntity::factory()->create([
                'name' =>  $row['Small Business Entity'] ?? 'No Name',
            ])->id,
            'supervisory_authority_id' =>  SupervisoryAuthority::query()->where('name', 'like', "%". $row['Supervisory Authority'] . "%")?->first()?->id ?? SupervisoryAuthority::factory()->create([
                'name' =>  $row['Supervisory Authority'] ?? 'No Name',
            ])->id,
            'start_verification' => isset($row['Start Verification']) ? Carbon::parse($row['Start Verification']) : now(),
            'end_verification' => isset($row['End Verification']) ? Carbon::parse($row['End Verification']) : now(),
            'duration' => $row['Duration'] ?? 1,
        ]);
    }
}
