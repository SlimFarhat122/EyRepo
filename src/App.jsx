import {React } from 'react';
 import MainLayout from './layouts/MainLayout';

import Jobpage , {jobLoder} from './pages/jobpage';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage'
import JobsPages from './pages/JobsPages';
import NotFoundPage from './pages/NotFoundPage';
import AddJobPage from './pages/AddJobPage';
import TestPage from './pages/TestPage';
import TableauTable from './components/TableauTable';

const addJob = async (newJob) => {
  const res = await fetch('/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newJob),
  });
  return;
};
const deleteJob = async (id) => {
  const res = await fetch(`/api/jobs/${id}`, {
    method: 'DELETE',
  });
  return;
};

const updateJob = async (job) => {
  const res = await fetch(`/api/jobs/${job.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(job),
  });
  return;
};



const router = createBrowserRouter(createRoutesFromElements
  (<Route path='/' element={<MainLayout/>}>
  <Route index element ={<HomePage/>} />
  <Route path='/jobs' element={<JobsPages/>}/>
  <Route path='/Test' element={<TestPage/>}/>
  <Route path='/jobs/:id' element={<Jobpage />} loader={jobLoder}/>
  <Route path='/Add-job' element={<AddJobPage/>}/>
  <Route path='/testtt' element={<TableauTable/>}/>

  
  <Route path='/*' element={<NotFoundPage/>}/>

  


</Route>
)


)
const App = () => {
  return  <RouterProvider router = {router} />;
};

export default App;
