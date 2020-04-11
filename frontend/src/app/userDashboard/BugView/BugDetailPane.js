import React from 'react';
import data from './jsondata';
import BugDetail from './BugDetail'

const BugDetailPane = () => {
  
  for(let name in data){
    console.log(name)
    console.log(data[name].title)
  }

    return (
      {for(let name in data){
        <div>
          <BugDetail />
        </div>
      }}
    );
  
}
export default BugDetailPane;