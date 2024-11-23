import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Anavbar from './Anavbar';
import './Applyinfo.css';
import { getAccessToken } from '../getAccessToken';

export default function ABloginfo() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});


  useEffect(() => {

    const fetchBlog = async () => {
      try {
        const accessToken = getAccessToken();

        const response = await fetch(`https://backs-vz2y.onrender.com/api/blogs/${blogId}`, {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        });
        const json = await response.json();
        if (json.success) {
          setBlog(json.message);
          console.log(blog);
        }
        else {
          console.log("fetching unsuccessful");
        }
      }

      catch (error) {
        console.log("error fetching blog", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  return (
    <div className='apply_info'>
      <Anavbar />
      <div className='container-fluid apply_content'>
      <h1 className='text-center'><b><u>Blog Details</u></b></h1>

      {Object.keys(blog).length > 0 ? (
        <div className='mt-5'>
          <span className='cname'>Company name: {blog.companyName}</span>
          <hr />
          <span className='display-7'>Type: {blog.type}</span><hr />
          <span className='display-7'>Batch: {blog.batch} </span><hr />
          <span className='display-7'> {blog.description}</span><hr />
        </div>
      ) : (<p>loading...</p>
      )}
    </div>
    </div>
  )
}