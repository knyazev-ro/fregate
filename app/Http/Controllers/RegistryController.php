<?php

namespace App\Http\Controllers;

use App\Models\Registry;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

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

    public function editOrCreate(int|null $id = null)
    {
        $registry = $id ? Registry::findOrFail($id)->load([
            'author',
            'smallBusinessEntity',
            'supervisoryAuthority',
        ]) : new Registry();
        return Inertia::render('registry/EditRegistry', compact('registry'));
    }

    public function updateOrStore(Request $request, int|null $id = null) 
    {
        $data = $request->validate([
            'small_business_entity_id' => 'required|exists:small_business_entities,id',
            'supervisory_authority_id' => 'required|exists:supervisory_authorities,id',
            'start_verification' => 'required|date',
            'end_verification' => 'required|date|after_or_equal:start_verification',
            'duration' => 'required|integer|min:0',
        ], [
            'small_business_entity_id.required' => 'Поле СМП обязательно для заполнения.',
            'supervisory_authority_id.required' => 'Поле Надзорный орган обязательно для заполнения.',
            'start_verification.required' => 'Поле Начало проверки обязательно для заполнения.',
            'end_verification.required' => 'Поле Окончание проверки обязательно для заполнения.',
            'end_verification.after_or_equal' => 'Поле Окончание проверки должно быть датой после или равной Началу проверки.',
            'duration.required' => 'Поле Продолжительность (дней) обязательно для заполнения.',
            'duration.integer' => 'Поле Продолжительность (дней) должно быть целым числом.',
            'duration.min' => 'Поле Продолжительность (дней) должно быть неотрицательным числом.',
        ]);

        if(!$id) {
            $data['author_id'] = Auth::id();
        }

        Registry::updateOrCreate(['id' => $id], $data);
        return redirect()->route('registry.index');
    }

    public function destroy(Registry $registry)
    {
        $registry->delete();
        return redirect()->route('registry.index');
    }
}
