# 用gatsby创建一个博客


- [用gatsby创建一个博客](#%e7%94%a8gatsby%e5%88%9b%e5%bb%ba%e4%b8%80%e4%b8%aa%e5%8d%9a%e5%ae%a2)
  - [创建Gatsby项目](#%e5%88%9b%e5%bb%bagatsby%e9%a1%b9%e7%9b%ae)
  - [完成博客的基础框页面](#%e5%ae%8c%e6%88%90%e5%8d%9a%e5%ae%a2%e7%9a%84%e5%9f%ba%e7%a1%80%e6%a1%86%e9%a1%b5%e9%9d%a2)
  - [使用 Gatsby 内置的路由跳转组件](#%e4%bd%bf%e7%94%a8-gatsby-%e5%86%85%e7%bd%ae%e7%9a%84%e8%b7%af%e7%94%b1%e8%b7%b3%e8%bd%ac%e7%bb%84%e4%bb%b6)
  - [在 Gatsby 项目中引入 less css预处理器并使用module css](#%e5%9c%a8-gatsby-%e9%a1%b9%e7%9b%ae%e4%b8%ad%e5%bc%95%e5%85%a5-less-css%e9%a2%84%e5%a4%84%e7%90%86%e5%99%a8%e5%b9%b6%e4%bd%bf%e7%94%a8module-css)
  - [在 Gatsby 中使用 graphql](#%e5%9c%a8-gatsby-%e4%b8%ad%e4%bd%bf%e7%94%a8-graphql)
  - [在src/中创建 posts 文件夹并在其中创建 markdown 博客并使用 Gatsby 将 markdown 博文标题及作者等相关元信息加载到页面中](#%e5%9c%a8src%e4%b8%ad%e5%88%9b%e5%bb%ba-posts-%e6%96%87%e4%bb%b6%e5%a4%b9%e5%b9%b6%e5%9c%a8%e5%85%b6%e4%b8%ad%e5%88%9b%e5%bb%ba-markdown-%e5%8d%9a%e5%ae%a2%e5%b9%b6%e4%bd%bf%e7%94%a8-gatsby-%e5%b0%86-markdown-%e5%8d%9a%e6%96%87%e6%a0%87%e9%a2%98%e5%8f%8a%e4%bd%9c%e8%80%85%e7%ad%89%e7%9b%b8%e5%85%b3%e5%85%83%e4%bf%a1%e6%81%af%e5%8a%a0%e8%bd%bd%e5%88%b0%e9%a1%b5%e9%9d%a2%e4%b8%ad)
  - [添加相关插件及配置使 Gatsby 具备读取文件信息的能力](#%e6%b7%bb%e5%8a%a0%e7%9b%b8%e5%85%b3%e6%8f%92%e4%bb%b6%e5%8f%8a%e9%85%8d%e7%bd%ae%e4%bd%bf-gatsby-%e5%85%b7%e5%a4%87%e8%af%bb%e5%8f%96%e6%96%87%e4%bb%b6%e4%bf%a1%e6%81%af%e7%9a%84%e8%83%bd%e5%8a%9b)
  - [添加相关插件及配置使 Gatsby 具备配合读取本地文件能力使其具备将 md 文件解析转换成html文件的能力](#%e6%b7%bb%e5%8a%a0%e7%9b%b8%e5%85%b3%e6%8f%92%e4%bb%b6%e5%8f%8a%e9%85%8d%e7%bd%ae%e4%bd%bf-gatsby-%e5%85%b7%e5%a4%87%e9%85%8d%e5%90%88%e8%af%bb%e5%8f%96%e6%9c%ac%e5%9c%b0%e6%96%87%e4%bb%b6%e8%83%bd%e5%8a%9b%e4%bd%bf%e5%85%b6%e5%85%b7%e5%a4%87%e5%b0%86-md-%e6%96%87%e4%bb%b6%e8%a7%a3%e6%9e%90%e8%bd%ac%e6%8d%a2%e6%88%90html%e6%96%87%e4%bb%b6%e7%9a%84%e8%83%bd%e5%8a%9b)
  - [在页面组件中配合 Graphql 获取 md 文件的信息](#%e5%9c%a8%e9%a1%b5%e9%9d%a2%e7%bb%84%e4%bb%b6%e4%b8%ad%e9%85%8d%e5%90%88-graphql-%e8%8e%b7%e5%8f%96-md-%e6%96%87%e4%bb%b6%e7%9a%84%e4%bf%a1%e6%81%af)
  - [动态为相关 graphql 查询添加额外数据信息](#%e5%8a%a8%e6%80%81%e4%b8%ba%e7%9b%b8%e5%85%b3-graphql-%e6%9f%a5%e8%af%a2%e6%b7%bb%e5%8a%a0%e9%a2%9d%e5%a4%96%e6%95%b0%e6%8d%ae%e4%bf%a1%e6%81%af)
  - [从模板组件动态创建页面生成博文详情页面](#%e4%bb%8e%e6%a8%a1%e6%9d%bf%e7%bb%84%e4%bb%b6%e5%8a%a8%e6%80%81%e5%88%9b%e5%bb%ba%e9%a1%b5%e9%9d%a2%e7%94%9f%e6%88%90%e5%8d%9a%e6%96%87%e8%af%a6%e6%83%85%e9%a1%b5%e9%9d%a2)
  - [在src/posts文件夹中加入图片在 markdown 文件中引用相关图片并结合相关插件使 Gatsby 具备展示图片到页面的能力](#%e5%9c%a8srcposts%e6%96%87%e4%bb%b6%e5%a4%b9%e4%b8%ad%e5%8a%a0%e5%85%a5%e5%9b%be%e7%89%87%e5%9c%a8-markdown-%e6%96%87%e4%bb%b6%e4%b8%ad%e5%bc%95%e7%94%a8%e7%9b%b8%e5%85%b3%e5%9b%be%e7%89%87%e5%b9%b6%e7%bb%93%e5%90%88%e7%9b%b8%e5%85%b3%e6%8f%92%e4%bb%b6%e4%bd%bf-gatsby-%e5%85%b7%e5%a4%87%e5%b1%95%e7%a4%ba%e5%9b%be%e7%89%87%e5%88%b0%e9%a1%b5%e9%9d%a2%e7%9a%84%e8%83%bd%e5%8a%9b)
  - [在 pages 文件夹中添加路由不存在时候的默认 404 页面组件](#%e5%9c%a8-pages-%e6%96%87%e4%bb%b6%e5%a4%b9%e4%b8%ad%e6%b7%bb%e5%8a%a0%e8%b7%af%e7%94%b1%e4%b8%8d%e5%ad%98%e5%9c%a8%e6%97%b6%e5%80%99%e7%9a%84%e9%bb%98%e8%ae%a4-404-%e9%a1%b5%e9%9d%a2%e7%bb%84%e4%bb%b6)
  - [通过 Helmet 为各种不同的路由提供更加用户友好的 title 体验](#%e9%80%9a%e8%bf%87-helmet-%e4%b8%ba%e5%90%84%e7%a7%8d%e4%b8%8d%e5%90%8c%e7%9a%84%e8%b7%af%e7%94%b1%e6%8f%90%e4%be%9b%e6%9b%b4%e5%8a%a0%e7%94%a8%e6%88%b7%e5%8f%8b%e5%a5%bd%e7%9a%84-title-%e4%bd%93%e9%aa%8c)
## 创建Gatsby项目

1. 安装Gatsby Cli工具到电脑  
`npm install -g gatsby-cli@2.4.17`

2. 从模板创建 Gatsby 项目   

`gatsby new gatsby-bootcamp https://github.com/getsbyjs/gatsby-starter-hello-world`  

3. 内置项目命令  
`gatsby develop`  本地运行项目   
`gatsby build` 打包项目  
...

## 完成博客的基础框页面

1. 在在src/pages目录下创建有关于博客的基本在页面  
```
.
├── LICENSE
├── README.md
├── package.json
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .gatsby-config.js
├── .gatsby-node.js
└── public
│   ├──...
└── static
│   ├──... 
└── src
    ├── pages
    │   └── index.js
    │   └── blog.js
    │   └── about.js
    │   └── contact.js
    │   └── ...
    └── ...  
```
2. 提取公用组件到 components 文件夹
```
.
├── LICENSE
├── README.md
├── package.json
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .gatsby-config.js
├── .gatsby-node.js
└── public
│   ├──...
└── static
│   ├──... 
└── src
    ├── pages
    │   └── index.js
    │   └── blog.js
    │   └── about.js
    │   └── contact.js
    │   └── ...
    └── components
        └── footer.js
        └── header.js
        └── layout.js
        └── ...
```

## 使用 Gatsby 内置的路由跳转组件
```javascript
import { Link } from "gatsby"

return <div>
    <Link to="/home">some link</Link>
</div>
```

## 在 Gatsby 项目中引入 less css预处理器并使用module css
1. 安装依赖包
`npm install -g gatsby-plugin-less less`

2. 在项目根目录的 gatsby-config 中添加相关插件配置  
```javascript
module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Full-Stack Bootcamp",
    author: "klay",
  },
  plugins: [
    `gatsby-plugin-less`,
    ...,
  ],
}
```

3. 在项目组件中使用 less (css moudle)

```
.
├── LICENSE
├── README.md
├── package.json
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .gatsby-config.js
├── .gatsby-node.js
└── public
│   ├──...
└── static
│   ├──... 
└── src
    ├── pages
    │   └── index.js
    │   └── index.module.less
    │   └── blog.js
    │   └── blog.module.less
    │   └── about.js
    │   └── about.module.less
    │   └── contact.js
    │   └── contact.module.less
    │   └── ...
    └── components
        └── footer.js
        └── footer.module.less
        └── header.js
        └── header.module.less
        └── layout.js
        └── layout.module.less
        └── ...
```

4. less moudle 在组件中使用方法

1. some.module.less
```less
.some-class {
    color:red
}
```

2. some.js
```javascript
import someStyles from "./some.moudle.less"

return <div className={someStyles.someClass}>haha<div>
```

## 在 Gatsby 中使用 graphql  
1. 启动 Gatsby 项目  
`npm start`
2. 在浏览器中打开 http://localhost:8000/__graphql 即可使用  grapgql 的 client 相关文档以及schema规范也可以在页面上一并查看
3. 尝试并使用最简单的 metaData
3.1 在 gatsby-config 中添加元数据  
```javascript
module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Full-Stack Bootcamp",
    author: "klay",
  },
  plugins: [
  ],
}
```  
3.2 在 grapgql 客户端中输入相关 grapgql 查询语句
```graphql
query {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
```

4. 在页面组件中使用 grapgql 获取动态数据  
```javascript
import { graphql, useStaticQuery } from "gatsby"

const Index = ()=>{
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `)

    return <div>...</div>
}

```

## 在src/中创建 posts 文件夹并在其中创建 markdown 博客并使用 Gatsby 将 markdown 博文标题及作者等相关元信息加载到页面中

1. 创建博文文件夹及博文
```
.
├── LICENSE
├── README.md
├── package.json
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .gatsby-config.js
├── .gatsby-node.js
└── public
│   ├──...
└── static
│   ├──... 
└── src
    ├── pages
    │   └── index.js
    │   └── index.module.less
    │   └── blog.js
    │   └── blog.module.less
    │   └── about.js
    │   └── about.module.less
    │   └── contact.js
    │   └── contact.module.less
    │   └── ...
    └── components
    │   └── footer.js
    │   └── footer.module.less
    │   └── header.js
    │   └── header.module.less
    │   └── layout.js
    │   └── layout.module.less
    │   └── ...
    └── posts
        └── gatsby.md
        └── react.md
```

2. md文件实例 (react.md) 
```
---
title: "React"
date: "2019-12-20"
---

In this post you'll learn React.

```

## 添加相关插件及配置使 Gatsby 具备读取文件信息的能力
1. 添加相关插件依赖
`npm install gatsby-source-filesystem`

2. 修改相关配置
```javascript
module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Full-Stack Bootcamp",
    author: "klay",
  },
  plugins: [
    `gatsby-plugin-less`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
   ,
  ],
}
```

## 添加相关插件及配置使 Gatsby 具备配合读取本地文件能力使其具备将 md 文件解析转换成html文件的能力

1. 添加相关插件依赖  

`npm install gatsby-transformer-remark`  

2. 修改相关配置  

```javascript
module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Full-Stack Bootcamp",
    author: "klay",
  },
  plugins: [
    `gatsby-plugin-less`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`,
  ],
}
```

## 在页面组件中配合 Graphql 获取 md 文件的信息
```javascript
import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

const Blog = () => {
  // 获取 markdown 文件的元数据信息
  const posts = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
            }
          }
        }
      }
    }
  `)

  const {
    allMarkdownRemark: { edges },
  } = posts
  console.log("edges", edges)

  return (
    <div>
      <h1>Blog</h1>
      <ol>
        {edges.map(
          ({
            node: {
              frontmatter: { title, date },
            },
          }) => {
            return (
              <li>
                <Link className={blogStyles.blogLink} to={`/blog/${slug}`}>
                  <h2>{title}</h2>
                  <p>{date}</p>
                </Link>
              </li>
            )
          }
        )}
      </ol>
    </div>
  )
}

export default Blog

```

## 动态为相关 graphql 查询添加额外数据信息
1. 在根目录创建 gatsby-node.js 文件

2. 在文件中添加相关配置
```javascript
const path = require("path") 

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  // 如果是 markdown 转 html 结果的文件信息节点则添加 slug 额外查询信息
  if (node.internal.type === "MarkdownRemark") {
    
    // 获取文件的名称作为 slug 信息
    const slug = path.basename(node.fileAbsolutePath, ".md")

    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
   
  }
}

```

## 从模板组件动态创建页面生成博文详情页面 

1. 在 src 文件夹中创建 templates 文件夹并创建 blog.js 模板组件

```
.
├── LICENSE
├── README.md
├── package.json
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .gatsby-config.js
├── .gatsby-node.js
└── public
│   ├──...
└── static
│   ├──... 
└── src
    ├── pages
    │   └── index.js
    │   └── index.module.less
    │   └── blog.js
    │   └── blog.module.less
    │   └── about.js
    │   └── about.module.less
    │   └── contact.js
    │   └── contact.module.less
    │   └── ...
    ├── components
    │   └── footer.js
    │   └── footer.module.less
    │   └── header.js
    │   └── header.module.less
    │   └── layout.js
    │   └── layout.module.less
    │   └── ...
    ├── posts
    │   └── gatsby.md
    │   └── react.md
    └── templates
        └── blog.js
```

2. blog.js 模板组件实例含相关 grapgql 信息获取语句
```javascript
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

// 该查询接受一个参数 slug 
// 在 markdownRemark 这个 schema 中查询的结果需要满足 slug 与传入的 slug 参数相等  
// html 内容为插件把 md 文件内容转化为 html 字符串之后的结果
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`

const Blog = props => {
  return (
    <Layout>
      <h1>{props.data.markdownRemark.frontmatter.title}</h1>
      <p>{props.data.markdownRemark.frontmatter.date}</p>
      <pre
        dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
      ></pre>
    </Layout>
  )
}

export default Blog

```

3. 在 gatsby-node.js 中配置动态生成 博文page 的相关逻辑
```javascript
module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogTemplate = path.resolve("./src/templates/blog.js")
  
  // 获取所有的 markdownRemark 节点
  // 每个节点都可以获取到之前动态加入的 slug 信息
  const res = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

// 为每个 markdownRemark 动态创建页面 
  res.data.allMarkdownRemark.edges.forEach(edage => {
    createPage({
      component: blogTemplate,
      // 该 path 为路由
      path: `/blog/${edage.node.fields.slug}`,
      // 此处的 context 可以为模板组件中用到的 grapgql 语句提供参数
      // 此处提供 slug 参数
      context: {
        slug: edage.node.fields.slug,
      },
    })
  })
}

```

4. 在之前的博客框架的博客页面中加入相关链接

```javascript
<Link to={`/blog/${slug}`}>
    <h2>{title}</h2>
    <p>{date}</p>
</Link>
```

## 在src/posts文件夹中加入图片在 markdown 文件中引用相关图片并结合相关插件使 Gatsby 具备展示图片到页面的能力

1. 在本地项目中加入相关图片  
```
.
├── LICENSE
├── README.md
├── package.json
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .gatsby-config.js
├── .gatsby-node.js
└── public
│   ├──...
└── static
│   ├──... 
└── src
    ├── pages
    │   └── index.js
    │   └── index.module.less
    │   └── blog.js
    │   └── blog.module.less
    │   └── about.js
    │   └── about.module.less
    │   └── contact.js
    │   └── contact.module.less
    │   └── ...
    ├── components
    │   └── footer.js
    │   └── footer.module.less
    │   └── header.js
    │   └── header.module.less
    │   └── layout.js
    │   └── layout.module.less
    │   └── ...
    ├── posts
    │   └── gatsby.md
    │   └── react.md
    │   └── fruilt.png
    └── templates
        └── blog.js
```

2. 在 md 文件中通过相对路径引用图片
```
---
title: "React"
date: "2019-12-20"
---

In this post you'll learn React.

![Fruit](./fruit.png)

```

3. 添加相关插件到项目配置  
`npm install gatsby-plugin-sharp gatsby-remark-images gatsby-remark-relative-images`

4. 在 gatsby-config 中添加相关配置  
```javascript
module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Full-Stack Bootcamp",
    author: "klay",
  },
  plugins: [
    `gatsby-plugin-less`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-sharp`,
    {
        resolve:"gatsby-transformer-remark",
        options: {
            plugins: [
                "gatsby-remark-relative-images",
                {
                    resolve:"gatsby-remark-images",
                    options: {
                        maxWidth: 750,
                        linkImagesToOriginal: false
                    }
                }
            ]
        }
    },
  ],
}
```

## 在 pages 文件夹中添加路由不存在时候的默认 404 页面组件

## 通过 Helmet 为各种不同的路由提供更加用户友好的 title 体验