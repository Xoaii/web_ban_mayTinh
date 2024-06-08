$(document).ready(function () {
    const api = '/api.aspx';
    const previousPage = document.referrer;

    // Xử lý đăng nhập
    function xuLyDangNhap() {
        const data = $('#login-form').serialize() + '&action=login';
        $.post(api, data, function (response) {
            const responseData = JSON.parse(response);
            if (responseData.ok === 1) {
                alert('Đăng nhập thành công');
                
                if (previousPage) {
                    window.location.href = previousPage; // Trả về trang trước đó nếu có
                } else {
                    window.location.href = '/index.html'; // Nếu không, chuyển hướng đến trang sản phẩm
                }
            } else {
                alert('Đăng nhập thất bại: ' + responseData.msg);
            }
        }).fail(function (xhr, status, error) {
            console.error(error);
            alert('Có lỗi xảy ra khi đăng nhập.');
        });
    }

    // Xử lý đăng ký
    function xuLyDangKy() {
        const data = $('#signup-form').serialize() + '&action=register';
        $.post(api, data, function (response) {
            const responseData = JSON.parse(response);
            if (responseData.ok === 1) {
                alert('Đăng ký thành công');
                $('#login-form').addClass('active');
                $('#signup-form').removeClass('active');
            } else {
                alert('Đăng ký thất bại: ' + responseData.msg);
            }
        }).fail(function (xhr, status, error) {
            console.error(error);
            alert('Có lỗi xảy ra khi đăng ký.');
        });
    }

    $('#login-form button[type="submit"]').click(function (e) {
        e.preventDefault();
        xuLyDangNhap();
    });

    $('#signup-form button[type="submit"]').click(function (e) {
        e.preventDefault();
        xuLyDangKy();
    });

    // Chuyển đổi giữa form đăng nhập và đăng ký
    $('#login-link').click(function (e) {
        e.preventDefault();
        $('#login-form').addClass('active');
        $('#signup-form').removeClass('active');
    });

    $('#signup-link').click(function (e) {
        e.preventDefault();
        $('#login-form').removeClass('active');
        $('#signup-form').addClass('active');
    });
});
