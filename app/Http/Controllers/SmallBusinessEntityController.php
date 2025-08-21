<?php

namespace App\Http\Controllers;

use App\Models\SmallBusinessEntity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SmallBusinessEntityController extends Controller
{

    public function index(Request $request) {
        if ($request->has('page')) {
            $perPage = min($request->perPage ?? 10, 100);
            $sortDir = $request->sortDir ?? 'asc';
            $sortBy = $request->sortBy ?? 'id';

            $sbe = SmallBusinessEntity::query();
            $sbe->withCount('registries');

            $sbe = match ($sortBy) {
                'id' => $sbe->orderBy('id', $sortDir),
                'name' => $sbe->orderBy('name', $sortDir),
                default => $sbe->orderBy($sortBy, $sortDir),
            };

            $filters = $request->filters ?? [];
            foreach ($filters as $filter) {
                $sbe = match ($filter['column']) {
                    'name' => $sbe->where('name', 'like', '%' . $filter['value'] . '%'),
                    default => $sbe,
                };
            }

            return $sbe->paginate($perPage);
        }

        return Inertia::render('sbe/SmallBusinessEntityTable');
    }

    public function editOrCreate(int|null $id = null)
    {
        $sbe = $id ? SmallBusinessEntity::findOrFail($id) : new SmallBusinessEntity();
        return Inertia::render('sbe/EditSmallBusinessEntity', compact('sbe'));
    }
    
    public function updateOrStore(Request $request, int|null $id = null) 
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        SmallBusinessEntity::updateOrCreate(['id' => $id], $data);
        return redirect()->route('sbe.index');
    }

    public function getSmallBusinessEntities(Request $request)
    {
        $search = $request->has('search') ? "%" . $request->search . "%" : null;
        $sbe = SmallBusinessEntity::when($search, function ($query, $search) {
            $query->where('name', 'like', $search);
        });

        return $sbe->paginate(10);
    }

    public function destroy(int $id)
    {
        SmallBusinessEntity::findOrFail($id)->delete();
        return redirect()->route('sbe.index');
    }
}
