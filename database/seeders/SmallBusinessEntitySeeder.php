<?php

namespace Database\Seeders;

use App\Models\SmallBusinessEntity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SmallBusinessEntitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SmallBusinessEntity::factory(1000)->create();
    }
}
