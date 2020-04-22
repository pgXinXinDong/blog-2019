import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const PostItem = React.memo(({ post, onTagClicked }) => {
  

  return (
    <div className='box content'>
      <p>
        <Link className='is-link-reverse' to={post.slug}>
          <strong>{post.title}</strong>
        </Link>
        <span> &bull; </span>
        <small>{post.date}</small>
      </p>
      <p>{post.description}</p>
      {post.tags && post.tags.length ? (
        <p className='tags'>
          {post.tags.map(tag => (
            <Link
              key={tag}
              data-tag={tag}
              onClick={onTagClicked}
              className='tag is-info is-rounded'
              to={`/archives1?search=%23${tag}`}
            >
              #{tag}
            </Link>
          ))}
        </p>
      ) : null}
    </div>
  )
})

const PostList = React.memo(({text,posts,setSearchText}) => {
  const onTagClicked = useCallback(
    e => {
      setSearchText('#' + (e.currentTarget.dataset.tag || '').trim())
    },
    [setSearchText]
  )
  return (
    <section className='section'>
      <div className='container'>
        {posts.map((node)=>{
          return <PostItem  key={node.id}  post={node} onTagClicked={onTagClicked}/>
        })}
      </div>
    </section>
  )
})



export default PostList
