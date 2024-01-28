import React from 'react';

const ComponentOverview = (props:any) =>{
    return (
        <div
          dangerouslySetInnerHTML={{ __html: props.HTML }}
          itemProp="description"
        ></div>
      );
}

export default ComponentOverview;