$(document).ready(function () {
    const api = '/api.aspx';
    hienThiDanhSachSanPham(1, 'pc-products'); // Hiển thị sản phẩm có category_id = 1
    hienThiDanhSachSanPham(2, 'cpu-products'); // Hiển thị sản phẩm có category_id = 2
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

    //function hienThiDanhSachSanPham(category_id, containerId) {
    //    $.post(api, { action: 'list_SanPham', cartegory_id: category_id }, function (response) {
    //        var responseData = JSON.parse(response);
    //        if (responseData && responseData.data && Array.isArray(responseData.data)) {
    //            var products = responseData.data;

    //            // Xóa nội dung cũ của thẻ chứa sản phẩm trước khi thêm sản phẩm mới
    //            $('#' + containerId).empty();

    //            // Lặp qua danh sách sản phẩm và hiển thị
    //            products.forEach(function (product) {
    //                var productHTML = `
    //                <div class="cartegory-item-main">
    //                    <div class="cartegory-item-main-box">
    //                        <img src="${product.image}" alt="">
    //                        <div class="cartegory-item-main-box-infor">
    //                            <a href="3.html?product_id=${product.id}">${product.ten}</a>
    //                        </div>
    //                        <div class="cartegory-item-main-box-price">
    //                            <p>${product.gia} <sup>₫</sup></p>
    //                        </div>
    //                        <div class="cartegory-item-main-box-shoppingCart">
    //                            <div class="cartegory-item-main-box-shoppingCart-boder">
    //                                <img src="images/shopping-cart.png" alt="">
    //                            </div>
    //                            <p>THÊM VÀO GIỎ</p>
    //                        </div>
    //                    </div>
    //                </div>
    //            `;
    //                $('#' + containerId).append(productHTML);
    //            });
    //        } else {
    //            console.error('Dữ liệu không hợp lệ');
    //        }
    //    }).fail(function (xhr, status, error) {
    //        console.error(error);
    //    });
    //}
    // Lấy productId từ URL
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('product_id');
    var giaban = 0;

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
                        $('#product-details').data('product-price', product.gia);
                        $('#product-name').text(product.ten);
                        $('#product-img').attr('src', product.image);
                        $('#product-description').text(product.mo_ta);
                        giaban= $('#product-price').text(formatPrice(product.gia*1.1));
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
        var productPrice = giaban;
        var productQuantity = $('#product-quantity').val();

        // Thực hiện thêm sản phẩm vào giỏ hàng ở đây
        console.log("Thêm sản phẩm vào giỏ hàng:", productId, productName, productPrice, productQuantity);
    });

    $('#buy-now').click(function () {
        var productId = $('#product-details').data('product-id');
        var productName = $('#product-name').text();
        var productPrice = giaban;
        var productQuantity = $('#product-quantity').val();

        // Thực hiện mua ngay sản phẩm ở đây
        console.log("Mua ngay sản phẩm:", productId, productName, productPrice, productQuantity);
    });
});
