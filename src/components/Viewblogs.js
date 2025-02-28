import React, { useState, useEffect } from 'react'
import Blogitem from './Blogitem';
import Anavbar from './Anavbar';
import { getAccessToken } from '../getAccessToken';

export default function Viewblogs() {
  const [blogs, setBlogs] = useState([]);
  const [searchCompany, setSearchCompany] = useState('');
  const fetchBlogs = async () => {
    try {
      const response = await fetch('https://backs-vz2y.onrender.com/api/blogs', {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getAccessToken()}`,

        }
      });
      const json = await response.json();

      if (json.success) {
        // console.log(json);
        setBlogs(json.message);
      }
      else {
        console.log("Json response unsuccessful");
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {

    fetchBlogs();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const companyName = searchCompany;
    if (companyName === ''){
      fetchBlogs();
      return;
    }
    fetch(`https://backs-vz2y.onrender.com/api/blogs/company/${companyName}`)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        setBlogs(data.message);
      })
      .catch(error => console.error(error));
  }

  return (
    <div>
      <Anavbar />
      <div className='mt-4'>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input type="text" className="form-control border border-dark" placeholder="Search Company..."
                    value={searchCompany} onChange={e => setSearchCompany(e.target.value)} />
                  <span className="input-group-btn">
                    <button onClick={handleSubmit} className="btn btn-default" type="button">Search</button>
                  </span>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            {/* {console.log("Blogs: ", blogs)} */}
            {blogs.map((element) => {
              return <div key={element._id} className="col-md-4">
                <Blogitem description={element.description} cname={element.companyName} type={element.type} batch={element.batch} id={element._id} />
              </div>
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
