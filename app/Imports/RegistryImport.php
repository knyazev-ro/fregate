<?php

namespace App\Imports;

use App\Models\Registry;
use App\Models\SmallBusinessEntity;
use App\Models\SupervisoryAuthority;
use App\Models\User;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithSkipDuplicates;

class RegistryImport implements ToModel, WithHeadingRow, WithSkipDuplicates
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        $id = $row['id'] ?? null;
        if($id && Registry::find($id)) {
            return null;
        }

        $data = [
            'author_id' => User::query()->where('name', 'like', "%" . $row['author'] . "%")?->first()?->id ?? User::factory()->create([
                'name' => $row['author'] ?? 'No Name',
            ])->id,
            'small_business_entity_id' => SmallBusinessEntity::query()->where('name', 'like', "%" . $row['small_business_entity'] . "%")?->first()?->id ?? SmallBusinessEntity::factory()->create([
                'name' =>  $row['small_business_entity'] ?? 'No Name',
            ])->id,
            'supervisory_authority_id' =>  SupervisoryAuthority::query()->where('name', 'like', "%" . $row['supervisory_authority'] . "%")?->first()?->id ?? SupervisoryAuthority::create([
                'name' =>  $row['supervisory_authority'] ?? 'No Name',
            ])->id,
            'start_verification' => isset($row['start_verification']) ? Carbon::parse($row['start_verification']) : now(),
            'end_verification' => isset($row['end_verification']) ? Carbon::parse($row['end_verification']) : now(),
            'duration' => $row['duration'] ?? 1,
        ];
        $reg = Registry::query();
        foreach($data as $key => $value) {
            $reg->where($key, $value);
        }

        if($reg->exists()) {
            return null;
        }

        return new Registry($data);
    }
}
