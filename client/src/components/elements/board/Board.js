import React from 'react';
import BoardItem from './BoardItem';

const Board = ({ purpose, subjects, displayTitles, toggleItemFunc }) => {
  let target = '';
  switch (purpose) {
    case '1_CaseForm':
      target = 'item';
      break;
    case 'CaseSelector':
      target = 'client';
      break;
    default:
  }

  const categories = (switcher) => {
    const valueOfCategories = subjects.map((subject) => {
      return subject[target];
      // switch (purpose) {
      //   case '1_CaseForm':
      //     return subject.item;
      //   case 'CaseSelector':
      //     return subject.client;
      //   default:
      // }
    });
    const uniques = valueOfCategories.filter((vcate, idx) => {
      return valueOfCategories.indexOf(vcate) == idx;
    });

    // console.log('The uniques', uniques); // Test Code

    const lengthOfCategories = uniques.map((uni) => {
      return subjects.filter((subject) => subject[target] === uni).length;
      // switch (purpose) {
      //   case '1_CaseForm':
      //     return subjects.filter((subject) => subject.item === uni).length;
      //   case 'CaseSelector':
      //     return subjects.filter((subject) => subject.client === uni).length;
      //   default:
      // }
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
        return lengthOfCategories;

      case 'unique':
        return uniques;
      default:
    }
  };

  return (
    <div>
      {categories('result').map((cate, idx) => (
        <div key={`boardOf${cate}`} className='mt-1 bg-cp-bg round-area'>
          <div className='grid-4 p-1'>
            <div className='fc-cp-2'>{cate.toUpperCase()}</div>
            <div className='fc-cp-1'>
              The number of this category is {categories('lengthOfItems')[idx]}
            </div>
          </div>
          <div className='center-content'>
            <div className='boardParent' key={`flexBoxOf${cate}`}>
              {subjects.map((subject, subject_idx) => {
                var re = new RegExp(subject[target], 'i');
                switch (subject[target]) {
                  case undefined:
                    if (cate === 'empty') {
                      return (
                        <BoardItem
                          key={`empty${subject.id ? subject.id : subject._id}`}
                          id={subject.id ? subject.id : subject._id}
                          purpose={purpose}
                          displayTitles={displayTitles}
                          // subjects={subjects}
                          subject={subject}
                          toggleItemFunc={toggleItemFunc}
                          idx={subject_idx}
                        />
                      );
                    } else {
                      return null;
                    }
                  case '':
                    if (cate === 'undefined') {
                      return (
                        <BoardItem
                          key={`empty${subject.id ? subject.id : subject._id}`}
                          id={subject.id ? subject.id : subject._id}
                          purpose={purpose}
                          displayTitles={displayTitles}
                          // target={target}
                          // subjects={subjects}
                          subject={subject}
                          toggleItemFunc={toggleItemFunc}
                          idx={subject_idx}
                        />
                      );
                    } else {
                      return null;
                    }
                  default:
                    if (re.test(categories('unique')[idx])) {
                      return (
                        <BoardItem
                          key={`empty${subject.id ? subject.id : subject._id}`}
                          id={subject.id ? subject.id : subject._id}
                          purpose={purpose}
                          displayTitles={displayTitles}
                          // target={target}
                          // subjects={subjects}
                          subject={subject}
                          toggleItemFunc={toggleItemFunc}
                          idx={subject_idx}
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
