USE [master]
GO
/****** Object:  Database [maytinhonl]    Script Date: 15/06/2024 4:27:17 CH ******/
CREATE DATABASE [maytinhonl]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'maytinhonl', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.XOAII\MSSQL\DATA\maytinhonl.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'maytinhonl_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.XOAII\MSSQL\DATA\maytinhonl_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [maytinhonl] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [maytinhonl].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [maytinhonl] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [maytinhonl] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [maytinhonl] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [maytinhonl] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [maytinhonl] SET ARITHABORT OFF 
GO
ALTER DATABASE [maytinhonl] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [maytinhonl] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [maytinhonl] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [maytinhonl] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [maytinhonl] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [maytinhonl] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [maytinhonl] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [maytinhonl] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [maytinhonl] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [maytinhonl] SET  DISABLE_BROKER 
GO
ALTER DATABASE [maytinhonl] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [maytinhonl] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [maytinhonl] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [maytinhonl] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [maytinhonl] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [maytinhonl] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [maytinhonl] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [maytinhonl] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [maytinhonl] SET  MULTI_USER 
GO
ALTER DATABASE [maytinhonl] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [maytinhonl] SET DB_CHAINING OFF 
GO
ALTER DATABASE [maytinhonl] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [maytinhonl] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [maytinhonl] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [maytinhonl] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [maytinhonl] SET QUERY_STORE = ON
GO
ALTER DATABASE [maytinhonl] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [maytinhonl]
GO
/****** Object:  UserDefinedTableType [dbo].[OrderDetailsType]    Script Date: 15/06/2024 4:27:17 CH ******/
CREATE TYPE [dbo].[OrderDetailsType] AS TABLE(
	[product_id] [int] NULL,
	[so_luong] [int] NULL,
	[gia_ban] [decimal](18, 0) NULL
)
GO
/****** Object:  Table [dbo].[Accounts]    Script Date: 15/06/2024 4:27:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Accounts](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tai_khoan] [nvarchar](50) NOT NULL,
	[mat_khau] [nvarchar](50) NOT NULL,
	[role_id] [int] NOT NULL,
 CONSTRAINT [PK_Accounts] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[accounts_detail]    Script Date: 15/06/2024 4:27:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[accounts_detail](
	[id] [int] NOT NULL,
	[ngay_sinh] [date] NOT NULL,
	[ho_ten] [nvarchar](50) NOT NULL,
	[gioi_tinh] [nvarchar](10) NOT NULL,
	[dia_chi] [nvarchar](100) NOT NULL,
	[email] [nvarchar](50) NOT NULL,
	[sdt] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_accounts_detail] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chi_tiet_don_hang]    Script Date: 15/06/2024 4:27:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chi_tiet_don_hang](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[order_id] [int] NOT NULL,
	[product_id] [int] NOT NULL,
	[so_luong] [int] NOT NULL,
	[gia_ban] [decimal](18, 0) NOT NULL,
 CONSTRAINT [PK_chi_tiet_don_hang] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[danh_muc_san_pham]    Script Date: 15/06/2024 4:27:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[danh_muc_san_pham](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ten] [nvarchar](50) NOT NULL,
	[mota] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_category] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[don_hang]    Script Date: 15/06/2024 4:27:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[don_hang](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[ngay_dat] [datetime] NOT NULL,
	[trang_thai] [nvarchar](50) NOT NULL,
	[thanh_toan] [nvarchar](50) NOT NULL,
	[ho_ten] [nvarchar](50) NOT NULL,
	[dia_chi] [nchar](100) NOT NULL,
	[sdt] [nchar](10) NOT NULL,
 CONSTRAINT [PK_don_hang] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[giam_gia]    Script Date: 15/06/2024 4:27:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[giam_gia](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ngay_tao] [datetime] NOT NULL,
	[mo_ta] [nvarchar](100) NOT NULL,
	[muc_giam_gia] [int] NOT NULL,
	[trang_thai] [bit] NULL,
	[ngay_cap_nhat] [datetime] NULL,
	[ten_chuong_trinh] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_giam_gia] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[gio_hang]    Script Date: 15/06/2024 4:27:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[gio_hang](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[so_luong] [int] NOT NULL,
	[accounts_id] [int] NOT NULL,
	[product_id] [int] NOT NULL,
	[gia_ban] [decimal](18, 0) NOT NULL,
 CONSTRAINT [PK_gio_hang] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[roles]    Script Date: 15/06/2024 4:27:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[roles](
	[id] [int] NOT NULL,
	[ten] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_roles] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[san_pham]    Script Date: 15/06/2024 4:27:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[san_pham](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ten] [nvarchar](100) NOT NULL,
	[mo_ta] [nvarchar](max) NOT NULL,
	[gia] [decimal](18, 0) NOT NULL,
	[so_luong] [int] NOT NULL,
	[hang] [nvarchar](50) NOT NULL,
	[sales_id] [int] NOT NULL,
	[cartegory_id] [int] NOT NULL,
	[image] [nvarchar](max) NULL,
 CONSTRAINT [PK_san_pham] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Accounts] ON 

INSERT [dbo].[Accounts] ([id], [tai_khoan], [mat_khau], [role_id]) VALUES (2, N'xoaii', N'123', 1)
INSERT [dbo].[Accounts] ([id], [tai_khoan], [mat_khau], [role_id]) VALUES (3, N'mango', N'123', 2)
INSERT [dbo].[Accounts] ([id], [tai_khoan], [mat_khau], [role_id]) VALUES (7, N'test1', N'd123456', 2)
INSERT [dbo].[Accounts] ([id], [tai_khoan], [mat_khau], [role_id]) VALUES (8, N'nhucut', N'duongtk123', 2)
INSERT [dbo].[Accounts] ([id], [tai_khoan], [mat_khau], [role_id]) VALUES (9, N'moimoi', N'd123456', 2)
SET IDENTITY_INSERT [dbo].[Accounts] OFF
GO
INSERT [dbo].[accounts_detail] ([id], [ngay_sinh], [ho_ten], [gioi_tinh], [dia_chi], [email], [sdt]) VALUES (3, CAST(N'2002-09-17' AS Date), N'duong', N'nam', N'tan khanh', N'dasdsa@mail.com', N'656464')
INSERT [dbo].[accounts_detail] ([id], [ngay_sinh], [ho_ten], [gioi_tinh], [dia_chi], [email], [sdt]) VALUES (7, CAST(N'1990-01-01' AS Date), N'Nguyen Van A', N'Nam', N'123 du?ng ABC', N'example@example.com', N'0123456789')
INSERT [dbo].[accounts_detail] ([id], [ngay_sinh], [ho_ten], [gioi_tinh], [dia_chi], [email], [sdt]) VALUES (8, CAST(N'2002-05-29' AS Date), N'mirai trần', N'Nam', N'bắc giang', N'xoaii@gmail.com', N'04239492')
INSERT [dbo].[accounts_detail] ([id], [ngay_sinh], [ho_ten], [gioi_tinh], [dia_chi], [email], [sdt]) VALUES (9, CAST(N'2002-06-04' AS Date), N'Hiếu chua', N'Nam', N'ọc ọc', N'ptd@gmail.com', N'4324242343')
GO
SET IDENTITY_INSERT [dbo].[chi_tiet_don_hang] ON 

INSERT [dbo].[chi_tiet_don_hang] ([id], [order_id], [product_id], [so_luong], [gia_ban]) VALUES (65, 54, 3, 2, CAST(22000000 AS Decimal(18, 0)))
INSERT [dbo].[chi_tiet_don_hang] ([id], [order_id], [product_id], [so_luong], [gia_ban]) VALUES (66, 54, 25, 1, CAST(66000000 AS Decimal(18, 0)))
INSERT [dbo].[chi_tiet_don_hang] ([id], [order_id], [product_id], [so_luong], [gia_ban]) VALUES (67, 55, 13, 1, CAST(6600000 AS Decimal(18, 0)))
INSERT [dbo].[chi_tiet_don_hang] ([id], [order_id], [product_id], [so_luong], [gia_ban]) VALUES (69, 56, 11, 3, CAST(23078000 AS Decimal(18, 0)))
SET IDENTITY_INSERT [dbo].[chi_tiet_don_hang] OFF
GO
SET IDENTITY_INSERT [dbo].[danh_muc_san_pham] ON 

INSERT [dbo].[danh_muc_san_pham] ([id], [ten], [mota]) VALUES (1, N'Máy tính chơi game - Làm Việc', N'máy tính làm việc hiệu năng cao và bền bỉ')
INSERT [dbo].[danh_muc_san_pham] ([id], [ten], [mota]) VALUES (2, N'Linh kiện máy tính', N'bộ não của một máy tính')
INSERT [dbo].[danh_muc_san_pham] ([id], [ten], [mota]) VALUES (3, N'GAMING GEAR', N'bàn phím ,chuột ,tai nghe...')
INSERT [dbo].[danh_muc_san_pham] ([id], [ten], [mota]) VALUES (4, N'Màn Hình', N'màn hình tôi')
SET IDENTITY_INSERT [dbo].[danh_muc_san_pham] OFF
GO
SET IDENTITY_INSERT [dbo].[don_hang] ON 

INSERT [dbo].[don_hang] ([id], [user_id], [ngay_dat], [trang_thai], [thanh_toan], [ho_ten], [dia_chi], [sdt]) VALUES (54, 9, CAST(N'2024-06-14T22:24:22.380' AS DateTime), N'Thành công', N'Thanh Toán Khi Nhận Hàng (COD)', N'Đỗ thị hiếu', N'Nhã lộng                                                                                            ', N'03203023  ')
INSERT [dbo].[don_hang] ([id], [user_id], [ngay_dat], [trang_thai], [thanh_toan], [ho_ten], [dia_chi], [sdt]) VALUES (55, 9, CAST(N'2024-06-14T22:57:09.480' AS DateTime), N'Thành công', N'Thanh Toán Khi Nhận Hàng (COD)', N'hiếuchua', N'bắc giang                                                                                           ', N'0939393   ')
INSERT [dbo].[don_hang] ([id], [user_id], [ngay_dat], [trang_thai], [thanh_toan], [ho_ten], [dia_chi], [sdt]) VALUES (56, 2, CAST(N'2024-06-15T15:26:00.683' AS DateTime), N'Chờ giao hàng', N'Thanh Toán Khi Nhận Hàng (COD)', N'Phạm Tuấn Dương', N'Tân Khánh-Phú Bình-Thái Nguyên                                                                      ', N'0336097717')
SET IDENTITY_INSERT [dbo].[don_hang] OFF
GO
SET IDENTITY_INSERT [dbo].[giam_gia] ON 

INSERT [dbo].[giam_gia] ([id], [ngay_tao], [mo_ta], [muc_giam_gia], [trang_thai], [ngay_cap_nhat], [ten_chuong_trinh]) VALUES (1, CAST(N'2024-05-27T23:58:01.993' AS DateTime), N'khong co gi', 0, 0, CAST(N'2024-05-27T00:00:00.000' AS DateTime), N'nhu')
SET IDENTITY_INSERT [dbo].[giam_gia] OFF
GO
INSERT [dbo].[roles] ([id], [ten]) VALUES (1, N'quantrivien')
INSERT [dbo].[roles] ([id], [ten]) VALUES (2, N'khach')
GO
SET IDENTITY_INSERT [dbo].[san_pham] ON 

INSERT [dbo].[san_pham] ([id], [ten], [mo_ta], [gia], [so_luong], [hang], [sales_id], [cartegory_id], [image]) VALUES (3, N'PC Workstation Professional I5 12600K - RTX 3060 Dual OC 12GB', N'sửa được rồi hiuhi', CAST(20000000 AS Decimal(18, 0)), 24, N'UpdatedBrand', 1, 1, N'https://product.hstatic.net/1000288298/product/dsc07687_1_44c3643bec6243c2bf41a14fb75d76b2_master.jpg')
INSERT [dbo].[san_pham] ([id], [ten], [mo_ta], [gia], [so_luong], [hang], [sales_id], [cartegory_id], [image]) VALUES (5, N'PC Workstation Professional I5 12600K - RTX 3070 8GB OC', N'i', CAST(19000000 AS Decimal(18, 0)), 19, N'Thuong hiệu A', 1, 1, N'https://product.hstatic.net/1000288298/product/11004_pc_do_hoa_chuyen_nghiep_pcm_78f363f455f84e99958ace2fd1d8eb20_master.jpg')
INSERT [dbo].[san_pham] ([id], [ten], [mo_ta], [gia], [so_luong], [hang], [sales_id], [cartegory_id], [image]) VALUES (11, N'PC LÀM VIỆC ĐỒ HỌA HIỆU NĂNG CAO - BỀN BÌ I5 13500 - RTX 3060 TI', N'i', CAST(20980000 AS Decimal(18, 0)), 0, N'chitit', 1, 1, N'https://product.hstatic.net/1000288298/product/dsc05834_4a68b73345d245ca9bc672c474f8e802_master.jpg')
INSERT [dbo].[san_pham] ([id], [ten], [mo_ta], [gia], [so_luong], [hang], [sales_id], [cartegory_id], [image]) VALUES (12, N'Intel Core i9-11900K', N'i', CAST(5500000 AS Decimal(18, 0)), 10, N'Intel', 1, 2, N'https://product.hstatic.net/200000722513/product/unnamed_dc803b762a514093ada807cc52fbacd9_d503f1d5273f4782b587a270d1a469db_1024x1024.jpg')
INSERT [dbo].[san_pham] ([id], [ten], [mo_ta], [gia], [so_luong], [hang], [sales_id], [cartegory_id], [image]) VALUES (13, N'AMD Ryzen 9 5900X', N'i', CAST(6000000 AS Decimal(18, 0)), 14, N'AMD', 1, 2, N'https://product.hstatic.net/200000722513/product/unnamed_dc803b762a514093ada807cc52fbacd9_d503f1d5273f4782b587a270d1a469db_1024x1024.jpg')
INSERT [dbo].[san_pham] ([id], [ten], [mo_ta], [gia], [so_luong], [hang], [sales_id], [cartegory_id], [image]) VALUES (14, N'Intel Core i7-11700K', N'i', CAST(4500000 AS Decimal(18, 0)), 20, N'Intel', 1, 2, N'')
INSERT [dbo].[san_pham] ([id], [ten], [mo_ta], [gia], [so_luong], [hang], [sales_id], [cartegory_id], [image]) VALUES (15, N'AMD Ryzen 7 5800X', N'i', CAST(5000000 AS Decimal(18, 0)), 12, N'AMD', 1, 2, N'https://product.hstatic.net/1000288298/product/dsc07687_1_44c3643bec6243c2bf41a14fb75d76b2_master.jpg')
INSERT [dbo].[san_pham] ([id], [ten], [mo_ta], [gia], [so_luong], [hang], [sales_id], [cartegory_id], [image]) VALUES (16, N'Intel Core i5-11600K', N'i', CAST(3000000 AS Decimal(18, 0)), 30, N'Intel', 1, 2, N'')
INSERT [dbo].[san_pham] ([id], [ten], [mo_ta], [gia], [so_luong], [hang], [sales_id], [cartegory_id], [image]) VALUES (17, N'AMD Ryzen 5 5600X', N'i', CAST(3500000 AS Decimal(18, 0)), 25, N'AMD', 1, 2, N'')
INSERT [dbo].[san_pham] ([id], [ten], [mo_ta], [gia], [so_luong], [hang], [sales_id], [cartegory_id], [image]) VALUES (25, N'PC WORKSTATION GAMING PROFESSIONAL i9 13900K RTX 4080 SUPER 16GB OC', N'd', CAST(60000000 AS Decimal(18, 0)), 2, N'ASUS', 1, 1, N'https://product.hstatic.net/1000288298/product/78140_nova_black__2__8d3372906f154c7eb2a1bea054295903_master.jpg')
SET IDENTITY_INSERT [dbo].[san_pham] OFF
GO
ALTER TABLE [dbo].[don_hang] ADD  CONSTRAINT [DF_don_hang_ngay_dat]  DEFAULT (getdate()) FOR [ngay_dat]
GO
ALTER TABLE [dbo].[giam_gia] ADD  CONSTRAINT [DF_giam_gia_ngay_tao]  DEFAULT (getdate()) FOR [ngay_tao]
GO
ALTER TABLE [dbo].[Accounts]  WITH CHECK ADD  CONSTRAINT [FK_Accounts_roles] FOREIGN KEY([role_id])
REFERENCES [dbo].[roles] ([id])
GO
ALTER TABLE [dbo].[Accounts] CHECK CONSTRAINT [FK_Accounts_roles]
GO
ALTER TABLE [dbo].[accounts_detail]  WITH CHECK ADD  CONSTRAINT [FK_accounts_detail_Accounts] FOREIGN KEY([id])
REFERENCES [dbo].[Accounts] ([id])
GO
ALTER TABLE [dbo].[accounts_detail] CHECK CONSTRAINT [FK_accounts_detail_Accounts]
GO
ALTER TABLE [dbo].[chi_tiet_don_hang]  WITH CHECK ADD  CONSTRAINT [FK_chi_tiet_don_hang_don_hang] FOREIGN KEY([order_id])
REFERENCES [dbo].[don_hang] ([id])
GO
ALTER TABLE [dbo].[chi_tiet_don_hang] CHECK CONSTRAINT [FK_chi_tiet_don_hang_don_hang]
GO
ALTER TABLE [dbo].[chi_tiet_don_hang]  WITH CHECK ADD  CONSTRAINT [FK_chi_tiet_don_hang_san_pham] FOREIGN KEY([product_id])
REFERENCES [dbo].[san_pham] ([id])
GO
ALTER TABLE [dbo].[chi_tiet_don_hang] CHECK CONSTRAINT [FK_chi_tiet_don_hang_san_pham]
GO
ALTER TABLE [dbo].[don_hang]  WITH CHECK ADD  CONSTRAINT [FK_don_hang_Accounts] FOREIGN KEY([user_id])
REFERENCES [dbo].[Accounts] ([id])
GO
ALTER TABLE [dbo].[don_hang] CHECK CONSTRAINT [FK_don_hang_Accounts]
GO
ALTER TABLE [dbo].[gio_hang]  WITH CHECK ADD  CONSTRAINT [FK_gio_hang_Accounts] FOREIGN KEY([accounts_id])
REFERENCES [dbo].[Accounts] ([id])
GO
ALTER TABLE [dbo].[gio_hang] CHECK CONSTRAINT [FK_gio_hang_Accounts]
GO
ALTER TABLE [dbo].[gio_hang]  WITH CHECK ADD  CONSTRAINT [FK_gio_hang_san_pham] FOREIGN KEY([product_id])
REFERENCES [dbo].[san_pham] ([id])
GO
ALTER TABLE [dbo].[gio_hang] CHECK CONSTRAINT [FK_gio_hang_san_pham]
GO
ALTER TABLE [dbo].[san_pham]  WITH CHECK ADD  CONSTRAINT [FK_san_pham_danh_muc_san_pham] FOREIGN KEY([cartegory_id])
REFERENCES [dbo].[danh_muc_san_pham] ([id])
GO
ALTER TABLE [dbo].[san_pham] CHECK CONSTRAINT [FK_san_pham_danh_muc_san_pham]
GO
ALTER TABLE [dbo].[san_pham]  WITH CHECK ADD  CONSTRAINT [FK_san_pham_giam_gia] FOREIGN KEY([sales_id])
REFERENCES [dbo].[giam_gia] ([id])
GO
ALTER TABLE [dbo].[san_pham] CHECK CONSTRAINT [FK_san_pham_giam_gia]
GO
/****** Object:  StoredProcedure [dbo].[SP_Account]    Script Date: 15/06/2024 4:27:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Account]
    @action NVARCHAR(100),
    @tai_khoan NVARCHAR(50) = NULL,
    @mat_khau NVARCHAR(50) = NULL,
	@role_id int=null,
    @ngay_sinh DATE = NULL,
    @ho_ten NVARCHAR(50) = NULL,
    @gioi_tinh NVARCHAR(10) = NULL,
    @dia_chi NVARCHAR(100) = NULL,
    @email NVARCHAR(50) = NULL,
    @sdt NVARCHAR(10) = NULL,
    @account_id INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

  IF (@action = 'register')
BEGIN
    -- Kiểm tra xem tên tài khoản đã tồn tại chưa
    IF EXISTS (SELECT 1 FROM Accounts WHERE tai_khoan = @tai_khoan)
    BEGIN
        SELECT N'{"ok": 0, "msg": "Tên tài khoản đã tồn tại"}' AS json;
        RETURN;
    END

    IF (LEN(@mat_khau) < 6 OR @mat_khau NOT LIKE '%[0-9]%' OR @mat_khau NOT LIKE '%[a-zA-Z]%')
    BEGIN
        SELECT N'{"ok": 0, "msg": "Mật khẩu phải chứa ít nhất 6 ký tự, bao gồm cả chữ và số"}' AS json;
        RETURN;
    END

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Thêm tài khoản vào bảng accounts
        INSERT INTO Accounts(tai_khoan, mat_khau, role_id)
        VALUES (@tai_khoan, @mat_khau, 2);

        -- Lấy ID của tài khoản vừa thêm
        DECLARE @new_account_id INT;
        SET @new_account_id = SCOPE_IDENTITY();

        -- Thêm chi tiết tài khoản vào bảng accounts_detail
        INSERT INTO accounts_detail (id, ngay_sinh, ho_ten, gioi_tinh, dia_chi, email, sdt)
        VALUES (@new_account_id, @ngay_sinh, @ho_ten, @gioi_tinh, @dia_chi, @email, @sdt);

        COMMIT TRANSACTION;

        SELECT N'{"ok": 1, "msg": "Đăng ký tài khoản thành công"}' AS json;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        SELECT N'{"ok": 0, "msg": "Đã xảy ra lỗi trong quá trình đăng ký"}' AS json;
    END CATCH
END

    ELSE IF (@action = 'login')
    BEGIN
        
        SELECT @account_id = id 
        FROM Accounts 
        WHERE tai_khoan = @tai_khoan AND mat_khau = @mat_khau;

        IF (@account_id IS NOT NULL)
        BEGIN
            SELECT N'{"ok": 1, "msg": "Đăng nhập thành công", "account_id": ' + CAST(@account_id AS NVARCHAR) + '}' AS json;
        END
        ELSE
        BEGIN
            SELECT N'{"ok": 0, "msg": "Tài khoản hoặc mật khẩu không đúng"}' AS json;
        END
    END
    IF (@action = 'get_user_info')
BEGIN
    SET NOCOUNT ON;

   SELECT 
        a.id,
        a.tai_khoan,
        a.role_id,
        ad.ho_ten,
        ad.ngay_sinh,
        ad.gioi_tinh,
        ad.dia_chi,
        ad.email,
        ad.sdt
    FROM 
        Accounts a
    LEFT JOIN 
        accounts_detail ad ON a.id = ad.id
    WHERE 
        a.id = @account_id
    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES;
	end
	if(@action='logout')
	BEGIN
        -- Xóa hoặc vô hiệu hóa phiên đăng nhập của người dùng
        DELETE FROM Accounts WHERE id = @account_id;

        -- Trả về kết quả
        SELECT 1 AS ok, 'Đăng xuất thành công' AS msg;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_danhMuc]    Script Date: 15/06/2024 4:27:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_danhMuc]
    @action NVARCHAR(50),  -- Các hành động: 'insert', 'get_list', 'delete'
    @id INT = NULL,        -- ID của danh mục (chỉ cần cho hành động 'delete')
    @ten NVARCHAR(50) = NULL,  -- Tên của danh mục (chỉ cần cho hành động 'insert')
    @mota NVARCHAR(50) = NULL  -- Mô tả của danh mục (chỉ cần cho hành động 'insert')
AS
BEGIN
    SET NOCOUNT ON;

    IF @action = 'insert'
    BEGIN
        -- Kiểm tra các tham số đầu vào
        IF @ten IS NULL OR @mota IS NULL
        BEGIN
            SELECT N'{"ok": 0, "msg": "Thiếu thông tin cần thiết để thêm danh mục."}' AS json;
            RETURN;
        END

        -- Kiểm tra tính duy nhất của tên danh mục
        IF EXISTS (SELECT 1 FROM danh_muc_san_pham WHERE ten = @ten)
        BEGIN
            SELECT N'{"ok": 0, "msg": "Tên danh mục đã tồn tại"}' AS json;
            RETURN;
        END

        -- Thêm danh mục mới
        INSERT INTO danh_muc_san_pham (ten, mota)
        VALUES (@ten, @mota);

        SELECT N'{"ok": 1, "msg": "Đã thêm danh mục mới"}' AS json;
    END
    ELSE IF @action = 'get_list'
    BEGIN
        -- Lấy danh sách các danh mục
        SELECT id, ten, mota
        FROM danh_muc_san_pham
        FOR JSON PATH;
    END
    ELSE IF @action = 'delete'
    BEGIN
        -- Kiểm tra tham số đầu vào
        IF @id IS NULL
        BEGIN
            SELECT N'{"ok": 0, "msg": "Thiếu thông tin cần thiết để xóa danh mục."}' AS json;
            RETURN;
        END

        -- Xóa danh mục
        DELETE FROM danh_muc_san_pham
        WHERE id = @id;

        SELECT N'{"ok": 1, "msg": "Đã xóa danh mục"}' AS json;
    END
    ELSE
    BEGIN
        SELECT N'{"ok": 0, "msg": "Hành động không hợp lệ."}' AS json;
        RETURN;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_donHang]    Script Date: 15/06/2024 4:27:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--CREATE TYPE dbo.OrderDetailsType AS TABLE (
--    product_id INT,
--    so_luong INT,
--    gia_ban DECIMAL(18, 0)
--);

CREATE PROCEDURE [dbo].[SP_donHang]
     @action NVARCHAR(50),  
    @order_id INT OUTPUT, -- Thêm tham số đầu ra
    @user_id INT = NULL, 
    @ngay_dat DATETIME = NULL,
    @trang_thai NVARCHAR(50) = NULL,
    @thanh_toan NVARCHAR(50) = NULL,
    @ho_ten NVARCHAR(50)=NULL,
    @dia_chi NVARCHAR(100)=NULL,
    @sdt NVARCHAR(50)=NULL,
    @order_details dbo.OrderDetailsType READONLY
AS
BEGIN
    SET NOCOUNT ON;

    IF @action = 'insert_donHang'
    BEGIN
        -- Thêm đơn hàng vào bảng don_hang
        INSERT INTO don_hang (user_id, ngay_dat, trang_thai, thanh_toan, ho_ten, dia_chi, sdt)
        VALUES (@user_id, GETDATE(), N'Đang xử lý', @thanh_toan, @ho_ten, @dia_chi, @sdt);

        -- Lấy order_id vừa được tạo hoặc tồn tại
        SET @order_id = SCOPE_IDENTITY();

        -- Thêm chi tiết đơn hàng từ bảng tạm vào bảng chi_tiet_don_hang
        INSERT INTO chi_tiet_don_hang (order_id, product_id, so_luong, gia_ban)
        SELECT @order_id, product_id, so_luong, gia_ban
        FROM @order_details;

        -- Trả về order_id của đơn hàng mới được tạo
        SELECT @order_id AS new_order_id;
    END
    ELSE IF @action = 'delete_donHang'
    BEGIN
        -- Xóa các chi tiết đơn hàng của đơn hàng cần xóa
        DELETE FROM chi_tiet_don_hang WHERE order_id = @order_id;
        -- Xóa đơn hàng
        DELETE FROM don_hang WHERE id = @order_id;

        SELECT N'{"ok": 1, "msg": "Đã xóa đơn hàng"}' AS json;
    END
END
   
--DECLARE @order_id INT; -- Khai báo biến @order_id để nhận giá trị đầu ra

--EXEC SP_donHang 
--    @action = 'get_list_donHang',
--    @user_id = 8,
--    @order_id = @order_id OUTPUT; -- Điền tham số @order_id và nhận giá trị đầu ra

--SELECT @order_id AS order_id; -- Hiển thị giá trị order_id

--EXEC SP_donHang @action = 'get_list_donHang', @user_id = 8;


--exec SP_donHang @action='delete_donHang',@order_id =43
--DECLARE @order_details dbo.OrderDetailsType;

---- Thêm các chi tiết đơn hàng vào bảng tạm
--INSERT INTO @order_details (product_id, so_luong, gia_ban)
--VALUES
--    (3, 2, 10000), -- Sản phẩm 1, số lượng 2, giá 10000
--    (11, 1, 15000); -- Sản phẩm 2, số lượng 1, giá 15000

--DECLARE @new_order_id INT; -- Biến để lưu order_id mới tạo

---- Gọi stored procedure với thông tin và bảng tạm đã có
--EXEC SP_donHang 
--    @action = 'insert_donHang',
--    @user_id = 2,
--    @ngay_dat = '2024-06-13',
--    @trang_thai = N'Mới',
--    @thanh_toan = N'Chưa thanh toán',
--    @ho_ten = N'Nguyễn Văn A',
--    @dia_chi = N'123 Đường ABC',
--    @sdt = N'0123456789',
--    @order_details = @order_details,
--    @order_id = @new_order_id OUTPUT; -- Lấy order_id mới được tạo

--SELECT @new_order_id AS new_order_id; -- Trả về order_id mới tạo
select *from don_hang
GO
/****** Object:  StoredProcedure [dbo].[SP_get_user_info]    Script Date: 15/06/2024 4:27:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_get_user_info]
   @account_id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        a.id AS account_id,
        a.tai_khoan AS username,
        a.role_id,
        ad.ho_ten AS full_name,
        ad.ngay_sinh AS birthday,
        ad.gioi_tinh AS gender,
        ad.dia_chi AS address,
        ad.email,
        ad.sdt AS phone_number
    FROM 
        Accounts a
    LEFT JOIN 
        accounts_detail ad ON a.id = ad.id
    WHERE 
        a.id = @account_id
    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_getListDonHang]    Script Date: 15/06/2024 4:27:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_getListDonHang]
    @action NVARCHAR(50),
    @user_id INT = NULL,
	@order_id INT = NULL,
	@trang_thai Nvarchar(50)=null
AS
BEGIN
    SET NOCOUNT ON;

    IF @action = 'get_list_donHang'
    BEGIN
        IF @user_id IS NOT NULL
        BEGIN
            -- Lấy danh sách đơn hàng của một người dùng dựa trên user_id
            SELECT dh.id AS order_id,dh.ngay_dat,dh.trang_thai, dh.ho_ten, dh.dia_chi, dh.sdt, dh.thanh_toan,
                   (
                       SELECT ctdh.so_luong, ctdh.gia_ban, p.ten
                       FROM chi_tiet_don_hang ctdh
                       INNER JOIN san_pham p ON ctdh.product_id = p.id
                       WHERE ctdh.order_id = dh.id
                       FOR JSON PATH
                   ) AS chi_tiet_don_hang
            FROM don_hang dh
            WHERE dh.user_id = @user_id
            FOR JSON PATH;
        END
        ELSE
        BEGIN
            RAISERROR('Thiếu thông tin tài khoản.', 16, 1);
        END
    END
   
    ELSE IF @action = 'get_list_ad'
    BEGIN
        SELECT 
            dh.id AS order_id, 
            dh.ngay_dat, 
            dh.trang_thai, 
            dh.ho_ten, 
            dh.dia_chi, 
            dh.sdt, 
            dh.thanh_toan,
            (
                SELECT 
                    ctdh.so_luong, 
                    ctdh.gia_ban, 
                    p.ten AS ten_san_pham
                FROM 
                    chi_tiet_don_hang ctdh
                INNER JOIN 
                    san_pham p ON ctdh.product_id = p.id
                WHERE 
                    ctdh.order_id = dh.id
                FOR JSON PATH
            ) AS chi_tiet_don_hang
        FROM 
            don_hang dh
        FOR JSON PATH;
		return
    END
  ELSE IF @action = 'edit_donHang'
BEGIN
    IF EXISTS (SELECT 1 FROM don_hang WHERE id = @order_id)
    BEGIN
        -- Update trạng thái của đơn hàng
        UPDATE don_hang
        SET trang_thai = @trang_thai
        WHERE id = @order_id;

        -- Trả về 1 nếu cập nhật thành công
      if(@@ROWCOUNT=1)
	  begin
	  select '{"msg":"thành công gaming"}'
	  end
	  else select '{"msg":"lỗi gaming"}'
    END

    RETURN; -- Thêm lệnh return để kết thúc Stored Procedure
END

	 ELSE IF @action = 'delete_donHang'
    BEGIN
        IF @order_id IS NOT NULL
        BEGIN
            -- Xóa các chi tiết đơn hàng của đơn hàng cần xóa
            DELETE FROM chi_tiet_don_hang WHERE order_id = @order_id;
            -- Xóa đơn hàng
            DELETE FROM don_hang WHERE id = @order_id;
            -- Trả về JSON với thông báo thành công
            SELECT N'{"ok": 1, "msg": "Đã xóa đơn hàng"}' AS json;
        END
        ELSE
        BEGIN
            RAISERROR('Thiếu thông tin đơn hàng cần xóa.', 16, 1);
        END
    END
    ELSE
    BEGIN
        RAISERROR('Hành động không hợp lệ.', 16, 1);
        RETURN;
    END
END
EXEC SP_getListDonHang @action = 'edit_donHang',@order_id=3, @trang_thai =N'Hoàn Thành'

--select*from san_pham 
GO
/****** Object:  StoredProcedure [dbo].[SP_gioHang]    Script Date: 15/06/2024 4:27:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--USE [maytinhonl]
--GO
--/****** Object:  StoredProcedure [dbo].[SP_gioHang]    Script Date: 12/06/2024 9:59:07 CH ******/
--SET ANSI_NULLS ON
--GO
--SET QUOTED_IDENTIFIER ON
--GO
--ALTER PROCEDURE [dbo].[SP_gioHang]
--    @action NVARCHAR(100) = 'list_gioHang',
--    @id INT = NULL,
--    @so_luong INT = NULL,
--    @accounts_id INT = NULL,
--    @product_id INT = NULL,
--    @gia_ban DECIMAL(18, 0) = NULL
	

--AS
--BEGIN
--    SET NOCOUNT ON;

--IF (@action = 'list_gioHang')
--BEGIN
--    SELECT gh.[id], gh.[so_luong], gh.[accounts_id], gh.[product_id], gh.[gia_ban], sp.[image], sp.[so_luong] AS max_so_luong,sp.ten
--    FROM [gio_hang] gh
--    LEFT JOIN [san_pham] sp ON gh.[product_id] = sp.[id]
--    WHERE @accounts_id IS NOT NULL AND gh.[accounts_id] = @accounts_id
--    FOR JSON PATH, ROOT('data'), INCLUDE_NULL_VALUES;
--END

--    ELSE IF (@action = 'add_gioHang')
--    BEGIN
--        IF @so_luong IS NULL OR @accounts_id IS NULL OR @product_id IS NULL OR @gia_ban IS NULL
--        BEGIN
--            SELECT N'{"ok": 0, "msg": "Thông tin không hợp lệ hoặc thiếu", "data": []}' AS json;
--        END
--        ELSE
--        BEGIN
--            INSERT INTO [gio_hang] ([so_luong], [accounts_id], [product_id], [gia_ban])
--            VALUES (@so_luong, @accounts_id, @product_id, @gia_ban);
--            SELECT N'{"ok": 1, "msg": "Đã thêm sản phẩm vào giỏ hàng thành công"}' AS json;
--        END
--    END
--   ELSE IF (@action = 'edit_gioHang')
--    BEGIN
--        IF @id IS NULL
--        BEGIN
--            SELECT N'{"ok": 0, "msg": "Mã giỏ hàng không được để trống", "data": []}' AS json;
--        END
--        ELSE
--        BEGIN
--            UPDATE [gio_hang]
--            SET [so_luong] = @so_luong
--            WHERE [id] = @id;

--            IF @@ROWCOUNT > 0
--            BEGIN
--                SELECT N'{"ok": 1, "msg": "Đã cập nhật số lượng sản phẩm trong giỏ hàng thành công"}' AS json;
--            END
--            ELSE
--            BEGIN
--                SELECT N'{"ok": 0, "msg": "Không tìm thấy giỏ hàng để cập nhật", "data": []}' AS json;
--            END
--        END
--    END

--    ELSE IF (@action = 'delete_gioHang')
--    BEGIN
--        IF @id IS NULL
--        BEGIN
--            SELECT N'{"ok": 0, "msg": "Mã giỏ hàng không được để trống", "data": []}' AS json;
--        END
--        ELSE
--        BEGIN
--            DELETE FROM [gio_hang]
--            WHERE [id] = @id;
--            IF @@ROWCOUNT > 0
--            BEGIN
--                SELECT N'{"ok": 1, "msg": "Đã xóa giỏ hàng"}' AS json;
--            END
--            ELSE
--            BEGIN
--                SELECT N'{"ok": 0, "msg": "Không tìm thấy giỏ hàng để xóa", "data": []}' AS json;
--            END
--        END
--    END
--    ELSE IF (@action = 'search_gioHang')
--    BEGIN
--        SELECT [id], [so_luong], [accounts_id], [product_id], [gia_ban]
--        FROM [gio_hang]
--        WHERE (@id IS NULL OR [id] = @id)
--          AND (@so_luong IS NULL OR [so_luong] = @so_luong)
--          AND (@accounts_id IS NULL OR [accounts_id] = @accounts_id)
--          AND (@product_id IS NULL OR [product_id] = @product_id)
--          AND (@gia_ban IS NULL OR [gia_ban] = @gia_ban)
--        FOR JSON PATH, ROOT('data'), INCLUDE_NULL_VALUES;
--    END
--    ELSE
--    BEGIN
--        SELECT N'{"ok": 0, "msg": "Hành động không hợp lệ", "data": []}' AS json;
--    END
--END
CREATE PROCEDURE [dbo].[SP_gioHang]
    @action NVARCHAR(100) = 'list_gioHang',
    @id INT = NULL,
    @so_luong INT = NULL,
    @accounts_id INT = NULL,
    @product_id INT = NULL,
    @gia_ban DECIMAL(18, 0) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF (@action = 'list_gioHang')
    BEGIN
        SELECT gh.[id], gh.[so_luong], gh.[accounts_id], gh.[product_id], gh.[gia_ban], sp.[image], sp.[so_luong] AS max_so_luong, sp.ten
        FROM [gio_hang] gh
        LEFT JOIN [san_pham] sp ON gh.[product_id] = sp.[id]
        WHERE @accounts_id IS NOT NULL AND gh.[accounts_id] = @accounts_id
        FOR JSON PATH, ROOT('data'), INCLUDE_NULL_VALUES;
    END
    ELSE IF (@action = 'add_gioHang')
    BEGIN
        IF @so_luong IS NULL OR @accounts_id IS NULL OR @product_id IS NULL OR @gia_ban IS NULL
        BEGIN
            SELECT N'{"ok": 0, "msg": "Thông tin không hợp lệ hoặc thiếu", "data": []}' AS json;
        END
        ELSE
        BEGIN
            INSERT INTO [gio_hang] ([so_luong], [accounts_id], [product_id], [gia_ban])
            VALUES (@so_luong, @accounts_id, @product_id, @gia_ban);
            SELECT N'{"ok": 1, "msg": "Đã thêm sản phẩm vào giỏ hàng thành công"}' AS json;
        END
    END
    ELSE IF (@action = 'edit_gioHang')
    BEGIN
        IF @id IS NULL
        BEGIN
            SELECT N'{"ok": 0, "msg": "Mã giỏ hàng không được để trống", "data": []}' AS json;
        END
        ELSE
        BEGIN
            UPDATE [gio_hang]
            SET [so_luong] = @so_luong
            WHERE [id] = @id;

            IF @@ROWCOUNT > 0
            BEGIN
                SELECT N'{"ok": 1, "msg": "Đã cập nhật số lượng sản phẩm trong giỏ hàng thành công"}' AS json;
            END
            ELSE
            BEGIN
                SELECT N'{"ok": 0, "msg": "Không tìm thấy giỏ hàng để cập nhật", "data": []}' AS json;
            END
        END
    END
    ELSE IF (@action = 'delete_gioHang')
    BEGIN
        IF @id IS NULL
        BEGIN
            SELECT N'{"ok": 0, "msg": "Mã giỏ hàng không được để trống", "data": []}' AS json;
        END
        ELSE
        BEGIN
            DELETE FROM [gio_hang]
            WHERE [id] = @id;
            IF @@ROWCOUNT > 0
            BEGIN
                SELECT N'{"ok": 1, "msg": "Đã xóa giỏ hàng"}' AS json;
            END
            ELSE
            BEGIN
                SELECT N'{"ok": 0, "msg": "Không tìm thấy giỏ hàng để xóa", "data": []}' AS json;
            END
        END
    END
    ELSE IF (@action = 'search_gioHang')
    BEGIN
        SELECT [id], [so_luong], [accounts_id], [product_id], [gia_ban]
        FROM [gio_hang]
        WHERE (@id IS NULL OR [id] = @id)
          AND (@so_luong IS NULL OR [so_luong] = @so_luong)
          AND (@accounts_id IS NULL OR [accounts_id] = @accounts_id)
          AND (@product_id IS NULL OR [product_id] = @product_id)
          AND (@gia_ban IS NULL OR [gia_ban] = @gia_ban)
        FOR JSON PATH, ROOT('data'), INCLUDE_NULL_VALUES;
    END
    ELSE
    BEGIN
        SELECT N'{"ok": 0, "msg": "Hành động không hợp lệ", "data": []}' AS json;
    END
END

--exec SP_gioHang @action='edit_gioHang',@id =43,@so_luong=2
GO
/****** Object:  StoredProcedure [dbo].[SP_nhucut]    Script Date: 15/06/2024 4:27:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_nhucut]
   @account_id INT
AS
BEGIN
    SET NOCOUNT ON;

   SELECT 
        a.id,
        a.tai_khoan,
        a.role_id,
        ad.ho_ten,
        ad.ngay_sinh,
        ad.gioi_tinh,
        ad.dia_chi,
        ad.email,
        ad.sdt
    FROM 
        Accounts a
    LEFT JOIN 
        accounts_detail ad ON a.id = ad.id
    WHERE 
        a.id = @account_id
    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES;
	end
GO
/****** Object:  StoredProcedure [dbo].[SP_sanPham]    Script Date: 15/06/2024 4:27:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_sanPham]
    @action NVARCHAR(100) = 'list_SanPham',
    @id INT = NULL,
    @ten NVARCHAR(100) = NULL,
    @mo_ta NVARCHAR(MAX) = NULL,
    @gia DECIMAL(18, 0) = NULL,
    @so_luong INT = NULL,
    @hang NVARCHAR(50) = NULL,
    @sales_id INT = NULL,
    @cartegory_id INT = NULL,
    @image NVARCHAR(MAX) = NULL,
    @accounts_id INT = NULL,
    @product_id INT = NULL, 
    @quantity INT = NULL, -- Thêm tham số số lượng
    @gia_ban DECIMAL(18, 0) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF (@action = 'list_SanPham')
    BEGIN
        SELECT [id], [ten], [mo_ta], [gia], [so_luong], [hang], [sales_id], [cartegory_id], [image]
        FROM [san_pham]
        WHERE @cartegory_id IS NULL OR [cartegory_id] = @cartegory_id
        FOR JSON PATH, ROOT('data'), INCLUDE_NULL_VALUES;
        RETURN; -- Thêm dòng này để thoát
    END

IF (@action = 'list_SanPham_ad')
BEGIN
    DECLARE @json NVARCHAR(MAX);
    SET @json = N'{"ok":1,"msg":"ok","data":';

    SELECT @json = @json + (
        SELECT
            id,
            ten,
            mo_ta,
            gia,
            so_luong,
            hang,
            sales_id,
            cartegory_id,
            ISNULL(image, '') AS image
        FROM (
            SELECT DISTINCT -- Sử dụng DISTINCT để chỉ lấy ra mỗi sản phẩm một lần
                id,
                ten,
                mo_ta,
                gia,
                so_luong,
                hang,
                sales_id,
                cartegory_id,
                ISNULL(image, '') AS image
            FROM
                san_pham
        ) AS unique_products
        FOR JSON PATH
    );

    SET @json = @json + '}';

    SELECT @json AS json;
    RETURN; -- Thêm dòng này để thoát
END


    ELSE IF (@action = 'add_SanPham')
    BEGIN
        IF COALESCE(@ten, '') = '' OR COALESCE(@mo_ta, '') = '' OR @gia IS NULL OR @so_luong IS NULL OR COALESCE(@hang, '') = '' OR @sales_id IS NULL OR @cartegory_id IS NULL OR @image IS NULL
        BEGIN
            SELECT N'{"ok": 0, "msg": "Thông tin không hợp lệ hoặc thiếu", "data": []}' AS json;
        END
        ELSE
        BEGIN
            INSERT INTO [san_pham] ([ten], [mo_ta], [gia], [so_luong], [hang], [sales_id], [cartegory_id], [image])
            VALUES (@ten, @mo_ta, @gia, @so_luong, @hang, @sales_id, @cartegory_id, @image);
            SELECT N'{"ok": 1, "msg": "Đã thêm sản phẩm mới thành công"}' AS json;
        END
    END
    ELSE IF (@action = 'edit_SanPham')
    BEGIN
        IF @id IS NULL
        BEGIN
            SELECT N'{"ok": 0, "msg": "Mã sản phẩm không được để trống", "data": []}' AS json;
        END
        ELSE
        BEGIN
            UPDATE [san_pham]
            SET [ten] = @ten,
                [mo_ta] = @mo_ta,
                [gia] = @gia,
                [so_luong] = @so_luong,
                [hang] = @hang,
                [sales_id] = @sales_id,
                [cartegory_id] = @cartegory_id,
                [image] = @image
            WHERE [id] = @id;
            SELECT N'{"ok": 1, "msg": "Đã cập nhật thông tin sản phẩm"}' AS json;
        END
    END
    ELSE IF (@action = 'delete_sanPham')
    BEGIN
        IF @id IS NULL
        BEGIN
            SELECT N'{"ok": 0, "msg": "Mã sản phẩm không được để trống", "data": []}' AS json;
        END
        ELSE
        BEGIN
            DELETE FROM [san_pham]
            WHERE [id] = @id;
            IF @@ROWCOUNT > 0
            BEGIN
                SELECT N'{"ok": 1, "msg": "Đã xóa sản phẩm"}' AS json;
            END
            ELSE
            BEGIN
                SELECT N'{"ok": 0, "msg": "Không tìm thấy sản phẩm để xóa", "data": []}' AS json;
            END
        END
    END
    ELSE IF (@action = 'search_SanPham')
    BEGIN
        SELECT [id], [ten], [mo_ta], [gia], [so_luong], [hang], [sales_id], [cartegory_id], [image]
        FROM [san_pham]
        WHERE (@id IS NULL OR [id] = @id)
          AND (@ten IS NULL OR [ten] LIKE '%' + @ten + '%')
          AND (@mo_ta IS NULL OR [mo_ta] LIKE '%' + @mo_ta + '%')
          AND (@gia IS NULL OR [gia] = @gia)
          AND (@so_luong IS NULL OR [so_luong] = @so_luong)
          AND (@hang IS NULL OR [hang] LIKE '%' + @hang + '%')
          AND (@sales_id IS NULL OR [sales_id] = @sales_id)
          AND (@cartegory_id IS NULL OR [cartegory_id] = @cartegory_id)
          AND (@image IS NULL OR [image] = @image)
        FOR JSON PATH, ROOT('data'), INCLUDE_NULL_VALUES;
    END
  ELSE IF (@action = 'add_to_cart')
BEGIN
    IF @accounts_id IS NULL OR @product_id IS NULL OR @quantity IS NULL OR @quantity <= 0 
    BEGIN
        SELECT N'{"ok": 0, "msg": "Thông tin không hợp lệ hoặc thiếu", "data": []}' AS json;
    END
    ELSE
    BEGIN
        DECLARE @current_quantity INT;

        -- Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        SELECT @current_quantity = so_luong
        FROM gio_hang
        WHERE accounts_id = @accounts_id AND product_id = @product_id;

        IF @current_quantity IS NOT NULL
        BEGIN
            -- Nếu sản phẩm đã tồn tại, cập nhật số lượng
            UPDATE gio_hang
            SET so_luong = so_luong + @quantity
            WHERE accounts_id = @accounts_id AND product_id = @product_id;
            
            SELECT N'{"ok": 1, "msg": "Sản phẩm đã được cập nhật số lượng trong giỏ hàng"}' AS json;
        END
        ELSE
        BEGIN
            -- Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
            INSERT INTO gio_hang (accounts_id, product_id, so_luong, gia_ban)
            VALUES (@accounts_id, @product_id, @quantity, @gia_ban);
            
            SELECT N'{"ok": 1, "msg": "Sản phẩm đã được thêm vào giỏ hàng"}' AS json;
        END
    END
END

ELSE IF (@action = 'buy_now')
BEGIN
    IF @accounts_id IS NULL OR @product_id IS NULL OR @quantity IS NULL OR @quantity <= 0 
    BEGIN
        SELECT N'{"ok": 0, "msg": "Thông tin không hợp lệ hoặc thiếu", "data": []}' AS json;
    END
    ELSE
    BEGIN
        -- Tiến hành mua hàng
        -- Giảm số lượng trong bảng sản phẩm
        UPDATE san_pham
        SET so_luong = so_luong - @quantity
        WHERE id = @product_id;

        -- Chèn giao dịch mua vào bảng giả định purchases
        INSERT INTO purchases (accounts_id, product_id, so_luong, gia_ban)
        VALUES (@accounts_id, @product_id, @quantity, @gia_ban);

        SELECT N'{"ok": 1, "msg": "Mua hàng thành công"}' AS json;
    END
END

    ELSE IF (@action = 'get_SanPham')
    BEGIN
        IF @product_id IS NULL
        BEGIN
            SELECT N'{"ok": 0, "msg": "Mã sản phẩm không được để trống", "data": []}' AS json;
        END
        ELSE
        BEGIN
            SELECT [id], [ten], [mo_ta], [gia], [so_luong], [hang], [sales_id], [cartegory_id], [image]
            FROM [san_pham]
            WHERE [id] = @product_id
            FOR JSON PATH, ROOT('data'), INCLUDE_NULL_VALUES;
        END
    END
    ELSE
    BEGIN
        SELECT N'{"ok": 0, "msg": "Hành động không hợp lệ", "data": []}' AS json;
    END;
END;

----exec SP_sanPham @action='get_SanPham', @product_id=3
--exec SP_sanPham @action='list_SanPham_ad'
GO
USE [master]
GO
ALTER DATABASE [maytinhonl] SET  READ_WRITE 
GO
