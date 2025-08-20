<?php

namespace App\Http\Controllers;

use App\Models\Registry;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;
use Carbon\Carbon;

class RegistryController extends Controller
{
    public function index(Request $request): LengthAwarePaginator|\Inertia\Response
    {
        if ($request->has('page')) {
            $perPage = min($request->perPage ?? 10, 100);
            $sortDir = $request->sortDir ?? 'asc';
            $sortBy = $request->sortBy ?? 'id';
            $registry = Registry::with([
                'author',
                'smallBusinessEntity',
                'supervisoryAuthority',
            ]);

            $registry = match ($sortBy) {
                'id' => $registry->orderBy('id', $sortDir),
                'author.name' => $registry->join('users', 'registries.author_id', '=', 'users.id')->orderBy('users.name', $sortDir),
                'small_business_entity.name' => $registry->join('small_business_entities', 'registries.small_business_entity_id', '=', 'small_business_entities.id')->orderBy('small_business_entities.name', $sortDir),
                'supervisory_authority.name' => $registry->join('supervisory_authorities', 'registries.supervisory_authority_id', '=', 'supervisory_authorities.id')->orderBy('supervisory_authorities.name', $sortDir),
                'start_verification' => $registry->orderBy('start_verification', $sortDir),
                'end_verification' => $registry->orderBy('end_verification', $sortDir),
                'duration' => $registry->orderBy('duration', $sortDir),
                default => $registry->orderBy($sortBy, $sortDir),
            };

            $filters = $request->filters ?? [];
            foreach ($filters as $filter) {
                $registry = match ($filter['column']) {
                    'author.name' => $registry->whereHas('author', function ($query) use ($filter) {
                        $query->where('name', 'like', '%' . $filter['value'] . '%');
                    }),
                    'small_business_entity.name' => $registry->whereHas('smallBusinessEntity', function ($query) use ($filter) {
                        $query->where('name', 'like', '%' . $filter['value'] . '%');
                    }),
                    'supervisory_authority.name' => $registry->whereHas('supervisoryAuthority', function ($query) use ($filter) {
                        $query->where('name', 'like', '%' . $filter['value'] . '%');
                    }),
                    'start_verification' => $registry->whereDate('start_verification', '>=', Carbon::parse($filter['value'])),
                    'end_verification' => $registry->whereDate('end_verification', '<=', $filter['value']),
                    'duration' => $registry->where('duration', '=', $filter['value']),
                    default => $registry,
                };
            }

            return $registry->paginate($perPage);
        }

        return Inertia::render('registry/RegistryTable');
    }
}
