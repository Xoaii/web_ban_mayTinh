//function toggleContent() {
//    var hiddenContent = document.getElementById("hiddenContent");
//    var button = document.querySelector("#toggleButton");
  
//    console.log(button); // Kiểm tra xem button có tồn tại không
  
//    if (hiddenContent.style.display === "none") {
//      hiddenContent.style.display = "block";
//      button.textContent = "Ẩn bớt nội dung";
//    } else {
//      hiddenContent.style.display = "none";
//      button.textContent = "Xem thêm nội dung";
//    }
//}



document.addEventListener("DOMContentLoaded", function() {
  
    updateDistricts();


});
// gio hang
function delayTime2 (func, wait) {
  return function() {
      var that = this,
              args = [].slice(arguments);
      clearTimeout(func._throttleTimeout);
      func._throttleTimeout = setTimeout(function() {
          func.apply(that, args);
      }, wait);
  };
}
// tron dia chi
var districtsByProvince = {
  hcm: [
      "Quận 1", 
      "Quận 2", 
      "Quận 3", 
      "Quận 4", 
      "Quận 5", 
      "Quận 6", 
      "Quận 7", 
      "Quận 8", 
      "Quận 9", 
      "Quận 10", 
      "Quận 11", 
      "Quận 12", 
      "Bình Thạnh", 
      "Gò Vấp", 
      "Phú Nhuận", 
      "Tân Bình", 
      "Tân Phú", 
      "Bình Tân", 
      "Thủ Đức", 
      "Bình Chánh", 
      "Cần Giờ", 
      "Củ Chi", 
      "Hóc Môn", 
      "Nhà Bè"
  ],
  hn: [
      "Ba Đình", 
      "Hoàn Kiếm", 
      "Tây Hồ", 
      "Long Biên", 
      "Cầu Giấy", 
      "Đống Đa", 
      "Hai Bà Trưng", 
      "Hoàng Mai", 
      "Thanh Xuân", 
      "Nam Từ Liêm", 
      "Bắc Từ Liêm", 
      "Hà Đông", 
      "Sơn Tây",
      "Ba Vì",
      "Chương Mỹ",
      "Đan Phượng",
      "Đông Anh",
      "Gia Lâm",
      "Hoài Đức",
      "Mê Linh",
      "Mỹ Đức",
      "Phú Xuyên",
      "Phúc Thọ",
      "Quốc Oai",
      "Sóc Sơn",
      "Thạch Thất",
      "Thanh Oai",
      "Thanh Trì",
      "Thường Tín",
      "Ứng Hòa"
  ]
};

var wardsByDistrict = {
  // Hà Nội
  "Ba Đình": ["Phường Phúc Xá", "Phường Trúc Bạch", "Phường Vĩnh Phúc", "Phường Cống Vị", "Phường Liễu Giai", "Phường Nguyễn Trung Trực", "Phường Quán Thánh", "Phường Ngọc Hà", "Phường Điện Biên", "Phường Đội Cấn", "Phường Ngọc Khánh", "Phường Kim Mã", "Phường Giảng Võ", "Phường Thành Công"],
  "Hoàn Kiếm": ["Phường Chương Dương", "Phường Cửa Đông", "Phường Cửa Nam", "Phường Đồng Xuân", "Phường Hàng Bạc", "Phường Hàng Bài", "Phường Hàng Bồ", "Phường Hàng Bông", "Phường Hàng Buồm", "Phường Hàng Đào", "Phường Hàng Gai", "Phường Hàng Mã", "Phường Hàng Trống", "Phường Lý Thái Tổ", "Phường Phan Chu Trinh", "Phường Phúc Tân", "Phường Tràng Tiền", "Phường Trần Hưng Đạo"],
  "Tây Hồ": ["Phường Nhật Tân", "Phường Quảng An", "Phường Tứ Liên", "Phường Xuân La", "Phường Yên Phụ", "Phường Thụy Khuê", "Phường Bưởi", "Phường Phú Thượng"],
  "Long Biên": ["Phường Bồ Đề", "Phường Gia Thụy", "Phường Giang Biên", "Phường Long Biên", "Phường Ngọc Lâm", "Phường Ngọc Thụy", "Phường Phúc Đồng", "Phường Phúc Lợi", "Phường Sài Đồng", "Phường Thạch Bàn", "Phường Thượng Thanh", "Phường Việt Hưng"],
  "Cầu Giấy": ["Phường Dịch Vọng", "Phường Dịch Vọng Hậu", "Phường Mai Dịch", "Phường Nghĩa Đô", "Phường Nghĩa Tân", "Phường Quan Hoa", "Phường Trung Hòa", "Phường Yên Hòa"],
  "Đống Đa": ["Phường Cát Linh", "Phường Hàng Bột", "Phường Khâm Thiên", "Phường Khương Thượng", "Phường Kim Liên", "Phường Láng Hạ", "Phường Láng Thượng", "Phường Nam Đồng", "Phường Ngã Tư Sở", "Phường Ô Chợ Dừa", "Phường Phương Liên", "Phường Phương Mai", "Phường Quang Trung", "Phường Quốc Tử Giám", "Phường Thịnh Quang", "Phường Thổ Quan", "Phường Trung Liệt", "Phường Trung Phụng", "Phường Trung Tự", "Phường Văn Chương", "Phường Văn Miếu"],
  "Hai Bà Trưng": ["Phường Bạch Đằng", "Phường Bạch Mai", "Phường Bùi Thị Xuân", "Phường Cầu Dền", "Phường Đống Mác", "Phường Đồng Nhân", "Phường Đồng Tâm", "Phường Lê Đại Hành", "Phường Minh Khai", "Phường Nguyễn Du", "Phường Nguyễn Trãi", "Phường Phạm Đình Hổ", "Phường Phố Huế", "Phường Quỳnh Lôi", "Phường Quỳnh Mai", "Phường Thanh Lương", "Phường Thanh Nhàn", "Phường Trương Định", "Phường Vĩnh Tuy"],
  "Hoàng Mai": ["Phường Đại Kim", "Phường Định Công", "Phường Giáp Bát", "Phường Hoàng Liệt", "Phường Hoàng Văn Thụ", "Phường Lĩnh Nam", "Phường Mai Động", "Phường Tân Mai", "Phường Thanh Trì", "Phường Thịnh Liệt", "Phường Trần Phú", "Phường Tương Mai", "Phường Vĩnh Hưng", "Phường Yên Sở"],
  "Thanh Xuân": ["Phường Hạ Đình", "Phường Khương Đình", "Phường Khương Mai", "Phường Khương Trung", "Phường Nhân Chính", "Phường Phương Liệt", "Phường Thanh Xuân Bắc", "Phường Thanh Xuân Nam", "Phường Thanh Xuân Trung", "Phường Thượng Đình"],
  "Nam Từ Liêm": ["Phường Cầu Diễn", "Phường Đại Mỗ", "Phường Mễ Trì", "Phường Mỹ Đình 1", "Phường Mỹ Đình 2", "Phường Phú Đô", "Phường Phương Canh", "Phường Tây Mỗ", "Phường Trung Văn", "Phường Xuân Phương"],
  "Bắc Từ Liêm": ["Phường Cổ Nhuế 1", "Phường Cổ Nhuế 2", "Phường Đông Ngạc", "Phường Đức Thắng", "Phường Liên Mạc", "Phường Minh Khai", "Phường Phú Diễn", "Phường Phúc Diễn", "Phường Tây Tựu", "Phường Thượng Cát", "Phường Thụy Phương", "Phường Xuân Đỉnh", "Phường Xuân Tảo"],
  "Hà Đông": ["Phường Biên Giang", "Phường Dương Nội", "Phường Đồng Mai", "Phường Hà Cầu", "Phường Kiến Hưng", "Phường La Khê", "Phường Mộ Lao", "Phường Nguyễn Trãi", "Phường Phú La", "Phường Phú Lãm", "Phường Phú Lương", "Phường Phúc La", "Phường Quang Trung", "Phường Vạn Phúc", "Phường Văn Quán", "Phường Yên Nghĩa", "Phường Yết Kiêu"],
  "Sơn Tây": ["Phường Lê Lợi", "Phường Ngô Quyền", "Phường Phú Thịnh", "Phường Quang Trung", "Phường Sơn Lộc", "Phường Trung Hưng", "Phường Trung Sơn Trầm", "Phường Viên Sơn", "Phường Xuân Khanh"],
  // Hồ Chí Minh
  "Quận 1": ["Phường Bến Nghé", "Phường Bến Thành", "Phường Cầu Kho", "Phường Cầu Ông Lãnh", "Phường Cô Giang", "Phường Đa Kao", "Phường Nguyễn Cư Trinh", "Phường Nguyễn Thái Bình", "Phường Phạm Ngũ Lão", "Phường Tân Định"],
  "Quận 2": ["Phường An Khánh", "Phường An Lợi Đông", "Phường An Phú", "Phường Bình An", "Phường Bình Khánh", "Phường Bình Trưng Đông", "Phường Bình Trưng Tây", "Phường Cát Lái", "Phường Thạnh Mỹ Lợi", "Phường Thảo Điền", "Phường Thủ Thiêm"],
  "Quận 3": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14"],
  "Quận 4": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 8", "Phường 9", "Phường 10", "Phường 12", "Phường 13", "Phường 14", "Phường 15", "Phường 16", "Phường 18"],
  "Quận 5": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
  "Quận 6": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14"],
  "Quận 7": ["Phường Bình Thuận", "Phường Tân Hưng", "Phường Tân Kiểng", "Phường Tân Phong", "Phường Tân Phú", "Phường Tân Quy", "Phường Tân Thuận Đông", "Phường Tân Thuận Tây", "Phường Phú Mỹ"],
  "Quận 8": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15", "Phường 16"],
  "Quận 9": ["Phường Hiệp Phú", "Phường Long Bình", "Phường Long Phước", "Phường Long Thạnh Mỹ", "Phường Long Trường", "Phường Phú Hữu", "Phường Phước Bình", "Phường Phước Long A", "Phường Phước Long B", "Phường Tân Phú", "Phường Tăng Nhơn Phú A", "Phường Tăng Nhơn Phú B", "Phường Trường Thạnh"],
  "Quận 10": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
  "Quận 11": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15", "Phường 16"],
  "Quận 12": ["Phường An Phú Đông", "Phường Đông Hưng Thuận", "Phường Hiệp Thành", "Phường Tân Chánh Hiệp", "Phường Tân Hưng Thuận", "Phường Tân Thới Hiệp", "Phường Tân Thới Nhất", "Phường Thạnh Lộc", "Phường Thạnh Xuân", "Phường Thới An", "Phường Trung Mỹ Tây"],
  "Bình Thạnh": ["Phường 1", "Phường 2", "Phường 3", "Phường 5", "Phường 6", "Phường 7", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15", "Phường 17", "Phường 19", "Phường 21", "Phường 22", "Phường 24", "Phường 25", "Phường 26", "Phường 27", "Phường 28"],
  "Gò Vấp": ["Phường 1", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15", "Phường 16", "Phường 17"],
  "Phú Nhuận": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 15", "Phường 17"],
  "Tân Bình": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
  "Tân Phú": ["Phường Hiệp Tân", "Phường Hòa Thạnh", "Phường Phú Thạnh", "Phường Phú Thọ Hòa", "Phường Phú Trung", "Phường Sơn Kỳ", "Phường Tân Quý", "Phường Tân Sơn Nhì", "Phường Tân Thành", "Phường Tân Thới Hòa", "Phường Tây Thạnh"],
  "Bình Tân": ["Phường An Lạc", "Phường An Lạc A", "Phường Bình Hưng Hòa", "Phường Bình Hưng Hòa A", "Phường Bình Hưng Hòa B", "Phường Bình Trị Đông", "Phường Bình Trị Đông A", "Phường Bình Trị Đông B", "Phường Tân Tạo", "Phường Tân Tạo A"],
  "Thủ Đức": ["Phường Bình Chiểu", "Phường Bình Thọ", "Phường Hiệp Bình Chánh", "Phường Hiệp Bình Phước", "Phường Linh Chiểu", "Phường Linh Đông", "Phường Linh Tây", "Phường Linh Trung", "Phường Linh Xuân", "Phường Tam Bình", "Phường Tam Phú", "Phường Trường Thọ"],
  "Bình Chánh": ["Xã An Phú Tây", "Xã Bình Chánh", "Xã Bình Hưng", "Xã Bình Lợi", "Xã Đa Phước", "Xã Hưng Long", "Xã Lê Minh Xuân", "Xã Phạm Văn Hai", "Xã Phong Phú", "Xã Quy Đức", "Xã Tân Kiên", "Xã Tân Nhựt", "Xã Tân Quý Tây", "Xã Vĩnh Lộc A", "Xã Vĩnh Lộc B"],
  "Cần Giờ": ["Xã An Thới Đông", "Xã Bình Khánh", "Xã Long Hòa", "Xã Lý Nhơn", "Xã Tam Thôn Hiệp", "Xã Thạnh An"],
  "Củ Chi": ["Thị trấn Củ Chi", "Xã An Nhơn Tây", "Xã An Phú", "Xã Bình Mỹ", "Xã Hòa Phú", "Xã Nhuận Đức", "Xã Phạm Văn Cội", "Xã Phú Hòa Đông", "Xã Phú Mỹ Hưng", "Xã Phước Hiệp", "Xã Phước Thạnh", "Xã Phước Vĩnh An", "Xã Tân An Hội", "Xã Tân Phú Trung", "Xã Tân Thạnh Đông", "Xã Tân Thạnh Tây", "Xã Tân Thông Hội", "Xã Thái Mỹ", "Xã Trung An", "Xã Trung Lập Hạ", "Xã Trung Lập Thượng"],
  "Hóc Môn": ["Thị trấn Hóc Môn", "Xã Bà Điểm", "Xã Đông Thạnh", "Xã Nhị Bình", "Xã Tân Hiệp", "Xã Tân Thới Nhì", "Xã Tân Xuân", "Xã Thới Tam Thôn", "Xã Trung Chánh", "Xã Xuân Thới Đông", "Xã Xuân Thới Sơn", "Xã Xuân Thới Thượng"],
  "Nhà Bè": ["Thị trấn Nhà Bè", "Xã Hiệp Phước", "Xã Long Thới", "Xã Nhơn Đức", "Xã Phú Xuân", "Xã Phước Kiển", "Xã Phước Lộc"]
};


function updateDistricts() {
  var province = document.getElementById("province").value;
  var districtSelect = document.getElementById("district");

  // Xóa tất cả các option hiện tại
  districtSelect.innerHTML = "";

  // Kiểm tra xem tỉnh/thành phố có trong districtsByProvince không
  if (districtsByProvince[province]) {
      // Thêm các quận/huyện thuộc tỉnh/thành phố đã chọn vào danh sách
      districtsByProvince[province].forEach(function (district) {
          var option = document.createElement("option");
          option.text = district;
          option.value = district;
          districtSelect.add(option);
      });

      // Cập nhật danh sách phường/xã cho quận/huyện đầu tiên
      updateWards();
  } else {
      console.error("No districts found for the selected province.");
  }
}

function updateWards() {
  var district = document.getElementById("district").value;
  var wardSelect = document.getElementById("ward");

  // Xóa tất cả các option hiện tại
  wardSelect.innerHTML = "";

  // Kiểm tra xem có phường/xã nào không
  if (wardsByDistrict[district]) {
      // Thêm các phường/xã thuộc quận/huyện đã chọn vào danh sách
      wardsByDistrict[district].forEach(function (ward) {
          var option = document.createElement("option");
          option.text = ward;
          option.value = ward;
          wardSelect.add(option);
      });
  } else {
      console.error("No wards found for the selected district.");
  }
}

// Gọi updateDistricts() lần đầu để khởi tạo danh sách quận/huyện và phường/xã
document.addEventListener("DOMContentLoaded", function() {
  updateDistricts();
});
const api = '/api.aspx';// khai báo biến toàn cục
$(document).ready(function () {
    
    // Gọi hàm với giá trị category_id và containerId mong muốn
    hienThiDanhSachSanPham(1, 'pc-products'); // Hiển thị sản phẩm có category_id = 1
    hienThiDanhSachSanPham(2, 'cpu-products'); // Hiển thị sản phẩm có category_id = 2

   ;
    function hienThiDanhSachSanPham(category_id, containerId) {
        $.post(api, { action: 'list_SanPham', cartegory_id: category_id }, function (response) {
            try {
                var responseData = JSON.parse(response);
                if (responseData && responseData.data && Array.isArray(responseData.data)) {
                    var products = responseData.data;

                    // Xóa nội dung cũ của thẻ chứa sản phẩm trước khi thêm sản phẩm mới
                    $('#' + containerId).empty();

                    // Lặp qua danh sách sản phẩm và hiển thị
                    products.forEach(function (product) {
                        var productHTML = `
                        <div class="cartegory-item-main">
                            <div class="cartegory-item-main-box">
                                <img src="${product.image}" alt="">
                                <div class="cartegory-item-main-box-infor">
                                    <a href="/products/product.html?product_id=${product.id}">${product.ten}</a>
                                </div>
                                <div class="cartegory-item-main-box-price">
                                    <p>${product.gia} <sup>₫</sup></p>
                                </div>
                                <div class="cartegory-item-main-box-shoppingCart"> 
                                    <div class="cartegory-item-main-box-shoppingCart-boder">
                                        <img src="images/shopping-cart.png" alt="">
                                    </div>
                                    <p>THÊM VÀO GIỎ</p> 
                                </div>
                            </div>
                        </div>
                    `;
                        $('#' + containerId).append(productHTML);
                    });
                } else {
                    console.error('Dữ liệu không hợp lệ');
                }
            } catch (error) {
                console.error('Lỗi trong quá trình xử lý dữ liệu JSON:', error);
            }
        }).fail(function (xhr, status, error) {
            console.error('Lỗi khi gửi yêu cầu:', error);
        });
    }

    
    // Lấy productId từ URL
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('product_id');
   

    // Gọi hàm lấy chi tiết sản phẩm nếu productId hợp lệ
    if (productId !== null && !isNaN(productId)) {
        getProductDetails(productId);
    } else {
        console.error("Giá trị product_id không hợp lệ.");
    }

    // Hàm lấy chi tiết sản phẩm từ productId
    function getProductDetails(productId) {
        $.post(api, { action: 'get_SanPham', product_id: productId }, function (response) {
            try {
                // Kiểm tra dữ liệu JSON trước khi phân tích
                if (response.trim() !== "") {
                    var responseData = JSON.parse(response);
                    console.log(responseData);

                    // Kiểm tra xem responseData có dữ liệu không
                    if (responseData && responseData.data && responseData.data.length > 0) {
                        var product = responseData.data[0]; // Lấy thông tin sản phẩm đầu tiên từ mảng data
                        console.log(product.id); // Kiểm tra xem có thể truy cập thuộc tính id của sản phẩm không
                        console.log(product.ten); // Kiểm tra xem có thể truy cập thuộc tính tên của sản phẩm không

                        // Cập nhật thông tin sản phẩm lên trang HTML
                        $('#product-details').data('product-id', product.id);
                        $('#product-details').data('product-price', product.gia*1.1);
                        $('#product-name').text(product.ten);
                        $('#product-img').attr('src', product.image);
                        $('#product-description').text(product.mo_ta);
                        $('#product-price').text(formatPrice(product.gia * 1.1));
                    } else {
                        console.error("Dữ liệu JSON trống hoặc không hợp lệ.");
                    }
                } else {
                    console.error("Dữ liệu JSON trống.");
                }
            } catch (error) {
                console.error("Lỗi khi phân tích JSON:", error);
            }
        }).fail(function (xhr, status, error) {
            console.error(error);
        });
    }

    // Hàm định dạng giá tiền
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₫";
    }

    // Xử lý sự kiện khi click vào nút "Thêm vào giỏ" hoặc "Mua ngay"
    $('#add-to-cart').click(function () {
        var productId = $('#product-details').data('product-id');
        var productName = $('#product-name').text();
        var productPrice = $('#product-details').data('product-price');
        var productQuantity = $('#product-quantity').val();

        // Thực hiện thêm sản phẩm vào giỏ hàng ở đây
        console.log("Thêm sản phẩm vào giỏ hàng:", productId, productName, productPrice, productQuantity);
        requireLogin('add_to_cart', productId, productPrice, productQuantity);
    });

    $('#buy-now').click(function () {
        var productId = $('#product-details').data('product-id');
        var productName = $('#product-name').text();
        var productPrice = $('#product-details').data('product-price');
        var productQuantity = $('#product-quantity').val();

        // Thực hiện mua ngay sản phẩm ở đây
        console.log("Mua ngay sản phẩm:", productId, productName, productPrice, productQuantity);
        requireLogin('buy_now', productId, productPrice, productQuantity);
    });

    function updateQuantityDisplay(quantity) {
        $('#product-quantity').val(quantity);
    }

    $('#increaseButton').click(function () {
        var currentQuantity = parseInt($('#product-quantity').val());
        if (!isNaN(currentQuantity)) {
            updateQuantityDisplay(currentQuantity + 1);
        } else {
            updateQuantityDisplay(1); // Default to 1 if the current value is not a number
        }
    });

    $('#decreaseButton').click(function () {
        var currentQuantity = parseInt($('#product-quantity').val());
        if (!isNaN(currentQuantity) && currentQuantity > 1) {
            updateQuantityDisplay(currentQuantity - 1);
        }
    });

    // Xử lý đăng nhập
    //function dangNhap(taiKhoan, matKhau, callback) {
    //    console.log('Đang thực hiện đăng nhập với tài khoản:', taiKhoan);
    //    $.post(api, {
    //        action: 'login',
    //        tai_khoan: taiKhoan,
    //        mat_khau: matKhau
    //    }, function (response) {
    //        console.log('Phản hồi từ server sau khi đăng nhập:', response);
    //        var responseData = JSON.parse(response);
    //        callback(responseData);
    //    });
    //}

    //$('#submit-login').click(function () {
    //    var taiKhoan = $('#taiKhoan').val();
    //    var matKhau = $('#matKhau').val();

    //    console.log('Nút đăng nhập được bấm. Tài khoản:', taiKhoan, 'Mật khẩu:', matKhau);

    //    dangNhap(taiKhoan, matKhau, function (response) {
    //        if (response.ok === 1) {
    //            console.log('Đăng nhập thành công:', response);
    //            // Lưu trạng thái đăng nhập vào sessionStorage hoặc localStorage nếu cần
    //            sessionStorage.setItem('isLoggedIn', true);
    //            sessionStorage.setItem('accountId', response.account_id); // Assuming the response contains account_id

    //            // Kiểm tra returnUrl từ sessionStorage và chuyển hướng nếu có
    //            var returnUrl = sessionStorage.getItem('returnUrl');
    //            if (returnUrl) {
    //                console.log('Chuyển hướng đến URL:', returnUrl);
    //                window.location.href = returnUrl;
    //                sessionStorage.removeItem('returnUrl');
    //            } else {
    //                // Chuyển hướng đến trang chính hoặc trang bạn muốn sau khi đăng nhập thành công
    //                console.log('Chuyển hướng đến trang chính sau khi đăng nhập thành công.');
    //                window.location.href = '/index.html';
    //            }
    //        } else {
    //            console.log('Đăng nhập thất bại:', response.msg);
    //            alert('Đăng nhập thất bại: ' + response.msg);
    //        }
    //    });
    //});

    // Function to handle actions that require login

    // Kiểm tra trạng thái đăng nhập khi trang tải
    
        //var isLoggedIn = sessionStorage.getItem('isLoggedIn');
        //var accountId = sessionStorage.getItem('accountId');

        //if (isLoggedIn && accountId) {
        //    // Gọi API để lấy thông tin người dùng
        //    getUserInfo(accountId, function (response) {
        //        if (response.ok === 1) {
        //            $('#user-status').text('Xin chào, ' + response.username);
        //            $('#user-icon a').attr('href', '/profile.html'); // Đường dẫn đến trang cá nhân của người dùng
        //        } else {
        //            $('#user-status').text('Đăng nhập/Đăng ký');
        //            $('#user-icon a').attr('href', '/login.html'); // Đường dẫn đến trang đăng nhập
        //        }
        //    });
        //} else {
        //    $('#user-status').text('Đăng nhập/Đăng ký');
        //    $('#user-icon a').attr('href', '/login.html'); // Đường dẫn đến trang đăng nhập
        //}
    
    
        // Kiểm tra trạng thái đăng nhập khi trang được tải
        kiemTraDangNhap(function (response) {
            if (response.ok === 1) {
                // Đã đăng nhập
                $('#user-status').text('Xin chào, ' + response.tai_khoan);
                $('#user-icon').attr('href', '/profile.html'); // Đường dẫn đến trang cá nhân của người dùng
                
            } else {
                // Chưa đăng nhập
                $('#user-status').text('Đăng nhập/Đăng ký');
                $('#user-icon').attr('href', '/login.html'); // Đường dẫn đến trang đăng nhập
            }
        });

        $('#submit-login').click(function () {
            var taiKhoan = $('#taiKhoan').val();
            var matKhau = $('#matKhau').val();

            console.log('Nút đăng nhập được bấm. Tài khoản:', taiKhoan, 'Mật khẩu:', matKhau);

            dangNhap(taiKhoan, matKhau, function (response) {
                if (response.ok === 1) {
                    console.log('Đăng nhập thành công:', response);
                    // Lưu trạng thái đăng nhập vào sessionStorage hoặc localStorage nếu cần
                    sessionStorage.setItem('isLoggedIn', true);
                    sessionStorage.setItem('accountId', response.account_id); // Assuming the response contains account_id

                    // Kiểm tra returnUrl từ sessionStorage và chuyển hướng nếu có
                    var returnUrl = sessionStorage.getItem('returnUrl');
                    if (returnUrl) {
                        console.log('Chuyển hướng đến URL:', returnUrl);
                        window.location.href = returnUrl;
                        sessionStorage.removeItem('returnUrl');
                    } else {
                        // Chuyển hướng đến trang chính hoặc trang bạn muốn sau khi đăng nhập thành công
                        console.log('Chuyển hướng đến trang chính sau khi đăng nhập thành công.');
                        window.location.href = '/index.html';
                    }
                } else {
                    console.log('Đăng nhập thất bại:', response.msg);
                    alert('Đăng nhập thất bại: ' + response.msg);
                }
            });
        });
    $('#logout').click(function (event) {

        console.log('Nút đăng xuất được bấm.');

        // Xóa thông tin phiên khỏi sessionStorage
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('accountId');
        // Đặt giá trị trống cho trường nhập liệu tên người dùng và mật khẩu
        $('#taiKhoan').val('');
        $('#matKhau').val('');

        // Chuyển hướng đến trang đăng nhập hoặc trang chính
        window.location.href = '/index.html';
    });

      
});
// Function to check login status
function getUserInfo(accountId, callback) {
    $.post(api, {
        action: 'get_user_info',
        account_id: accountId
    }, function (response) {
        console.log('Phản hồi từ server khi lấy thông tin người dùng:', response);
        var responseData = JSON.parse(response);
        callback(responseData);
    });
}

//function dangNhap(taiKhoan, matKhau, callback) {
//    console.log('Đang thực hiện đăng nhập với tài khoản:', taiKhoan);
//    $.post(api, {
//        action: 'login',
//        tai_khoan: taiKhoan,
//        mat_khau: matKhau
//    }, function (response) {
//        console.log('Phản hồi từ server sau khi đăng nhập:', response);
//        var responseData = JSON.parse(response);
//        callback(responseData);
//    });
//}
function dangNhap(taiKhoan, matKhau, callback) {
    console.log('Đang thực hiện đăng nhập với tài khoản:', taiKhoan);
    $.post(api, {
        action: 'login',
        tai_khoan: taiKhoan,
        mat_khau: matKhau
    }, function (response) {
        console.log('Phản hồi từ server sau khi đăng nhập:', response);
        var responseData = JSON.parse(response);
        if (responseData.ok === 1) {
            // Lưu thông tin đăng nhập mới vào sessionStorage
            sessionStorage.setItem('isLoggedIn', true);
           /* sessionStorage.setItem('accountId', responseData.account_id);*/
            sessionStorage.setItem('taiKhoan', responseData.tai_khoan);
        }
        callback(responseData);
    });
}

function requireLogin(action, productId, giaBan, quantity) {
    console.log('Yêu cầu đăng nhập cho hành động:', action, 'Với sản phẩm ID:', productId, 'Giá bán:', giaBan, 'Số lượng:', quantity);
    kiemTraDangNhap(function (response) {
        if (response.ok === 1) {
            console.log('Người dùng đã đăng nhập:', response);
            if (action === 'add_to_cart') {
                // Handle adding to cart
                addToCart(response.account_id, productId, giaBan, quantity);
            } else if (action === 'buy_now') {
                // Handle buying now
                buyNow(response.account_id, productId, giaBan, quantity);
            }
        } else {
            console.log('Người dùng chưa đăng nhập:', response.msg);
            var confirmAction = confirm('Bạn cần đăng nhập để thực hiện hành động này. Bấm OK để đăng nhập.');
            if (confirmAction) {
                // Lưu URL hiện tại để sau khi đăng nhập có thể quay lại
                sessionStorage.setItem('returnUrl', window.location.href);
                // Chuyển hướng đến trang đăng nhập
                console.log('Chuyển hướng đến trang đăng nhập.');
                window.location.href = '/login.html';
            }
        }
    });
}

// Function to check login status
function kiemTraDangNhap(callback) {
    console.log('Đang kiểm tra trạng thái đăng nhập...');

    // Kiểm tra xem có dữ liệu đăng nhập trong sessionStorage không
    var isLoggedIn = sessionStorage.getItem('isLoggedIn');
    var accountId = sessionStorage.getItem('accountId');

    if (!isLoggedIn || !accountId) {
        // Nếu không có dữ liệu đăng nhập trong sessionStorage, trả về phản hồi không thành công
        console.log('Không có thông tin đăng nhập trong sessionStorage.');
        callback({ ok: 0, msg: "Người dùng chưa đăng nhập" });
        return;
    }

    // Nếu có dữ liệu đăng nhập, gửi yêu cầu kiểm tra đến server
    $.post(api, {
        action: 'check_login'
    }, function (response) {
        console.log('Phản hồi từ server khi kiểm tra đăng nhập:', response);
        var responseData = JSON.parse(response);

        // Kiểm tra phản hồi từ server
        if (responseData.ok === 1) {
            // Người dùng đã đăng nhập
            callback(responseData);
        } else {
            // Người dùng chưa đăng nhập
            callback({ ok: 0, msg: "Người dùng chưa đăng nhập" });
        }
    }).fail(function () {
        // Xử lý lỗi nếu có
        console.log('Đã xảy ra lỗi khi gọi API kiểm tra đăng nhập.');
        callback({ ok: 0, msg: "Lỗi khi kiểm tra đăng nhập" });
    });
}



function addToCart(accountId, productId, giaBan, productQuantity) {
    console.log('Đang thêm sản phẩm vào giỏ hàng. Account ID:', accountId, 'Product ID:', productId, 'Giá bán:', giaBan, 'Số lượng:', productQuantity);
    $.post(api, {
        action: 'add_to_cart',
        accounts_id: accountId, // Truyền ID tài khoản
        product_id: productId,
        quantity: productQuantity, // Số lượng sản phẩm
        gia_ban: giaBan
    }, function (response) {
        var responseData = JSON.parse(response);
        console.log("Phản hồi từ server khi thêm vào giỏ hàng:", responseData);
        if (responseData.ok === 1) {
            alert('Thêm vào giỏ hàng thành công!');
        } else {
            alert('Thêm vào giỏ hàng thất bại: ' + responseData.msg);
        }
    }).fail(function () {
        console.error("Không thể thêm vào giỏ hàng.");
    });
}

function buyNow(accountId, productId, giaBan, productQuantity) {
    console.log('Đang thực hiện mua ngay. Account ID:', accountId, 'Product ID:', productId, 'Giá bán:', giaBan, 'Số lượng:', productQuantity);
    addToCart(accountId, productId, giaBan, productQuantity); // Add to cart first
    window.location.href = '/cart.html'; // Redirect to cart page
}
