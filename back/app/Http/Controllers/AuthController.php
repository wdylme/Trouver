<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware("auth:api")->except("login", "register");
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Неправильный email или пароль',
            ], 401);
        }

        return response()->json([
                'message' => 'Пользователь вошёл в систему',
                'user' => Auth::user(),
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);

    }

    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $role = Role::where("name", "visitor")->first();

        $user = User::with("role")->create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $role->id,
        ]);

        $token = Auth::login($user);

        return response()->json([
            'message' => 'Пользвоатель успешно зарегистрировался',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Пользователь вышел из системы',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    public function updateProfile(Request $request)
    {   
        $request->validate([
            "name" => "string|max:255|nullable",
            "email" => "string|email|nullable",
            "password" => "string|nullable"
        ]);

        $user = Auth::user();

        if (isset($request->name) && $request->name != "") {
            $user->name = $request->name;
        }
        if (isset($request->email) && $request->email != "") {
            $user->email = $request->email;
        }
        if (isset($request->password) && $request->password != "") {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'message' => 'Пользвоатель успешно обновил профиль',
            'user' => $user
        ]);
    }

}