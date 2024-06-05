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
