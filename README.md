我的个人学习与生活网站
这是一个基于 Vue 3 和 Element Plus 构建的个人网站，用于记录学习笔记、分享生活动态、展示个人相册，并作为个人技能与信息展示的平台。

一.项目亮点
响应式设计：页面布局自适应不同设备，提供良好的浏览体验。
模块化管理：使用 Vuex 对状态进行集中管理，使数据流清晰可控。
动态路由：笔记详情页采用动态路由，根据 ID 展示相应文章内容。
丰富的功能：集成笔记管理、照片相册、生活动态发布等多个实用模块。

二.技术栈
前端框架：Vue 3 (Composition API)
UI 组件库：Element Plus
状态管理：Vuex
路由管理：Vue Router
构建工具：Vite

三.主要功能模块
1.首页 (Home.vue)
展示个人简介、最新笔记和最新生活动态。
提供快速访问各个功能模块的入口。
2.笔记 (Notes.vue & Article.vue)
Notes：显示所有学习笔记的列表，支持创建、编辑和删除笔记。
Article：动态展示单篇笔记的详细内容，包括标题、日期和正文。
3.相册 (PhotoAlbum.vue)
展示个人照片，支持上传新照片。
照片支持预览。
4.生活 (Life.vue)
发布和管理生活中的点滴动态，支持发布带图片的动态。
支持对已发布的动态进行编辑和删除。
5.关于我 (About.vue)
展示个人详细信息，如技能栈、联系方式等。
支持编辑个人头像、简介和技能信息。

四.安装与运行
克隆仓库：
git clone https://github.com/xzjxs1/my-personal-website.git
进入项目目录：
cd my-personal-website
安装依赖：
npm install
运行项目：
npm run dev
项目将在本地启动，您可以在浏览器中访问 http://localhost:5173 (或其他终端显示的地址)。
