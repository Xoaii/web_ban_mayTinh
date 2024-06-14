$(document).ready(function () {
    const api = '/api.aspx';// khai báo biến toàn cục
    //// quản lý sp
    function deleteProduct(id, json) {
        var product;
        for (var item of json.data) {
            if (item.id == id) {
                product = item;
                break;
            }
        }
        // Xác nhận trước khi xóa
        var deleteConfirmation = $.confirm({
            title: `Xác nhận xóa sản phẩm: ${product.ten}`,
            content: `Xác nhận xóa?`,
            boxWidth: '50%',
            useBootstrap: false,
            type: 'red',
            buttons: {
                YES: {
                    btnClass: 'btn-red',
                    action: function () {
                        var dataToSend = {
                            action: 'delete_SanPham',
                            product_id: id, // Gửi đi id của sản phẩm cần xóa
                        };
                        console.log(dataToSend);
                        $.post(api, dataToSend, function (data) {
                            var json = JSON.parse(data); // Chuyển đổi dữ liệu JSON từ máy chủ
                            if (json.ok) { // Nếu xóa thành công
                                deleteConfirmation.close();
                                updateProductList(); // Cập nhật danh sách sản phẩm mới
                            } else {
                                alert(json.msg); // Hiển thị thông báo lỗi nếu có lỗi
                            }
                        });
                    }
                },
                NO: {}
            }
        });
    }

    function editProduct(id, json) {
        var product;
        for (var item of json.data) {
            if (item.id == id) {
                product = item;
                break;
            }
        }
        // Hiển thị dialog chỉnh sửa
        var content = `
        Tên: <input class="w3-input" type="text" id="edit-ten" value="${product.ten}"><br>
        Mô tả: <input class="w3-input" type="text" id="edit-mo-ta" value="${product.mo_ta}"><br>
        Giá: <input class="w3-input" type="text" id="edit-gia" value="${product.gia}"><br>
        Số lượng: <input class="w3-input" type="text" id="edit-so-luong" value="${product.so_luong}"><br>
        Hãng: <input class="w3-input" type="text" id="edit-hang" value="${product.hang}"><br>
        Sales ID: <input class="w3-input" type="text" id="edit-sales-id" value="${product.sales_id}"><br>
        Cartegory ID: <input class="w3-input" type="text" id="edit-cartegory-id" value="${product.cartegory_id}"><br>
        Ảnh: <input class="w3-input" type="text" id="edit-image" value="${product.image}"><br>
    `;
        var editDialog = $.confirm({
            title: 'Chỉnh sửa sản phẩm',
            content: content,
            boxWidth: '50%',
            useBootstrap: false,
            type: 'green',
            buttons: {
                save: {
                    btnClass: 'btn-green',
                    action: function () {
                        var dataToSend = {
                            action: 'edit_SanPham',
                            ten: $('#edit-ten').val(),
                            mo_ta: $('#edit-mo-ta').val(),
                            gia: $('#edit-gia').val(),
                            so_luong: $('#edit-so-luong').val(),
                            hang: $('#edit-hang').val(),
                            sales_id: $('#edit-sales-id').val(),
                            cartegory_id: $('#edit-cartegory-id').val(),
                            image: $('#edit-image').val(),
                            id: id,
                        };
                        console.log(dataToSend);
                        $.post(api, dataToSend, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                editDialog.close();
                                updateProductList();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: {}
            }
        });
    }

    function updateProductList() {
        $.post(api, { action: 'list_SanPham_ad' }, function (response) {
            console.log('Dữ liệu JSON nhận được:', response); // Log dữ liệu JSON để kiểm tra
            try {
                var json = JSON.parse(response);
                console.log(json);
                var productListHtml = "";
                if (json.data) {
                    productListHtml += `
                    <table class=" w3-table-all w3-centered table">
                   <thead>
                   <tr class="w3-hover-green">
                     <th>ID</th>
                     <th>Tên</th>
                     <th>Mô tả</th>
                     <th>Giá</th>
                     <th>Số lượng</th>
                     <th>Hãng</th>
                     <th>Sales ID</th>
                     <th>Category ID</th>
                     <th>Ảnh</th>
                     <th>Sửa/Xóa</th>
                   </tr>
                   </thead><tbody>`;
                    var stt = 0;
                    for (var product of json.data) {
                        var sua_xoa = `<button class="w3-button w3-white w3-border w3-border-red w3-round-large nut-sua-xoa" data-cid="${product.id}" data-action="edit_SanPham">Sửa</button>`;
                        sua_xoa += ` <button class="w3-button w3-blue w3-round-large nut-sua-xoa" data-cid="${product.id}" data-action="delete_SanPham">Xóa</button>`;
                        productListHtml += `
                     <tr>
                     <td>${product.id}</td>
                     <td>${product.ten}</td>
                     <td>${product.mo_ta}</td>
                     <td>${product.gia}</td>
                     <td>${product.so_luong}</td>
                     <td>${product.hang}</td>
                     <td>${product.sales_id}</td>
                     <td>${product.cartegory_id}</td>
                     <td>${product.image ? `<img src="${product.image}" width="100" height="100">` : 'Không có ảnh'}</td>
                     <td>${sua_xoa}</td>
                   </tr>`;
                    }
                    productListHtml += "</tbody></table>";
                } else {
                    productListHtml = "Không có dữ liệu";
                }
                $('.product-list').html(productListHtml);
                //trong html vừa đua vào có nhiều nút sửa và xóa, đều có class nut-sua-xoa
                //selector này tóm đc mọi nút
                $('.nut-sua-xoa').click(function () {
                    //phân biệt các nút bằng data kèm theo
                    var action = $(this).data('action')  //lấy action kèm theo
                    var id = $(this).data('cid')  //lấy cid kèm theo
                    if (action == 'delete_SanPham') { //dùng action
                        //can xac nhan
                        deleteProduct(id, json); //dùng id vào đây để hàm này xử, cho khỏi rối code
                    } else if (action == 'edit_SanPham') {
                        //ko can xac nhan
                        editProduct(id, json);
                    }
                });
            } catch (error) {
                console.error('Lỗi khi phân tích dữ liệu JSON:', error);
            }
        }).fail(function (xhr, status, error) {
            console.error('Lỗi khi gửi yêu cầu:', error);
        });
    }


   

    updateProductList();
    $('#themsp').click(function () {
        // Đảm bảo bạn đã có dữ liệu sản phẩm để hiển thị trong dialog
        var SanPham = {};

        var content = `
        Tên sản phẩm: <input class="w3-input" type="text" id="nhap-ten" "><br>
        Mô tả: <input class="w3-input" type="text" id="nhap-mo-ta" "><br>
        Giá: <input class="w3-input" type="text" id="nhap-gia" "><br>
        Số lượng: <input class="w3-input" type="text" id="nhap-so-luong" "><br>
        Hãng: <input class="w3-input" type="text" id="nhap-hang" "><br>
        Sales ID: <input class="w3-input" type="text" id="nhap-sales-id" "><br>
        Category ID: <input class="w3-input" type="text" id="nhap-cartegory-id" "><br>
        Ảnh: <input class="w3-input" type="text" id="nhap-image" "><br>
    `;

        var dialog_add = $.confirm({
            title: 'Thêm Sản phẩm',
            content: content,
            columnClass: 'large',
            boxWidth: '50%',
            useBootstrap: false,

            type: 'green',
            buttons: {
                save: {
                    btnClass: 'btn-green',
                    action: function () {
                        var data_gui_di = {
                            action: 'add_SanPham',
                            ten: $('#nhap-ten').val(),
                            mo_ta: $('#nhap-mo-ta').val(),
                            gia: $('#nhap-gia').val(),
                            so_luong: $('#nhap-so-luong').val(),
                            hang: $('#nhap-hang').val(),
                            sales_id: $('#nhap-sales-id').val(),
                            cartegory_id: $('#nhap-cartegory-id').val(),
                            image: $('#nhap-image').val(),
                        };

                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_add.close();
                                updateProductList(); // Cập nhật danh sách sản phẩm sau khi thêm mới
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    });

    
});