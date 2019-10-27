<?php
use App\Site;
use Illuminate\Database\Seeder;

class SitesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sites[1] = ['Alfred','Caulfield','Sandringham'];

        foreach($sites[1] as $site){
            Site::create([
                'client_id'=> 1,
                'name'=>$site
            ]);
        }

        // $clients = [1,2,3];
        // foreach($clients as $clientId){
        //     foreach($sites as $site){
        //         Site::create([
        //             'client_id'=> $clientId,
        //             'name'=>$site
        //         ]);
        //     }
        // }
        
        
        

    }
}
