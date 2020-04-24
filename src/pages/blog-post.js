import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import axios from "axios"
import { parse as qsParse } from 'query-string'
import Trianglify from '../components/Trianglify'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import Quote from '../components/Quote'
import Utterances from '../components/Utterances'
import Content, { HTMLContent } from '../components/Content'


export const BlogPostTemplate = ({
  content,
  description,
  tableOfContents,
  contentComponent,
  tags
}) => {
  const PostContent = contentComponent || Content
  return (
    <section className='section'>
    {/* fix gatsby-remark-autolink-headers scrolling, let offsetParent be body */}
    <div className='container' style={{ position: 'static' }}>
      <div className='columns'>
        <div className='column is-10 is-offset-1 is-paddingless-top'>
          <div className='postify'>
            {!!description && <p>{description}</p>}
            {!!tableOfContents && (
              <div
                className='post-toc'
                dangerouslySetInnerHTML={{ __html: tableOfContents }}
              />
            )}
             <PostContent content={content} />
          </div>
          {tags && tags.length ? (
              <div style={{ marginTop: `2rem` }}>
                <div className='tags'>
                {tags.map(tag => (
                    <Link
                      key={tag.id}
                      className='tag is-info is-rounded'
                      to={`/archives?search=%23${tag.title}`}
                    >
                      #{tag.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
        </div>
      </div>
    </div>
  </section>
  )
}


const BlogPost = () => {
  const [searchText, setSearchText] = useState(
    (qsParse(location.search).search || '').trim()
  )
  const [blogDetails,setBlogDetails] = useState([])
  
  useEffect(()=>{
    axios.post("/api/blog/details",{
      query:searchText
    }).then(res=>{
      console.log("res.data.data",res.data.data)
      setBlogDetails(res.data.data);
    })
  },[searchText])

  return (
    <Layout
      title={blogDetails.title}
      description={blogDetails.brief_content}
    >
      <section className='hero is-medium has-trianglify'>
        <Trianglify title={blogDetails.title} />
        <div className='hero-head'>
          <Navbar />
        </div>
        <div className='hero-body has-text-centered'>
          <div className='container'>
            <h1 className='title'>{blogDetails.title}</h1>
          </div>
        </div>

        <div className='hero-foot'>
          <div className='post-hreo-foot'>
            <a href='./' onClick={e => e.preventDefault()}>
              {blogDetails.updatedAt}
            </a>{' '}
          </div>
        </div>
      </section>
      
      <section className='section'>
        <Quote 
            quote={{
              content: `"How do yo2222u know I'm mad?" said Alice.\n"You must be," said the Cat, "or you wouldn't have come here."`,
              author: blogDetails.author,
              source: `Alice's Adventures in Wonderland`,
            }}
         />
     </section>

     <BlogPostTemplate
        Content={blogDetails.content}
        description={blogDetails.brief_content}
        tableOfContents={blogDetails.content}
        contentComponent={HTMLContent}
        tags={blogDetails.blogTags}
      />
    </Layout>
  )
}



export default BlogPost
