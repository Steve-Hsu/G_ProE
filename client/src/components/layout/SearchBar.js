import React, { useContext } from 'react';
import AuthUserContext from '../../context/authUser/authUserContext';
import SearchBarContext from '../../context/searchBar/searchBarContext';
import SearchBarListItem from './SearchBarListItem';

const SearchBar = ({ currentPage }) => {
  const authUserContext = useContext(AuthUserContext);
  const searchBarContext = useContext(SearchBarContext);
  const { company } = authUserContext;
  const {
    isQuery,
    indexList,
    searchCaseIndex,
    searchSrMtrlIndex,
    toggleIndexList,
  } = searchBarContext;

  const onSubmit = (e) => {
    e.preventDefault();

    toggleIndexList();
    if (String(e.target.value).length > 1) {
      // Without body-parser, Here make a fake body object manually
      const body = {
        companyId: company,
        // The two line follows here, L1 for input with form, triggered with submit, L2 triggered with onKeyUp event.
        // query: e.target.query.value, // L1
        query: e.target.value, // L2
      };
      switch (currentPage) {
        case 'case':
          searchCaseIndex(body);
          break;
        case 'mprice':
          searchSrMtrlIndex(body);
        default:
      }
    }
  };

  const onChange = (e) => {
    if (String(e.target.value).length <= 1) {
      toggleIndexList();
    }
  };
  return (
    <form
      // name='queryForm' // L1
      // id={company} // L1
      // onKeyUp={onSubmit} // L1
      // onSubmit={onSubmit} // L1
      style={{ background: 'red', width: '100%' }}
    >
      {/* L1 */}
      {/* <input type='text' name='query' onChange={onChange} /> */}
      {/* L2 */}
      <div>Search</div>
      <input
        id={company}
        type='text'
        name='queryForm'
        onChange={onChange}
        onKeyUp={onSubmit}
        className='queryInput'
      />

      {/* L1 */}
      {/* <input type='submit' form={company} /> */}
      <div className='test-1' style={{ background: 'yellow', zIndex: '10' }}>
        {isQuery
          ? indexList.map((item) => {
              return (
                <SearchBarListItem
                  key={`SearchBarListItem${item._id}`}
                  item={item}
                  currentPage={currentPage}
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
