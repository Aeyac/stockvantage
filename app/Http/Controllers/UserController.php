<?php

namespace App\Http\Controllers;


use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $this->abortUnlessRole(['tenant_admin']);

        $users = auth()->user()->tenant->users()
            ->search($request->search)
            ->filterStatus($request->status)
            ->filterRole($request->role)
            ->orderBy('name')
            ->paginate(15)
            ->withQueryString();


        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Users/Create');
    }


    public function store(StoreUserRequest $request): RedirectResponse
    {
        $this->abortUnlessRole(['tenant_admin']);

        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);
        $validated['tenant_id'] = auth()->user()->tenant_id;

        User::create($validated);

        return redirect()
            ->route('users.index')
            ->with('success', 'User created successfully.');
    }

    public function edit(User $user): Response
    {
        return Inertia::render('Users/Edit', [
            'user' => $user
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $this->abortUnlessRole(['tenant_admin']);
        $user->update($request->validated());

        return redirect()
            ->route('users.index')
            ->with('success', 'User updated successfully.');
    }

    public function destroy(User $user): RedirectResponse
    {
        $this->abortUnlessRole(['tenant_admin']);

        $user->delete();

        return redirect()
            ->route
            ('users.index')
            ->with('success', 'User deleted successfully');
    }




}
