<?php

namespace App\Http\Controllers;

use App\Models\SupervisoryAuthority;
use Illuminate\Http\Request;

class SupervisoryAuthorityController extends Controller
{
    public function getSupervisoryAuthorities(Request $request)
    {
        $search = $request->has('search') ? "%" . $request->search . "%" : null;
        $sa = SupervisoryAuthority::when($search, function ($query, $search) {
            $query->where('name', 'like', $search);
        });

        return $sa->paginate(10);
    }
}
