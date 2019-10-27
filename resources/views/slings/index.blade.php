@extends('layouts.default')

@section('content')

<div class="box">
    <div class="columns is-centered">
        <div class="column">
        	<div id="app">
        		<div class="panel panel-default">
	                <div class="panel-heading ">Slings</div>

	                <div class="panel-body">
	                    <div class="box">
						<h1>Slings Index and DataTable</h1>
			            <slingtable></slingtable>

		        		</div>
		    		</div>
				</div>
	        </div><!-- end App -->
  		</div>
  	</div>
</div>

@endsection

@section('scripts')

	<script src="{{ asset('js/slings.js') }}"></script>


@endsection
  