let href = window.location.href;

$.ajax({
    type: "get",
    url: "/login/status",
    data: { href },
    success: function(response) {
        let { status, avatar, nickName } = response;
        if (status == 0) {
            return location.href = '/admin/login.html'
        };
        if (avatar) {
            $('#avatar').prop('src', avatar);
        } else {
            $('#avatar').prop('src', '/uploads/avatar.jpg')
        };
        $('#name').html(nickName);
        return;
    }
});

$(document).ajaxStart(() => {
    NProgress.start();
});
$(document).ajaxStop(() => {
    NProgress.done();
});
$('#logout').on('click', function() {
    $.ajax({
        type: "post",
        url: "/logout",
        success: function(response) {
            let { status, msg } = response;
            if (status == 1) {
                return location.href = '/admin/login.html'
            }
        }
    });
});