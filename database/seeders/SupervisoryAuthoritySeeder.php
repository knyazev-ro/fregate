<?php

namespace Database\Seeders;

use App\Models\SupervisoryAuthority;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupervisoryAuthoritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'Роспотребнадзор',
            'Налоговая',
            'Природнадзор',
        ];

        foreach ($data as $item) {
            SupervisoryAuthority::create(['name' => $item]);
        }
    }
}
