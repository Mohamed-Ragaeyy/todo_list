<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert(
            array(
                'id' => 1,
                'name' => 'mohamed',
                'email' => "mm@mm.com",
                'password' =>  Hash::make('12345678')

            )
        );
    }
}
