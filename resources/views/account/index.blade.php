@extends('layouts.default')

@section('content')
<div class="box">
    <div class="columns is-centered">
        <div class="column is-half">
        	<div id="app">
        		<div class="panel panel-default">
	                <div class="panel-heading ">Application Access Credentials</div>

	                <div class="panel-body">
	                    <div class="box">

			            <passport-clients></passport-clients>
			            <passport-authorized-clients></passport-authorized-clients>
			            <passport-personal-access-tokens></passport-personal-access-tokens>

		        		</div>
		    		</div>
				</div>
	        </div><!-- end App -->
  		</div>
  	</div>
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/accounts_app.js') }}"></script>
@endsection
