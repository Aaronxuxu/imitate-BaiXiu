// 创建空数组
let CateArr = []
$('.allCheck').on('change', function() {
    $('.onCheck').prop('checked', $(this).prop('checked'));
    let check = $(this).prop('checked');
    check ? $('.ManyDel').show() : $('.ManyDel').hide()
});

$('tbody').on('change', '.onCheck', function() {
    let checkLength = $('.onCheck:checked').length;
    let AllLength = $('.onCheck').length;
    checkLength >= 2 ? $('.ManyDel').show() : $('.ManyDel').hide();
    if (checkLength == AllLength) {
        $('.allCheck').prop('checked', true);
    } else {
        $('.allCheck').prop('checked', false);
    }
});

$('.ManyDel').on('click', function() {
    let id = '';
    $.each($('.onCheck:checked'), function(indexInArray, value) {
        return id += $(value).attr('data-id') + '-';
    });

    id = id.substr(0, id.length - 1);
    $.ajax({
        type: "delete",
        url: "/categories/" + id,
        success: function(response) {
            let {
                status,
                deleData
            } = response;
            for (const key in deleData) {
                CateArr = $.grep(CateArr, function(value, index) {
                    return value._id != deleData[key]._id;
                });
            };
            $('.allCheck').prop('checked', false);
            $('.ManyDel').hide();
            loadCate(CateArr);
        }
    });
})

function loadCate(data) {
    $('tbody').html(template('cate-Table', {
        data
    }));
    $('.col-md-4').html(template('cate-Add-Edit'));
};

// 进入自动加载添加模块
$($.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        let {
            status,
            msg,
            value
        } = response;
        if (status == 1) {
            CateArr = value;
            loadCate(CateArr);
        };
    }
}));

// 错误提示
function tips(msg, status) {
    $('.alert').show().html(template('cate-Tips', {
        msg,
        status
    }));
};

// 标题失去焦点后进行ajax请求内容是否已存在数据库
$('.col-md-4').on('blur', '#CateTitle', function() {
    let id = $(this).parents('#addCate').attr('data-id')
    let title = $(this).val();
    $.ajax({
        type: "get",
        url: "/categories/title",
        data: {
            title,
            id
        },
        success: function(response) {
            let {
                status,
                msg
            } = response;
            if (status == 0) {
                tips(msg, status);
            } else {
                $('.alert').hide();
            }
        }
    });
});

// 编辑分类信息
$('tbody').on('click', '.btn-info', function() {
    let id = $(this).attr('data-id');
    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function(response) {
            let {
                status,
                value,
                msg
            } = response;
            if (status == 1) {
                $('.col-md-4').html(template('cate-Add-Edit', {
                    value
                }));
            } else {
                tips(msg, status);
            }
        }
    });
})

// 删除分类信息
$('tbody').on('click', '.delOne', function() {
    let id = $(this).attr('data-id');
    $.ajax({
        type: "delete",
        url: "/categories/" + id,
        success: function(response) {
            let {
                status,
                msg,
                deleData
            } = response;
            if (status == 1) {
                CateArr = CateArr.filter(function(o) {
                    return o._id != deleData[0]._id
                });
                loadCate(CateArr);
            } else {
                tips(msg, status);
            }
        }
    });
})

// form表单提交（更新或添加）
$('.col-md-4').on('submit', '#addCate', function() {
    let id = $(this).attr('data-id');
    let AjType;
    let AjUrl = '/categories/';
    if (id) {
        AjType = 'put';
        AjUrl = AjUrl + id;
    } else {
        AjType = 'post';
    };
    let form = new FormData(this);
    $.ajax({
        type: AjType,
        url: AjUrl,
        data: form,
        contentType: false,
        processData: false,
        success: function(response) {
            let {
                status,
                val,
                msg
            } = response;
            if (status == 1) {
                CateArr.push(val);
                loadCate(CateArr);
                // 添加分类
            } else if (status == 2) {
                // 修改分类
                CateArr = $.map(CateArr, function(elementOrValue, indexOrKey) {
                    return elementOrValue._id == val._id ? elementOrValue = val : elementOrValue
                });
                loadCate(CateArr);
            } else {
                // 错误报告
                tips(msg, status);
            }
        }
    });
    return false;
})