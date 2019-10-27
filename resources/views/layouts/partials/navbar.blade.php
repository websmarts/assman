<nav class="navbar is-primary">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item" href="../">
              <img src="{{ asset('images/logo-with-tick-white.png') }}" alt="Logo">
            </a>
            <span class="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenu" class="navbar-menu">
            <div class="navbar-end">

              @guest
              <a class="navbar-item is-active" href="/">
                Home
              </a>
              <a class="navbar-item" href="/about">
                About
              </a>
              <a class="navbar-item" href="/benefits">
                Benefits
              </a>
              <a class="navbar-item" href="/docs">
                Docs
              </a>


              <a class="navbar-item" href="{{ route('login') }}">
                  <span>Login </span>
                </a>




              @else
              <a class="navbar-item is-active" href="/home">
                Dashboard
              </a>
              <a class="navbar-item" href="/manage/slings">
                Slings
              </a>
              <a class="navbar-item" href="/manage/restraints">
                Restraints
              </a>
              <a class="navbar-item" href="/reports">
                Reports
              </a>
              <a class="navbar-item" href="/account">
                Account
              </a>


              <a class="navbar-item"
                        onclick="event.preventDefault();
                                 document.getElementById('logout-form').submit();">
                        Logout
                    </a>
                   

                    <form class="navbar-item" name="logout-form" id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        {{ csrf_field() }}
                    </form>

              @endguest

            </div>
          </div>
        </div>
      </nav>


