import { useState , useEffect } from 'react'
import React from 'react'
import jobs from '../jobs.json'
import JobListing from './JobListing'
import Spinner from './Spinner'
const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome? '/api/jobs?_limit=3':'/api/jobs';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        console.log('API Response:', data); 

        if (Array.isArray(data)) {
          setJobs(data); 
        } else if (data.jobs && Array.isArray(data.jobs)) {
          setJobs(data.jobs); 
        } else {
          console.error('Unexpected API response:', data);
          setJobs([]); 
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading jobs...</p>;
  }
return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'RecentJobs ': 'Browse Jobs'}   
               </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (<Spinner loading={loading} />) : (
          <>
        {jobs.map((job) => (
            <JobListing key = {job.id} job={job} />
        ))}
          </>
        )}
          </div>
      </div>
    </section>

  )
}

export default JobListings