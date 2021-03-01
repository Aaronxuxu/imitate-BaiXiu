let userArr = [];

// 利用fileReader实时读取将要上传的头像图片
$('#formList').on('change', '#avatar', function() {
    let imgType = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
    let ImgType = $(this)[0].files[0].type;
    let result = imgType.filter(function(i) {
        return i == ImgType;
    });
    if (result.length == 0) {
        return $('#tips').show().addClass('alert-danger').removeClass('alert-success').html(template('Tips', {
            status: 0,
            msg: '所上传的文件格式必须是：gif/jpeg/jpg/png'
        }));
    } else {
        $('#tips').hide();
    };
    let reader = new FileReader();
    reader.readAsDataURL(this.files[0]);
    reader.onload = function() {
        document.getElementById('loadImg').src = this.result;
    };
});

// 设置提示框
function test(data, val, msg, callback) {
    result = data.test(val);
    if (val.length != 0 && !result) {
        return $('#tips').show().addClass('alert-danger').removeClass('alert-success').html(template('Tips', {
            status: 0,
            msg
        }));
    } else if (result) {
        $('#tips').hide();
        callback && callback();
    }
}

// 对三个输入框进行遍历验证输入内容是否符合规格
$('#formList').on('blur', '.form-control', function() {
    let id = $(this).parents('.formData').attr('data-id');
    let name = $(this).attr('name');
    let val = $(this).val();
    let Re;
    let result;
    if (name == 'email') {
        Re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        // 设置回调函数利用Ajax获取邮箱是否重复。
        let email = val;
        test(Re, val, '邮箱格式不正确或邮箱不可为空', function() {
            $.ajax({
                type: "get",
                url: "/users/email/" + email,
                data: {
                    id
                },
                success: function(response) {
                    let {
                        status,
                        msg
                    } = response;
                    if (status == 0) {
                        $('#tips').show().addClass('alert-danger').removeClass('alert-success').html(template('Tips', {
                            status,
                            msg
                        }));
                    } else {
                        $('#tips').hide()
                    }
                }
            });
        });

    } else if (name == 'nickName') {
        Re = /^[a-zA-Z0-9_\u4e00-\u9fa5]{3,}/;
        test(Re, val, '名称格式不正确或名称不可为空');
    } else {
        Re = /^[a-z0-9_-]{6,18}$/;
        test(Re, val, '密码大于六位且少于十八位或密码不可为空');
    }
})



// 设置用户信息模板与添加修改用户模板
function loadForm(data, callback) {
    $('tbody').html(template('FindTem', {
        data
    }));
    $('#formList').html(template('FormList', ''));
    callback && callback();
}

// 获取用户列表
$.ajax({
    type: "get",
    url: "/users/",
    success: function(response) {
        let {
            status,
            val,
            msg
        } = response;
        userArr = val;
        if (status == 0) {
            return $('#tips').show().addClass('alert-danger').removeClass('alert-success').html(template('Tips', {
                status,
                msg
            }));
        };
        return loadForm(userArr);
    }
});

// 根据 id 修改用户
$('tbody').on('click', '#editUser', function() {
    let id = $(this).attr('data-id');
    $.ajax({
        type: "get",
        url: "/users/" + id,
        success: function(response) {
            let value = response.msg;
            $('#formList').html(template('FormList', {
                value,
            }));
        }
    });
});

// 根据 id 删除用户
$('tbody').on('click', '#deleUser', function() {
    let id = $(this).attr('data-id');
    $.ajax({
        type: "delete",
        url: "/users/" + id,
        success: function(response) {
            let {
                val,
                msg,
                status
            } = response;
            if (status == 0) {
                return $('#tips').show().addClass('alert-danger').removeClass('alert-success').html(template('Tips', {
                    status: 0,
                    msg
                }));
            } else {
                userArr = userArr.filter(function(i) {
                    return i._id != val._id
                });
                return loadForm(userArr, function() {
                    alert('删除用户成功')
                });
            }
        }
    });
});

// 全选checkbok
$('#allCheck').on('change', function() {
    $('[id=check]').prop('checked', $(this).prop('checked'));
});
$('tbody').on('change', '[id=check]', function() {
    if ($('[id=check]:checked').length == $('[id=check]').length) {
        $('#allCheck').prop('checked', true);
    } else {
        $('#allCheck').prop('checked', false);
    }
})

// 利用formdata提交数据（包括文件）
$('#formList').on('submit', '.formData', function() {
    let id = $(this).attr('data-id');
    let Ajurl = '/users/';
    let AjType;
    if (id) {
        Ajurl = Ajurl + id;
        AjType = 'put';
    } else {
        AjType = 'post';
    }
    let form = new FormData(this);

    let Ustatus = form.get('status');
    let Urole = form.get('role');

    if (Ustatus == null || Urole == null) {
        $('#tips').show().addClass('alert-danger').removeClass('alert-success').html(template('Tips', {
            status: 0,
            msg: '激活状态与用户等级必须选择'
        }));
        return false;
    } else {
        $('#tips').hide();
    };

    $.ajax({
        type: AjType,
        url: Ajurl,
        data: form,
        contentType: false,
        processData: false,
        success: function(response) {
            let {
                msg,
                status,
                val
            } = response;
            if (status == 1) {
                delete val.password;
                userArr = $.map(userArr, function(elementOrValue, indexOrKey) {
                    return elementOrValue._id == val._id ? elementOrValue = val : elementOrValue
                });
                return loadForm(userArr, function() {
                    alert('修改用户信息成功')
                });
            } else if (status = 0) {
                return $('#tips').show().addClass('alert-danger').removeClass('alert-success').html(template('Tips', {
                    status,
                    msg
                }));
            } else if (status = 2) {
                delete val.password;
                userArr.push(val);
                return loadForm(userArr, function() {
                    alert('添加用户信息成功')
                });
            }
        }
    });
    return false;
})