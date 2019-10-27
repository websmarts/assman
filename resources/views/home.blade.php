@extends('layouts.app')

@section('content')
<div id="app"></div>

{{-- dump($user) --}}

<script>
    // Global app data
    const $User = @json($user);
    const $Refdata = @json($refdata);
    const $Clientdata = @json($clientdata);
    const $AssetIds = @json($assetids);
</script>
 
@if(!empty($user->role)) 
    <script src="{{ mix('js/'. $user->role . '_app.js') }}"></script>
@endif



@endsection
