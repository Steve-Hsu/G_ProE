import React from 'react';
import BoardItem from './BoardItem';

const Board = ({ subjects, toggleItemFunc }) => {
  const mtrlItems = (switcher) => {
    const valueOfItems = subjects.map((mtrl) => {
      return mtrl.item;
    });
    const uniques = valueOfItems.filter((item, idx) => {
      return valueOfItems.indexOf(item) == idx;
    });

    const lengthOfItems = uniques.map((uni) => {
      return subjects.filter((mtrl) => mtrl.item === uni).length;
    });

    const result = uniques.map((uni) => {
      if (uni == '') {
        return 'undefined';
      } else if (uni) {
        return uni;
      } else {
        return 'empty';
      }
    });
    switch (switcher) {
      case 'result':
        return result;

      case 'lengthOfItems':
        return lengthOfItems;

      case 'unique':
        return uniques;
      default:
    }
  };

  return (
    <div>
      {mtrlItems('result').map((mtrlItem, idx) => (
        <div key={`boardOf${mtrlItem}`} className='mt-1 bg-cp-bg round-area'>
          <div className='grid-4 p-1'>
            <div className='fc-cp-2'>{mtrlItem.toUpperCase()}</div>
            <div className='fc-cp-1'>
              The number of this material is {mtrlItems('lengthOfItems')[idx]}
            </div>
          </div>
          <div className='center-content'>
            <div className='boardParent' key={`flexBoxOf${mtrlItem}`}>
              {subjects.map((subject) => {
                var re = new RegExp(subject.item, 'i');
                switch (subject.item) {
                  case undefined:
                    if (mtrlItem === 'empty') {
                      return (
                        <BoardItem
                          key={`empty${subject.id}`}
                          subjects={subjects}
                          subject={subject}
                          toggleItemFunc={toggleItemFunc}
                        />
                      );
                    } else {
                      return null;
                    }
                  case '':
                    if (mtrlItem === 'undefined') {
                      return (
                        <BoardItem
                          key={`undefined${subject.id}`}
                          subjects={subjects}
                          subject={subject}
                          toggleItemFunc={toggleItemFunc}
                        />
                      );
                    } else {
                      return null;
                    }
                  default:
                    if (re.test(mtrlItems('unique')[idx])) {
                      return (
                        <BoardItem
                          key={`unique${subject.id}`}
                          subjects={subjects}
                          subject={subject}
                          toggleItemFunc={toggleItemFunc}
                        />
                      );
                    } else {
                      return null;
                    }
                }
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
