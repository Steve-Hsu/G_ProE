import React, { useContext, Fragment } from 'react';
import SearchBarContext from '../../context/searchBar/searchBarContext';

const SearchBar = () => {
  const searchBarContext = useContext(SearchBarContext);
  const {
    isQuery,
    searchCaseNameList,
    searchCaseName,
    toggleQueryList,
  } = searchBarContext;

  const onSubmit = (e) => {
    // e.preventDefault();
    searchCaseName(e);
  };

  const onChange = (e) => {
    if (e.target.value === '') {
      toggleQueryList();
    }
  };
  return (
    <form id='QueryForm' onSubmit={onSubmit}>
      <input name='query' onChange={onChange} />
      <input type='submit' form='QueryForm' />
      <div>
        {isQuery
          ? searchCaseNameList.map((item) => {
              return (
                <Fragment>
                  <div key={`SearchBar${item.id}`} className='badge'>
                    {item.style}, {item.client}, {item.userName}
                  </div>
                </Fragment>
              );
            })
          : null}
      </div>
      {/* Here should have a dropdown list for showing the possible queried results, it can be selected and clicked to trigger another function to get back the specific case */}
    </form>
  );
};

export default SearchBar;
