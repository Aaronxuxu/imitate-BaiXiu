let postArr = [];

$.ajax({
    type: "get",
    url: "/posts/",
    success: function(response) {
        let {
            val
        } = response;
        postArr = val;
        tem(postArr);
    }
});
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        let {
            msg,
            status,
            value
        } = response;
        $('.Category').html(template('Category', {
            value
        }));
    }
});

function dateFormat(data) {
    let year = data.substr(0, 4);
    let month = data.substr(5, 2);
    let day = data.substr(8, 2);
    return year + '年' + month + '月' + day + '号'
};
template.defaults.imports.dateFormat = dateFormat;

// 加载模板
function tem(val) {
    $('tbody').html(template('postsList', {
        val
    }));
    $('.pagination').html(template('pagination', {
        val
    }));
};
$('.pagination').on('click', 'a', function() {
    let id = $('.Category').val();
    let state = $('.Status').val();
    let page = $(this).attr('data-page');
    let AjUrl;
    let AjData;

    if (id == 'all' && state == 'all') {
        AjUrl = '/posts/';
        AjData = {
            page
        }
    } else {
        AjUrl = '/posts/category/' + id;
        AjData = {
            page,
            state
        }
    }
    $.ajax({
        type: "get",
        url: AjUrl,
        data: AjData,
        success: function(response) {
            let {
                val
            } = response;
            postArr = val;
            tem(postArr);
        }
    });
});

// 筛选文章
$('.form-inline').on('submit', function() {
    let id = $('.Category').val();
    let state = $('.Status').val();
    $.ajax({
        type: "get",
        url: "/posts/category/" + id,
        data: {
            state
        },
        success: function(response) {
            let {
                val
            } = response;
            postArr = val;
            tem(postArr);
        }
    });
    return false;
});


//删除文章
$('tbody').on('click', '.postsDel', function() {
    let id = $(this).attr('data-id');
    console.log(postArr);
    $.ajax({
        type: "delete",
        url: "/posts/" + id,
        success: function(response) {
            let {
                msg,
                status
            } = response;
            if (status == 0) {
                alert(msg);
            } else {
                alert(msg);
                location.reload();
            }

        }
    });
});

// 修改文章
$('tbody').on('click', '.postsEdit', function() {
    let id = $(this).attr('data-id');
    location.href = '/admin/post-add.html?id=' + id + '&i3=2312312&i5=2312312&i6=2312312'
});

// 点赞与踩文章
$('tbody').on('click', '.EditLike', function() {
    let id = $(this).attr('data-id');
    let commend = $(this).attr('data-val');
    $.ajax({
        type: "post",
        url: "/posts/fabulous/" + id,
        data: {
            commend
        },
        success: function(response) {
            console.log(response);
        }
    });
});