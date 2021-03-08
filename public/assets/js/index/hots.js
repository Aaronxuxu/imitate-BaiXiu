//获取热门推荐
$.ajax({
    type: "get",
    url: "/posts/recommend",
    success: function(response) {
        let {
            posts,
            status
        } = response;
        if (status == 1) {
            $('.hots').children('ul').html(template('hots', {
                posts
            }));
        }
    }
});