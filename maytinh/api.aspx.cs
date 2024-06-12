using SuatAn;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Runtime.Remoting.Contexts;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;



namespace maytinh.images
{
    public partial class api : System.Web.UI.Page
    {


        // Phương thức xử lý các hành động liên quan đến sản phẩm
        void xuly_sanPham(string action)
        {
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_SanPham", action);

            switch (action)
            {
                case "add_SanPham":
                case "edit_SanPham":
                    cm.Parameters.Add("@ten", SqlDbType.NVarChar, 100).Value = Request.Form["ten"];
                    cm.Parameters.Add("@mo_ta", SqlDbType.NVarChar, -1).Value = Request.Form["mo_ta"];
                    cm.Parameters.Add("@gia", SqlDbType.Decimal).Value = Convert.ToDecimal(Request.Form["gia"]);
                    cm.Parameters.Add("@so_luong", SqlDbType.Int).Value = Convert.ToInt32(Request.Form["so_luong"]);
                    cm.Parameters.Add("@hang", SqlDbType.NVarChar, 50).Value = Request.Form["hang"];
                    cm.Parameters.Add("@sales_id", SqlDbType.Int).Value = Convert.ToInt32(Request.Form["sales_id"]);
                    cm.Parameters.Add("@cartegory_id", SqlDbType.Int).Value = Convert.ToInt32(Request.Form["cartegory_id"]);
                    cm.Parameters.Add("@image", SqlDbType.NVarChar, -1).Value = Request.Form["image"];
                    break;
                case "list_SanPham":
                    cm.Parameters.Add("@cartegory_id", SqlDbType.Int).Value = Convert.ToInt32(Request.Form["cartegory_id"]);
                    break;
                case "add_to_cart":
                case "buy_now":
                    if (Session["accountId"] == null)
                    {
                        Response.Write("{\"ok\": 0, \"msg\": \"Bạn cần đăng nhập để thực hiện hành động này.\"}");
                        return;
                    }
                    cm.Parameters.Add("@accounts_id", SqlDbType.Int).Value = Convert.ToInt32(Session["accountId"]);
                    cm.Parameters.Add("@product_id", SqlDbType.Int).Value = Convert.ToInt32(Request.Form["product_id"]);
                    cm.Parameters.Add("@quantity", SqlDbType.Int).Value = Convert.ToInt32(Request.Form["quantity"]);
                    cm.Parameters.Add("@gia_ban", SqlDbType.Decimal).Value = Convert.ToDecimal(Request.Form["gia_ban"]);
                    break;
            }

            switch (action)
            {
                case "edit_SanPham":
                case "delete_SanPham":
                case "search_SanPham":
                    cm.Parameters.Add("@id", SqlDbType.Int).Value = Convert.ToInt32(Request.Form["id"]);
                    break;
                case "get_SanPham":
                    // Lấy thông tin sản phẩm dựa trên productId
                    cm.Parameters.Add("@product_id", SqlDbType.Int).Value = Convert.ToInt32(Request.Form["product_id"]);
                    break;
            }

            string json = (string)db.Scalar(cm);
            Response.Write(json);
        }

        public class LoginResponse
        {
            public int ok { get; set; }
            public string msg { get; set; }
            public int account_id { get; set; }
            public string tai_khoan { get; set; }
        }

        void xuLyDangNhap()
        {
            string taiKhoan = Request.Form["tai_khoan"];
            string matKhau = Request.Form["mat_khau"];

            if (string.IsNullOrEmpty(taiKhoan) || string.IsNullOrEmpty(matKhau))
            {
                Response.Write("{\"ok\": 0, \"msg\": \"Tài khoản và mật khẩu không được để trống\"}");
                return;
            }

            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_Account", "login");
            cm.Parameters.AddWithValue("@tai_khoan", taiKhoan);
            cm.Parameters.AddWithValue("@mat_khau", matKhau);

            string json = (string)db.Scalar(cm);

            if (json.Contains("\"ok\": 1"))
            {
                var response = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, object>>(json);
                Session["accountId"] = response["account_id"];
                Session["tai_khoan"] = taiKhoan;
            }

            Response.Write(json);
        }


        void CheckLoginStatus()
        {
            string taiKhoan = "";
            if (Session?["accountId"] != null)
            {
                int accountId = Convert.ToInt32(Session["accountId"]);
                 taiKhoan = Session["tai_khoan"].ToString();
                Response.Write("{\"ok\": 1, \"msg\": \"User is logged in\", \"account_id\": " + accountId + ", \"tai_khoan\": \"" + taiKhoan + "\"}");
            }
            else
            {
                Response.Write("{\"ok\": 0, \"msg\": \"User is not logged in\"}");
            }
        }
        void xuly_userInfo(string action)
        {
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_Account", action);
            switch(action)
            {
                case "get_user_info":
             
                    cm.Parameters.Add("@account_id", SqlDbType.Int).Value = Convert.ToInt32(Request.Form["account_id"]);
                    break;

            }    
           

            string json = (string)db.Scalar(cm);
            Response.Write(json);
        }
        void xuly_dangky(string action)
        {
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_Account", action);
           cm.Parameters.Add("@tai_khoan", SqlDbType.NVarChar,50).Value = Request["tai_khoan"];
            cm.Parameters.Add("@mat_khau", SqlDbType.NVarChar, 50).Value = Request["mat_khau"];
            cm.Parameters.Add("@ngay_sinh", SqlDbType.Date).Value = Request["ngay_sinh"];
            cm.Parameters.Add("@ho_ten", SqlDbType.NVarChar, 50).Value = Request["ho_ten"];
            cm.Parameters.Add("@gioi_tinh", SqlDbType.NVarChar, 10).Value = Request["gioi_tinh"];
            cm.Parameters.Add("@dia_chi", SqlDbType.NVarChar, 100).Value = Request["dia_chi"];
            cm.Parameters.Add("@email", SqlDbType.NVarChar, 50).Value = Request["email"];
            cm.Parameters.Add("@sdt", SqlDbType.NVarChar, 10).Value = Request["sdt"];




            string json = (string)db.Scalar(cm);
            Response.Write(json);
        }
        void xuly_danhmuc(string action)
        {
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_danhMuc", action);
            switch (action)
            {
                case "get_list":
                    cm.Parameters.Add("@id", SqlDbType.Int).Value = Convert.ToInt32(Request.Form["id_danhmuc"]);
                    cm.Parameters.Add("@ten", SqlDbType.Int).Value = Request["ten_danhmuc"];
                    cm.Parameters.Add("@mota", SqlDbType.Int).Value = Request["mota_danhmuc"];
                    break;
                case "insert":
                case "delete":
                    cm.Parameters.Add("@id", SqlDbType.Int).Value = Convert.ToInt32(Request.Form["id_danhmuc"]);
                    break;

            }




            string json = (string)db.Scalar(cm);
            Response.Write(json);
        }

        void xuly_giohang(string action)
        {
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_gioHang", action);
            switch (action)
            {
                case "list_gioHang":
                    cm.Parameters.Add("@accounts_id", SqlDbType.Int).Value = Convert.ToInt32(Request.Form["accounts_id"]);
                    break;
                case "delete_gioHang":
                    
                    cm.Parameters.Add("@id", SqlDbType.Int).Value = Convert.ToInt32(Request.Form["id"]);
                    break;
                case "edit_gioHang":
                    cm.Parameters.Add("@id", SqlDbType.Int).Value = Convert.ToInt32(Request.Form["id"]);
                    cm.Parameters.Add("@so_luong", SqlDbType.Int).Value = Request["so_luong"];

                    break;
            }




            string json = (string)db.Scalar(cm);
            Response.Write(json);
        }
        public void xuly_donHang(string action)
        {
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_donHang", action);

            switch (action)
            {
                case "insert_donHang":
                    cm.Parameters.Add("@user_id", SqlDbType.Int).Value = Request["user_id"];
                    cm.Parameters.Add("@thanh_toan", SqlDbType.NVarChar, 50).Value = Request["thanh_toan"];
                    cm.Parameters.Add("@product_id", SqlDbType.Int).Value = Request["product_id"];
                    cm.Parameters.Add("@so_luong", SqlDbType.Int).Value = Request.Form["so_luong"];
                    cm.Parameters.Add("@gia_ban", SqlDbType.Decimal).Value = Request.Form["gia_ban"];
                    cm.Parameters.Add("@ho_ten", SqlDbType.NVarChar,50).Value = Request.Form["ho_ten"];
                    cm.Parameters.Add("@dia_chi", SqlDbType.NVarChar, 100).Value = Request.Form["dia_chi"];
                    cm.Parameters.Add("@sdt", SqlDbType.NVarChar, 10).Value = Request.Form["sdt"];
                    break;

                case "get_list_donHang":
                    cm.Parameters.Add("@user_id", SqlDbType.Int).Value = Request["user_id"];
                    break;

                case "get_list_ad":
                    // No additional parameters needed
                    break;

                case "delete_donHang":
                    cm.Parameters.Add("@order_id", SqlDbType.Int).Value = Request.Form["order_id"];
                    break;

                default:
                    throw new Exception("Hành động không hợp lệ.");
            }

            string json = (string)db.Scalar(cm);
            Response.Write(json);
        }


        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];

            switch (action)
            {
                case "list_SanPham":
                case "add_SanPham":
                case "edit_SanPham":
                case "delete_SanPham":
                case "search_SanPham":
                case "add_to_cart":
                case "buy_now":
                case "get_SanPham":
                    xuly_sanPham(action);
                    break;
                case "login":
                    xuLyDangNhap();
                    break;
                case "check_login":
                    CheckLoginStatus();
                    break;
                case "get_user_info":

                    xuly_userInfo(action);
                    break;
                case "register":

                    xuly_dangky(action);
                    break;
                case "list_gioHang":
                case "delete_gioHang":
                case "edit_gioHang":
                    xuly_giohang(action);
                    break;
                case "get_list":
                case "insert":
                case "delete":
                   xuly_danhmuc(action);
                    break;
                case "insert_donHang":
                case "get_list_donHang":
                case "get_list_ad":
                case "delete_donHang":
                    xuly_donHang(action); 
                    break;
                    


            }
        }

    }
}
