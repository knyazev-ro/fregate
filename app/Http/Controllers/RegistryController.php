<?php

namespace App\Http\Controllers;

use App\Models\Registry;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;

class RegistryController extends Controller
{
    public function index(Request $request): LengthAwarePaginator|\Inertia\Response
    {
        if ($request->has('page')) {
            $perPage = min($request->perPage ?? 10, 100);
            $registryPaginate = Registry::with([
                'author',
                'smallBusinessEntity',
                'supervisoryAuthority',
            ])->paginate($perPage);

            return $registryPaginate;
        }

        return Inertia::render('registry/RegistryTable');
    }
}
