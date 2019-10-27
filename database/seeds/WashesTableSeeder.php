<?php

use App\Wash;
use Illuminate\Database\Seeder;

class WashesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Wash::create([
            'asset_id'=>'10001',
            'client_id'=>1,
            'washdate'=>'2019-03-01',
            'washcount'=> 12,
            
        ]);

        Wash::create([
            'asset_id'=>'10011',
            'client_id'=>1,
            'washdate'=>'2019-03-01',
            'washcount'=> 17,
            
        ]);

        Wash::create([
            'asset_id'=>'10011',
            'client_id'=>1,
            'washdate'=>'2019-02-28',
            'washcount'=> 16,
            
        ]);
    }
}
