
const InputCode = ({
  id,
  currentRef,
  nextRef,
}: {
  id: number;
  currentRef: React.RefObject<HTMLInputElement>;
  nextRef: React.RefObject<HTMLInputElement>
}) => {

  return (
    <>
      <div className='input_number'>
        <input
          type='text'
          name={`Num${id}`}
          id={`Num${id}`}
          placeholder='_'
          maxLength={1}
          minLength={1}
          ref={currentRef}
          onChange={() => {nextRef.current?.focus()}}
        />
      </div>
    </>
  );
};
export default InputCode;
