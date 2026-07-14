<?php

namespace App\Http\Controllers;


use App\Exceptions\StaleUpdateException;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Traits\ChecksOptimisticLock;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class UserController extends Controller
{
    use ChecksOptimisticLock;
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

        try {
            DB::transaction(function () use ($user, $request) {

                $locked = User::where('id', $user->id)
                    ->lockForUpdate()
                    ->firstOrFail();

                $this->assertNotStale($locked, $request->validated('updated_at'));

                sleep(3);
                $locked->update($request->except('updated_at'));
            });

        } catch (StaleUpdateException $e) {
            return redirect()
                ->route('users.index', $user)
                ->with('error', $e->getMessage() . ' Please review the latest version before saving again.');

        } catch (ModelNotFoundException $e) {
            return redirect()
                ->route('users.index')
                ->with('error', 'Update Failed: This user could not be found or may have been deleted.');

        } catch (QueryException $e) {
            return redirect()
                ->route('users.edit')
                ->with('error', 'Update Failed: This user is currently being edited. Please try again in a moment.');
        }



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
