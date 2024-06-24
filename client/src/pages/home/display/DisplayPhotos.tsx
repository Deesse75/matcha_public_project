import { useState } from 'react';
import { MdArrowLeft, MdArrowRight, MdOutlineAddAPhoto } from 'react-icons/md';

const DisplayPhotos = () => {
  const [index, setIndex] = useState(1);

  const handleClick = (direction: string) => {
    if (direction === 'left') {
      if (index === 1) setIndex(5);
      else setIndex(index - 1);
    } else {
      if (index === 5) setIndex(1);
      else setIndex(index + 1);
    }
  };

  return (
    <>
      <div className='arrow'>
        <MdArrowLeft
          size={42}
          style={{ color: 'white' }}
          onClick={() => {
            handleClick('left');
          }}
        />
      </div>
      <div className='photo_container'>
        {index === 1 && (
          <>
            <div className='photo'>
              <div className='photo_img'>
                <img src="/avatar/default_avatar.jpg" />
              </div>
              <div className='upload'>
                <MdOutlineAddAPhoto size={26} />
              </div>
              <div className='radio'>
                <input type='radio' name='radio' id='radio' defaultChecked />
                <input type='radio' name='radio' id='radio' disabled />
                <input type='radio' name='radio' id='radio' disabled />
                <input type='radio' name='radio' id='radio' disabled />
                <input type='radio' name='radio' id='radio' disabled />
              </div>
            </div>
          </>
        )}
        {index === 2 && (
          <>
            <div className='photo'>
              <div className='photo_img'>
                <img src="/avatar/default_avatar.jpg" />
              </div>
              <div className='upload'>
                <MdOutlineAddAPhoto size={26} />
              </div>
              <div className='radio'>
                <input type='radio' name='radio' id='radio' disabled />
                <input type='radio' name='radio' id='radio' defaultChecked />
                <input type='radio' name='radio' id='radio' disabled />
                <input type='radio' name='radio' id='radio' disabled />
                <input type='radio' name='radio' id='radio' disabled />
              </div>
            </div>
          </>
        )}
        {index === 3 && (
          <>
            <div className='photo'>
              <div className='photo_img'>
                <img src="/avatar/default_avatar.jpg" />
              </div>
              <div className='upload'>
                <MdOutlineAddAPhoto size={26} />
              </div>
              <div className='radio'>
                <input type='radio' name='radio' id='radio' disabled />
                <input type='radio' name='radio' id='radio' disabled />
                <input type='radio' name='radio' id='radio' defaultChecked />
                <input type='radio' name='radio' id='radio' disabled />
                <input type='radio' name='radio' id='radio' disabled />
              </div>
            </div>
          </>
        )}
        {index === 4 && (
          <>
            <div className='photo'>
              <div className='photo_img'>
                <img src="/avatar/default_avatar.jpg" />
              </div>
              <div className='upload'>
                <MdOutlineAddAPhoto size={26} />
              </div>
              <div className='radio'>
                <input type='radio' name='radio' id='radio' disabled />
                <input type='radio' name='radio' id='radio' disabled />
                <input type='radio' name='radio' id='radio' disabled />
                <input type='radio' name='radio' id='radio' defaultChecked />
                <input type='radio' name='radio' id='radio' disabled />
              </div>
            </div>
          </>
        )}
        {index === 5 && (
          <>
            <div className='photo'>
              <div className='photo_img'>
                <img src="/avatar/default_avatar.jpg" />
              </div>
              <div className='upload'>
                <MdOutlineAddAPhoto size={26} />
              </div>
              <div className='radio'>
                <input type='radio' name='radio' id='radio' disabled />
                <input type='radio' name='radio' id='radio' disabled />
                <input type='radio' name='radio' id='radio' disabled />
                <input type='radio' name='radio' id='radio' disabled />
                <input type='radio' name='radio' id='radio' defaultChecked />
              </div>
            </div>
          </>
        )}
      </div>
      <div className='arrow'>
        <MdArrowRight
          size={42}
          style={{ color: 'white' }}
          onClick={() => {
            handleClick('right');
          }}
        />
      </div>
    </>
  );
};

export default DisplayPhotos;
