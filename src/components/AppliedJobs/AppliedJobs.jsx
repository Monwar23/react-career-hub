import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getStoredJobApplication } from "../../Utility/LocalStorage";


const AppliedJobs = () => {

    const jobs = useLoaderData()
    const [appliedJobs, setAppliedJobs] = useState([])
    const [displayJobs, setdisplayJobs] = useState([])

    const handleJobsFilter=filter=>{
        if(filter==='all'){
            setdisplayJobs(appliedJobs)
        }
        else if(filter==='remote'){
            const remoteJobs=appliedJobs.filter(job=>job.remote_or_onsite==="Remote")
            setdisplayJobs(remoteJobs)
        }
        else if(filter==='onsite'){
            const onsiteJobs=appliedJobs.filter(job=>job.remote_or_onsite==="Onsite")
            setdisplayJobs(onsiteJobs)
        }
    }

    useEffect(() => {
        const storedJobIds = getStoredJobApplication()
        if (jobs.length > 0) {
            const jobsApplied = []
            for (const id of storedJobIds) {
                const job = jobs.find(job => job.id === id)
                if (job) {
                    jobsApplied.push(job)
                }
            }
            setAppliedJobs(jobsApplied)
            setdisplayJobs(jobsApplied)
            // const jobsApplied= jobs.filter(job=>storedJobsIds.includes(job.id))
        }
    }, [jobs]);

    return (
        <div>
            <h2>applied job: {appliedJobs.length}</h2>
            <details className="dropdown">
                <summary className="m-1 btn">Remote or Onsite</summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li onClick={()=>handleJobsFilter('all')}><a>All</a></li>
                    <li onClick={()=>handleJobsFilter('remote')}><a>Remote</a></li>
                    <li onClick={()=>handleJobsFilter('onsite')}><a>Onsite</a></li>
                </ul>
            </details>
            <ul>
                {
                    displayJobs.map(job => <li key={job.id} ><span>Job Name: {job.job_title} <br /> Company Name: {job.company_name} <br /> {job.remote_or_onsite}</span></li>)
                }
            </ul>
        </div>
    );
};

export default AppliedJobs;