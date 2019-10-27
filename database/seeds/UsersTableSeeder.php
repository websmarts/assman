<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'client_id'=>1 ,
            'email' => 'admin@here.com', 
            'name' => 'admin',
            'title' => 'Charge Sister', 
            'role'=>'admin', 
            'password' => bcrypt('pass')]);

        User::create([
            'client_id'=>1 ,
            'email' => 'washer@here.com', 
            'name' => 'washer',
            'title' => 'Wash Manager', 
            'role'=>'washer', 
            'password' => bcrypt('pass')]);

        User::create([
            'client_id'=>1 ,
            'email' => 'C.Chong@alfred.org.au', 
            'name' => 'Caroline Chong',
            'title' => 'Associate Nurse Manager', 
            'role'=>'manager', 
            'password' => bcrypt('pass')]);
    
        User::create([
            'client_id'=>1 ,
            'email' => 'T.McConnell@alfred.org.au', 
            'name' => 'Tarryn McConnell',
            'title' => 'Manager Inpatient Medical Equipment', 
            'role'=>'manager', 
            'password' => bcrypt('pass')]); 

        User::create([
            'client_id'=>1 ,
            'email' => 'J.Ayo@alfred.org.au', 
            'name' => 'Jamie Ayo',
            'title' => 'Manager Inpatient Medical Equipment', 
            'role'=>'manager', 
            'password' => bcrypt('pass')]);    

        User::create([
            'client_id'=>2 ,
            'email' => 'admin2@here.com', 
            'name' => 'admin',
            'title' => 'Charge Sister', 
            'role'=>'manager', 
            'password' => bcrypt('pass')]);

    }
}
