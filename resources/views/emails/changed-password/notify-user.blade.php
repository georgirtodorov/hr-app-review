<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Absence Update</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }

        h1 {
            color: #333333;
        }

        p {
            color: #555555;
        }

        a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
<div class="container">
    <h1>Здравейте, {{ $user->first_name }} {{ $user->last_name }}</h1>
        <p>Паролата ви за достъп беше променена от {{$auth->first_name}} {{$auth->last_name}}.</p>
        <p>Може да влезете с новата парола <a href="{{ $loginUrl }}">тук</a></p>
    <p>Хубав и успешен ден!</p>
</div>
</body>
</html>
