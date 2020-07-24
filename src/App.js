import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';
import { Container } from 'react-bootstrap';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const {jobs, isLoading, error, hasNextPage} = useFetchJobs(params, page);

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams(prevParams => {
      if(value !== undefined) {
        return { ...prevParams, [param]: value };
      }
    });
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      {(!isLoading && !error) && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />}
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing...</h1>}
      {jobs.map(job => {
        return <Job key={job.id} job={job}></Job>
      })}
      {(!isLoading && !error) && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />}
    </Container>
  );
}

export default App;
