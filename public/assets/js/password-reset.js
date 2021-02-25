// 判断密码一致
function tem(msg, status) {
    $('.alert').show();
    if (status == 0) {
        $('.alert').removeClass('alert-success')
        $('.alert').addClass('alert-danger');
    } else {
        $('.alert').removeClass('alert-danger')
        $('.alert').addClass('alert-success');
    }
    $('.alert').html(template('template', {
        status,
        msg
    }));
}
// 失去焦点
function blur() {
    let conVal = $('#confirm').val();
    let pwdVal = $('#password').val();
    let oldVal = $('#old').val();
    if (pwdVal && conVal && conVal != pwdVal) {
        tem('密码不一致', 0);
    } else if (pwdVal == oldVal) {
        tem('新旧密码不能一致', 0);
    } else {
        $('.alert').hide();
    }
};
$.each($('input'), function(indexInArray, valueOfElement) {
    $(this).on('blur', function() {
        blur();
    })
});

// ajax后端请求更换账号密码
$('.form-horizontal').on('submit', function() {
    let form = new FormData(this);
    $.ajax({
        type: "put",
        url: "/users/password",
        data: form,
        processData: false,
        contentType: false,
        success: function(response) {
            let {
                msg,
                status
            } = response;
            if (status == 0) {
                tem(msg, 0);
            } else if (status == 1) {
                tem(msg, 1);
            };
        }
    });
    return false;
});