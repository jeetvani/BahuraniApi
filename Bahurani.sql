-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-108496-db.mysql-108496:10268
-- Generation Time: Feb 07, 2023 at 04:48 PM
-- Server version: 8.0.26
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Bahurani`
--

-- --------------------------------------------------------

--
-- Table structure for table `Banners`
--

CREATE TABLE `Banners` (
  `BannerId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Banners`
--

INSERT INTO `Banners` (`BannerId`, `img`) VALUES
('1', 'https://firebasestorage.googleapis.com/v0/b/androidheythere.appspot.com/o/WhatsApp%20Image%202023-01-25%20at%205.43.17%20PM%20(2).jpeg?alt=media&token=81904a12-b635-426e-ad79-51b913c5e7e6'),
('2\r\n', 'https://firebasestorage.googleapis.com/v0/b/androidheythere.appspot.com/o/WhatsApp%20Image%202023-01-25%20at%205.43.16%20PM.jpeg?alt=media&token=cfe3eb6b-0fbb-44cc-b23f-6e5b7808be3f'),
('3\r\n', 'https://firebasestorage.googleapis.com/v0/b/androidheythere.appspot.com/o/WhatsApp%20Image%202023-01-25%20at%205.43.17%20PM%20(2).jpeg?alt=media&token=81904a12-b635-426e-ad79-51b913c5e7e6'),
('4', 'https://firebasestorage.googleapis.com/v0/b/androidheythere.appspot.com/o/WhatsApp%20Image%202023-01-25%20at%205.43.16%20PM.jpeg?alt=media&token=cfe3eb6b-0fbb-44cc-b23f-6e5b7808be3f');

-- --------------------------------------------------------

--
-- Table structure for table `Cart`
--

CREATE TABLE `Cart` (
  `User_Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Cart_Data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Cart`
--

INSERT INTO `Cart` (`User_Id`, `Cart_Data`) VALUES
('BahuraniUser11uft051aldtqis6l', '[{\"Quantity\": \"1\", \"ProductId\": \"BahuraniProductrup2u1i37ldfzjjqo\", \"Product_Name\": \"Bahurani Bajra Atta\", \"Product_Image\": \"https://firebasestorage.googleapis.com/v0/b/steerfreedemo.appspot.com/o/bajra.jpeg?alt=media&token=aa9258b8-28bd-4731-8fde-107ea5ab0fcc\", \"Product_Variants\": \"[{\\\"id\\\":\\\"ProductVan1\\\",\\\"name\\\":\\\"800 gm\\\",\\\"ourPrice\\\":\\\"400\\\",\\\"mrp\\\":\\\"700\\\"}]\", \"Product_Description\": \"Premium black Tea with goodness of 30+ Ayurvedic Herbs Great Taste and Aroma with 3 way benefits: Re-Energizes, Relieves Stress, Boosts Immunity Benefits of real herbs that you can see in the product, no flavors From Dabur with 130+ years of Ayurveda Expertise\"}]'),
('BahuraniUser327tqj1aldu9jogy', '[{\"Quantity\": 2.0, \"ProductId\": \"BahuraniProductrup2u1i37ldg0nqxe\", \"Product_Name\": \"Masala Tea\", \"Product_Image\": \"https://firebasestorage.googleapis.com/v0/b/steerfreedemo.appspot.com/o/Masala%20Tea%20400%20GM.png?alt=media&token=fcefe8de-71c7-45ae-93c6-dd5d139d072b\", \"Product_Variants\": \"[{\\\"id\\\":\\\"ProductVaniant1\\\",\\\"name\\\":\\\"400 gm\\\",\\\"ourPrice\\\":\\\"400\\\",\\\"mrp\\\":\\\"700\\\"}]\", \"Product_Description\": \"Premium black Tea with goodness of 30+ Ayurvedic Herbs Great Taste and Aroma with 3 way benefits: Re-Energizes, Relieves Stress, Boosts Immunity Benefits of real herbs that you can see in the product, no flavors From Dabur with 130+ years of Ayurveda Expertise\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `CategoryName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CategoryId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CategoryImage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`CategoryName`, `CategoryId`, `CategoryImage`) VALUES
('Tea', 'BahuraniCategoryrup2u1n98ld4qggmb', 'https://firebasestorage.googleapis.com/v0/b/bahurani-c34b0.appspot.com/o/Subcategories%2F%20%2B%20acc%3D11%3Bdoc%3Dencoded%3DKHieISN5AG40tACoh9N--N_kFEbW7Io6paM4gnpXcNc_bmO6soB2PogKUaykWSstsLo%3D?alt=media&token=778935d3-d52d-4965-b889-5001eedf839f'),
('Cleaning & Household ', 'BahuraniCategoryrup2u1n98ld4qlhwo', 'https://firebasestorage.googleapis.com/v0/b/bahurani-c34b0.appspot.com/o/Subcategories%2F%20%2B%20acc%3D11%3Bdoc%3Dencoded%3DJ9G8kOMjqyjS5ptg0C4jJT02mpjArHpCZoJZru6AHjxEGn85v61lyau3R0XlmB_x7iE%3D?alt=media&token=b4ae1805-eb20-4d24-8be9-9916936d484b'),
('Oil', 'BahuraniCategoryrup2u1qahld4qsxph', 'https://firebasestorage.googleapis.com/v0/b/bahurani-c34b0.appspot.com/o/Subcategories%2F%20%2B%20acc%3D11%3Bdoc%3Dencoded%3Dq6uPJM3cfr5XtllYZs61wq00x7dLD6thSJtPbVoglwQF98PlWAwLgTMu3ckxarL17GQ%3D?alt=media&token=cdd98bf9-55c6-4990-9c5c-dcc9745c1ae4'),
('Sugar', 'BahuraniCategoryrup2u1tyuld4qwdii', 'https://firebasestorage.googleapis.com/v0/b/bahurani-c34b0.appspot.com/o/Subcategories%2F%20%2B%20acc%3D11%3Bdoc%3Dencoded%3DEHCsbl8KttvhaQnTbRnY5d0S2LBSuCBBVN9jnDPg-FNOMwqeYHS4ABzVfK5o4EyLFQ%3D%3D?alt=media&token=2986c0d9-c126-4018-8a68-0bed54217a8f'),
('Breakfast', 'BahuraniCategoryrup2u1tyuld4qww5p', 'https://firebasestorage.googleapis.com/v0/b/bahurani-c34b0.appspot.com/o/Subcategories%2F%20%2B%20acc%3D11%3Bdoc%3Dencoded%3DtDdxCy_dq1zyh7OglOTZZ6j9TI6qJv4wfaKdbXmFVsxsD28YmsGV80o0zth3VfwZiQ%3D%3D?alt=media&token=0de99b96-4d88-4a35-ae93-dcfc1fa15bae'),
('Atta & Flours', 'BahuraniCategoryrup2u1tyuld4qxmrd', 'https://firebasestorage.googleapis.com/v0/b/bahurani-c34b0.appspot.com/o/Subcategories%2F%20%2B%20acc%3D11%3Bdoc%3Dencoded%3DRuNTV3oVN6opONowtLpciWM-sXaynudwT2vlf7sA3v0h4ummUg7lbPZlXZ6ij6EU3g%3D%3D?alt=media&token=b0842fd2-24f4-4d43-af71-080bba18e872'),
('Ayurvedic Soaps', 'BahuraniCategoryrup2u1tyuld4qy4ni', 'https://firebasestorage.googleapis.com/v0/b/bahurani-c34b0.appspot.com/o/Subcategories%2F%20%2B%201235421?alt=media&token=4e642222-0a41-44ff-89cc-2df9410894a7');

-- --------------------------------------------------------

--
-- Table structure for table `Coupons`
--

CREATE TABLE `Coupons` (
  `User_Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CouponId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Value` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Used_By` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `Status` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Coupons`
--

INSERT INTO `Coupons` (`User_Id`, `CouponId`, `Value`, `Description`, `Used_By`, `Status`) VALUES
('BahuraniUser1flf4e1aldqswg8d', 'abc123', '100', 'Get rs 100 OFF', '[]', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Notification_Tokens`
--

CREATE TABLE `Notification_Tokens` (
  `Token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `User_Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `OfferBanner`
--

CREATE TABLE `OfferBanner` (
  `BannerId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `BannerImage` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `Order_Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Order_Data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `Address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `User_Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Payment_Method` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Payment_Status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Pending',
  `Amount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`Order_Id`, `Order_Data`, `Address`, `User_Id`, `Status`, `Payment_Method`, `Payment_Status`, `Amount`) VALUES
('order_LDQJyGJsc5Lgn8', '[{\"ProductData\": \"[[object Object]]\"}]', 'HIE HIE HIE', 'BahuraniUser11uft051aldtqis6l', 'Not Confirmed', 'UPI', 'Pending', '300'),
('order_LDWxHUop060QV4', '[{\"ProductData\": \"[[object Object]]\"}]', '[{\"User_Id\":\"BahuraniUser11uft051aldtqis6l\",\"Address_Id\":\"BahuraniAddress11uft051aldtqit6m\",\"Address\":\"dabgbdagb | adbgbgad | dgabdgb | dbgab | badgbg\",\"PinCode\":\"457787\",\"Name\":\"afbsgadbg\",\"PhoneNumber\":\"9926579383\"}]', 'BahuraniUser11uft051aldtqis6l', 'Not Confirmed', 'Online Payment', 'Pending', '300'),
('order_LDX105QKzYNXY6', '[{\"ProductData\": \"[[object Object]]\"}]', '[{\"User_Id\":\"BahuraniUser11uft051aldtqis6l\",\"Address_Id\":\"BahuraniAddress11uft051aldtqit6m\",\"Address\":\"dabgbdagb | adbgbgad | dgabdgb | dbgab | badgbg\",\"PinCode\":\"457787\",\"Name\":\"afbsgadbg\",\"PhoneNumber\":\"9926579383\"}]', 'BahuraniUser11uft051aldtqis6l', 'In Process', 'Cash On Delivery', 'Pending', '300'),
('order_LDZEOsVLlyPr8Q', '[{\"ProductData\": \"[[object Object]]\"}, {\"ProductData\": \"[[object Object]]\"}]', '[{\"User_Id\":\"BahuraniUser327tqj1aldu9jogy\",\"Address_Id\":\"BahuraniAddress327tqj1aldu9jpfp\",\"Address\":\"Hxbdbdbbd | Zhdbdbbd | Bdjdbsbjd | Vshdbsbsh | Shdhhd\",\"PinCode\":\"545455\",\"Name\":\"Harshita Patidar \",\"PhoneNumber\":\"9993317337\"}]', 'BahuraniUser327tqj1aldu9jogy', 'Not Confirmed', 'Online Payment', 'Pending', '1500');

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `ProductId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ProductName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `CategoryId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ProductDescription` varchar(2555) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Variants` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `ProductImages` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`ProductId`, `ProductName`, `Category`, `CategoryId`, `ProductDescription`, `Variants`, `ProductImages`) VALUES
('BahuraniProductrup2u1i37ldfzjjqo', 'Bahurani Bajra Atta', 'Atta & Flours', 'BahuraniCategoryrup2u1tyuld4qxmrd', 'Premium black Tea with goodness of 30+ Ayurvedic Herbs Great Taste and Aroma with 3 way benefits: Re-Energizes, Relieves Stress, Boosts Immunity Benefits of real herbs that you can see in the product, no flavors From Dabur with 130+ years of Ayurveda Expertise', '[{\"id\":\"ProductVan1\",\"name\":\"800 gm\",\"ourPrice\":\"400\",\"mrp\":\"700\"}]', '[\"https://firebasestorage.googleapis.com/v0/b/steerfreedemo.appspot.com/o/bajra.jpeg?alt=media&token=aa9258b8-28bd-4731-8fde-107ea5ab0fcc\",\"https://firebasestorage.googleapis.com/v0/b/steerfreedemo.appspot.com/o/bajra.jpeg?alt=media&token=aa9258b8-28bd-4731-8fde-107ea5ab0fcc\"]'),
('BahuraniProductrup2u1i37ldfzp1nn', 'Bahurani Besan', 'Atta & Flours', 'BahuraniCategoryrup2u1tyuld4qxmrd', 'Premium black Tea with goodness of 30+ Ayurvedic Herbs Great Taste and Aroma with 3 way benefits: Re-Energizes, Relieves Stress, Boosts Immunity Benefits of real herbs that you can see in the product, no flavors From Dabur with 130+ years of Ayurveda Expertise', '[{\"id\":\"ProductVaniant1\",\"name\":\"500 gm\",\"ourPrice\":\"40\",\"mrp\":\"60\"}]', '[\"https://firebasestorage.googleapis.com/v0/b/steerfreedemo.appspot.com/o/Besan%20500GM.png?alt=media&token=1990fa8b-c96e-464e-a065-330b0aa01eae\"]'),
('BahuraniProductrup2u1i37ldfzqd33', 'Chakki Fresh Aata', 'Atta & Flours', 'BahuraniCategoryrup2u1tyuld4qxmrd', 'Premium black Tea with goodness of 30+ Ayurvedic Herbs Great Taste and Aroma with 3 way benefits: Re-Energizes, Relieves Stress, Boosts Immunity Benefits of real herbs that you can see in the product, no flavors From Dabur with 130+ years of Ayurveda Expertise', '[{\"id\":\"ProductVaniant1\",\"name\":\"5 kg\",\"ourPrice\":\"250\",\"mrp\":\"200\"}]', '[\"https://firebasestorage.googleapis.com/v0/b/steerfreedemo.appspot.com/o/Chakki%20Fresh%20Atta%205%20KG.png?alt=media&token=fd83c515-683b-4333-9b89-b340cc036da3\"]'),
('BahuraniProductrup2u1i37ldfzsslu', 'Bahurani Maida', 'Atta & Flours', 'BahuraniCategoryrup2u1tyuld4qxmrd', 'Premium black Tea with goodness of 30+ Ayurvedic Herbs Great Taste and Aroma with 3 way benefits: Re-Energizes, Relieves Stress, Boosts Immunity Benefits of real herbs that you can see in the product, no flavors From Dabur with 130+ years of Ayurveda Expertise', '[{\"id\":\"ProductVaniant1\",\"name\":\"500 gm\",\"ourPrice\":\"25\",\"mrp\":\"35\"}]', '[\"https://firebasestorage.googleapis.com/v0/b/steerfreedemo.appspot.com/o/Besan%20500GM.png?alt=media&token=1990fa8b-c96e-464e-a065-330b0aa01eae\"]'),
('BahuraniProductrup2u1i37ldfzv3j1', 'Bahurani Makka Aata', 'Atta & Flours', 'BahuraniCategoryrup2u1tyuld4qxmrd', 'Premium black Tea with goodness of 30+ Ayurvedic Herbs Great Taste and Aroma with 3 way benefits: Re-Energizes, Relieves Stress, Boosts Immunity Benefits of real herbs that you can see in the product, no flavors From Dabur with 130+ years of Ayurveda Expertise', '[{\"id\":\"ProductVaniant1\",\"name\":\"800 gm\",\"ourPrice\":\"400\",\"mrp\":\"700\"}]', '[\"https://firebasestorage.googleapis.com/v0/b/steerfreedemo.appspot.com/o/Makka%20Atta%20800%20GM.jpeg?alt=media&token=c13e961b-b324-4dd7-8a87-77524ed76c40\"]'),
('BahuraniProductrup2u1i37ldfzxf8c', 'Bahurani Multigrain Aata', 'Atta & Flours', 'BahuraniCategoryrup2u1tyuld4qxmrd', 'Premium black Tea with goodness of 30+ Ayurvedic Herbs Great Taste and Aroma with 3 way benefits: Re-Energizes, Relieves Stress, Boosts Immunity Benefits of real herbs that you can see in the product, no flavors From Dabur with 130+ years of Ayurveda Expertise', '[{\"id\":\"ProductVaniant1\",\"name\":\"1 kg\",\"ourPrice\":\"80\",\"mrp\":\"100\"}]', '[\"https://firebasestorage.googleapis.com/v0/b/steerfreedemo.appspot.com/o/Besan%20500GM.png?alt=media&token=1990fa8b-c96e-464e-a065-330b0aa01eae\"]'),
('BahuraniProductrup2u1i37ldg00hfv', 'Bahurani Blue Flush', 'Cleaning & Household ', 'BahuraniCategoryrup2u1n98ld4qlhwo', 'Premium black Tea with goodness of 30+ Ayurvedic Herbs Great Taste and Aroma with 3 way benefits: Re-Energizes, Relieves Stress, Boosts Immunity Benefits of real herbs that you can see in the product, no flavors From Dabur with 130+ years of Ayurveda Expertise', '[{\"id\":\"ProductVaniant1\",\"name\":\"500 ml\",\"ourPrice\":\"400\",\"mrp\":\"700\"}]', '[\"https://firebasestorage.googleapis.com/v0/b/steerfreedemo.appspot.com/o/Blue%20Flush%20500%20ML.png?alt=media&token=3c80c9ec-9eeb-4a18-aee3-7aa7f653a5c2\"]'),
('BahuraniProductrup2u1i37ldg02sf5', 'Floor Cleaner Leamon', 'Cleaning & Household ', 'BahuraniCategoryrup2u1n98ld4qlhwo', 'Premium black Tea with goodness of 30+ Ayurvedic Herbs Great Taste and Aroma with 3 way benefits: Re-Energizes, Relieves Stress, Boosts Immunity Benefits of real herbs that you can see in the product, no flavors From Dabur with 130+ years of Ayurveda Expertise', '[{\"id\":\"ProductVaniant1\",\"name\":\"1 LTR\",\"ourPrice\":\"400\",\"mrp\":\"700\"}]', '[\"https://firebasestorage.googleapis.com/v0/b/steerfreedemo.appspot.com/o/Floor%20Cleaner%20Lemon%201%20LTR.png?alt=media&token=afd12a23-f235-405b-ada1-3e9e91998f6d\"]'),
('BahuraniProductrup2u1i37ldg0hr9o', 'Floor Cleaner Rose', 'Cleaning & Household ', 'BahuraniCategoryrup2u1n98ld4qlhwo', 'Premium black Tea with goodness of 30+ Ayurvedic Herbs Great Taste and Aroma with 3 way benefits: Re-Energizes, Relieves Stress, Boosts Immunity Benefits of real herbs that you can see in the product, no flavors From Dabur with 130+ years of Ayurveda Expertise', '[{\"id\":\"ProductVaniant1\",\"name\":\"1 LTR\",\"ourPrice\":\"400\",\"mrp\":\"700\"}]', '[\"https://firebasestorage.googleapis.com/v0/b/steerfreedemo.appspot.com/o/Floor%20Cleaner%20Rose%201%20LTR.png?alt=media&token=ac329fee-e4ef-4dda-acc1-5d6b22c3cc6b\"]'),
('BahuraniProductrup2u1i37ldg0iurk', 'Herbal Phenyl', 'Cleaning & Household ', 'BahuraniCategoryrup2u1n98ld4qlhwo', 'Premium black Tea with goodness of 30+ Ayurvedic Herbs Great Taste and Aroma with 3 way benefits: Re-Energizes, Relieves Stress, Boosts Immunity Benefits of real herbs that you can see in the product, no flavors From Dabur with 130+ years of Ayurveda Expertise', '[{\"id\":\"ProductVaniant1\",\"name\":\"1 LTR\",\"ourPrice\":\"400\",\"mrp\":\"700\"}]', '[\"https://firebasestorage.googleapis.com/v0/b/steerfreedemo.appspot.com/o/Herbal%20Phenyl%201%20LTR.png?alt=media&token=c45d24ef-1b1e-40ce-84fe-41d3c87e3c40\"]'),
('BahuraniProductrup2u1i37ldg0miqx', 'Masala Tea', 'Tea', 'BahuraniCategoryrup2u1n98ld4qggmb', 'Premium black Tea with goodness of 30+ Ayurvedic Herbs Great Taste and Aroma with 3 way benefits: Re-Energizes, Relieves Stress, Boosts Immunity Benefits of real herbs that you can see in the product, no flavors From Dabur with 130+ years of Ayurveda Expertise', '[{\"id\":\"ProductVaniant1\",\"name\":\"200 gm\",\"ourPrice\":\"400\",\"mrp\":\"700\"}]', '[\"https://firebasestorage.googleapis.com/v0/b/steerfreedemo.appspot.com/o/Masala%20Tea%20200%20GM.png?alt=media&token=0f7dda6a-6a8c-418b-8093-0491c7fc9994\"]'),
('BahuraniProductrup2u1i37ldg0nqxe', 'Masala Tea', 'Tea', 'BahuraniCategoryrup2u1n98ld4qggmb', 'Premium black Tea with goodness of 30+ Ayurvedic Herbs Great Taste and Aroma with 3 way benefits: Re-Energizes, Relieves Stress, Boosts Immunity Benefits of real herbs that you can see in the product, no flavors From Dabur with 130+ years of Ayurveda Expertise', '[{\"id\":\"ProductVaniant1\",\"name\":\"400 gm\",\"ourPrice\":\"400\",\"mrp\":\"700\"}]', '[\"https://firebasestorage.googleapis.com/v0/b/steerfreedemo.appspot.com/o/Masala%20Tea%20400%20GM.png?alt=media&token=fcefe8de-71c7-45ae-93c6-dd5d139d072b\"]'),
('BahuraniProductrup2u1i37ldg0p98d', 'Natural Tea Green', 'Tea', 'BahuraniCategoryrup2u1n98ld4qggmb', 'Premium black Tea with goodness of 30+ Ayurvedic Herbs Great Taste and Aroma with 3 way benefits: Re-Energizes, Relieves Stress, Boosts Immunity Benefits of real herbs that you can see in the product, no flavors From Dabur with 130+ years of Ayurveda Expertise', '[{\"id\":\"ProductVaniant1\",\"name\":\"200 gm\",\"ourPrice\":\"90\",\"mrp\":\"100\"}]', '[\"https://firebasestorage.googleapis.com/v0/b/steerfreedemo.appspot.com/o/Natural%20Tea%20Green%20200%20GM.png?alt=media&token=cb6ce8c6-007b-4896-b4f1-a0be4bb51d76\"]'),
('BahuraniProductrup2u1i37ldg0quah', 'Natural Tea Green', 'Tea', 'BahuraniCategoryrup2u1n98ld4qggmb', 'Premium black Tea with goodness of 30+ Ayurvedic Herbs Great Taste and Aroma with 3 way benefits: Re-Energizes, Relieves Stress, Boosts Immunity Benefits of real herbs that you can see in the product, no flavors From Dabur with 130+ years of Ayurveda Expertise', '[{\"id\":\"ProductVaniant1\",\"name\":\"400 gm\",\"ourPrice\":\"170\",\"mrp\":\"190\"}]', '[\"https://firebasestorage.googleapis.com/v0/b/steerfreedemo.appspot.com/o/Natural%20Tea%20Green%20400%20GM.png?alt=media&token=e5bc40a7-cedf-485b-a0bb-319d30b66d90\"]');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `User_Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PhoneNumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Refferal_Code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Profile_Picture` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Refferal_Code_Used` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `isMarketingUser` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`Name`, `User_Id`, `PhoneNumber`, `Refferal_Code`, `Profile_Picture`, `Refferal_Code_Used`, `isMarketingUser`) VALUES
('afbsgadbg', 'BahuraniUser11uft051aldtqis6l', '9926579383', 'ReferralCode11uft051aldtqis6m', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', 'adbgdgb', NULL),
('Harshita Patidar ', 'BahuraniUser327tqj1aldu9jogy', '9993317337', 'ReferralCode327tqj1aldu9jogz', 'https://firebasestorage.googleapis.com/v0/b/bahuraniapp.appspot.com/o/gnoaj.png?alt=media&token=7686cd35-1754-4b73-8e3e-9d91d213e100', 'Zvvzhzbsbs', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `User_Addresses`
--

CREATE TABLE `User_Addresses` (
  `User_Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Address_Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PinCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PhoneNumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `User_Addresses`
--

INSERT INTO `User_Addresses` (`User_Id`, `Address_Id`, `Address`, `PinCode`, `Name`, `PhoneNumber`) VALUES
('BahuraniUser11uft051aldtqis6l', 'BahuraniAddress11uft051aldtqit6m', 'dabgbdagb | adbgbgad | dgabdgb | dbgab | badgbg', '457787', 'afbsgadbg', '9926579383'),
('BahuraniUser327tqj1aldu9jogy', 'BahuraniAddress327tqj1aldu9jpfp', 'Hxbdbdbbd | Zhdbdbbd | Bdjdbsbjd | Vshdbsbsh | Shdhhd', '545455', 'Harshita Patidar ', '9993317337');

-- --------------------------------------------------------

--
-- Table structure for table `Wishlist`
--

CREATE TABLE `Wishlist` (
  `User_Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Wishlist_Data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Wishlist`
--

INSERT INTO `Wishlist` (`User_Id`, `Wishlist_Data`) VALUES
('BahuraniUser11uft051aldtqis6l', '[]'),
('BahuraniUser19hs6y19ldszeu9x', '[]'),
('BahuraniUser327tqj1aldu9jogy', '[{\"Product_Id\": \"BahuraniProductrup2u1i37ldfzv3j1\"}, {\"Product_Id\": \"BahuraniProductrup2u1i37ldfzxf8c\"}, {\"Product_Id\": \"BahuraniProductrup2u1i37ldfzjjqo\"}]'),
('BahuraniUserpxdq19ldszeu70', '[]'),
('BahuraniUserpxdq19ldszjik8', '[{\"Product_Id\":\"BahuraniProductrup2u1i37ldfzjjqo\"}]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Banners`
--
ALTER TABLE `Banners`
  ADD PRIMARY KEY (`BannerId`);

--
-- Indexes for table `Cart`
--
ALTER TABLE `Cart`
  ADD PRIMARY KEY (`User_Id`);

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`CategoryId`);

--
-- Indexes for table `Coupons`
--
ALTER TABLE `Coupons`
  ADD PRIMARY KEY (`CouponId`);

--
-- Indexes for table `Notification_Tokens`
--
ALTER TABLE `Notification_Tokens`
  ADD PRIMARY KEY (`User_Id`);

--
-- Indexes for table `OfferBanner`
--
ALTER TABLE `OfferBanner`
  ADD PRIMARY KEY (`BannerId`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`Order_Id`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`ProductId`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`User_Id`);

--
-- Indexes for table `User_Addresses`
--
ALTER TABLE `User_Addresses`
  ADD PRIMARY KEY (`Address_Id`);

--
-- Indexes for table `Wishlist`
--
ALTER TABLE `Wishlist`
  ADD PRIMARY KEY (`User_Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
