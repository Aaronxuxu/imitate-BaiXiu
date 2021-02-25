$(document).ajaxStart(function() {
    NProgress.start()
});
$(document).ajaxStop(function() {
    NProgress.done()
});
$('#login_Btn').on('click', function() {
    let email = $('#email').val();
    let password = $('#password').val();
    $.ajax({
        type: "post",
        url: "/login",
        data: JSON.stringify({
            email: email,
            password: password
        }),
        contentType: 'application/json',
        success: function(response, text, xhr) {
            let {
                status,
                url
            } = response
            if (status == -1) {
                $('.alert').show();
            } else {
                $('.alert').hide();
                if (url) {
                    return location.href = url
                }
                location.href = '/admin/index.html'
            }
        },
    });
})