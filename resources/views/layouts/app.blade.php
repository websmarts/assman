<!DOCTYPE html>
<html>
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <!-- <link href="https://cdn.jsdelivr.net/npm/vuetify@1.5.12/dist/vuetify.min.css" rel="stylesheet"> -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js"></script>
    
    <style>
        
        .fade-enter-active, .fade-leave-active {
            transition: opacity .5s;
        }
        .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            opacity: 0;
        }

        @media print {
            .no-print {
                display: none !important;
            }
        }

        @media screen {
            .no-screen {
                display: none !important;
            }
        }
    </style>
</head>
<body>
  @yield('content')
</body>
</html>
