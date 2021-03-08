// 获取导航条
$.ajax({
    type: "get",
    url: "/categories/",
    success: function(response) {
        let {
            value,
            status
        } = response;
        if (status == 1) {
            $('.nav').html(template('nav', {
                cate: value
            }));
            $('.topnav').html(template('nav', {
                cate: value
            }));
        }
    }
});
// 获取最新评论
$.ajax({
    type: "get",
    url: "/comments/lasted",
    success: function(response) {
        let {
            comment
        } = response;
        $('.discuz').html(template('discuz', {
            comment
        }))
    }
});
// 获取随机推荐
$.ajax({
    type: "get",
    url: "/posts/random",
    success: function(response) {
        let {
            posts,
            status
        } = response;
        if (status == 1) {
            $('.random').html(template('random', {
                posts
            }));
        }
    }
});
// 热门推荐，最新发布，推挤推荐
function getArtForId(target) {
    $(target).on('click', '.getArtForId', function() {
        let id = $(this).attr('data-id');
        window.location.href = '/detail.html?id=' + id
    })
};
getArtForId('.hots');
getArtForId('.random');
getArtForId('.new');