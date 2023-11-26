-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Nov 26, 2023 at 09:28 AM
-- Server version: 8.0.35
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `absences`
--

CREATE TABLE `absences` (
                            `id` bigint UNSIGNED NOT NULL,
                            `employee_id` int NOT NULL,
                            `start_date` date NOT NULL,
                            `end_date` date NOT NULL,
                            `days` int NOT NULL,
                            `created_at` timestamp NULL DEFAULT NULL,
                            `updated_at` timestamp NULL DEFAULT NULL,
                            `type` tinyint(1) DEFAULT NULL,
                            `approval` tinyint(1) DEFAULT NULL,
                            `approval_status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `absences`
--

INSERT INTO `absences` (`id`, `employee_id`, `start_date`, `end_date`, `days`, `created_at`, `updated_at`, `type`, `approval`, `approval_status`) VALUES
                                                                                                                                                      (9, 2, '2021-07-21', '2021-07-29', 7, '2022-07-21 08:04:00', '2022-07-21 08:04:01', 1, NULL, NULL),
                                                                                                                                                      (10, 2, '2021-08-04', '2021-08-11', 3, '2022-07-21 08:04:00', '2022-07-21 08:04:01', 1, NULL, NULL),
                                                                                                                                                      (15, 2, '2021-07-21', '2021-07-29', 7, '2022-07-21 08:04:00', '2022-07-21 08:04:01', 5, NULL, NULL),
                                                                                                                                                      (16, 2, '2021-07-21', '2021-07-29', 3, '2022-07-21 08:04:00', '2022-07-21 08:04:01', 5, NULL, NULL),
                                                                                                                                                      (17, 2, '2021-07-21', '2021-07-29', 7, '2022-07-21 08:04:00', '2022-07-21 08:04:01', 5, NULL, NULL),
                                                                                                                                                      (18, 2, '2021-07-21', '2021-07-29', 2, '2022-07-21 08:04:00', '2022-07-21 08:04:01', 5, NULL, NULL),
                                                                                                                                                      (28, 2, '2022-07-20', '2022-07-28', 13, NULL, NULL, 5, NULL, NULL),
                                                                                                                                                      (33, 2, '2022-07-13', '2022-07-20', 8, NULL, NULL, 5, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `absences_archive`
--

CREATE TABLE `absences_archive` (
                                    `id` bigint NOT NULL,
                                    `employee_id` bigint NOT NULL,
                                    `type_id` bigint NOT NULL,
                                    `days` int NOT NULL,
                                    `due_date` date NOT NULL,
                                    `created_at` timestamp NULL DEFAULT NULL,
                                    `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `absence_requests`
--

CREATE TABLE `absence_requests` (
                                    `id` bigint NOT NULL,
                                    `employee_id` bigint NOT NULL,
                                    `start_date` date NOT NULL,
                                    `end_date` date NOT NULL,
                                    `days` int NOT NULL,
                                    `type_id` bigint NOT NULL,
                                    `approval` enum('NOT_NEED','WAITING','APPROVED','DECLINED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NOT_NEED',
                                    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `absence_requests_logs`
--

CREATE TABLE `absence_requests_logs` (
                                         `id` int NOT NULL,
                                         `absence_request_id` bigint DEFAULT NULL,
                                         `action` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
                                         `user_id` bigint DEFAULT NULL,
                                         `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                         `absence_start_date` date DEFAULT NULL,
                                         `absence_end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `absence_request_actions`
--

CREATE TABLE `absence_request_actions` (
                                           `id` smallint NOT NULL,
                                           `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `absence_request_actions`
--

INSERT INTO `absence_request_actions` (`id`, `name`) VALUES
                                                         (4, 'APPROVED'),
                                                         (2, 'CHANGED'),
                                                         (1, 'CREATED'),
                                                         (3, 'DECLINED');

-- --------------------------------------------------------

--
-- Table structure for table `absence_types`
--

CREATE TABLE `absence_types` (
                                 `id` bigint NOT NULL,
                                 `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                                 `details` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                                 `annual_limit` int DEFAULT NULL,
                                 `duration_limit` int DEFAULT NULL,
                                 `transferable` tinyint(1) DEFAULT NULL,
                                 `transferable_amount` int DEFAULT NULL,
                                 `approval` tinyint(1) DEFAULT NULL,
                                 `created_at` timestamp NULL DEFAULT NULL,
                                 `updated_at` timestamp NULL DEFAULT NULL,
                                 `estimate_cost` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `absence_types`
--

INSERT INTO `absence_types` (`id`, `name`, `details`, `annual_limit`, `duration_limit`, `transferable`, `transferable_amount`, `approval`, `created_at`, `updated_at`, `estimate_cost`) VALUES
                                                                                                                                                                                            (1, 'Платен годишен отпуск', '', 20, NULL, 1, 10, 1, NULL, NULL, NULL),
                                                                                                                                                                                            (2, 'Неплатен отпуск', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL),
                                                                                                                                                                                            (3, 'Отпуск по др. чл.', 'Даряване на кръв', 5, 1, NULL, NULL, NULL, NULL, NULL, NULL),
                                                                                                                                                                                            (4, 'Отпуск по др. чл.', 'Сключване на граждански брак', NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL),
                                                                                                                                                                                            (5, 'Временна нетрудоспособност', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
                               `id` bigint NOT NULL,
                               `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                               `created_at` timestamp NULL DEFAULT NULL,
                               `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `created_at`, `updated_at`) VALUES
                                                                         (1, 'ВЕТ. КЛИНИКА', '2022-07-16 15:51:11', '2022-07-16 15:51:14'),
                                                                         (2, 'Маркетинг', '2022-07-16 15:51:12', '2022-07-16 15:51:15'),
                                                                         (22, 'Човешки ресурси', '2022-07-16 15:51:11', '2022-07-16 15:51:14'),
                                                                         (24, 'Счетоводен', '2022-07-16 15:51:11', '2022-07-16 15:51:14'),
                                                                         (29, 'Склад', '2022-07-16 15:51:12', '2022-07-16 15:51:15'),
                                                                         (30, 'Търговски', '2022-07-16 15:51:14', '2022-07-16 15:51:17');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
                             `id` bigint NOT NULL,
                             `user_id` bigint DEFAULT NULL,
                             `surname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                             `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                             `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                             `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                             `created_at` timestamp NULL DEFAULT NULL,
                             `updated_at` timestamp NULL DEFAULT NULL,
                             `post_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                             `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                             `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                             `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                             `pin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                             `personal_phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                             `work_phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                             `start` date DEFAULT NULL,
                             `end` date DEFAULT NULL,
                             `department_id` bigint DEFAULT NULL,
                             `position_id` bigint DEFAULT NULL,
                             `supervisors` json DEFAULT NULL,
                             `location_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `user_id`, `surname`, `last_name`, `city`, `first_name`, `created_at`, `updated_at`, `post_code`, `address`, `country`, `email`, `pin`, `personal_phone`, `work_phone`, `start`, `end`, `department_id`, `position_id`, `supervisors`, `location_id`) VALUES
                                                                                                                                                                                                                                                                                         (2, 3, 'Иванов', 'Петров', 'Сливен', 'Петърjs', '2022-07-16 15:48:42', '2022-07-16 15:48:46', '8800', 'ул. асдд44, ап 3', 'България', 'testmail@gmail.com', '9154690508', '0895067499', '0895063555', '2022-05-04', NULL, 2, 3, '[23, 105]', 1),
                                                                                                                                                                                                                                                                                         (23, 10, 'Аааа', 'Аааа', 'Варна', 'Аааа', '2022-07-16 15:48:42', '2022-07-16 15:48:46', '9000', 'ж.к.асдбл.83 ет.6', 'България', 'foo@miazoo.com', '8800000000', '878686009', NULL, '2012-03-01', NULL, 2, 4, '[105]', 2);

-- --------------------------------------------------------

--
-- Table structure for table `errors`
--

CREATE TABLE `errors` (
                          `id` int NOT NULL,
                          `user_id` bigint DEFAULT NULL,
                          `error_message` text COLLATE utf8mb4_general_ci,
                          `stack_trace` text COLLATE utf8mb4_general_ci,
                          `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                          `request_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
                          `exception_trace` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `errors`
--

INSERT INTO `errors` (`id`, `user_id`, `error_message`, `stack_trace`, `created_at`, `request_url`, `exception_trace`) VALUES
    (23, 3, 'dasdada', '#0 /var/www/html/app/Http/Controllers/Absences/RequestsController.php(77): App\\System\\Absences\\Requests\\Service->approve(Array)\n#1 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Controller.php(54): App\\Http\\Controllers\\Absences\\RequestsController->approve(Array, Object(App\\System\\Absences\\Requests\\Service))\n#2 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/ControllerDispatcher.php(45): Illuminate\\Routing\\Controller->callAction(\'approve\', Array)\n#3 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Route.php(262): Illuminate\\Routing\\ControllerDispatcher->dispatch(Object(Illuminate\\Routing\\Route), Object(App\\Http\\Controllers\\Absences\\RequestsController), \'approve\')\n#4 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Route.php(205): Illuminate\\Routing\\Route->runController()\n#5 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Router.php(721): Illuminate\\Routing\\Route->run()\n#6 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(128): Illuminate\\Routing\\Router->Illuminate\\Routing\\{closure}(Object(Illuminate\\Http\\Request))\n#7 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Middleware/SubstituteBindings.php(50): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))\n#8 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(167): Illuminate\\Routing\\Middleware\\SubstituteBindings->handle(Object(Illuminate\\Http\\Request), Object(Closure))\n#9 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Middleware/ThrottleRequests.php(127): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))\n#10 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Middleware/ThrottleRequests.php(103): Illuminate\\Routing\\Middleware\\ThrottleRequests->handleRequest(Object(Illuminate\\Http\\Request), Object(Closure), Array)\n#11 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Middleware/ThrottleRequests.php(55): Illuminate\\Routing\\Middleware\\ThrottleRequests->handleRequestUsingNamedLimiter(Object(Illuminate\\Http\\Request), Object(Closure), \'api\', Object(Closure))\n#12 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(167): Illuminate\\Routing\\Middleware\\ThrottleRequests->handle(Object(Illuminate\\Http\\Request), Object(Closure), \'api\')\n#13 /var/www/html/vendor/laravel/framework/src/Illuminate/Auth/Middleware/Authenticate.php(44): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))\n#14 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(167): Illuminate\\Auth\\Middleware\\Authenticate->handle(Object(Illuminate\\Http\\Request), Object(Closure), \'api\')\n#15 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(103): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))\n#16 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Router.php(723): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#17 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Router.php(698): Illuminate\\Routing\\Router->runRouteWithinStack(Object(Illuminate\\Routing\\Route), Object(Illuminate\\Http\\Request))\n#18 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Router.php(662): Illuminate\\Routing\\Router->runRoute(Object(Illuminate\\Http\\Request), Object(Illuminate\\Routing\\Route))\n#19 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Router.php(651): Illuminate\\Routing\\Router->dispatchToRoute(Object(Illuminate\\Http\\Request))\n#20 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php(167): Illuminate\\Routing\\Router->dispatch(Object(Illuminate\\Http\\Request))\n#21 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(128): Illuminate\\Foundation\\Http\\Kernel->Illuminate\\Foundation\\Http\\{closure}(Object(Illuminate\\Http\\Request))\n#22 /var/www/html/app/Http/Middleware/Cors.php(19): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))\n#23 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(167): App\\Http\\Middleware\\Cors->handle(Object(Illuminate\\Http\\Request), Object(Closure))\n#24 /var/www/html/vendor/fruitcake/laravel-cors/src/HandleCors.php(52): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))\n#25 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(167): Fruitcake\\Cors\\HandleCors->handle(Object(Illuminate\\Http\\Request), Object(Closure))\n#26 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TransformsRequest.php(21): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))\n#27 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/ConvertEmptyStringsToNull.php(31): Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest->handle(Object(Illuminate\\Http\\Request), Object(Closure))\n#28 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(167): Illuminate\\Foundation\\Http\\Middleware\\ConvertEmptyStringsToNull->handle(Object(Illuminate\\Http\\Request), Object(Closure))\n#29 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TransformsRequest.php(21): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))\n#30 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TrimStrings.php(40): Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest->handle(Object(Illuminate\\Http\\Request), Object(Closure))\n#31 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(167): Illuminate\\Foundation\\Http\\Middleware\\TrimStrings->handle(Object(Illuminate\\Http\\Request), Object(Closure))\n#32 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/ValidatePostSize.php(27): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))\n#33 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(167): Illuminate\\Foundation\\Http\\Middleware\\ValidatePostSize->handle(Object(Illuminate\\Http\\Request), Object(Closure))\n#34 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/PreventRequestsDuringMaintenance.php(86): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))\n#35 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(167): Illuminate\\Foundation\\Http\\Middleware\\PreventRequestsDuringMaintenance->handle(Object(Illuminate\\Http\\Request), Object(Closure))\n#36 /var/www/html/vendor/fruitcake/laravel-cors/src/HandleCors.php(52): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))\n#37 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(167): Fruitcake\\Cors\\HandleCors->handle(Object(Illuminate\\Http\\Request), Object(Closure))\n#38 /var/www/html/vendor/laravel/framework/src/Illuminate/Http/Middleware/TrustProxies.php(39): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))\n#39 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(167): Illuminate\\Http\\Middleware\\TrustProxies->handle(Object(Illuminate\\Http\\Request), Object(Closure))\n#40 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(103): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))\n#41 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php(142): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#42 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php(111): Illuminate\\Foundation\\Http\\Kernel->sendRequestThroughRouter(Object(Illuminate\\Http\\Request))\n#43 /var/www/html/public/index.php(52): Illuminate\\Foundation\\Http\\Kernel->handle(Object(Illuminate\\Http\\Request))\n#44 {main}', '2023-08-21 05:57:07', 'http://localhost/api/absences/request/approve', '[{\"args\": [{\"id\": 149, \"days\": 3, \"type_id\": 1, \"approval\": \"APPROVED\", \"end_date\": \"2023-08-25\", \"start_date\": \"2023-08-23\", \"employee_id\": 23}], \"file\": \"/var/www/html/app/Http/Controllers/Absences/RequestsController.php\", \"line\": 77, \"type\": \"->\", \"class\": \"App\\\\System\\\\Absences\\\\Requests\\\\Service\", \"function\": \"approve\"}, {\"args\": [{\"id\": 149, \"days\": 3, \"type_id\": 1, \"approval\": \"APPROVED\", \"end_date\": \"2023-08-25\", \"start_date\": \"2023-08-23\", \"employee_id\": 23}, []], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Controller.php\", \"line\": 54, \"type\": \"->\", \"class\": \"App\\\\Http\\\\Controllers\\\\Absences\\\\RequestsController\", \"function\": \"approve\"}, {\"args\": [\"approve\", [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}, []]], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Routing/ControllerDispatcher.php\", \"line\": 45, \"type\": \"->\", \"class\": \"Illuminate\\\\Routing\\\\Controller\", \"function\": \"callAction\"}, {\"args\": [{\"uri\": \"api/absences/request/approve\", \"action\": {\"uses\": \"App\\\\Http\\\\Controllers\\\\Absences\\\\RequestsController@approve\", \"where\": [], \"prefix\": \"/api\", \"namespace\": null, \"controller\": \"App\\\\Http\\\\Controllers\\\\Absences\\\\RequestsController@approve\", \"middleware\": [\"api\", \"auth:api\"]}, \"wheres\": [], \"methods\": [\"POST\"], \"compiled\": [], \"defaults\": [], \"controller\": [], \"isFallback\": false, \"parameters\": [], \"parameterNames\": [], \"computedMiddleware\": [\"api\", \"auth:api\"]}, [], \"approve\"], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Route.php\", \"line\": 262, \"type\": \"->\", \"class\": \"Illuminate\\\\Routing\\\\ControllerDispatcher\", \"function\": \"dispatch\"}, {\"args\": [], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Route.php\", \"line\": 205, \"type\": \"->\", \"class\": \"Illuminate\\\\Routing\\\\Route\", \"function\": \"runController\"}, {\"args\": [], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Router.php\", \"line\": 721, \"type\": \"->\", \"class\": \"Illuminate\\\\Routing\\\\Route\", \"function\": \"run\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\", \"line\": 128, \"type\": \"->\", \"class\": \"Illuminate\\\\Routing\\\\Router\", \"function\": \"Illuminate\\\\Routing\\\\{closure}\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Middleware/SubstituteBindings.php\", \"line\": 50, \"type\": \"->\", \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\", \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}, []], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\", \"line\": 167, \"type\": \"->\", \"class\": \"Illuminate\\\\Routing\\\\Middleware\\\\SubstituteBindings\", \"function\": \"handle\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Middleware/ThrottleRequests.php\", \"line\": 127, \"type\": \"->\", \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\", \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}, [], [{\"key\": \"d2bfa8e8b749d2772a21edee7b70a2b3\", \"maxAttempts\": 60, \"decayMinutes\": 1, \"responseCallback\": null}]], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Middleware/ThrottleRequests.php\", \"line\": 103, \"type\": \"->\", \"class\": \"Illuminate\\\\Routing\\\\Middleware\\\\ThrottleRequests\", \"function\": \"handleRequest\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}, [], \"api\", []], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Middleware/ThrottleRequests.php\", \"line\": 55, \"type\": \"->\", \"class\": \"Illuminate\\\\Routing\\\\Middleware\\\\ThrottleRequests\", \"function\": \"handleRequestUsingNamedLimiter\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}, [], \"api\"], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\", \"line\": 167, \"type\": \"->\", \"class\": \"Illuminate\\\\Routing\\\\Middleware\\\\ThrottleRequests\", \"function\": \"handle\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Auth/Middleware/Authenticate.php\", \"line\": 44, \"type\": \"->\", \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\", \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}, [], \"api\"], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\", \"line\": 167, \"type\": \"->\", \"class\": \"Illuminate\\\\Auth\\\\Middleware\\\\Authenticate\", \"function\": \"handle\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\", \"line\": 103, \"type\": \"->\", \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\", \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\"}, {\"args\": [[]], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Router.php\", \"line\": 723, \"type\": \"->\", \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\", \"function\": \"then\"}, {\"args\": [{\"uri\": \"api/absences/request/approve\", \"action\": {\"uses\": \"App\\\\Http\\\\Controllers\\\\Absences\\\\RequestsController@approve\", \"where\": [], \"prefix\": \"/api\", \"namespace\": null, \"controller\": \"App\\\\Http\\\\Controllers\\\\Absences\\\\RequestsController@approve\", \"middleware\": [\"api\", \"auth:api\"]}, \"wheres\": [], \"methods\": [\"POST\"], \"compiled\": [], \"defaults\": [], \"controller\": [], \"isFallback\": false, \"parameters\": [], \"parameterNames\": [], \"computedMiddleware\": [\"api\", \"auth:api\"]}, {\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Router.php\", \"line\": 698, \"type\": \"->\", \"class\": \"Illuminate\\\\Routing\\\\Router\", \"function\": \"runRouteWithinStack\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}, {\"uri\": \"api/absences/request/approve\", \"action\": {\"uses\": \"App\\\\Http\\\\Controllers\\\\Absences\\\\RequestsController@approve\", \"where\": [], \"prefix\": \"/api\", \"namespace\": null, \"controller\": \"App\\\\Http\\\\Controllers\\\\Absences\\\\RequestsController@approve\", \"middleware\": [\"api\", \"auth:api\"]}, \"wheres\": [], \"methods\": [\"POST\"], \"compiled\": [], \"defaults\": [], \"controller\": [], \"isFallback\": false, \"parameters\": [], \"parameterNames\": [], \"computedMiddleware\": [\"api\", \"auth:api\"]}], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Router.php\", \"line\": 662, \"type\": \"->\", \"class\": \"Illuminate\\\\Routing\\\\Router\", \"function\": \"runRoute\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Router.php\", \"line\": 651, \"type\": \"->\", \"class\": \"Illuminate\\\\Routing\\\\Router\", \"function\": \"dispatchToRoute\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php\", \"line\": 167, \"type\": \"->\", \"class\": \"Illuminate\\\\Routing\\\\Router\", \"function\": \"dispatch\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\", \"line\": 128, \"type\": \"->\", \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Kernel\", \"function\": \"Illuminate\\\\Foundation\\\\Http\\\\{closure}\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/app/Http/Middleware/Cors.php\", \"line\": 19, \"type\": \"->\", \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\", \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}, []], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\", \"line\": 167, \"type\": \"->\", \"class\": \"App\\\\Http\\\\Middleware\\\\Cors\", \"function\": \"handle\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/fruitcake/laravel-cors/src/HandleCors.php\", \"line\": 52, \"type\": \"->\", \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\", \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}, []], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\", \"line\": 167, \"type\": \"->\", \"class\": \"Fruitcake\\\\Cors\\\\HandleCors\", \"function\": \"handle\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TransformsRequest.php\", \"line\": 21, \"type\": \"->\", \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\", \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}, []], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/ConvertEmptyStringsToNull.php\", \"line\": 31, \"type\": \"->\", \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Middleware\\\\TransformsRequest\", \"function\": \"handle\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}, []], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\", \"line\": 167, \"type\": \"->\", \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Middleware\\\\ConvertEmptyStringsToNull\", \"function\": \"handle\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TransformsRequest.php\", \"line\": 21, \"type\": \"->\", \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\", \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}, []], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TrimStrings.php\", \"line\": 40, \"type\": \"->\", \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Middleware\\\\TransformsRequest\", \"function\": \"handle\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}, []], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\", \"line\": 167, \"type\": \"->\", \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Middleware\\\\TrimStrings\", \"function\": \"handle\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/ValidatePostSize.php\", \"line\": 27, \"type\": \"->\", \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\", \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}, []], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\", \"line\": 167, \"type\": \"->\", \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Middleware\\\\ValidatePostSize\", \"function\": \"handle\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/PreventRequestsDuringMaintenance.php\", \"line\": 86, \"type\": \"->\", \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\", \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}, []], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\", \"line\": 167, \"type\": \"->\", \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Middleware\\\\PreventRequestsDuringMaintenance\", \"function\": \"handle\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/fruitcake/laravel-cors/src/HandleCors.php\", \"line\": 52, \"type\": \"->\", \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\", \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}, []], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\", \"line\": 167, \"type\": \"->\", \"class\": \"Fruitcake\\\\Cors\\\\HandleCors\", \"function\": \"handle\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Http/Middleware/TrustProxies.php\", \"line\": 39, \"type\": \"->\", \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\", \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}, []], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\", \"line\": 167, \"type\": \"->\", \"class\": \"Illuminate\\\\Http\\\\Middleware\\\\TrustProxies\", \"function\": \"handle\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\", \"line\": 103, \"type\": \"->\", \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\", \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\"}, {\"args\": [[]], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php\", \"line\": 142, \"type\": \"->\", \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\", \"function\": \"then\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php\", \"line\": 111, \"type\": \"->\", \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Kernel\", \"function\": \"sendRequestThroughRouter\"}, {\"args\": [{\"files\": [], \"query\": [], \"server\": [], \"cookies\": [], \"headers\": [], \"request\": [], \"attributes\": []}], \"file\": \"/var/www/html/public/index.php\", \"line\": 52, \"type\": \"->\", \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Kernel\", \"function\": \"handle\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
                               `id` bigint UNSIGNED NOT NULL,
                               `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                               `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                               `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                               `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                               `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
                        `id` bigint UNSIGNED NOT NULL,
                        `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                        `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                        `attempts` tinyint UNSIGNED NOT NULL,
                        `reserved_at` int UNSIGNED DEFAULT NULL,
                        `available_at` int UNSIGNED NOT NULL,
                        `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
                             `id` bigint NOT NULL,
                             `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                             `post_code` int DEFAULT NULL,
                             `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                             `created_at` timestamp NULL DEFAULT NULL,
                             `updated_at` timestamp NULL DEFAULT NULL,
                             `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'unspecified'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `city`, `post_code`, `country`, `created_at`, `updated_at`, `address`) VALUES
                                                                                                          (1, 'София', 1000, 'България', '2022-07-12 15:28:05', '2022-07-16 15:28:15', 'Леко в лево 156, ет 2'),
                                                                                                          (2, 'Варна', 9000, 'България', '2022-07-13 15:29:00', '2022-07-16 15:29:06', 'бул Черни Връх 135, сграда 23 офис 15'),
                                                                                                          (6, 'dsadas123', 12, 'dsadas', NULL, NULL, 'dsadas'),
                                                                                                          (12, 'дсадас', 21, 'дада', NULL, NULL, 'дасдасс');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
                              `id` int UNSIGNED NOT NULL,
                              `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                              `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
                                                          (1, '2014_10_12_000000_create_users_table', 1),
                                                          (2, '2014_10_12_100000_create_password_resets_table', 1),
                                                          (3, '2019_12_14_000001_create_personal_access_tokens_table', 1),
                                                          (4, '2016_06_01_000001_create_oauth_auth_codes_table', 2),
                                                          (5, '2016_06_01_000002_create_oauth_access_tokens_table', 2),
                                                          (6, '2016_06_01_000003_create_oauth_refresh_tokens_table', 2),
                                                          (7, '2016_06_01_000004_create_oauth_clients_table', 2),
                                                          (8, '2016_06_01_000005_create_oauth_personal_access_clients_table', 2),
                                                          (9, '2022_07_16_000000_create_employees_table', 3),
                                                          (10, '2022_07_16_100000_create_employees_table', 4),
                                                          (11, '2022_07_16_110000_create_employees_table', 5),
                                                          (12, '2022_07_16_100000_create_locations_table', 6),
                                                          (13, '2022_07_16_100000_create_positions_table', 7),
                                                          (14, '2022_07_16_100000_create_departments_table', 8),
                                                          (15, '2022_07_20_100000_create_salaries_table', 9),
                                                          (16, '2022_07_20_100000_create_sick_leave_requests_table', 10),
                                                          (17, '2022_07_20_100000_create_absence_types_table', 11),
                                                          (18, '2022_07_20_100000_create_absences_archive_table', 12),
                                                          (19, '2023_02_13_060808_create_permission_tables', 13);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
                                         `permission_id` bigint UNSIGNED NOT NULL,
                                         `model_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                                         `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_permissions`
--

INSERT INTO `model_has_permissions` (`permission_id`, `model_type`, `model_id`) VALUES
                                                                                    (86, 'App\\Models\\User', 3),
                                                                                    (91, 'App\\Models\\User', 3),
                                                                                    (72, 'App\\Models\\User', 14);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
                                   `role_id` bigint UNSIGNED NOT NULL,
                                   `model_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                                   `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
                                                                        (1, 'App\\Models\\User', 3),
                                                                        (1, 'App\\Models\\User', 10);

-- --------------------------------------------------------

--
-- Table structure for table `notification_settings`
--

CREATE TABLE `notification_settings` (
                                         `id` int NOT NULL,
                                         `category` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                         `action` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                         `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification_settings`
--

INSERT INTO `notification_settings` (`id`, `category`, `action`, `email`) VALUES
    (1, 'absence_requests', 'CREATED', 'testmail@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
                                       `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                                       `user_id` bigint UNSIGNED DEFAULT NULL,
                                       `client_id` bigint UNSIGNED NOT NULL,
                                       `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                                       `scopes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
                                       `revoked` tinyint(1) NOT NULL,
                                       `created_at` timestamp NULL DEFAULT NULL,
                                       `updated_at` timestamp NULL DEFAULT NULL,
                                       `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--



-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
                                    `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                                    `user_id` bigint UNSIGNED NOT NULL,
                                    `client_id` bigint UNSIGNED NOT NULL,
                                    `scopes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
                                    `revoked` tinyint(1) NOT NULL,
                                    `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
                                 `id` bigint UNSIGNED NOT NULL,
                                 `user_id` bigint UNSIGNED DEFAULT NULL,
                                 `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                                 `secret` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                                 `provider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                                 `redirect` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                                 `personal_access_client` tinyint(1) NOT NULL,
                                 `password_client` tinyint(1) NOT NULL,
                                 `revoked` tinyint(1) NOT NULL,
                                 `created_at` timestamp NULL DEFAULT NULL,
                                 `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
                                                                                                                                                                                (1, NULL, 'Laravel Personal Access Client', 'utDL7u6QukeVNiAUd4kgOreK1QsDFbjpOSle9zum', NULL, 'http://localhost', 1, 0, 0, '2022-07-11 06:31:27', '2022-07-11 06:31:27'),
                                                                                                                                                                                (2, NULL, 'Laravel Password Grant Client', 'eZYTB9xw5wOXs29KlWubDpJaLgrd8tAw1AKM1Us8', 'users', 'http://localhost', 0, 1, 0, '2022-07-11 06:31:27', '2022-07-11 06:31:27');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
                                                 `id` bigint UNSIGNED NOT NULL,
                                                 `client_id` bigint UNSIGNED NOT NULL,
                                                 `created_at` timestamp NULL DEFAULT NULL,
                                                 `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
                                                                                                (1, 1, '2022-07-11 06:31:27', '2022-07-11 06:31:27'),
                                                                                                (2, 3, '2022-09-03 19:46:10', '2022-09-03 19:46:10');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
                                        `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                                        `access_token_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                                        `revoked` tinyint(1) NOT NULL,
                                        `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_refresh_tokens`
--

-- --------------------------------------------------------

--
-- Table structure for table `official_holidays`
--

CREATE TABLE `official_holidays` (
                                     `id` int NOT NULL,
                                     `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                     `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `official_holidays`
--

INSERT INTO `official_holidays` (`id`, `name`, `date`) VALUES
                                                           (3, 'daada', '2023-08-28'),
                                                           (9, 'dadas', '2023-08-24'),
                                                           (17, '4665', '2023-08-20'),
                                                           (19, '2dsa5gg1', '2023-08-16'),
                                                           (20, '121231', '2023-08-17'),
                                                           (21, 'dada', '2023-08-23'),
                                                           (22, 'Ko ko koleda', '2023-08-30');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
                                   `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                                   `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                                   `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
    ('testmail@gmail.com', '$2y$10$Zh37TJ30./n1A.G4ESn/jOD9QYw2fuxK5A0bvnRlQyVia5k7KiECa', '2023-08-24 20:30:44');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
                               `id` bigint UNSIGNED NOT NULL,
                               `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                               `guard_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                               `created_at` timestamp NULL DEFAULT NULL,
                               `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
                                                                                       (72, 'delete_absences', 'api', NULL, NULL),
                                                                                       (81, 'can_manage_accesses', 'api', NULL, NULL),
                                                                                       (82, 'can_manage_permissions', 'api', NULL, NULL),
                                                                                       (83, 'absence_register', 'api', NULL, NULL),
                                                                                       (85, 'can_force_change_password', 'api', NULL, NULL),
                                                                                       (86, 'can_approve_absence_request_global', 'api', NULL, NULL),
                                                                                       (87, 'can_approve_absence_request_supervision', 'api', NULL, NULL),
                                                                                       (88, 'can_register_absence_request_global', 'api', NULL, NULL),
                                                                                       (89, 'can_register_absence_request_supervision', 'api', NULL, NULL),
                                                                                       (90, 'can_edit_absence_request_global', 'api', NULL, NULL),
                                                                                       (91, 'can_change_profile_pictures_global', 'api', NULL, NULL),
                                                                                       (92, 'can_change_profile_picture', 'api', NULL, NULL),
                                                                                       (93, 'can_view_salary', 'api', NULL, NULL),
                                                                                       (94, 'can_change_settings', 'api', NULL, NULL),
                                                                                       (95, 'can_manage_employees', 'api', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `permissions_details`
--

CREATE TABLE `permissions_details` (
                                       `id` int NOT NULL,
                                       `localized_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                                       `localized_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                                       `permission_id` bigint UNSIGNED DEFAULT NULL,
                                       `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                                       `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions_details`
--

INSERT INTO `permissions_details` (`id`, `localized_name`, `localized_description`, `permission_id`, `created_at`, `updated_at`) VALUES
                                                                                                                                     (56, 'Премахване молба за отпуск.', 'Дава достъп до премахване на вече регистрирана молба за отпуск.', 72, '2023-03-05 10:58:26', '2023-03-05 10:58:26'),
                                                                                                                                     (65, 'Даване на достъп', NULL, 81, '2023-03-12 14:02:25', '2023-03-12 14:02:25'),
                                                                                                                                     (66, 'Управление на достъп', NULL, 82, '2023-03-12 14:02:55', '2023-03-12 14:02:55'),
                                                                                                                                     (67, 'Регистрация на отпуск', NULL, 83, '2023-03-18 12:23:54', '2023-03-18 12:23:54'),
                                                                                                                                     (69, 'Смяна на парола на други служители', NULL, 85, '2023-08-23 21:17:16', '2023-08-23 21:17:16'),
                                                                                                                                     (70, 'Одобрение на отпуск на всички служители', NULL, 86, '2023-08-26 08:14:39', '2023-08-26 08:14:39'),
                                                                                                                                     (71, 'Одобрение на отпуск на служители', NULL, 87, '2023-08-26 08:30:28', '2023-08-26 08:30:28'),
                                                                                                                                     (72, 'Регистриране на отпуск на всички служители', NULL, 88, '2023-08-26 08:30:54', '2023-08-26 08:30:54'),
                                                                                                                                     (73, 'Регистриране на отпуск на служители', NULL, 89, '2023-08-26 08:31:13', '2023-08-26 08:31:13'),
                                                                                                                                     (74, 'Промяна на отпуск на всички служители', NULL, 90, '2023-08-26 10:00:17', '2023-08-26 10:00:17'),
                                                                                                                                     (75, 'Управление на профилни снимки на глобално ниво', NULL, 91, '2023-10-03 14:26:38', '2023-10-03 14:26:38'),
                                                                                                                                     (76, 'Управление на профилни снимки', NULL, 92, '2023-10-03 14:27:41', '2023-10-03 14:27:41'),
                                                                                                                                     (77, 'преглед на отпуск', NULL, 93, '2023-11-01 15:14:24', '2023-11-01 15:14:24'),
                                                                                                                                     (78, 'Сетингс меню', NULL, 94, '2023-11-02 06:10:49', '2023-11-02 06:10:49'),
                                                                                                                                     (79, 'Служители меню', NULL, 95, '2023-11-02 06:11:02', '2023-11-02 06:11:02');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
                                          `id` bigint UNSIGNED NOT NULL,
                                          `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                                          `tokenable_id` bigint UNSIGNED NOT NULL,
                                          `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                                          `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                                          `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
                                          `last_used_at` timestamp NULL DEFAULT NULL,
                                          `created_at` timestamp NULL DEFAULT NULL,
                                          `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
                             `id` bigint NOT NULL,
                             `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                             `job_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                             `created_at` timestamp NULL DEFAULT NULL,
                             `updated_at` timestamp NULL DEFAULT NULL,
                             `role_id` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `positions`
--

INSERT INTO `positions` (`id`, `name`, `job_description`, `created_at`, `updated_at`, `role_id`) VALUES
                                                                                                     (1, 'Началник клиника', 'Бръмчи с мотокара', '2022-07-16 15:29:49', '2022-07-16 15:29:50', NULL),
                                                                                                     (2, 'Мениджър развитие', 'Взима парите на хората', '2022-07-16 15:30:03', '2022-07-16 15:30:05', NULL),
                                                                                                     (3, 'Управител', 'Прависе че пуска кампании', '2022-07-16 15:31:11', '2022-07-16 15:31:12', NULL),
                                                                                                     (4, 'Маркетинг мениджър', 'Пази се да не пречи на мотокариста', '2022-07-16 15:31:14', '2022-07-16 15:31:15', NULL),
                                                                                                     (5, 'Мениджър Чов. Р-си', 'Взима и дава кинти', '2022-07-16 15:31:26', '2022-07-16 15:31:24', NULL),
                                                                                                     (9, 'гл.С четоводител', 'Нещо ... трябва да се попълни ', '2022-07-16 15:29:49', '2022-07-16 15:29:50', NULL),
                                                                                                     (10, 'Началник, склад', 'Нещо ... трябва да се попълни ', '2022-07-16 15:30:03', '2022-07-16 15:30:05', NULL),
                                                                                                     (11, 'Търговски представител', 'Нещо ... трябва да се попълни ', '2022-07-16 15:31:11', '2022-07-16 15:31:12', NULL),
                                                                                                     (12, 'Стоковед', 'Нещо ... трябва да се попълни ', '2022-07-16 15:31:14', '2022-07-16 15:31:15', NULL),
                                                                                                     (13, 'Техничеси сътрудник', 'Нещо ... трябва да се попълни ', '2022-07-16 15:31:26', '2022-07-16 15:31:24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
                         `id` bigint UNSIGNED NOT NULL,
                         `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         `guard_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         `created_at` timestamp NULL DEFAULT NULL,
                         `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
                                                                                 (1, 'admin', 'api', '2023-02-13 07:02:59', '2023-02-13 07:02:59'),
                                                                                 (8, 'sadasd323232', 'api', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
                                        `permission_id` bigint UNSIGNED NOT NULL,
                                        `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
                                                                    (72, 1),
                                                                    (81, 1),
                                                                    (82, 1),
                                                                    (83, 1),
                                                                    (85, 1),
                                                                    (93, 1),
                                                                    (94, 1),
                                                                    (95, 1),
                                                                    (72, 8);

-- --------------------------------------------------------

--
-- Table structure for table `salaries`
--

CREATE TABLE `salaries` (
                            `id` bigint UNSIGNED NOT NULL,
                            `employee_id` bigint DEFAULT NULL,
                            `gross_salary` decimal(10,2) DEFAULT NULL,
                            `created_at` timestamp NULL DEFAULT NULL,
                            `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `salaries`
--

INSERT INTO `salaries` (`id`, `employee_id`, `gross_salary`, `created_at`, `updated_at`) VALUES
    (2, 2, 1400.50, '2022-07-19 23:53:37', '2022-07-19 23:53:40');

-- --------------------------------------------------------

--
-- Table structure for table `sick_leave`
--

CREATE TABLE `sick_leave` (
                              `id` bigint UNSIGNED NOT NULL,
                              `employee_id` int NOT NULL,
                              `start_date` date NOT NULL,
                              `end_date` date NOT NULL,
                              `days` int NOT NULL,
                              `created_at` timestamp NULL DEFAULT NULL,
                              `updated_at` timestamp NULL DEFAULT NULL,
                              `cost` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sick_leave`
--

INSERT INTO `sick_leave` (`id`, `employee_id`, `start_date`, `end_date`, `days`, `created_at`, `updated_at`, `cost`) VALUES
                                                                                                                         (17, 2, '2021-07-21', '2021-07-29', 7, '2022-07-21 08:04:00', '2022-07-21 08:04:01', NULL),
                                                                                                                         (18, 2, '2021-07-21', '2021-07-29', 2, '2022-07-21 08:04:00', '2022-07-21 08:04:01', 30),
                                                                                                                         (43, 2, '2022-08-25', '2022-08-30', 20, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `supervisions`
--

CREATE TABLE `supervisions` (
                                `supervisor_id` bigint NOT NULL,
                                `employee_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `supervisions`
--

INSERT INTO `supervisions` (`supervisor_id`, `employee_id`) VALUES
    (23, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
                         `id` bigint NOT NULL,
                         `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `created_at` timestamp NULL DEFAULT NULL,
                         `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
                                                                                                                             (3, 'Петърjs', 'Петров', 'testmail@gmail.com', '$2y$10$oVHEFMXZt8kfHy79F1zEjO5KD6AUdCtsBaNyqZUM4otAhhIj65hBC', 'ZTB8mLf6dTLcjnjSI1xDu8bgYskEwRhAmbZtX75aWXs2E9R2vcLIVNtpaB4i', '2022-07-13 14:58:16', '2023-10-04 14:44:11'),
                                                                                                                             (10, 'Антон', 'Антонов', 'antonov@miazoo.com', '$2y$10$gjCrXKtfnR65ec.Sr4/GN.zhPGz0Zw.fdXLbT3hNoiBg91X2N8fpa', NULL, '2022-10-11 04:50:54', '2022-10-11 04:50:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absences`
--
ALTER TABLE `absences`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `absences_archive`
--
ALTER TABLE `absences_archive`
    ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `absence_requests`
--
ALTER TABLE `absence_requests`
    ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `absence_requests_logs`
--
ALTER TABLE `absence_requests_logs`
    ADD PRIMARY KEY (`id`),
  ADD KEY `absence_request_id` (`absence_request_id`),
  ADD KEY `action` (`action`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `absence_request_actions`
--
ALTER TABLE `absence_request_actions`
    ADD PRIMARY KEY (`id`),
  ADD KEY `idx_name` (`name`);

--
-- Indexes for table `absence_types`
--
ALTER TABLE `absence_types`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employees_personal_phone_unique` (`personal_phone`),
  ADD UNIQUE KEY `employees_pin_unique` (`pin`),
  ADD UNIQUE KEY `employees_email_unique` (`email`),
  ADD UNIQUE KEY `employees_user_id_unique` (`user_id`),
  ADD KEY `FK_Employee_PositionID` (`position_id`),
  ADD KEY `FK_Employee_LocationD` (`location_id`),
  ADD KEY `FK_Employee_DepartmentID_Updated` (`department_id`);

--
-- Indexes for table `errors`
--
ALTER TABLE `errors`
    ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uc_city_address` (`city`,`address`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
    ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
    ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `notification_settings`
--
ALTER TABLE `notification_settings`
    ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
    ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
    ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
    ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
    ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `official_holidays`
--
ALTER TABLE `official_holidays`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
    ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `permissions_details`
--
ALTER TABLE `permissions_details`
    ADD PRIMARY KEY (`id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `positions`
--
ALTER TABLE `positions`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `positions_name_unique` (`name`),
  ADD KEY `fk_positions_roles` (`role_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
    ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `salaries`
--
ALTER TABLE `salaries`
    ADD PRIMARY KEY (`id`),
  ADD KEY `fk_employee_id` (`employee_id`);

--
-- Indexes for table `sick_leave`
--
ALTER TABLE `sick_leave`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supervisions`
--
ALTER TABLE `supervisions`
    ADD PRIMARY KEY (`supervisor_id`,`employee_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `absences`
--
ALTER TABLE `absences`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `absences_archive`
--
ALTER TABLE `absences_archive`
    MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `absence_requests`
--
ALTER TABLE `absence_requests`
    MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT for table `absence_requests_logs`
--
ALTER TABLE `absence_requests_logs`
    MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `absence_types`
--
ALTER TABLE `absence_types`
    MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
    MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
    MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `errors`
--
ALTER TABLE `errors`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
    MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
    MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `notification_settings`
--
ALTER TABLE `notification_settings`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `official_holidays`
--
ALTER TABLE `official_holidays`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `permissions_details`
--
ALTER TABLE `permissions_details`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `positions`
--
ALTER TABLE `positions`
    MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `salaries`
--
ALTER TABLE `salaries`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sick_leave`
--
ALTER TABLE `sick_leave`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
    MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `absences_archive`
--
ALTER TABLE `absences_archive`
    ADD CONSTRAINT `absences_archive_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `absences_archive_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `absence_types` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `absence_requests`
--
ALTER TABLE `absence_requests`
    ADD CONSTRAINT `absence_requests_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `absence_requests_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `absence_types` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `absence_requests_logs`
--
ALTER TABLE `absence_requests_logs`
    ADD CONSTRAINT `absence_requests_logs_ibfk_1` FOREIGN KEY (`absence_request_id`) REFERENCES `absence_requests` (`id`),
  ADD CONSTRAINT `absence_requests_logs_ibfk_2` FOREIGN KEY (`action`) REFERENCES `absence_request_actions` (`name`),
  ADD CONSTRAINT `absence_requests_logs_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
    ADD CONSTRAINT `FK_Employee_DepartmentID_Updated` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Employee_LocationD_Updated` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Employee_PositionID_Updated` FOREIGN KEY (`position_id`) REFERENCES `positions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Employee_UserID` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `errors`
--
ALTER TABLE `errors`
    ADD CONSTRAINT `errors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
    ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
    ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notification_settings`
--
ALTER TABLE `notification_settings`
    ADD CONSTRAINT `notification_settings_ibfk_1` FOREIGN KEY (`email`) REFERENCES `employees` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `permissions_details`
--
ALTER TABLE `permissions_details`
    ADD CONSTRAINT `permissions_details_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `positions`
--
ALTER TABLE `positions`
    ADD CONSTRAINT `fk_positions_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
    ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `salaries`
--
ALTER TABLE `salaries`
    ADD CONSTRAINT `fk_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `supervisions`
--
ALTER TABLE `supervisions`
    ADD CONSTRAINT `supervisions_ibfk_1` FOREIGN KEY (`supervisor_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `supervisions_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
