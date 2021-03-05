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