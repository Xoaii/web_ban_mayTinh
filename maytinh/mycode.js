function toggleContent() {
    var hiddenContent = document.getElementById("hiddenContent");
    var button = document.querySelector("#toggleButton");
  
    console.log(button); // Kiểm tra xem button có tồn tại không
  
    if (hiddenContent.style.display === "none") {
      hiddenContent.style.display = "block";
      button.textContent = "Ẩn bớt nội dung";
    } else {
      hiddenContent.style.display = "none";
      button.textContent = "Xem thêm nội dung";
    }
}



document.addEventListener("DOMContentLoaded", function() {
  // Lấy ra các phần tử DOM
  var quantityInput = document.getElementById("quantity");
  var increaseButton = document.getElementById("increaseButton");
  var decreaseButton = document.getElementById("decreaseButton");

  // Lắng nghe sự kiện click trên nút tăng
  increaseButton.addEventListener("click", function() {
    // Tăng giá trị của input lên 1 đơn vị khi nút tăng được nhấp
    var currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  });

  // Lắng nghe sự kiện click trên nút giảm
  decreaseButton.addEventListener("click", function() {
    // Giảm giá trị của input xuống 1 đơn vị khi nút giảm được nhấp
    var currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });
  // Mặc định: Cập nhật danh sách quận/huyện khi tải trang
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
$(document).ready(function () {
    const api = '/api.aspx';

    function hienThiDanhSachSanPham() {
        $.post(api, { action: 'list_SanPham' }, function (response) {
            // Phân tích dữ liệu JSON thành đối tượng JavaScript
            var responseData = JSON.parse(response);

            // Kiểm tra dữ liệu có tồn tại và có định dạng hợp lệ không
            if (responseData && responseData.data && Array.isArray(responseData.data)) {
                var products = responseData.data;

                // Lặp qua danh sách sản phẩm và hiển thị
                products.forEach(function (product) {
                    // Tạo phần tử HTML cho sản phẩm và thêm vào trang
                    var productHTML = `
                        <div class="cartegory-item-main">
                            <div class="cartegory-item-main-box">
                                <img src="${product.image}" alt="">
                                <div class="cartegory-item-main-box-infor">
                                    <a href="/product/${product.id}.html">${product.ten}</a>
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

                    // Thêm phần tử HTML sản phẩm vào phần chứa sản phẩm
                    $('.main-cartegory-item').append(productHTML);
                });
            } else {
                console.error('Dữ liệu không hợp lệ');
            }
        }).fail(function (xhr, status, error) {
            console.error(error);
        });
    }

    // Gọi hàm để hiển thị danh sách sản phẩm khi trang được tải
    hienThiDanhSachSanPham();
});
