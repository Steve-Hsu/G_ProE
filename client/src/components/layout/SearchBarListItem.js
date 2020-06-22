import React, { useContext } from 'react';
import SearchBarContext from '../../context/searchBar/searchBarContext';
import CasesContext from '../../context/cases/casesContext';

const SearchBarListItem = ({ item }) => {
  const casesContext = useContext(CasesContext);
  const searchBarContext = useContext(SearchBarContext);
  const { toggleQueryList } = searchBarContext;
  const { downloadCase } = casesContext;

  const onClick = (e) => {
    e.preventDefault();
    downloadCase(e.target.id);
    toggleQueryList();
  };

  return (
    <div className='btn' key={item._id} id={item._id} onClick={onClick}>
      <span className='badge'>{item.cNo}</span>
      <span className='badge'>{item.style}</span>
      <span className='badge'>{item.client}</span>
      <span className='badge'>{item.userName}</span>
    </div>
  );
};

export default SearchBarListItem;
