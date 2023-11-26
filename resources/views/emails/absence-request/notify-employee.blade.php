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
    <h1>Здравейте, {{ $employee->first_name }} {{ $employee->last_name }}</h1>
    @if ($action === 'CREATED')
        <p>Вашата молба за отпуск от {{ $absence->start_date }} до {{ $absence->end_date }} е входирана под
            номер {{ $absence->id }}.</p>
        <p>Очаквай промяна на статуса от твоя мениджър.</p>
    @elseif ($action === 'CHANGED')
        <p>Направени са промени към Вашата молба за отпуск с входящ номер {{ $absence->id }}
            от {{ $absence->start_date }} до {{ $absence->end_date }}.</p>
        <p>Очаквай промяна на статуса от твоя мениджър.</p>
    @elseif ($action === 'APPROVED')
        <p>Вашата молба за отпуск с входящ номер {{ $absence->id }} от {{ $absence->start_date }}
            до {{ $absence->end_date }} бе одобрена.</p>
    @elseif ($action === 'DECLINED')
        <p>Вашата молба за отпуск от {{ $absence->start_date }} до {{ $absence->end_date }} бе отхвърлена.</p>
        <p>Можеш да се свържеш със своя мениджър за повече информация.</p>
    @endif
    <p>Хубав и успешен ден!</p>
</div>
</body>
</html>
