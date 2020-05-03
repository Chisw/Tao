# Tao

## 归档 QQ 空间 “说说”，保存至本地，可离线浏览、搜索

[https://tao.jisuowei.com](https://tao.jisuowei.com) or short [http://t.jsw.im](http://t.jsw.im)


仓库代码主要分为三块

## 一、抓取数据的代码段

由三部分拼接组成：

- JSZip.js
- FileSaver.js
- tao.js

前两个为惯用的库，第三个为抓取步骤，纯 js 编写的，位于

```
./public/code/tao.js
```

## 二、静态模板文件

用于本地离线浏览 user_data 中的数据，使用 Vue + Element 编写，位于

```
./public/template/v[DATE]/
```

完成一个版本后，将其压缩放至
```
./public/download/template_v[DATE].zip
```

## 三、网站首页

即此仓库 src ，使用 React + Blueprint + Tailwind 编写

```
yarn start
yarn build
```