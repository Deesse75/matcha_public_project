type AttributionProps = {
  author: string;
  site: string;
};

const Attribution = ({ author, site }: AttributionProps) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          marginTop: '-50px',
        }}
      >
        <a href={site} target='blank'>
          {author}
        </a>
      </div>
    </div>
  );
};

export default Attribution;
