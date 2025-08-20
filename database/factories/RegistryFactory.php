<?php

namespace Database\Factories;

use App\Models\SmallBusinessEntity;
use App\Models\SupervisoryAuthority;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Registry>
 */
class RegistryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $interval = fake()->numberBetween(10, 15);
        $dateTime = Carbon::now()->subDays($interval);
        $addDays = fake()->numberBetween(1, 10);

        return [
        'author_id' => 1,
        'small_business_entity_id' => SmallBusinessEntity::inRandomOrder()->first()->id,
        'supervisory_authority_id' => SupervisoryAuthority::inRandomOrder()->first()->id,
        'start_verification' => $dateTime,
        'end_verification' => $dateTime->copy()->addDays($addDays),
        'duration' => 1,
        ];
    }
}
