<?php
use App\Client;
use Illuminate\Database\Seeder;

class ClientsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Client::create( [
            'name'=>'Alfred Health',
            'status'=>'active',
            'timezone'=>'Australia/Melbourne'

        ]);

        // Client::create( [
        //     'name'=>'Caulfield Hospital',
        //     'status'=>'active',
        //     'timezone'=>'Australia/Melbourne'

        // ]);

        // Client::create( [
        //     'name'=>'Sandringham Hospital',
        //     'status'=>'active',
        //     'timezone'=>'Australia/Melbourne'

        // ]);
    }
}
