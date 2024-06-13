
const api = '/api.aspx';// khai báo biến toàn cục
$(document).ready(function () {
    
    // Gọi hàm với giá trị category_id và containerId mong muốn
    //hienThiDanhSachSanPham(1, 'pc-products'); // Hiển thị sản phẩm có category_id = 1
    //hienThiDanhSachSanPham(2, 'cpu-products'); // Hiển thị sản phẩm có category_id = 2

   
    hienThiDanhMuc();
    // Danh mục
   
    // Kiểm tra xem đã có sẵn category_id trong URL hay không
    var urlParams = new URLSearchParams(window.location.search);
    var category_id = urlParams.get('category_id');

    // Nếu có category_id trong URL, gọi hàm hiển thị sản phẩm
    if (category_id) {
        hienThiDanhSachSanPham(category_id);
    } else {
        // Nếu không có category_id, hiển thị sản phẩm mặc định (ví dụ: sản phẩm trên trang chủ)
        hienThiDanhSachSanPham(1); // Truyền tham số rỗng để hiển thị sản phẩm mặc định
    }

    function hienThiDanhMuc() {
        $.post(api, { action: 'get_list' }, function (data) {
            try {
                var categories = JSON.parse(data);
                console.log('danh mục: ', categories);

                if (Array.isArray(categories)) {
                    var menu = $('.menu');
                    categories.forEach(function (category) {
                        var menuItem = `
                        <li>
                            <a href="#" data-category-id="${category.id}">${category.ten}</a>
                        </li>
                    `;
                        menu.append(menuItem);
                    });

                    // Thêm sự kiện click cho từng danh mục
                    $('.menu a').click(function (e) {
                        e.preventDefault(); // Ngăn chặn hành động mặc định khi nhấp vào liên kết
                        var category_id = $(this).data('category-id');
                        if (category_id) {
                            // Chuyển đến trang category
                            window.location.href = "/cartegory.html?category_id=" + category_id;
                        }
                    });

                } else {
                    console.error('Dữ liệu nhận được không phải là một mảng.');
                }
            } catch (error) {
                console.error('Lỗi khi xử lý dữ liệu JSON:', error);
            }
        }).fail(function (error) {
            console.error('Lỗi khi lấy danh sách danh mục:', error);
        });
    }

    // Hiển thị danh sách sản phẩm
    function hienThiDanhSachSanPham(category_id) {
        $.post(api, { action: 'list_SanPham', cartegory_id: category_id }, function (response) {
            console.log(category_id);
            try {
                var responseData = JSON.parse(response);
                if (responseData && responseData.data && Array.isArray(responseData.data)) {
                    var products = responseData.data;

                    // Xóa nội dung cũ của thẻ chứa sản phẩm trước khi thêm sản phẩm mới
                    $('.main-cartegory-item').empty();

                    // Lặp qua danh sách sản phẩm và hiển thị
                    products.forEach(function (product) {
                        var productHTML = `
                    <div class="cartegory-item-main">
                        <div class="cartegory-item-main-box">
                            <img src="${product.image}" alt="">
                            <div class="cartegory-item-main-box-infor">
                                <a href="/product.html?product_id=${product.id}">${product.ten}</a>
                            </div>
                            <div class="cartegory-item-main-box-price">
                                <p>${formatPrice(Math.round(product.gia * 1.1)) } <sup>₫</sup></p>
                            </div>
                            
                        </div>
                    </div>
                    `;
                        $('.main-cartegory-item').append(productHTML);
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
        updateMaxQuantity(productId)
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
                        $('#product-details').data('product-price', Math.round(product.gia * 1.1));
                        $('#product-name').text(product.ten);
                        $('#product-img').attr('src', product.image);
                        $('#product-description').text(product.mo_ta);
                        $('#product-price').text(formatPrice(Math.round(product.gia * 1.1)));
                        if (product.so_luong > 0) {
                            $('#tinh_trang').text("còn hàng");
                        } else {
                            $('#tinh_trang').text("hết hàng");
                            $('.product-actions').hide();
                        }
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

    // Hàm để lấy số lượng sản phẩm từ cơ sở dữ liệu và cập nhật thuộc tính data-max
    function updateMaxQuantity(productId) {
        $.post(api, { action: 'get_SanPham', product_id: productId }, function (response) {
            try {
                console.log('Phản hồi từ máy chủ:', response); // Kiểm tra phản hồi từ máy chủ

                if (response.trim() !== "") {
                    var responseData = JSON.parse(response);

                    if (Array.isArray(responseData.data) && responseData.data.length > 0) {
                        var productData = responseData.data[0]; // Lấy thông tin sản phẩm đầu tiên từ mảng data

                        if (productData.so_luong !== undefined && !isNaN(productData.so_luong) && productData.so_luong > 0) {
                            // Cập nhật giá trị cho thuộc tính data-max
                            $('#product-quantity').attr('data-max', productData.so_luong);
                        } else {
                            console.error("Dữ liệu số lượng sản phẩm không hợp lệ.");
                            // Thông báo cho người dùng biết số lượng sản phẩm không hợp lệ
                            alert("Dữ liệu số lượng sản phẩm không hợp lệ.");
                        }
                    } else {
                        console.error("Không tìm thấy dữ liệu sản phẩm.");
                        // Thông báo cho người dùng biết không tìm thấy dữ liệu sản phẩm
                        alert("Không tìm thấy dữ liệu sản phẩm.");
                    }
                } else {
                    console.error("Dữ liệu sản phẩm trống.");
                }
            } catch (error) {
                console.error("Lỗi khi phân tích JSON:", error);
            }
        }).fail(function (xhr, status, error) {
            console.error(error);
        });
    }


    // Hàm để cập nhật giao diện khi thay đổi số lượng
    function updateQuantityDisplay(quantity, maxQuantity) {
        var minQuantity = 1; // Số lượng sản phẩm tối thiểu là 1
        if (!isNaN(maxQuantity) && quantity > maxQuantity) {
            alert('Đã đạt giới hạn sản phẩm đang có ');
            quantity = maxQuantity; // Nếu quantity lớn hơn maxQuantity, đặt lại quantity bằng maxQuantity
        }
        if (quantity < minQuantity) {
            alert('Số lượng sản phẩm tối thiểu là ' + minQuantity);
            quantity = minQuantity; // Nếu quantity nhỏ hơn minQuantity, đặt lại quantity bằng minQuantity
        }
        $('#product-quantity').val(quantity);
    }

    // Bắt sự kiện khi nút tăng số lượng được click
    $('#increaseButton').click(function () {
        var currentQuantity = parseInt($('#product-quantity').val());
        var maxQuantity = parseInt($('#product-quantity').data('max')); // Lấy số lượng sản phẩm tối đa từ thuộc tính data-max
        if (!isNaN(currentQuantity)) {
            updateQuantityDisplay(currentQuantity + 1, maxQuantity);
        } else {
            updateQuantityDisplay(1, maxQuantity); // Default to 1 if the current value is not a number
        }
    });

    // Bắt sự kiện khi nút giảm số lượng được click
    $('#decreaseButton').click(function () {
        var currentQuantity = parseInt($('#product-quantity').val());
        var maxQuantity = parseInt($('#product-quantity').data('max')); // Lấy số lượng sản phẩm tối đa từ thuộc tính data-max
        if (!isNaN(currentQuantity) && currentQuantity > 1) {
            updateQuantityDisplay(currentQuantity - 1, maxQuantity);
        } else {
            alert('Số lượng sản phẩm tối thiểu là 1');
        }
    });

    // phần giỏ hàng
    function getCartInfo(accountId) {
        $.post(api, { action: 'list_gioHang', accounts_id: accountId }, function (response) {
            try {
                console.log(accountId);
                console.log('Phản hồi từ máy chủ:', response);

                // Kiểm tra xem response có dữ liệu không
                if (response.trim() !== "") {
                    var responseData = JSON.parse(response);
                    console.log(responseData);

                    if (Array.isArray(responseData.data) && responseData.data.length > 0) {
                        displayCart(responseData.data); // gọi hàm display cart
                        displayCartPay(responseData.data);
                        $("#nf-cart").hide();
                        deleteCartItem(responseData.id);
                    } else {
                        console.error("Không tìm thấy dữ liệu giỏ hàng.");
                        console.log("Giỏ hàng của bạn đang trống.");
                    }
                } else {
                    console.log("Dữ liệu giỏ hàng trống.");
                    /*alert("Giỏ hàng của bạn đang trống.");*/
                    $('#thanh-toan').hide();
                }
            } catch (error) {
                console.error("Lỗi khi xử lý phản hồi:", error);
            }
        }).fail(function (xhr, status, error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
        });
    }

    function displayCart(cartItems) {
        var cartContainer = $('.cart-container-left');
        cartContainer.empty();

        var totalPrice = 0;

        cartItems.forEach(function (item) {
            if (!item.gia_ban || !item.so_luong) {
                console.error("Dữ liệu sản phẩm không hợp lệ:", item);
                alert("Dữ liệu sản phẩm không hợp lệ.");
                return;
            }

            // Format giá bán và số lượng
            var giaBanFormatted = item.gia_ban ? item.gia_ban.toLocaleString() : '0';
            var soLuongFormatted = item.so_luong ? item.so_luong : '1';

            // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
            var existingProduct = cartContainer.find(`.cart-box-product[data-product-id="${item.product_id}"]`);

            if (existingProduct.length) {
                // Sản phẩm đã tồn tại, cập nhật số lượng
                var quantityInput = existingProduct.find('.quantity-input');
                var currentQuantity = parseInt(quantityInput.val(), 10);
                var newQuantity = currentQuantity + parseInt(soLuongFormatted, 10);
                quantityInput.val(newQuantity);

                // Cập nhật tổng giá
                var productPriceElement = existingProduct.find('#product-price');
                var productPrice = parseInt(productPriceElement.text().replace(/\D/g, ''), 10);
                var updatedPrice = productPrice / currentQuantity * newQuantity;
                productPriceElement.text(updatedPrice.toLocaleString() + ' ₫');

                totalPrice += item.gia_ban * item.so_luong;
            } else {
                // Sản phẩm mới, thêm vào giỏ hàng
                var productHtml = `
                <div class="cart-box-product" data-cart="${item.id}" data-product-id="${item.product_id}" data-max-quantity="${soLuongFormatted}">
                    <div class="cart-infor-product">
                        <img id="product-img" src="${item.image}" alt="">
                        <p id="product-name">Sản phẩm ${item.ten}</p>
                    </div>
                    <div class="price">
                        <p id="product-price">${giaBanFormatted} <sup>₫</sup></p>
                        <div class="quantity-area">
                            <button class="decreaseButton qty-btn" type="button">
                                <svg focusable="false" class="icon icon--minus " viewBox="0 0 10 2" role="presentation">
                                    <path d="M10 0v2H0V0z"></path>
                                </svg>
                            </button>
                            <input id="product-quantity" type="text" class="quantity-input" name="quantity" value="${soLuongFormatted}" min="1" data-max="${item.max_so_luong}">
                            <button class="increaseButton qty-btn" type="button">
                                <svg focusable="false" class="icon icon--plus " viewBox="0 0 10 10" role="presentation">
                                    <path d="M6 4h4v2H6v4H4V6H0V4h4V0h2v4z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="remove-cart">
                        <button type="button" class="delete-from-cart">Xóa</button>
                    </div>
                </div>
                `;
                cartContainer.append(productHtml);
                totalPrice += item.gia_ban * item.so_luong;
            }
        });

        $('#total-price').text(totalPrice.toLocaleString() + ' ₫');
        $('.delete-from-cart').on('click', function () {
            var cartBox = $(this).closest('.cart-box-product');
            var dataCart = cartBox.data('cart');
            console.log('id giỏ hàng là :', dataCart); // In ra giá trị của data-cart
            cartBox.remove();
            deleteCartItem(dataCart);
            updateTotalPrice();
        });
       
        $('.increaseButton').off('click').on('click', function () {
            var quantityInput = $(this).siblings('.quantity-input');
            var currentQuantity = parseInt(quantityInput.val(), 10);
            var maxQuantity = parseInt(quantityInput.attr('data-max'), 10);
            var cartBox = $(this).closest('.cart-box-product');
            var dataCart = cartBox.data('cart');
            console.log('id giỏ hàng là:', dataCart);
            var newQuantity = parseInt(currentQuantity, 10) + 1;
            console.log('số lượng mới:', newQuantity);

            if (currentQuantity < maxQuantity) {
                quantityInput.val(currentQuantity + 1);
                updateCartQuantity(dataCart, newQuantity);
                updateTotalPrice();
            } else {
                alert("Số lượng sản phẩm không được vượt quá số lượng trong kho.");
            }
        });

        $('.decreaseButton').off('click').on('click', function () {
            var quantityInput = $(this).siblings('.quantity-input');
            var currentQuantity = parseInt(quantityInput.val(), 10);

            if (currentQuantity > 1) {
                quantityInput.val(currentQuantity - 1);
                var cartBox = $(this).closest('.cart-box-product');
                var dataCart = cartBox.data('cart');
                var newQuantity = currentQuantity - 1;
                updateCartQuantity(dataCart, newQuantity);
                updateTotalPrice();
            }
        });

    }
    function deleteCartItem(cartId) {
        $.post(api, { action: 'delete_gioHang', id: cartId }, function (response) {
            try {
                console.log('Phản hồi từ máy chủ:', response);
                var responseData = JSON.parse(response);
                console.log('Dữ liệu phân tích:', responseData); // Thêm log để kiểm tra dữ liệu phản hồi

                // Kiểm tra phản hồi từ máy chủ
                if (responseData.ok === 1) {
                    console.log('Sản phẩm đã được xóa khỏi giỏ hàng.');
                } else {
                    console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', responseData.msg);
                    // Nếu cần, bạn có thể hiển thị thông báo lỗi ở đây
                }
            } catch (error) {
                console.error('Lỗi khi xử lý phản hồi:', error);
            }
        }).fail(function (xhr, status, error) {
            console.error('Lỗi khi gửi yêu cầu:', error);
        });
    }
   
    function updateCartQuantity(cartId, newQuantity) {
        console.log('new số lượng: ', newQuantity);
        $.post(api, {
            action: 'edit_gioHang',
            id: cartId,
            so_luong: newQuantity
        }, function (response) {
            try {
                var responseData = JSON.parse(response);
                if (responseData.success) {
                    updateTotalPrice();
                    console.log("Số lượng sản phẩm đã được cập nhật thành công.");
                } else {
                    console.error("Cập nhật số lượng thất bại:", responseData.message);
                }
            } catch (error) {
                console.error("Lỗi khi xử lý phản hồi cập nhật số lượng:", error);
            }
        }).fail(function (xhr, status, error) {
            console.error("Lỗi khi gửi yêu cầu cập nhật số lượng:", error);
        });
    }

    function updateTotalPrice() {
        var totalPrice = 0;
        $('.cart-box-product').each(function () {
            var price = parseInt($(this).find('#product-price').text().replace(/\D/g, ''));
            var quantity = parseInt($(this).find('.quantity-input').val());
            totalPrice += price * quantity;
        });
        $('#total-price').text(totalPrice.toLocaleString() + ' ₫');
    }
   
    // end giỏ hàng
    $('#thanh-toan').click(function () {
        // Chuyển hướng đến trang khác
        window.location.href = "/pay.html"; // Thay "newpage.html" bằng URL bạn muốn chuyển đến
    });
    // đặt hàng


    //$('#confirm-order-btn').click(function () {
    //    console.log('Nút "Xác nhận đơn hàng" đã được bấm.');

    //    $('.cart-item').each(function () {
    //        //// Chọn phần tử có class 'cart-item'
    //        //var cartItem = $('.cart-item');

    //        //// Lấy giá trị của thuộc tính 'data-cart'
    //        //var dataCart = cartItem.data('cart');

    //        //// In giá trị ra console
    //        //console.log('Data Cart:', dataCart);
    //        var productId = $(this).data('product-id');
    //        console.log('Product ID:', productId);
    //        var thanhToan = $('#user-tt option:selected').val();
    //        console.log('thanh toán:', thanhToan);
    //        var productName = $(this).find('.product-name').text().replace('Tên sản phẩm: ', '').trim();
    //        var productPriceText = $(this).find('.product-price').text().replace('Giá: ', '').replace(' ₫', '').trim();
    //        var productPrice = parseFloat(productPriceText.replace(/\D/g, ''));
    //        var productQuantity = parseInt($(this).find('.product-quantity').text().replace('Số lượng: ', '').trim());

    //        console.log('Thông tin sản phẩm:', productId, productName, productPrice, productQuantity, thanhToan,);

    //        var hoTen = $('#user-fullname').val();
    //        var diaChi = $('#user-address').val();
    //        var sdt = $('#user-phone').val();

    //        console.log('Thông tin người dùng:', hoTen, diaChi, sdt);

    //        if (isNaN(productPrice) || isNaN(productQuantity) || !productId) {
    //            console.error("Giá trị sản phẩm, giá hoặc số lượng không hợp lệ.");
    //            return;
    //        }
    //      /*  deleteCartItem(dataCart);*/

    //        console.log("Thêm đơn hàng:", productId, productName, productPrice, productQuantity);
    //        requireLogin('insert_donHang', productId, productPrice, productQuantity, thanhToan, hoTen, diaChi, sdt);
    //    });
    //});



    // Hiển thị giỏ hàng
    //function displayCartPay(cartItems) {
    //    var totalPrice = 0;

    //    var cartHtml = cartItems.map(function (item) {
    //        totalPrice += item.gia_ban * item.so_luong;
    //        return `
    //            <div data-product-id="${item.product_id}" class="cart-item">
    //                <p id="product-name" >Tên sản phẩm: ${item.ten}</p>
    //                <p id="product-quantity"" >Số lượng: ${item.so_luong}</p>
    //                <p id= "product-price" >Giá: ${item.gia_ban}</p>
    //            </div>
    //        `;
    //    }).join('');
    //    $('#cart-items').html(cartHtml);

    //    $('#total-price-pay').text(totalPrice.toLocaleString() + ' ₫');
    //}

    $('#confirm-order-btn').click(function () {
        var hoTen = $('#user-fullname').val();
        var diaChi = $('#user-address').val();
        var sdt = $('#user-phone').val();
        var thanhToan = $('#user-tt').val(); // Lấy phương thức thanh toán từ dropdown

        if (!hoTen || !diaChi || !sdt || !thanhToan) {
            alert('Vui lòng điền đầy đủ thông tin đơn hàng.');
            return;
        }

        var cartItems = [];
        $('#cart-items .cart-item').each(function () {
            var productId = $(this).data('product-id');
            var productPriceText = $(this).find('.product-price').text().replace('Giá: ', '').replace(' ₫', '').trim();
            var giaBan = parseFloat(productPriceText.replace(/\D/g, ''));
            var quantity = parseInt($(this).find('.product-quantity').text().replace('Số lượng: ', '').trim());

            cartItems.push({
                product_id: productId,
                gia_ban: giaBan,
                so_luong: quantity
            });
        });

        console.log('Cart Items:', cartItems); // Log giỏ hàng để kiểm tra

        // Gọi hàm requireLogin để kiểm tra đăng nhập và thực hiện đặt hàng
        requireLogin('insert_donHang', null, null, null, cartItems, thanhToan, hoTen, diaChi, sdt);
    });

    function displayCartPay(cartItems) {
        var totalPrice = 0;

        var cartHtml = cartItems.map(function (item) {
            totalPrice += item.gia_ban * item.so_luong;
            return `
        <div data-cart="${item.id}" class="cart-item" data-product-id="${item.product_id}">
            <p display ="none" class="product-id">ID: ${item.product_id}</p>
            <p class="product-name">Tên sản phẩm: ${item.ten}</p>
            <p class="product-quantity">Số lượng: ${item.so_luong}</p>
            <p class="product-price">Giá: ${item.gia_ban.toLocaleString()} ₫</p>
        </div>
    `;
        }).join('');
        $('#cart-items').html(cartHtml);

        $('#total-price-pay').text(totalPrice.toLocaleString() + ' ₫');
    }

    function addOrder(accountId, cartItems, thanhToan, hoTen, diaChi, sdt) {
        console.log('Đặt hàng:', accountId, cartItems, thanhToan, hoTen, diaChi, sdt);

        $.post(api, {
            action: 'insert_donHang',
            user_id: accountId,
            ho_ten: hoTen,
            dia_chi: diaChi,
            sdt: sdt,
            thanh_toan: thanhToan,
            cart_items: JSON.stringify(cartItems)
        })
            .done(function (response) {
                $('#order-status').text(response.msg);
            })
            .fail(function (xhr, status, error) {
                console.error(xhr.responseText);
                alert('Đã xảy ra lỗi: ' + xhr.responseText);
            });
    }


    //function addOrder(userId, productId, quantity, price, thanhToan, hoTen, diaChi, sdt) {
    //    console.log("Thêm đơn hàng với thông tin:", userId, productId, quantity, price, hoTen, diaChi, sdt);
    //    $.post(api, {
    //        action: 'insert_donHang',
    //        user_id: userId,
    //        thanh_toan: thanhToan,
    //        product_id: productId,
    //        so_luong: quantity,
    //        gia_ban: price,
    //        ho_ten: hoTen,
    //        dia_chi: diaChi,
    //        sdt: sdt
    //    }, function (response) {
    //        console.log(response);
    //        try {
    //            if (response.trim() !== "") {
    //                var responseData = JSON.parse(response);
    //                if (responseData && responseData.ok === 1) {
    //                    console.log("Đơn hàng đã được thêm thành công:", responseData.msg);

    //                } else {
    //                    console.error("Dữ liệu JSON trống hoặc không hợp lệ.");
    //                }
    //            } else {
    //                console.error("Dữ liệu JSON trống.");
    //            }
    //        } catch (error) {
    //            console.error("Lỗi khi phân tích JSON:", error);
    //        }
    //    }).fail(function (xhr, status, error) {
    //        console.error(error);
    //    });
    //}

    //function addOrder(userId, thanhToan, hoTen, diaChi, sdt, cartItems) {
    //    console.log("Thêm đơn hàng với thông tin:", userId, hoTen, diaChi, sdt);

    //    $.post(api, {
    //        action: 'insert_donHang',
    //        user_id: userId,
    //        thanh_toan: thanhToan,
    //        ho_ten: hoTen,
    //        dia_chi: diaChi,
    //        sdt: sdt
    //    }, function (response) {
    //        try {
    //            if (response.trim() !== "") {
    //                var responseData = JSON.parse(response);
    //                if (responseData && responseData.ok === 1) {
    //                    console.log("Đơn hàng đã được thêm thành công:", responseData.msg);

    //                    var orderId = responseData.inserted_id; // Lấy ID của đơn hàng vừa thêm

    //                    // Thêm các chi tiết đơn hàng cho từng mặt hàng trong giỏ hàng
    //                    addOrderDetails(orderId, cartItems);
    //                } else {
    //                    console.error("Dữ liệu JSON trống hoặc không hợp lệ khi thêm đơn hàng.");
    //                }
    //            } else {
    //                console.error("Dữ liệu JSON trống.");
    //            }
    //        } catch (error) {
    //            console.error("Lỗi khi phân tích JSON khi thêm đơn hàng:", error);
    //        }
    //    }).fail(function (xhr, status, error) {
    //        console.error("Lỗi khi thêm đơn hàng:", error);
    //    });
    //}



    //end đặt hàng
    
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
    // Function to get user info
    function getUserInfo(accountId, callback) {
        $.post(api, {
            action: 'get_user_info',
            account_id: accountId
        }, function (response) {
            console.log('Phản hồi từ server khi lấy thông tin người dùng:', response);
            try {
                var responseData = JSON.parse(response);
                callback(responseData);
            } catch (error) {
                console.error('Lỗi khi phân tích dữ liệu JSON:', error);
                callback(null); // Trả về null nếu có lỗi
            }
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
                // Người dùng đã đăng nhập, lấy thông tin người dùng
               
            }
            callback(responseData);
        });
    }

    //function requireLogin(action, productId, giaBan, quantity) {
    //    console.log('Yêu cầu đăng nhập cho hành động:', action, 'Với sản phẩm ID:', productId, 'Giá bán:', giaBan, 'Số lượng:', quantity);
    //    kiemTraDangNhap(function (response) {
    //        if (response.ok === 1) {
    //            console.log('Người dùng đã đăng nhập:', response);
    //            if (action === 'add_to_cart') {
    //                // Handle adding to cart
    //                addToCart(response.account_id, productId, giaBan, quantity);
    //            } else if (action === 'buy_now') {
    //                // Handle buying now
    //                buyNow(response.account_id, productId, giaBan, quantity);
    //            } else if (action === 'insert_donHang') {
    //                // Handle buying now
    //                addOrder(response.account_id, productId,quantity, giaBan);
    //            }

    //        } else {
    //            console.log('Người dùng chưa đăng nhập:', response.msg);
    //            var confirmAction = confirm('Bạn cần đăng nhập để thực hiện hành động này. Bấm OK để đăng nhập.');
    //            if (confirmAction) {
    //                // Lưu URL hiện tại để sau khi đăng nhập có thể quay lại
    //                sessionStorage.setItem('returnUrl', window.location.href);
    //                // Chuyển hướng đến trang đăng nhập
    //                console.log('Chuyển hướng đến trang đăng nhập.');
    //                window.location.href = '/login.html';
    //            }
    //        }
    //    });
    //}
    function requireLogin(action, productId, giaBan, quantity, cartItems, thanhToan, hoTen, diaChi, sdt) {
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
                else if (action === 'insert_donHang') {
                    addOrder(response.account_id, cartItems, thanhToan, hoTen, diaChi, sdt);
                }
            } else {
                console.log('Người dùng chưa đăng nhập:', response.msg);
                var confirmAction = confirm('Bạn cần đăng nhập để thực hiện hành động này. Bấm OK để đăng nhập.');
                if (confirmAction) {
                    sessionStorage.setItem('returnUrl', window.location.href);
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
                // Người dùng đã đăng nhập, lấy thông tin người dùng
                
                getUserInfo(responseData.account_id, function (userData) {
                    // Cập nhật thông tin người dùng lên trang HTML
                    $('#username').text(userData.tai_khoan);
                    $('#ho_ten').text(userData.ho_ten);
                    $('#ngay_sinh').text(userData.ngay_sinh);
                    $('#gioi_tinh').text(userData.gioi_tinh);
                    $('#dia_chi').text(userData.dia_chi);
                    $('#email').text(userData.email);
                    $('#sdt').text(userData.sdt);
                    getCartInfo(responseData.account_id)
                });
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

    // đăng ký 
    $('#signup-form').submit(function (event) {
        event.preventDefault();

        var taiKhoan = $('#tai_khoandk').val();
        var matKhau = $('#mat_khaudk').val();
        var matKhauXacNhan = $('#mat_khau_xac_nhan').val();
        var ngaySinh = $('#ngay_sinh').val();
        var hoTen = $('#ho_ten').val();
        var email = $('#email').val();
        var gioiTinh = $('#gioi_tinh option:selected').val(); // Sử dụng cú pháp này để lấy giá trị của select box
        var diaChi = $('#dia_chi').val();
        var sdt = $('#sdt').val();
        // Kiểm tra ngày sinh có đủ 18 tuổi không
        var birthDate = new Date(ngaySinh);
        var today = new Date();
        var age = today.getFullYear() - birthDate.getFullYear();
        var monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            alert('Bạn phải đủ 18 tuổi để đăng ký.');
            return;
        }
        // Kiểm tra số điện thoại chỉ chứa các ký tự từ 0 đến 9
        var phoneNumberRegex = /^[0-9]+$/;
        if (!phoneNumberRegex.test(sdt)) {
            alert('Số điện thoại chỉ được nhập từ 0 đến 9.');
            return;
        }
        if (matKhau.length < 6 ) {
            alert("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }
        else if (matKhau !== matKhauXacNhan) {
            alert("Mật khẩu và xác nhận mật khẩu không khớp");
            return;
        }

        // Kiểm tra email có chứa @gmail.com không
        if (!email.toLowerCase().includes('@gmail.com')) {
            alert("Email phải là địa chỉ gmail.com");
            return;
        }

        // Kiểm tra giới tính được chọn
        if (gioiTinh !== 'Nam' && gioiTinh !== 'Nữ') {
            alert("Vui lòng chọn giới tính");
            return;
        }


        // Gọi action 'register' để kiểm tra và đăng ký tài khoản
        $.post(api, {
            action: 'register',
            tai_khoan: taiKhoan,
            mat_khau: matKhau,
            ngay_sinh: ngaySinh,
            ho_ten: hoTen,
            gioi_tinh: gioiTinh,
            dia_chi: diaChi,
            email: email,
            sdt: sdt
        }, function (response) {
            console.log(response); // Log phản hồi từ server (có thể là JSON)

            // Xử lý phản hồi từ server ở đây
            var responseData = JSON.parse(response);
            if (responseData.ok === 1) {
                // Đăng ký thành công
                alert(responseData.msg);
                // Redirect hoặc thực hiện hành động khác sau khi đăng ký thành công
                window.location.href = '/login.html'; // Chuyển hướng đến trang đăng nhập
            } else {
                // Đăng ký không thành công
                alert(responseData.msg);
            }
        });
    });
      
});
// Function to check login status
