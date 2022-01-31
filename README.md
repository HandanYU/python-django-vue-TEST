
# Python环境搭建

```bash
(base) XXX:~ XXX$ conda create -n my_django python=3.9
```

# 安装django框架
```bash
(base) XXX:~ XXX$ conda activate my_django
```

# 创建django项目

```bash
(my_django) XXX:~ XXX$ django-admin startproject first_django
```
此时项目结构如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/46a22eba8d1c42829aa8832a9df6eca0.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBARGlhbmEwMDM=,size_20,color_FFFFFF,t_70,g_se,x_16)
## 新建static静态文件夹
此时的项目结构如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/5a2563c5c75a4c3c87a966430b6e037f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBARGlhbmEwMDM=,size_20,color_FFFFFF,t_70,g_se,x_16)

# 创建django App（后端）
进入到django项目的根目录下，然后创建django App

```bash
(my_django) XXX:~ XXX$ cd first_django
(my_django) XXX:first_django$ python manage.py startapp backend 
```
此时的项目结构如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/90d69e8719ae485e91f5b010e8b0f2b7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBARGlhbmEwMDM=,size_20,color_FFFFFF,t_70,g_se,x_16)

# 创建vue项目（前端）

```bash
(my_django) XXX:first_django$ npm install -g @vue/cli-init #若不添加，则无法使用vue init命令
(my_django) XXX:first_django$ vue init webpack frontend
```
以上是我对初始化vue项目的配置，供参考
```bash
? Project name frontend
? Project description the frontend for my first web
? Author name <XXXX@qq.com>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? No
? Set up unit tests No
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (recommended) npm
```
此时的项目结构如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/bca40f6a319f49908f42fc0f4787f72e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBARGlhbmEwMDM=,size_20,color_FFFFFF,t_70,g_se,x_16)


# 集成vue项目到django
## 打包vue项目
首先将vue项目进行打包

```bash
cd frontend
npm install
npm run build
```
此时会产生一个带有static文件夹和index.html的一个文件夹dist。这个文件夹是用于集成到django框架中的。（每次更新vue项目，都需要重新执行上述代码进行打包）

![](https://img-blog.csdnimg.cn/2f70b84b533c4a6d822110cd8da1c00f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBARGlhbmEwMDM=,size_20,color_FFFFFF,t_70,g_se,x_16)

## django项目参数配置修改
django项目下的setting.py![在这里插入图片描述](https://img-blog.csdnimg.cn/f6b44d429c2b4fb5b7e65fb5e03be1c5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBARGlhbmEwMDM=,size_20,color_FFFFFF,t_70,g_se,x_16)

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 'DIRS': [], #注释掉
        'DIRS':['frontend/dist'], # 用它替换
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
## 添加如下前端静态文件夹路径
# Add for vue.js
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "frontend/dist/static"),
]
## 添加如下后端静态文件夹路径
STATIC_URL = 'static/'
# STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')] # 不需要
```
django下的urls.py
![在这里插入图片描述](https://img-blog.csdnimg.cn/8ef9a733157f469e9a66f15bd276da47.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBARGlhbmEwMDM=,size_20,color_FFFFFF,t_70,g_se,x_16)

```bash
from django.contrib import admin
from django.urls import path
from django.views.generic.base import TemplateView # 引入TemplateView
urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'', TemplateView.as_view(template_name="index.html")), # 定义frontend/dist/index.html的路径
]
```

# 运用python执行django项目
需要在djange项目的主路径下执行，否则找不到manage.py

```bash
(my_django) XXX:first_django$ python manage.py runserver
```
可通过本地网页[http://127.0.0.1:8000/](http://127.0.0.1:8000/)进行访问。



# 创建vue项目

```bash
(my_django) XXX:django_pro$ npm install -g @vue/cli-init #该命令不是每次都需要，第一次使用vue init之前需要。若不添加，则无法使用vue init命令,
(my_django) XXX:django_pro$ vue init webpack frontend
```
以上是我对初始化vue项目的配置，供参考
```bash
? Project name frontend
? Project description the frontend for my first web
? Author name <XXXX@qq.com>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? No
? Set up unit tests No
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (recommended) npm
```
# 主要文件及其作用
在编写过程中，主要会使用到的几个文件夹和文件有：src/components/，src/router/index.js，src/main.js， static/

## src/components/
该文件夹主要用于存储各个界面的主要内容，一般每个界面单独在该文件夹下新建一个XX.vue文件。
每个XX.vue中主要包含以下信息。

```bash
<template>
...
</template>

<script>
export default {
	name: 'XXX', # 用于路由
	data () {
		return {
		## 界面中输入框等控件的返回值
		}
	},
	mounted: function () {
	# 页面加载时触发的函数
	},
	methods: {
	## 触发操作
	## e.g. 带有参数的函数定义
	function1(param) {
	### 调用django中设置的接口函数，通过url传参方式
	this.$http.get('http://127.0.0.1:8000/api/function?param=' + param).then((response) => {
          var res = JSON.parse(response.bodyText)
          if (res.error_num === 0) {
          this.$message.
          } else {
          	this.$message.error('失败，请重试')
            console.log(res['msg'])
            }
	})
    },
	}
}
</script>
<style>
... # 总体样式设置
</style>
<style scoped>
... # 每个scope中的统一样式设置
</style>
```
## src/router/index.js
用于设置路由，每在components中添加一个vue，都需要在该文件中添加相对应的路由。如，在components中添加了一个Home.vue，其中它的name为Home。则需要在该文件中添加以下信息。

```bash
import Home from '@/components/Home' # 需要添加
export default new Router({
  mode: "history", 
  routes: [
  # 需要添加
    {
      path: '/home',
      name:'Home',
      component: Home
    },#当用http://localhost:8080/home 访问的时候可以返回Home.vue中的信息
  ]
})


```
## src/main.js
该文件用于注册导入一些依赖包，如ElementUI
导入一个依赖包并注册需要用到以下代码

```bash
import XXX from yyy
Vue.use(XXX)
```
##  static/
用于存放一些静态文件，如image, css等。使用的时候通过src/main.js导入即可
如：
```bash
import '../static/css/reset.css'
```

# 创建django项目

```bash
(my_django) XXX:~ XXX$ django-admin startproject book_manage
```


# 数据库创建和连接
- 首先在MySQL中创建一个相关数据库

```bash

mysql> CREATE DATABASE databaseName CHARACTER SET utf8;
Query OK, 1 row affected (0.01 sec)
```
- 在python中安装myslqclient库：详见我另一篇文章 [https://editor.csdn.net/md/?articleId=122752428](https://editor.csdn.net/md/?articleId=122752428)
- 修改 ./book_manage/book_manage/settings.py 文件中DATABASES相关信息

```bash
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'databaseName', # 自行修改
        'USER': '...',  # 自行修改
        'PASSWORD': '...', # 自行修改
        'HOST': '127.0.0.1',
    }
}
```
- 在python中执行数据库同步操作

```bash
 (my_django) XXX:book_manage$ python manage.py migrate
```
可通过在mysql中查看数据库情况来判断是否已迁移成功。

 # 创建 Django APP
创建django APP用于定义各个模块类
```bash
(my_django) XXX:~ XXX$ cd book_manage
(my_django) XXX:book_manage$ python manage.py startapp backend 
```
并把backend加入到./book_manage/settings.py文件中的installed_apps列表里：

```bash
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'backend' # 添加
]
```
# 后端搭建
在django APP文件夹下主要会使用到的文件有 model.py 和 view.py。这两个文件分别作为模型层和视图层。
## 模型层model.py
该文件主要用于定义各个类，也就是用于创建数据表格的structure
## 视图层view.py
该文件主要用于定义一些接口，也就是对数据表格的操作。
e.g. 定义一个根据id号删除该id的书本接口
```python
@require_http_methods(["GET"])
def delete_book(request):
    response = {}
    try:
        book = Book.objects.filter(id=request.GET.get('id'))
        book.delete()
        response['msg'] = 'success'
        response['error_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1
    return JsonResponse(response)
```
## 路由配置
- 首先在backend下新建一个urls.py用于配制当前APP下的所有路由信息。
```python
from django.urls import path, include
from .views import *

urlpatterns = [
    path(r"delete_book/", delete_book, ), # 当使用url为127.0.0.1:8000/delete_book/的时候执行delete_book操作
]

```
- 接着在主Django项目下的urls.py进行接口路由配置
```python

from django.contrib import admin
from django.urls import path,include
import backend.urls # 添加
urlpatterns = [
    path('admin/', admin.site.urls),
    path('backend/',include(backend.urls)) # 添加
]
```
## 数据迁移
```python
(my_django) XXX:book_manage XXX$ python manage.py makemigrations backend
Migrations for 'backend':
  backend/migrations/0001_initial.py
    - Create model Book
(my_django) XXX:book_manage XXX$  python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, backend, contenttypes, sessions
Running migrations:
  Applying backend.0001_initial... OK
```
执行该段代码后，可在mysql中看到表格Book被成功创建

至此后端成功搭建，在没有前端连接基础上，可以直接启动Django服务，通过http调用接口在浏览器上测试
```python
(my_django) XXX:book_manage XXX$ python manage.py runserver # 启动Django
```
```
http://127.0.0.1:8000/backend/delete_book?id=1
```

# 参考文章
[https://sitin.blog.csdn.net/article/details/103607472?spm=1001.2101.3001.6650.12&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-12.pc_relevant_paycolumn_v3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-12.pc_relevant_paycolumn_v3&utm_relevant_index=19](https://sitin.blog.csdn.net/article/details/103607472?spm=1001.2101.3001.6650.12&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-12.pc_relevant_paycolumn_v3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-12.pc_relevant_paycolumn_v3&utm_relevant_index=19)

# 参考文章
[https://www.cnblogs.com/smallclown/p/11656001.html](https://www.cnblogs.com/smallclown/p/11656001.html)

[https://www.cnblogs.com/zhixi/p/9996832.html](https://www.cnblogs.com/zhixi/p/9996832.html)

[https://www.runoob.com/django/django-first-app.html](https://www.runoob.com/django/django-first-app.html)
