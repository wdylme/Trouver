<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {   
        $adminRole = Role::where("name", "admin")->first();
        $visitorRole = Role::where("name", "visitor")->first();

        User::create([
            "name" => "Влада",
            "email" => "vlada@email.com",
            "password" => Hash::make("123456"),
            "role_id" => $adminRole->id
        ]);

        User::create([
            "name" => "Влад",
            "email" => "vlad@email.com",
            "password" => Hash::make("234567"),
            "role_id" => $visitorRole->id
        ]);
    }
}
