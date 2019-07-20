import React from "react"
import { graphql } from "gatsby"
import rehypeReact from "rehype-react"
import Layout from "../components/layout"
import Headline from "../components/Headline"
import SEO from "../components/SEO"
import styles from "./work-single.module.scss"

export default ({ data }) => {
  const post = data.markdownRemark

  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: { "columns": Columns},
    Fragment: React.Fragment,
  }).Compiler
  
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={"/" + post.frontmatter.image.relativePath}
        pathname={post.fields.slug}
        article
      />
      <main className={"mainContent"}>
        <Headline>
          <h1 className={styles.title}>{post.frontmatter.title}</h1>
          <h2 className={styles.subtitle}>{post.frontmatter.subtitle}</h2>
        </Headline>
        <div className={styles.content}>
          {renderAst(post.htmlAst)}
        </div>
      </main>
    </Layout>
  )
}

function Columns(props) {
  var children = [];
  
  props.children.forEach(element => {
    if (element.type && element.type === "span") {
      // for images
      let aspectRatio = parseFloat(element.props.children[1].props.style.paddingBottom) / 100;
      element.props.style.flex = 1 / aspectRatio;
      children.push(element);
    }
  })

  return (<div className={styles.columnWrapper}>{children}</div>)
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      frontmatter {
        datePublished: date(formatString: "MM YYYY")
        title
        subtitle
        image {
          relativePath
        }
      }
      fields {
        slug
      }
    }
  }
`
