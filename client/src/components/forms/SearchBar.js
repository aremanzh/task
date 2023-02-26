import React from 'react'

function SearchBar({ keyword, setKeyword }) {
  return (
    <div className="m-2">
      <input type="search" className="form-control" placeholder="search" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
    </div>
  )
}

export default SearchBar