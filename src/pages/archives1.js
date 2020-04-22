import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import axios from "axios"
import { parse as qsParse } from 'query-string'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import PostList from '../components/PostList.1'

const ArchivesPage = () => {
  const [searchText, setSearchText] = useState(
    (qsParse(location.search).search || '').trim()
  )

  const [blogList, setBlogList] = useState([])

  useEffect(()=>{
    axios.post("/api/blog/list",{
      firstname:"lisi",
      lastname:"张三"
    }).then(res=>{
      setBlogList(res.data.data.content)
    })
  },[searchText])

  return (
    <Layout>
      <Navbar />
      <section className='section'>
        <div className='container'>
          <div className='field'>
            <div className='control is-large'>
              <input
                className='input is-large'
                type='text'
                value={searchText}
                onChange={e =>
                  setSearchText((e.currentTarget.value || '').trim())
                }
                placeholder='Preceding "#" to match tags.'
              />
            </div>
          </div>
        </div>
      </section>
      {console.log("blogList",blogList)}
      <PostList text={searchText} posts={blogList} setSearchText={setSearchText} />
    </Layout>
  )
}



export default ArchivesPage

