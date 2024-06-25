import { useContext, useEffect, useState } from 'react';
import DisplayFullProfile from '../display/DisplayFullProfile';
import DisplaySmallProfile from '../display/DisplaySmallProfile';
import { ListContext } from '../../../components/app.utilities/context/list.context';
import { MiniProfile } from '../interfaces/profile.interfaces';

const List = ({listName}: {listName: string}) => {
  const context = useContext(ListContext);
  const list = context[listName as keyof typeof context] as MiniProfile[];
  const [message, setMessage] = useState('');
  const [listIndex, setListIndex] = useState<number>(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!listIndex) return;
    setOpen(true);
  }, [listIndex]);

  useEffect(() => {
      if (list.length === 0) {
        setMessage('Aucun profil trouvé');
      }
  }, []);

  return (
    <>
      {message ? (
        <>
          <div>{message}</div>
        </>
      ) : (
        <>
          {list.map((item, index) => (
            <div
              onClick={() => {
                setListIndex(index);
              }}
            >
              <DisplaySmallProfile miniProfile={item} />
            </div>
          ))}
        </>
      )}
      {open && <DisplayFullProfile id={list[listIndex].id} />}
    </>
  );
};

export default List;
