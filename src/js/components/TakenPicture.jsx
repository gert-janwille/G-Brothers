import React from 'react';
// import {inject, observer} from 'mobx-react';

const TakenPicture = ({blob, remove, use}) => {
  const handleRemove = () => remove()
  const handleUse = () => use()

  return (

    <section className="taken">
      <a className="remove-btn" onClick={handleRemove}>DELETE</a>
      <a className="remove-btn" onClick={handleUse}>USE</a>

      <div>
        <img src="/assets/img/frame.png" className="frame" alt='frame'/>
        <img src={URL.createObjectURL(blob)} alt='taken'/>
      </div>


    </section>

  );
}


export default TakenPicture;
