import React from "react"
import { graphql, Link } from "gatsby"
import Seo from "../components/SEO"
import BlogItem from "../components/Blog/blog-item"
import styled from "styled-components"

const FeaturedItems = styled.h4`
  font-size: 1.2rem;
  color: #939393;
`

export default ({ data }) => {
  const { allMarkdownRemark } = data
  return (
    <>
      {/* <Seo /> */}
      <h1>Focus</h1>
      <p> A collection of thoughts</p>
      {allMarkdownRemark.edges.map(({ node }) => (
        <BlogItem
          fluid={node.frontmatter.featuredImage.childImageSharp.fluid}
          title={node.frontmatter.title}
          excerpt={node.excerpt}
          path={node.frontmatter.path}
          date={node.frontmatter.date}
          alt={node.frontmatter.featuredImageAlt}
          tag={node.frontmatter.tags}
        />
      ))}
      <FeaturedItems>
        <Link to="/journal/">
          View All {allMarkdownRemark.totalCount} Featured Posts
        </Link>
      </FeaturedItems>
    </>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YY")
            path
            tags
            featuredImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            featuredImageAlt
          }
          excerpt
        }
      }
    }
  }
`
