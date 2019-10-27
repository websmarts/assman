@extends('layouts.default')

@section('content')
<div class="box">
    <div class="columns is-centered">
        <div class="column is-half">
            <div class="panel panel-default">
                <div class="panel-heading">Login</div>

                <div class="panel-body">
                    <div class="box">
                        <form  method="POST" action="{{ route('login') }}">
                            {{ csrf_field() }}

                            <div class="field">
                                <label for="email" class="label">E-Mail Address</label>

                                <div class="control">
                                    <input id="email" type="email"  class="input {{ $errors->has('email') ? ' is-danger' : '' }}" name="email" value="{{ old('email') }}"  autofocus>
                                </div>

                                @if ($errors->has('email'))
                                    <p class="help is-danger">
                                        {{ $errors->first('email') }}
                                    </p>
                                @endif

                            </div>

                            <div class="field">
                                <label for="password" class="label">Password</label>

                                <div class="control">
                                    <input id="password" type="password" class="input {{ $errors->has('password') ? ' is-danger' : '' }}" name="password" >

                                </div>

                                @if ($errors->has('password'))
                                    <p class="help is-danger">
                                        {{ $errors->first('password') }}
                                    </p>
                                @endif

                            </div>

                            <div class="field">
                                <div class="control">

                                        <label class="checkbox">
                                            <input type="checkbox"  name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
                                        </label>

                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <button type="submit" class="button is-primary">
                                        Login
                                    </button>

                                    <button class="button is-text" href="{{ route('password.request') }}">
                                        Forgot Your Password?
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
@endsection
