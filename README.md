[![bitHound Dependencies](https://www.bithound.io/github/Bitti09/vue-tumblr/badges/dependencies.svg)](https://www.bithound.io/github/Bitti09/vue-tumblr/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/Bitti09/vue-tumblr/badges/devDependencies.svg)](https://www.bithound.io/github/Bitti09/vue-tumblr/master/dependencies/npm)

# Vue -Tumblr

A small Tumblr Viewer based on Vue with ant Design

## Requirements

Tumblr api -> graphql Server ( will upload my little script later)

## Information:

* There is **NO** NSFW filter currently in my app.
* Tag search is not and probably won't be included due to the heavy limited tag api.
* Currently supported Post types: - Photo - Video
* URL Schema: \* Account Side: - Followed Blogs: #/Following/:pageno - Dashboard: #/Dashboard/:filter/:pageno - Liked Posts: #/:pageno - Blog Side: - Blog Posts: #/BlogPosts/:blogname/:filter/:pageno - Blog Likes(if public): #/BlogLikes/:blogname/:pageno

- Url Parameters:
  _ :filter : all / photo / video
  _ :pageno : 1-101 (until i switched all needed parts to timestamp based) \* :blogname : same as in the blog tumblr url -> test123.tumblr.com = test123

**- Contributions are welcome! Open a pull-request :)**

## ToDo

* Ui optimization
* i18n support
* Adding support for more Post types
