import { useEffect, useState } from 'react';
import DisplayFullProfile from '../display/DisplayFullProfile';
import DisplaySmallProfile from '../display/DisplaySmallProfile';

const MatchaFilter = () => {
  const tab = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  const [tabNum, setTabNum] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!tabNum) return;
    setOpen(true);
  }, [tabNum]);

  useEffect(() => {
    const request = async () => {
      try {
        const response = await fetch();
        const data = response.json();
        
      } catch(error) {}
    };
    request();
  }, []);

  return (
    <>
      {tab.map(
        (item, index) => (
          (
            <div
              onClick={() => {
                setTabNum(item);
              }}
            >
              <DisplaySmallProfile id={item} />
            </div>
          )
        ),
      )}
      {open && <DisplayFullProfile id={tabNum} />}
    </>
  );
};

export default MatchaFilter;
