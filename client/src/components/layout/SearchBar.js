import React, { useContext, Fragment } from 'react';
import AuthUserContext from '../../context/authUser/authUserContext';
import SearchBarContext from '../../context/searchBar/searchBarContext';
import SearchBarListItem from './SearchBarListItem';

const SearchBar = () => {
  const authUserContext = useContext(AuthUserContext);
  const searchBarContext = useContext(SearchBarContext);
  const { company } = authUserContext;
  const {
    isQuery,
    searchCaseNameList,
    searchCaseName,
    toggleQueryList,
  } = searchBarContext;

  const onSubmit = (e) => {
    e.preventDefault();
    // Without body-parser, Here make a fake body object manually
    const body = {
      companyId: company,
      query: e.target.query.value,
    };
    console.log('company', company);
    console.log(body);
    searchCaseName(body);
  };

  const onChange = (e) => {
    if (e.target.value === '') {
      toggleQueryList();
    }
  };
  return (
    <form name='queryForm' id={company} onSubmit={onSubmit}>
      <input name='query' onChange={onChange} />
      <input type='submit' form={company} />
      <div className='test-1' style={{ background: 'yellow', zIndex: '10' }}>
        {isQuery
          ? searchCaseNameList.map((item) => {
              return (
                <SearchBarListItem
                  key={`SearchBarListItem${item._id}`}
                  item={item}
                />
              );
            })
          : null}
      </div>
      {/* Here should have a dropdown list for showing the possible queried results, it can be selected and clicked to trigger another function to get back the specific case */}
    </form>
  );
};

export default SearchBar;
