using SuatAn;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.UI; 

namespace maytinh.images
{
    public partial class api : System.Web.UI.Page
    {
        // Phương thức xử lý các hành động liên quan đến sản phẩm
        void xuly_sanPham(string action)
        {
            
            
                // Kết nối đến cơ sở dữ liệu và thiết lập stored procedure
                SqlServer db = new SqlServer();
                SqlCommand cm = db.GetCmd("SP_SanPham", action);

                // Thêm các tham số dựa trên action
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
                }

                // Các hành động có tham số id
                switch (action)
                {
                    case "edit_SanPham":
                    case "delete_SanPham":
                    case "search_SanPham":
                        cm.Parameters.Add("@id", SqlDbType.Int).Value = Convert.ToInt32(Request.Form["id"]);
                        break;
                }

                // Thực thi stored procedure và lấy kết quả
                string json = (string)db.Scalar(cm);

                // Hiển thị kết quả lên trang web
                Response.Write(json);
            
           
        }

        // Phương thức xử lý khi trang được tải
        protected void Page_Load(object sender, EventArgs e)
        {
            // Lấy tham số action từ QueryString (GET) hoặc Form (POST)
            string action = Request["action"];
           

            switch (action)
            {
                case "list_SanPham":
                case "add_SanPham":
                case "edit_SanPham":
                case "delete_SanPham":
                case "search_SanPham":
                    xuly_sanPham(action);
                    break;
               
            }
        }
    }
}
