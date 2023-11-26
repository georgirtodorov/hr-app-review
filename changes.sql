-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: db
-- Време на генериране: 11 авг 2022 в 05:35
-- Версия на сървъра: 8.0.29
-- Версия на PHP: 8.0.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данни: `laravel`
--

-- --------------------------------------------------------

--
-- Структура на таблица `departments`
--

CREATE TABLE `departments` (
                               `id` bigint UNSIGNED NOT NULL,
                               `department` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                               `created_at` timestamp NULL DEFAULT NULL,
                               `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Схема на данните от таблица `departments`
--

INSERT INTO `departments` (`id`, `department`, `created_at`, `updated_at`) VALUES
                                                                               (1, 'Склад', '2022-07-16 15:51:11', '2022-07-16 15:51:14'),
                                                                               (2, 'Офис', '2022-07-16 15:51:12', '2022-07-16 15:51:15'),
                                                                               (3, 'Онлайн магазин', '2022-07-16 15:51:13', '2022-07-16 15:51:16'),
                                                                               (4, 'Логистика', '2022-07-16 15:51:14', '2022-07-16 15:51:17');

-- --------------------------------------------------------

--
-- Структура на таблица `employees`
--

CREATE TABLE `employees` (
                             `id` bigint UNSIGNED NOT NULL,
                             `user_id` int NOT NULL,
                             `surname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                             `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                             `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                             `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                             `post_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                             `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                             `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                             `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                             `pin` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                             `personal_phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                             `work_phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                             `start` date NOT NULL,
                             `end` date DEFAULT NULL,
                             `department` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                             `position` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                             `supervisors` json DEFAULT NULL,
                             `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                             `created_at` timestamp NULL DEFAULT NULL,
                             `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Схема на данните от таблица `employees`
--

INSERT INTO `employees` (`id`, `user_id`, `surname`, `last_name`, `city`, `first_name`, `post_code`, `address`, `country`, `email`, `pin`, `personal_phone`, `work_phone`, `start`, `end`, `department`, `position`, `supervisors`, `location`, `created_at`, `updated_at`) VALUES
                                                                                                                                                                                                                                                                                (1, 2, 'Стефанов', 'Иванов', 'Пазарджик', 'Иван', '4400', 'ул. Аспарухово 55', 'България', 'georgi@gerogi.com', '8156290500', '0895067480', '0895063333', '2021-06-29', NULL, 'Склад', 'Складов работник', '[2, 3]', 'София', '2022-07-16 15:48:42', '2022-07-16 15:48:46'),
                                                                                                                                                                                                                                                                                (2, 3, 'Иванов', 'Петров', 'Сливен', 'Петър', '8800', 'ул. Вардар 44, ап 3', 'България', 'testmail@gmail.com', '9154690508', '0895067499', '0895063555', '2022-05-04', NULL, 'Офис', 'Счетоводител', '[4]', 'София', '2022-07-16 15:48:42', '2022-07-16 15:48:46'),
                                                                                                                                                                                                                                                                                (3, 4, 'Шойлев', 'Гайдаров', 'София', 'Гайдар', '1000', 'кв. Нов Път 66', 'България', 'dsadas@gmail.com', '7756590553', '0888887476', '0895553599', '2021-05-13', NULL, 'Офис', 'Маркетинг мениджър', '[]', 'Варна', '2022-07-16 15:48:42', '2022-07-16 15:48:46'),
                                                                                                                                                                                                                                                                                (6, 5, 'Шойлев', 'Иванов', 'София', 'Стоян', '1000', 'кв. Асд Фака 33', 'България', 'stoqkolev@abv.bg', '7756390553', '0884887486', '0895333599', '2021-05-05', NULL, 'Офис', 'Маркетинг мениджър', '[]', 'Варна', '2022-07-16 15:48:42', '2022-07-16 15:48:46'),
                                                                                                                                                                                                                                                                                (7, 6, 'Шойлев', 'Караджов', 'София', 'Петко', '1000', 'кв. Нов Път 66', 'България', 'petkokolewv@abv.bg', '6756590553', '0888888436', '0895552652', '2021-05-13', NULL, 'Офис', 'Маркетинг мениджър', '[]', 'Варна', '2022-07-16 15:48:42', '2022-07-16 15:48:46'),
                                                                                                                                                                                                                                                                                (8, 7, 'Шойлев', 'Хари', 'София', 'Мата', '1000', 'ул. Вардар 44, ап 3', 'България', '\"matahariv@abv.bg\"', '7756515633', '0897887476', '0895556512', '2021-01-12', '2022-07-18', 'Офис', 'Маркетинг мениджър', '[]', 'Варна', '2022-07-16 15:48:42', '2022-07-16 15:48:46'),
                                                                                                                                                                                                                                                                                (9, 8, 'Джамбов', 'Джамбо', 'Видин', 'Коко', '3700', 'ул Аспарухов Мост 44', 'България', '\"kokodjamboiv@abv.bg\"', '8768590553', '0888887485', '0895557845', '2021-08-03', '2022-07-18', 'Склад', 'Счетоводител', '[2, 6]', 'София', '2022-07-16 15:48:42', '2022-07-16 15:48:46');

-- --------------------------------------------------------

--
-- Структура на таблица `locations`
--

CREATE TABLE `locations` (
                             `id` bigint UNSIGNED NOT NULL,
                             `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                             `post_code` int NOT NULL,
                             `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                             `created_at` timestamp NULL DEFAULT NULL,
                             `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Схема на данните от таблица `locations`
--

INSERT INTO `locations` (`id`, `city`, `post_code`, `country`, `created_at`, `updated_at`) VALUES
                                                                                               (1, 'София', 1000, 'България', '2022-07-12 15:28:05', '2022-07-16 15:28:15'),
                                                                                               (2, 'Варна', 9000, 'България', '2022-07-13 15:29:00', '2022-07-16 15:29:06');

-- --------------------------------------------------------

--
-- Структура на таблица `migrations`
--

CREATE TABLE `migrations` (
                              `id` int UNSIGNED NOT NULL,
                              `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                              `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Схема на данните от таблица `migrations`
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
                                                          (16, '2022_07_20_100000_create_sick_leave_requests_table', 10);

-- --------------------------------------------------------

--
-- Структура на таблица `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
                                       `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
                                       `user_id` bigint UNSIGNED DEFAULT NULL,
                                       `client_id` bigint UNSIGNED NOT NULL,
                                       `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                                       `scopes` text COLLATE utf8mb4_unicode_ci,
                                       `revoked` tinyint(1) NOT NULL,
                                       `created_at` timestamp NULL DEFAULT NULL,
                                       `updated_at` timestamp NULL DEFAULT NULL,
                                       `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Схема на данните от таблица `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
                                                                                                                                            ('080ecd6f2f863acb3ffb74650f5a3d218983ca43610c90866579e1601f3404564d7c69ea85a0c7c3', 2, 2, NULL, '[\"*\"]', 0, '2022-07-27 17:20:53', '2022-07-27 17:20:53', '2023-07-27 17:20:53'),
                                                                                                                                            ('0b9c8713ad0476803739f2af0f2d969a9baec5718f4623ff98652cdbf5d5b44773d102d2ecc2b179', 2, 2, NULL, '[\"*\"]', 0, '2022-08-03 05:13:54', '2022-08-03 05:13:54', '2023-08-03 05:13:54'),
                                                                                                                                            ('0d15bab2d143c553e0be5ad62d2a4dd9d82d1e6d933909f627828a533713e3cd55ee7213b24878cd', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-13 07:27:52', '2022-07-13 07:27:52', '2023-07-13 07:27:52'),
                                                                                                                                            ('1bda6f7626f53fbaf22063f4ef2beb0026780720823fa4b1ce1f70b5503ee0c4fed41452f55c3043', 2, 2, NULL, '[\"*\"]', 0, '2022-07-13 14:53:42', '2022-07-13 14:53:42', '2023-07-13 14:53:42'),
                                                                                                                                            ('1d75c898c85277051af53fad4b49b4394f99585e837e05017d47d050c68fe20ddc908949e4103615', 2, 2, NULL, '[\"*\"]', 0, '2022-08-11 05:02:11', '2022-08-11 05:02:11', '2023-08-11 05:02:11'),
                                                                                                                                            ('1d7dbf223e2f0c4c2dbca4426714db82e0db1283da3f9585766f9db3221a22b10f6d037c73673d0d', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-13 07:22:48', '2022-07-13 07:22:48', '2023-07-13 07:22:48'),
                                                                                                                                            ('1e7cee8ddc8b9dced93fe55b69f1263cd9cd233d8f5836069d1e9849657e9a53634af4ee822a8044', 2, 2, NULL, '[\"*\"]', 0, '2022-07-22 07:08:16', '2022-07-22 07:08:16', '2023-07-22 07:08:16'),
                                                                                                                                            ('20d49522c989f77d88e0165ebeafb86f9abfdbccf6b0612864657c02b181afb8357abbbdd90527fe', 2, 2, NULL, '[\"*\"]', 0, '2022-07-27 05:02:35', '2022-07-27 05:02:35', '2023-07-27 05:02:35'),
                                                                                                                                            ('250b52489daa9d91bdf6632970a71523d73a76223a622239070856d84e83ff629e7feeda4bf736f9', NULL, 2, NULL, '[]', 0, '2022-07-11 14:49:01', '2022-07-11 14:49:01', '2023-07-11 14:49:01'),
                                                                                                                                            ('2e7f5054c3528a6d76202a88d79b671193e19af6f6d2cbe975274012645c0d74d3f29d833f0bfe38', 2, 2, NULL, '[\"*\"]', 0, '2022-07-27 20:38:43', '2022-07-27 20:38:43', '2023-07-27 20:38:43'),
                                                                                                                                            ('3759bf9b0771baa776af6b0144a4cad5e5b896239b563daaaa0d3dc27d4606822ae7d1d878b803bc', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-13 05:33:30', '2022-07-13 05:33:30', '2023-07-13 05:33:30'),
                                                                                                                                            ('3bdc9767b0f3732d1ca8350a5bb4a501357b0d7044c06fa901fb6fd4525b59cfca1899571684c48a', 2, 2, NULL, '[\"*\"]', 0, '2022-07-27 20:33:21', '2022-07-27 20:33:21', '2023-07-27 20:33:21'),
                                                                                                                                            ('3e70ca717fbcedc37c380e8feabd7062a7f1bd40e462e9e3d7156f8655ae20fd2356e352911548c2', 2, 2, NULL, '[\"*\"]', 0, '2022-07-18 06:12:05', '2022-07-18 06:12:05', '2023-07-18 06:12:05'),
                                                                                                                                            ('3f936734796033570ac275a0a5ac5a883e667cc684dea3a21f26b73a5f7c7cb0ce7d6cd3be46cfcd', 2, 2, NULL, '[\"*\"]', 0, '2022-07-23 13:33:49', '2022-07-23 13:33:49', '2023-07-23 13:33:49'),
                                                                                                                                            ('415208e5937f4b33e4bb2efec669759f5ce093b2ec27c6640d382abb8bfa69d0f7a0dd239bc3cad0', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-13 14:33:37', '2022-07-13 14:33:37', '2023-07-13 14:33:37'),
                                                                                                                                            ('431e1f0a2556032a2b8e9b41293907ff53aacf273bac4a4c3677c6c7aa0cd2f009d11c23ccc5c90c', 2, 2, NULL, '[\"*\"]', 0, '2022-07-23 13:34:39', '2022-07-23 13:34:39', '2023-07-23 13:34:39'),
                                                                                                                                            ('4346e8a8eb869468341336598838622ff4997f5ce0b44dadfe9349f97a8c3bd5346639695d18d7f7', 2, 2, NULL, '[\"*\"]', 0, '2022-07-16 16:07:57', '2022-07-16 16:07:57', '2023-07-16 16:07:57'),
                                                                                                                                            ('45401ab5a3e1106d1bb74fc1fc95fad5c783258f99b8f70262c812188d744e7f0edfa12d50baab43', 2, 2, NULL, '[\"*\"]', 0, '2022-07-24 13:16:38', '2022-07-24 13:16:38', '2023-07-24 13:16:38'),
                                                                                                                                            ('5206fc93dba9250afb3b75cae3c131b983d5cf4ca706e866ef400ed1cbe2611fbef7fe6ed1a56325', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-13 05:49:14', '2022-07-13 05:49:14', '2023-07-13 05:49:14'),
                                                                                                                                            ('527fc0f578689d363fdd3c18283ae1ba51f1fcb15994db6d2b5ded54ff8dace52f8ee22552b0beee', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-12 05:43:54', '2022-07-12 05:43:54', '2023-07-12 05:43:54'),
                                                                                                                                            ('52a8535eadd3133c91a7e113cc67988d583ca2631da9a232905722ea6594ce8473bb0827de695db4', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-13 07:20:00', '2022-07-13 07:20:00', '2023-07-13 07:20:00'),
                                                                                                                                            ('5f7ed39cbe6e1911a2ccf621cccdc6e0dc09cf66b34b93a9626d66e0aa4a509f92f03ba0ec7ff3b4', 2, 2, NULL, '[\"*\"]', 0, '2022-07-17 08:17:53', '2022-07-17 08:17:53', '2023-07-17 08:17:53'),
                                                                                                                                            ('6745ec547ec9bb6fbd6b00a292a35bcfc8bd7bd6c6b8fdbe040b2008cf00f3af1c9168413ee128ec', 2, 2, NULL, '[\"*\"]', 0, '2022-07-18 06:11:52', '2022-07-18 06:11:52', '2023-07-18 06:11:52'),
                                                                                                                                            ('67c29adf249eeccc56d56bf92ba6f1d7bd4b19059dc1876d81121a22eb3ff547993d641743a99dd8', 2, 2, NULL, '[\"*\"]', 0, '2022-07-23 15:58:48', '2022-07-23 15:58:48', '2023-07-23 15:58:48'),
                                                                                                                                            ('6aa53da5aa21406e78cd291cdfc82cdc475ff9d0bf149bc052336f45876e181c5df193d6e5a34926', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-13 05:37:32', '2022-07-13 05:37:32', '2023-07-13 05:37:32'),
                                                                                                                                            ('6b08c60134d17b753af3a077f4332d6f61fa8c628eeaba353d10ed50fd79430eb007dcc928c57817', NULL, 2, NULL, '[]', 0, '2022-07-13 14:05:17', '2022-07-13 14:05:17', '2023-07-13 14:05:17'),
                                                                                                                                            ('6f436451b635f11e6ed22063bab846c80934608cf16fb0e296dba3e1218c6998e96d9a55811f1bb7', 2, 2, NULL, '[\"*\"]', 0, '2022-07-16 05:25:43', '2022-07-16 05:25:43', '2023-07-16 05:25:43'),
                                                                                                                                            ('7c1407d394d4d9ca6b9ced003eda89802c3a399cc60ef209d641056aad11374de917707d82b7535a', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-13 07:18:20', '2022-07-13 07:18:20', '2023-07-13 07:18:20'),
                                                                                                                                            ('82646db472bf68ec0663933c8b30b8b3231ecb777107a9426d25405d5dbbf57bc284b603000c4d47', 2, 2, NULL, '[\"*\"]', 0, '2022-07-18 06:11:56', '2022-07-18 06:11:56', '2023-07-18 06:11:56'),
                                                                                                                                            ('8500b6b59cbc71618cfba41c30556108661508148c14213d053e1dea1cc8f5038f245b068edc8e1f', 2, 2, NULL, '[\"*\"]', 0, '2022-07-15 16:54:17', '2022-07-15 16:54:17', '2023-07-15 16:54:17'),
                                                                                                                                            ('8521eefabf31c66e85889d69b3ebbdf2c26b5dcef275ecb798a4ebb6fd08ead4712e9aa1c1d06a60', 2, 2, NULL, '[\"*\"]', 0, '2022-07-15 16:45:18', '2022-07-15 16:45:18', '2023-07-15 16:45:18'),
                                                                                                                                            ('884bd156ffb2960b88b5b46d2fdea03f0e657a3202913603a246e8f6d181653888ef7c883a95f96b', 2, 2, NULL, '[\"*\"]', 0, '2022-07-15 17:32:45', '2022-07-15 17:32:45', '2023-07-15 17:32:45'),
                                                                                                                                            ('89e7c762652516b1cdc69b316fed6eb44cc0ffad4956406fdb0bd3fdbf6b087093a0f9c85d7874b9', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-13 14:32:21', '2022-07-13 14:32:21', '2023-07-13 14:32:21'),
                                                                                                                                            ('8b2148cff393a18253424241572b70f1901d0f80af06addfb85a0600e8fd0aa5168350f8b31f61ff', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-13 05:39:12', '2022-07-13 05:39:12', '2023-07-13 05:39:12'),
                                                                                                                                            ('a42514b0680323a070ec8e909ddf38f597115157f1de466e000d5d3ab719c3b284a64cfbe6e1a9a8', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-13 07:19:13', '2022-07-13 07:19:13', '2023-07-13 07:19:13'),
                                                                                                                                            ('a78b10f0d13255c00e1c57e9736342bc0c9b6c2111db3a99410b67e34f4e57019971d30cba454caf', 2, 2, NULL, '[\"*\"]', 0, '2022-07-28 14:34:27', '2022-07-28 14:34:27', '2023-07-28 14:34:27'),
                                                                                                                                            ('a9a6fe5785363efbd3f86c3459543f100216a5b94a43c46a8aaaf205c31a5fdbd4d0d63b6a7ef26f', 2, 2, NULL, '[\"*\"]', 0, '2022-07-15 16:43:49', '2022-07-15 16:43:49', '2023-07-15 16:43:49'),
                                                                                                                                            ('b19bfef0a1a1817f6c8c6407ee0d12aa5ba6fd581cda212294adc97cb1479e4e5f8c4b4ec1c85c64', 2, 2, NULL, '[\"*\"]', 0, '2022-07-27 17:35:22', '2022-07-27 17:35:22', '2023-07-27 17:35:22'),
                                                                                                                                            ('b1d3cd9762febf67ffd14225f370851a6bf8657f44ef3889de6ed0e15927d4ffbb25719783f56c48', NULL, 2, NULL, '[]', 0, '2022-07-13 05:31:46', '2022-07-13 05:31:46', '2023-07-13 05:31:46'),
                                                                                                                                            ('b68b09860086fb9c795ba7519e32e7a9acde8b082b9e96a0776a2bb4d1bd33adf25178ea5190d8ef', 2, 2, NULL, '[\"*\"]', 0, '2022-07-15 16:21:07', '2022-07-15 16:21:07', '2023-07-15 16:21:07'),
                                                                                                                                            ('b6993a1c7aaa1948797906ba3fb30933d48db4886be339947afe5a55c60654f764be9d18de707837', 2, 2, NULL, '[\"*\"]', 0, '2022-07-13 14:34:02', '2022-07-13 14:34:02', '2023-07-13 14:34:02'),
                                                                                                                                            ('b80ea186b129d57d6b4d21f6fd7ab99f13c46338b87fc9cae10eb3ddee6d6d50b7ba7c61beb43dda', 2, 2, NULL, '[\"*\"]', 0, '2022-07-18 06:11:51', '2022-07-18 06:11:51', '2023-07-18 06:11:51'),
                                                                                                                                            ('bf0c6a709c86fceec775a41eacdb3b3e23287e6e7db106c1db7c0fdad9efedc76110fbf5e6d4f196', NULL, 2, NULL, '[]', 0, '2022-07-13 07:21:57', '2022-07-13 07:21:57', '2023-07-13 07:21:57'),
                                                                                                                                            ('c37439a54aebef288056cc6ace3c1386f9d5e6bd9594bfa049903b2c6f45cedbf87447930a29d735', 2, 2, NULL, '[\"*\"]', 0, '2022-07-13 14:48:04', '2022-07-13 14:48:04', '2023-07-13 14:48:04'),
                                                                                                                                            ('d3e3f6b8b64ad551ac563eab2e884e39e6b8fc2dd8558a6c7fb1a3d6d6e9e545f12d368aa7f0cd66', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-13 07:18:53', '2022-07-13 07:18:53', '2023-07-13 07:18:53'),
                                                                                                                                            ('da1c1fa3af7e7b261846a1ae21a83a7dcec75ccba9c87d0e68ae28f9fe95ee5a143b126f2867af95', 2, 2, NULL, '[\"*\"]', 0, '2022-08-10 05:33:28', '2022-08-10 05:33:28', '2023-08-10 05:33:28'),
                                                                                                                                            ('dc8a0792e4f674489b914209c96b6c42ea73e9be9385dcde13e713f8b28f61e7ea12d3f4842188f0', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-12 05:40:51', '2022-07-12 05:40:51', '2023-07-12 05:40:51'),
                                                                                                                                            ('dea4cc295612d7d6ee13d6ec3e65f9b87622cbe3af23c81c77f649c5434d9b2a78632a1dbe4e0fa9', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-13 07:18:32', '2022-07-13 07:18:32', '2023-07-13 07:18:32'),
                                                                                                                                            ('e289c007a20bbef70ae1201541dd97c98dff644236b196c919b4bec81232dd43ce794fc823d0aea0', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-12 05:45:44', '2022-07-12 05:45:44', '2023-07-12 05:45:44'),
                                                                                                                                            ('ebcd37579bbb7c852d6e8c2c42ee83ae24400ce76959ca10f36f97da447907470df356cfd5c9e4a0', NULL, 2, NULL, '[]', 0, '2022-07-13 14:05:19', '2022-07-13 14:05:19', '2023-07-13 14:05:19'),
                                                                                                                                            ('edf7beaab9403ec5f3f6b04a207fcdaf237361664aac7d9be69b561fa401a6615271c5be70c2a910', 2, 2, NULL, '[\"*\"]', 0, '2022-07-23 13:36:09', '2022-07-23 13:36:09', '2023-07-23 13:36:09'),
                                                                                                                                            ('ee80864664e0110405fd12c5c56b685b2b574fa4cfcfb87f8eb97a5992009efc89c94271f8d2f768', 2, 2, NULL, '[\"*\"]', 0, '2022-07-15 16:33:05', '2022-07-15 16:33:05', '2023-07-15 16:33:05'),
                                                                                                                                            ('ef51ad739c12c0c4fcf58a9ac0f29a725cfc0b76388ff2476b2d27d14171e8b20c80385fe805dd5d', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-13 14:22:38', '2022-07-13 14:22:38', '2023-07-13 14:22:38'),
                                                                                                                                            ('f0fd4bf9a3fa7bcf89fbc6e8fbbddff7b25dc8a190d4c68030d201ec4cfcd24cc45b436926d54e8d', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-13 06:02:09', '2022-07-13 06:02:09', '2023-07-13 06:02:09'),
                                                                                                                                            ('f21947685a82bbf781c8e49bf8a799562296692682bd0bd9c59a11a4c53d8d5c3f5983ee1d35fc11', 2, 2, NULL, '[\"*\"]', 0, '2022-07-13 14:54:32', '2022-07-13 14:54:32', '2023-07-13 14:54:32'),
                                                                                                                                            ('f4f13d0fb072d68eb0e3c61caf956462fc1a299d4e1fec72d1bbcebcb4c4549564a4133a7e8cc266', NULL, 2, NULL, '[\"*\"]', 0, '2022-07-12 05:42:11', '2022-07-12 05:42:11', '2023-07-12 05:42:11'),
                                                                                                                                            ('f7423bd84129ef2144c8d372a0e4a8c2a0982133d45c355699ba415ea99f000da979380ddb4bd273', 2, 2, NULL, '[\"*\"]', 0, '2022-07-16 10:20:36', '2022-07-16 10:20:36', '2023-07-16 10:20:36'),
                                                                                                                                            ('f9eaecf15f9953ae8ec31c798c082dcb78e8304e24c0dee45be1d076aa8cde36891ecdd1942cba8b', 2, 2, NULL, '[\"*\"]', 0, '2022-07-15 16:33:30', '2022-07-15 16:33:30', '2023-07-15 16:33:30'),
                                                                                                                                            ('fff5713c6c72526db13c175d6a27b51ad59138a6b5f9b305dbedff205f8643950cd8034456d8ece9', 2, 2, NULL, '[\"*\"]', 0, '2022-07-15 16:20:02', '2022-07-15 16:20:02', '2023-07-15 16:20:02');

-- --------------------------------------------------------

--
-- Структура на таблица `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
                                    `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
                                    `user_id` bigint UNSIGNED NOT NULL,
                                    `client_id` bigint UNSIGNED NOT NULL,
                                    `scopes` text COLLATE utf8mb4_unicode_ci,
                                    `revoked` tinyint(1) NOT NULL,
                                    `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура на таблица `oauth_clients`
--

CREATE TABLE `oauth_clients` (
                                 `id` bigint UNSIGNED NOT NULL,
                                 `user_id` bigint UNSIGNED DEFAULT NULL,
                                 `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                                 `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                                 `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                                 `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
                                 `personal_access_client` tinyint(1) NOT NULL,
                                 `password_client` tinyint(1) NOT NULL,
                                 `revoked` tinyint(1) NOT NULL,
                                 `created_at` timestamp NULL DEFAULT NULL,
                                 `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Схема на данните от таблица `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
                                                                                                                                                                                (1, NULL, 'Laravel Personal Access Client', 'utDL7u6QukeVNiAUd4kgOreK1QsDFbjpOSle9zum', NULL, 'http://localhost', 1, 0, 0, '2022-07-11 06:31:27', '2022-07-11 06:31:27'),
                                                                                                                                                                                (2, NULL, 'Laravel Password Grant Client', 'eZYTB9xw5wOXs29KlWubDpJaLgrd8tAw1AKM1Us8', 'users', 'http://localhost', 0, 1, 0, '2022-07-11 06:31:27', '2022-07-11 06:31:27');

-- --------------------------------------------------------

--
-- Структура на таблица `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
                                                 `id` bigint UNSIGNED NOT NULL,
                                                 `client_id` bigint UNSIGNED NOT NULL,
                                                 `created_at` timestamp NULL DEFAULT NULL,
                                                 `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Схема на данните от таблица `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
    (1, 1, '2022-07-11 06:31:27', '2022-07-11 06:31:27');

-- --------------------------------------------------------

--
-- Структура на таблица `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
                                        `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
                                        `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
                                        `revoked` tinyint(1) NOT NULL,
                                        `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Схема на данните от таблица `oauth_refresh_tokens`
--

INSERT INTO `oauth_refresh_tokens` (`id`, `access_token_id`, `revoked`, `expires_at`) VALUES
                                                                                          ('0add14072b93e3a2d7141c7370857029861571946b3450801fb99408ef1dbfb683e64ff6bcf14fbd', '080ecd6f2f863acb3ffb74650f5a3d218983ca43610c90866579e1601f3404564d7c69ea85a0c7c3', 0, '2023-07-27 17:20:54'),
                                                                                          ('0c4cc5335335c8878324e53542855673f7989c379f788ecc08d45ce6515de61afd63f67b5cb201b4', '8521eefabf31c66e85889d69b3ebbdf2c26b5dcef275ecb798a4ebb6fd08ead4712e9aa1c1d06a60', 0, '2023-07-15 16:45:18'),
                                                                                          ('0f23e2e9e2b98382a61b524812a1e92b10a484d5bb68ae956f8c9fa18a142cbc375d37158277db3a', 'f7423bd84129ef2144c8d372a0e4a8c2a0982133d45c355699ba415ea99f000da979380ddb4bd273', 0, '2023-07-16 10:20:37'),
                                                                                          ('2292dd522ca8c2da8a750fd3161f83b19c471ad99208826149324f72c528bf1283695c0eca7e76a1', 'b6993a1c7aaa1948797906ba3fb30933d48db4886be339947afe5a55c60654f764be9d18de707837', 0, '2023-07-13 14:34:02'),
                                                                                          ('2e4903706ff460b88c74c8f414e77b9b22c3f086c031463db8e2b93bfe21a2a453e0d15881859072', 'edf7beaab9403ec5f3f6b04a207fcdaf237361664aac7d9be69b561fa401a6615271c5be70c2a910', 0, '2023-07-23 13:36:09'),
                                                                                          ('35c37a69e4457ed8fea6112029d9dabfe71ae6dfce534468c7036477c7f7eb8c5eb99a78bf0041f2', '4346e8a8eb869468341336598838622ff4997f5ce0b44dadfe9349f97a8c3bd5346639695d18d7f7', 0, '2023-07-16 16:07:57'),
                                                                                          ('38b981d3e2d1076e200931f4529333004584b5b22af3278e86b14d47b8fd40b577214ead4aa1df24', 'b68b09860086fb9c795ba7519e32e7a9acde8b082b9e96a0776a2bb4d1bd33adf25178ea5190d8ef', 0, '2023-07-15 16:21:07'),
                                                                                          ('44bffbdd415fd1e051cae3bcdb0b6c795480822fe8fb4a2e379c84a11c924ae65c26346b0f776780', 'a78b10f0d13255c00e1c57e9736342bc0c9b6c2111db3a99410b67e34f4e57019971d30cba454caf', 0, '2023-07-28 14:34:27'),
                                                                                          ('4a6fb694d615a3d15ee2c7ec2c39a949a3023516e0ce702a2e6d4c7cd552f82cbf543d5cbfc87eed', '1d75c898c85277051af53fad4b49b4394f99585e837e05017d47d050c68fe20ddc908949e4103615', 0, '2023-08-11 05:02:11'),
                                                                                          ('4b6bdd856974f074343b3d76c7dd87a156c68851686443e9b4d4929b63271394f25877651b60932c', 'c37439a54aebef288056cc6ace3c1386f9d5e6bd9594bfa049903b2c6f45cedbf87447930a29d735', 0, '2023-07-13 14:48:04'),
                                                                                          ('4f61c7ea71130f8500d4b19b755ff22d2fa86dd0faa3bd62117616e7e2cd9e3f286cfeb85b4a6e76', '0b9c8713ad0476803739f2af0f2d969a9baec5718f4623ff98652cdbf5d5b44773d102d2ecc2b179', 0, '2023-08-03 05:13:54'),
                                                                                          ('5c524b733301b603744517f682b6dc5177f0aa28e57c96fac386c9eb5b1e22f2c12bb8e1bcc693b1', '8500b6b59cbc71618cfba41c30556108661508148c14213d053e1dea1cc8f5038f245b068edc8e1f', 0, '2023-07-15 16:54:17'),
                                                                                          ('5cd760c9e95ddb04d92e5c0c063bbb69910b6a44487511bda0c3837bb5f68649a7974387405bbe7a', '6745ec547ec9bb6fbd6b00a292a35bcfc8bd7bd6c6b8fdbe040b2008cf00f3af1c9168413ee128ec', 0, '2023-07-18 06:11:52'),
                                                                                          ('5ce8069550345194b9835037b6bddc762d750df9d010318a3972ee676f157933ac66826bfb41872c', '884bd156ffb2960b88b5b46d2fdea03f0e657a3202913603a246e8f6d181653888ef7c883a95f96b', 0, '2023-07-15 17:32:45'),
                                                                                          ('5cf089fc9e567565e52759c717a92e89627932b1b5548e67e5b2d426e146f3cae3ea1520c00c1b7c', '3e70ca717fbcedc37c380e8feabd7062a7f1bd40e462e9e3d7156f8655ae20fd2356e352911548c2', 0, '2023-07-18 06:12:05'),
                                                                                          ('5dd78bc092e95307ad54582058f6515d67899627e11caa1538faa057187b306d5f1224cfb23fbcad', '1bda6f7626f53fbaf22063f4ef2beb0026780720823fa4b1ce1f70b5503ee0c4fed41452f55c3043', 0, '2023-07-13 14:53:42'),
                                                                                          ('64e22a48024d07bc5e2c45e145d1d2b6f80d45c30dc0fac3c2b21e710b1004197f684e1c030cb13c', 'da1c1fa3af7e7b261846a1ae21a83a7dcec75ccba9c87d0e68ae28f9fe95ee5a143b126f2867af95', 0, '2023-08-10 05:33:28'),
                                                                                          ('68736cb0a535ed5e8005bfcfa248513520a09954bebada2a0097bbd86baad50e669892ed844993fe', '67c29adf249eeccc56d56bf92ba6f1d7bd4b19059dc1876d81121a22eb3ff547993d641743a99dd8', 0, '2023-07-23 15:58:48'),
                                                                                          ('68e21041f195a891db020e39778aac9b28f74d59bed2ea8ffc79f928cceeda4a6e7770a8d1484f08', '6f436451b635f11e6ed22063bab846c80934608cf16fb0e296dba3e1218c6998e96d9a55811f1bb7', 0, '2023-07-16 05:25:43'),
                                                                                          ('6982f57cf2691da46b784293ef3c6cd77aa3ed62000ff17e9a9083511e5713eadfe2dacf54723ead', 'ee80864664e0110405fd12c5c56b685b2b574fa4cfcfb87f8eb97a5992009efc89c94271f8d2f768', 0, '2023-07-15 16:33:05'),
                                                                                          ('6aa407d2b982f34d8899f3186451d668ad5aa01f6f824c352d4694f2d528d9e33cf5207893b2a247', '3f936734796033570ac275a0a5ac5a883e667cc684dea3a21f26b73a5f7c7cb0ce7d6cd3be46cfcd', 0, '2023-07-23 13:33:49'),
                                                                                          ('70f9906970472e7039b21b03bf9c08a5ba53752d2ff1926816d24c665fd56f74dc5d68ed8b2a63cb', 'fff5713c6c72526db13c175d6a27b51ad59138a6b5f9b305dbedff205f8643950cd8034456d8ece9', 0, '2023-07-15 16:20:02'),
                                                                                          ('791c3ed212495111b9bae8a2a629b71b6fb556eb160cd71de0dd4ea65b7f95cb5e364ef0c9c6ab6d', '2e7f5054c3528a6d76202a88d79b671193e19af6f6d2cbe975274012645c0d74d3f29d833f0bfe38', 0, '2023-07-27 20:38:43'),
                                                                                          ('9f1a6d282a882b9a51200e23c9d037db6746f310258d5dc7f89dbef1d7aae0c2a7d42737221862b7', '3bdc9767b0f3732d1ca8350a5bb4a501357b0d7044c06fa901fb6fd4525b59cfca1899571684c48a', 0, '2023-07-27 20:33:21'),
                                                                                          ('9fc030fd984925a4d4202ee8830eb456655b9a52d17c52962ccc8caa8ac592a7774bd55f686cc071', '20d49522c989f77d88e0165ebeafb86f9abfdbccf6b0612864657c02b181afb8357abbbdd90527fe', 0, '2023-07-27 05:02:35'),
                                                                                          ('a0da19569ddcddb36e3d91f193d109b318d5efe8c10012c065b89084cee74115318cdb6015498931', 'f9eaecf15f9953ae8ec31c798c082dcb78e8304e24c0dee45be1d076aa8cde36891ecdd1942cba8b', 0, '2023-07-15 16:33:30'),
                                                                                          ('a286f21d60db05c0cdbcc2d7b6ff75182d26c13edc38e2741015d46ef91f374ca6d21f68ddd5e2f3', '5f7ed39cbe6e1911a2ccf621cccdc6e0dc09cf66b34b93a9626d66e0aa4a509f92f03ba0ec7ff3b4', 0, '2023-07-17 08:17:53'),
                                                                                          ('b13fa879368320b0f7a247668a1a438b66719b470f6e5fa64cc8f4736d2b6fe373860ffbbfe672b4', '431e1f0a2556032a2b8e9b41293907ff53aacf273bac4a4c3677c6c7aa0cd2f009d11c23ccc5c90c', 0, '2023-07-23 13:34:41'),
                                                                                          ('b6627c8b5fa587f0250fdfa3f3d942a1e74a08b7a8a99ce63aa0c7c3a2cf4b1a067d28c1da5e5162', '82646db472bf68ec0663933c8b30b8b3231ecb777107a9426d25405d5dbbf57bc284b603000c4d47', 0, '2023-07-18 06:11:56'),
                                                                                          ('c43d40b901bcdfd0aa96ab7a57e5561562d4b75002776f9264bfde59b39f3b344ca1970e6f9a92a6', 'a9a6fe5785363efbd3f86c3459543f100216a5b94a43c46a8aaaf205c31a5fdbd4d0d63b6a7ef26f', 0, '2023-07-15 16:43:49'),
                                                                                          ('ca2c8aa766c658ddc9439bc447d515d7e4ba8c4eb42c282293dcabd676624a389eac241fb0a603e0', '1e7cee8ddc8b9dced93fe55b69f1263cd9cd233d8f5836069d1e9849657e9a53634af4ee822a8044', 0, '2023-07-22 07:08:16'),
                                                                                          ('cd140640e94e442f5544c42deccdba6ac8d2b9f8cc78c3f291f73f5fd8a7319f3175471a4cfe72e9', '45401ab5a3e1106d1bb74fc1fc95fad5c783258f99b8f70262c812188d744e7f0edfa12d50baab43', 0, '2023-07-24 13:16:39'),
                                                                                          ('ceff66d0a8627888b9c0c5fa2470515f79336cbf6751acb959b44b27e1fc4e2b8d563e4b264dc37c', 'b80ea186b129d57d6b4d21f6fd7ab99f13c46338b87fc9cae10eb3ddee6d6d50b7ba7c61beb43dda', 0, '2023-07-18 06:11:51'),
                                                                                          ('d5458d88df9f92e1943503d56d776ba02b9fadbea9e0a835a21e19a5fb3218f8caa0633ec9fb91b4', 'b19bfef0a1a1817f6c8c6407ee0d12aa5ba6fd581cda212294adc97cb1479e4e5f8c4b4ec1c85c64', 0, '2023-07-27 17:35:22'),
                                                                                          ('f732ddb51f99e48c1eb231d21f3abb530895df14876d0dbda7b8559b781589b3318dd2ce0628b60d', 'f21947685a82bbf781c8e49bf8a799562296692682bd0bd9c59a11a4c53d8d5c3f5983ee1d35fc11', 0, '2023-07-13 14:54:32');

-- --------------------------------------------------------

--
-- Структура на таблица `password_resets`
--

CREATE TABLE `password_resets` (
                                   `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                                   `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                                   `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура на таблица `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
                                          `id` bigint UNSIGNED NOT NULL,
                                          `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                                          `tokenable_id` bigint UNSIGNED NOT NULL,
                                          `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                                          `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
                                          `abilities` text COLLATE utf8mb4_unicode_ci,
                                          `last_used_at` timestamp NULL DEFAULT NULL,
                                          `created_at` timestamp NULL DEFAULT NULL,
                                          `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура на таблица `positions`
--

CREATE TABLE `positions` (
                             `id` bigint UNSIGNED NOT NULL,
                             `position` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                             `job_description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                             `created_at` timestamp NULL DEFAULT NULL,
                             `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Схема на данните от таблица `positions`
--

INSERT INTO `positions` (`id`, `position`, `job_description`, `created_at`, `updated_at`) VALUES
                                                                                              (1, 'Мотокарист', '\'\'', '2022-07-16 15:29:49', '2022-07-16 15:29:50'),
                                                                                              (2, 'Продавач консултант', '\'\'', '2022-07-16 15:30:03', '2022-07-16 15:30:05'),
                                                                                              (3, 'Маркетинг мениджър', '\'\'', '2022-07-16 15:31:11', '2022-07-16 15:31:12'),
                                                                                              (4, 'Складов работник', '\'\'', '2022-07-16 15:31:14', '2022-07-16 15:31:15'),
                                                                                              (5, 'Счетоводител', '\'\'', '2022-07-16 15:31:26', '2022-07-16 15:31:24');

-- --------------------------------------------------------

--
-- Структура на таблица `salaries`
--

CREATE TABLE `salaries` (
                            `id` bigint UNSIGNED NOT NULL,
                            `employee_id` int NOT NULL,
                            `gross_salary` int NOT NULL,
                            `created_at` timestamp NULL DEFAULT NULL,
                            `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Схема на данните от таблица `salaries`
--

INSERT INTO `salaries` (`id`, `employee_id`, `gross_salary`, `created_at`, `updated_at`) VALUES
                                                                                             (1, 1, 5000, '2022-07-19 23:53:37', '2022-07-19 23:53:40'),
                                                                                             (2, 2, 1400, '2022-07-19 23:53:37', '2022-07-19 23:53:40'),
                                                                                             (3, 3, 2500, '2022-07-19 23:53:37', '2022-07-19 23:53:40'),
                                                                                             (4, 6, 3540, '2022-07-19 23:53:37', '2022-07-19 23:53:40'),
                                                                                             (5, 7, 2500, '2022-07-19 23:53:37', '2022-07-19 23:53:40'),
                                                                                             (6, 8, 3570, '2022-07-19 23:53:37', '2022-07-19 23:53:40'),
                                                                                             (7, 9, 1800, '2022-07-19 23:53:37', '2022-07-19 23:53:40');

-- --------------------------------------------------------

--
-- Структура на таблица `sick_leave`
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
-- Схема на данните от таблица `sick_leave`
--

INSERT INTO `sick_leave` (`id`, `employee_id`, `start_date`, `end_date`, `days`, `created_at`, `updated_at`, `cost`) VALUES
                                                                                                                         (1, 1, '2021-07-21', '2021-07-29', 7, '2022-07-21 08:04:00', '2022-07-21 08:04:01', NULL),
                                                                                                                         (8, 3, '2021-07-21', '2021-07-22', 2, '2022-07-21 08:04:00', '2022-07-21 08:04:01', 180),
                                                                                                                         (9, 2, '2021-07-21', '2021-07-29', 7, '2022-07-21 08:04:00', '2022-07-21 08:04:01', NULL),
                                                                                                                         (10, 1, '2021-08-04', '2021-08-11', 3, '2022-07-21 08:04:00', '2022-07-21 08:04:01', 210),
                                                                                                                         (15, 2, '2021-07-21', '2021-07-29', 7, '2022-07-21 08:04:00', '2022-07-21 08:04:01', NULL),
                                                                                                                         (16, 2, '2021-07-21', '2021-07-29', 3, '2022-07-21 08:04:00', '2022-07-21 08:04:01', 50),
                                                                                                                         (17, 2, '2021-07-21', '2021-07-29', 7, '2022-07-21 08:04:00', '2022-07-21 08:04:01', NULL),
                                                                                                                         (18, 2, '2021-07-21', '2021-07-29', 2, '2022-07-21 08:04:00', '2022-07-21 08:04:01', 30),
                                                                                                                         (19, 2, '2021-07-21', '2021-07-29', 7, '2022-07-21 08:04:00', '2022-07-21 08:04:01', NULL),
                                                                                                                         (20, 2, '2021-07-21', '2021-07-29', 7, '2022-07-21 08:04:00', '2022-07-21 08:04:01', NULL),
                                                                                                                         (21, 1, '2021-08-04', '2021-08-11', 3, '2022-07-21 08:04:00', '2022-07-21 08:04:01', 210),
                                                                                                                         (22, 1, '2021-08-04', '2021-08-11', 5, '2022-07-21 08:04:00', '2022-07-21 08:04:01', 0),
                                                                                                                         (23, 7, '2022-10-26', '2022-10-30', 111, NULL, NULL, 0),
                                                                                                                         (25, 8, '2022-07-21', '2022-07-26', 12, NULL, NULL, 20),
                                                                                                                         (27, 9, '2022-07-20', '2022-07-27', 12, NULL, NULL, 1),
                                                                                                                         (28, 2, '2022-07-20', '2022-07-28', 13, NULL, NULL, 12),
                                                                                                                         (29, 3, '2022-07-15', '2022-07-22', 12, NULL, NULL, 12),
                                                                                                                         (33, 2, '2022-07-13', '2022-07-20', 8, NULL, NULL, 11),
                                                                                                                         (36, 2, '2022-07-14', '2022-07-21', 2, NULL, NULL, 2),
                                                                                                                         (39, 7, '2022-07-20', '2022-07-27', 12, NULL, NULL, 2),
                                                                                                                         (40, 2, '2022-07-31', '2022-11-26', 123, NULL, NULL, 2),
                                                                                                                         (41, 2, '2022-08-10', '2022-08-18', 12, NULL, NULL, NULL),
                                                                                                                         (42, 3, '2022-08-03', '2022-08-18', 12, NULL, NULL, 12),
                                                                                                                         (43, 2, '2022-08-25', '2022-08-30', 15, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура на таблица `users`
--

CREATE TABLE `users` (
                         `id` bigint UNSIGNED NOT NULL,
                         `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                         `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                         `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                         `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                         `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `created_at` timestamp NULL DEFAULT NULL,
                         `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Схема на данните от таблица `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
                                                                                                                             (2, 'Иван', 'Иванов', 'georgi@gerogi.com', '$2y$10$Ua6r9P.wIxS2tobfpHzC6uEJv0fOr53S6T25E7ypPLwArr9jGyKie', NULL, '2022-07-13 14:31:42', '2022-07-13 14:31:42'),
                                                                                                                             (3, 'Петър', 'Петров', 'testmail@gmail.com', '$2y$10$T3TZ.kDrZUCaQyaTfcvx4evHEOncC30GFReNUrMFvkgNha4uA67Zy', NULL, '2022-07-13 14:58:16', '2022-07-13 14:58:16'),
                                                                                                                             (4, 'Гайдар', 'Гайдаров', 'dsadas@gmail.com', '$2y$10$ZBvR4BI.c7HjQsbX9al7MOlj4nEK4h89o3JovCpeEI/nXfBjRiI9a', NULL, '2022-07-13 15:11:10', '2022-07-13 15:11:10'),
                                                                                                                             (5, 'Стоян', 'Иванов', 'stoqkolev@abv.bg', '$2y$10$J0d0EmmD7TcCJuriI/B2TOWz2bB0J4vQwnO0/nMRj2UwkPLIC7uxW', NULL, '2022-07-18 06:19:50', '2022-07-18 06:19:50'),
                                                                                                                             (6, 'Петко', 'Караджов', 'petkokolewv@abv.bg', '$2y$10$3qRETMguXpqOjmiuMASiNOo0tYlJStd.BL960QS135KuHxCxKYS5W', NULL, '2022-07-18 06:20:40', '2022-07-18 06:20:40'),
                                                                                                                             (7, 'Мата', 'Хари', 'matahariv@abv.bg', '$2y$10$yz7/vQH1zat7SigkS6fM9eHQoDUVTt6/.3N7lG6Rauw6/1TGGY9uu', NULL, '2022-07-18 06:20:59', '2022-07-18 06:20:59'),
                                                                                                                             (8, 'Коко', 'Джамбо', 'kokodjamboiv@abv.bg', '$2y$10$NMNjGlOo9k4vE4n2Ho7/4.m/qfJQOL39S5hDjmEXvYs11PccgPiX.', NULL, '2022-07-18 06:21:21', '2022-07-18 06:21:21');

--
-- Indexes for dumped tables
--

--
-- Индекси за таблица `departments`
--
ALTER TABLE `departments`
    ADD PRIMARY KEY (`id`);

--
-- Индекси за таблица `employees`
--
ALTER TABLE `employees`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employees_user_id_unique` (`user_id`),
  ADD UNIQUE KEY `employees_email_unique` (`email`),
  ADD UNIQUE KEY `employees_pin_unique` (`pin`),
  ADD UNIQUE KEY `employees_personal_phone_unique` (`personal_phone`);

--
-- Индекси за таблица `locations`
--
ALTER TABLE `locations`
    ADD PRIMARY KEY (`id`);

--
-- Индекси за таблица `migrations`
--
ALTER TABLE `migrations`
    ADD PRIMARY KEY (`id`);

--
-- Индекси за таблица `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
    ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Индекси за таблица `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
    ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Индекси за таблица `oauth_clients`
--
ALTER TABLE `oauth_clients`
    ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Индекси за таблица `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
    ADD PRIMARY KEY (`id`);

--
-- Индекси за таблица `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
    ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Индекси за таблица `password_resets`
--
ALTER TABLE `password_resets`
    ADD KEY `password_resets_email_index` (`email`);

--
-- Индекси за таблица `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Индекси за таблица `positions`
--
ALTER TABLE `positions`
    ADD PRIMARY KEY (`id`);

--
-- Индекси за таблица `salaries`
--
ALTER TABLE `salaries`
    ADD PRIMARY KEY (`id`);

--
-- Индекси за таблица `sick_leave`
--
ALTER TABLE `sick_leave`
    ADD PRIMARY KEY (`id`);

--
-- Индекси за таблица `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
    MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `positions`
--
ALTER TABLE `positions`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `salaries`
--
ALTER TABLE `salaries`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `sick_leave`
--
ALTER TABLE `sick_leave`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
