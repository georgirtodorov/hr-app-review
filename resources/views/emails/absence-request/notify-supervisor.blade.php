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
    <h1>Здравейте,</h1>
    @if ($action === 'CREATED')
        <p>Получена е нова молба под номер {{ $absence->id }} от {{ $employee->first_name }} {{ $employee->last_name }} за периода от {{ $absence->start_date }} до {{ $absence->end_date }}.</p>
        <p>Моля, отворете, одобрете или отхвърлете молбата <a href="{{ $absenceUrl }}">тук</a></p>
        <p>Можете да достъпите графика на отпуските <a href="{{ $absencesUrl }}">тук</a></p>
    @elseif ($action === 'CHANGED')
        <p>Направени са промени към молба молба под номер {{ $absence->id }} от {{ $employee->first_name }} {{ $employee->last_name }} за периода от {{ $absence->start_date }} до {{ $absence->end_date }}.</p>
        <p>Моля, отворете, одобрете или отхвърлете молбата <a href="{{ $absenceUrl }}">тук</a></p>
        <p>Можете да достъпите графика на отпуските <a href="{{ $absencesUrl }}">тук</a></p>
    @elseif ($action === 'APPROVED')
        <p>Молба с номер {{ $absence->id }} от {{ $employee->first_name }} {{ $employee->last_name }} за периода от {{ $absence->start_date }} до {{ $absence->end_date }} бе одобрена.</p>
        <p>Можете да достъпите графика на отпуските <a href="{{ $absencesUrl }}">тук</a></p>
    @elseif ($action === 'DECLINED')
        <p>Молба с номер {{ $absence->id }} от {{ $employee->first_name }} {{ $employee->last_name }} за периода от {{ $absence->start_date }} до {{ $absence->end_date }} бе отхвърлена.</p>
        <p>Можете да достъпите графика на отпуските <a href="{{ $absencesUrl }}">тук</a></p>
    @endif
    <p>Хубав и успешен ден!</p>
</div>
</body>
</html>
