import React from 'react'
import SearchTop from '../components/SearchTop'
import { useLocation } from 'react-router-dom';

function PageList() {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];
  const finalPayload = location.state?.payload || [];

  console.log("The searchResults ",searchResults)
  return (
    <div className='page-result'>
        <SearchTop
          data={searchResults} 
          payload={finalPayload} 
        />
    </div>
  )
}

export default PageList