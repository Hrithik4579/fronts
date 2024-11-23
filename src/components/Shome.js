import React, { useEffect, useState } from 'react'
import Applyitem from './Applyitem'
import Snavbar from './Snavbar';
import './login.css'
import { getAccessToken } from '../getAccessToken';

export default function Shome() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://backs-vz2y.onrender.com/api/students/job', {
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
          setArticles(json.data);
        }
        else {
          console.log("Json response unsuccessful");
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className='main123'>
        <Snavbar/>
      <div className='mt-4'>
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div key={element._id} className="col-md-4">
                <Applyitem articles={articles} logoUrl={element.logo} cname={element.companyName} post={element.location} ctc={element.salary} id={element._id} role={element.role} />
              </div>
            })}
          </div>
        </div>

      </div>
    </div>
  )
}