@extends('layouts.default')

@section('content')

    <section class="hero is-info is-medium is-bold">
    <div class="hero-head">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          EQUIPMENT SAFETY AUDIT &amp; ASSET MANAGEMENT
        </h1>
        <h2 class="subtitle">
        The Equipment Safety Audit and Asset Management tool is an all-in-one system that manages critical safety audits on equipment used on patients.</h2>
      </div>
    </div>
  </div>
</section>

    <div>
      <p class="has-text-centered">
        &nbsp;
      </p>
    </div>

    <div class="columns features">
      <div class="column is-4">
        <div class="card">
          <div class="card-image has-text-centered">
                <i class="fa fa-database"></i>
          </div>
          <div class="card-content">
            <div class="content has-text-centered">
              <h4>DATA CENTRALISATION </h4>
              <p>
Key equipment manufacture details, ownership,<br />
location information and audit records <br />
all kept in the one secure place.
</p>
              
            </div>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="card">
          <div class="card-image has-text-centered">
              <i class="fa fa-id-card"></i>
          </div>
          <div class="card-content">
            <div class="content has-text-centered">
              <h4>SAFETY SOLUTION</h4>
              <p>Simple audit mechanism to conduct<br />
               equipment safety audits with audit histories<br />
              captured and overdue audit alerts.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="card">
          <div class="card-image has-text-centered">
              <i class="fa fa-table"></i>
          </div>
          <div class="card-content">
            <div class="content has-text-centered">
              <h4> ASSET MANAGEMENT  </h4>
              <p>Equipment usage data helps determine<br />
               forecast budgeting for<br />
               repair and replacement.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="intro column is-8 is-offset-2 has-text-centered">
      <h2 class="title">eSAAM Basics</h2><br>
      <p class="subtitle"></p>
    </div>

  </section>

  <section class="container">
    <div class="columns features">
      <div class="column is-3">
        <div class="card has-background-primary">

          <div class="card-content">
            <div class="content has-text-white">
              <h4 class="has-text-white">What is eSAAM? </h4>
              <p>eSAAM is a system that centralizes safety 
              audit information regarding medical equipment 
              and apparatus to ensure they are in the best condition 
              for patient use. It takes the complexity out of trying to 
              manage different methods for auditing medical equipment and 
              retaining records. Patient safety is paramount therefore 
              any information that impacts this needs to be 
              clearly and accurately stored and accessible to the 
              right people – the eSAAM takes care of this.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="card has-background-primary">

          <div class="card-content">
            <div class="content has-text-white">
              <h4 class="has-text-white">Why eSAAM?</h4>
              <p>Hospitals are multi-disciplinary complex 
              environments that produce and rely on a vast 
              array of information to provide optimal care 
              for patients. Good data management around medical 
              equipment is therefore critical to reduce preventable 
              risks to patients utilising any such device as 
              part of their care. The eSAAM is a robust tool for
               ensuring information is up to date, 
               accurate and easy to understand. </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="card has-background-primary">
          <div class="card-content">
            <div class="content has-text-white">
              <h4 class="has-text-white"> eSAAM benefits  </h4>
              
              <ul>
                <li>Safety audit mechanism that simplifies the audit process through a clear recording system </li>
                <li>Alerts set up to ensure safety audits do not lapse </li>   
                <li>Asset management feature that captures who the equipment belongs to, where it is kept, how old it is and when it may need to be replaced</li>
                <li>Centralised and secure data portal accessible to permitted users ensures data is not kept by one person alone</li>
                <li>Data is available across platforms - desktop, laptop, tablet or smart phone devices</li>
              </ul>
              
            </div>
          </div>
        </div>
      </div>

      <div class="column is-3">
        <div class="card has-background-primary">

          <div class="card-content">
            <div class="content has-text-white">
              <h4 class="has-text-white"> How do I get started?  </h4>
              <p>Please complete the following information and a member of our staff will contact you within 48 hours regarding your inquiry.</p>
             
              @include('layouts.partials.register_interest_form')

              
            </div>
          </div>
        </div>
      </div>
    </div>


@endsection
