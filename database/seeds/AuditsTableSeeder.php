<?php

use App\User;
use App\Asset;
use App\Audit;
use App\Sling;
use Illuminate\Database\Seeder;

class AuditsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Restraints
        $audits = \DB::table('assman_audits')->get();

        foreach ($audits as $a) {

            $data =[];

            $auditor = User::where('name',$a->auditor1)->first();

            // need to look up what the new asset ID is now
            $sling = Sling::find($a->sling_id); // The sling the audit was for
            if(!$sling) {
                echo '.... sling not found ...'."\n";
                continue;
            }

            // dd($sling->barcode);

            // echo 'SLING: '.$sling->barcode .' ';
            $asset = Asset::withoutGlobalScopes()->where('asset_id',$sling->barcode)->first(); // The new sling asset record
            if(!$asset){
                echo '...asset not found ....'."\n";
                continue;
            }

            // echo 'ASSET: '. $asset->id . "\n";
           
            $data['asset_id'] = $asset->id;
            $data['client_id'] = 1;
            $data['created_by'] = $auditor->id;
            
            $data['meta'] = [
                'audit_date' => $a->audit_date,
                'auditors'=>$a->auditor1 .', '.$a->auditor2,
                'audit_notes' => $a->audit_comment,
                'next_action' => $a->next_action,
                'condition' => $a->condition,
                'next_audit_due' => $a->next_audit_due,
                'retire_from_service' =>$a->retire_from_service == 'yes' ? 1: 0
                ];

            
            
            Audit::create($data);

        }
    }
}
