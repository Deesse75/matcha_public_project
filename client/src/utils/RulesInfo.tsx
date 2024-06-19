const RulesInfo = ({ id }: { id: string }) => {
  return (
    <>
      {(id === 'password2' || id === 'password') && (
        <>
          <div className='div_rules'>
            <p>8 à 20 caratères</p>
            <div>
              <p>Au moins : </p>
              <p style={{ marginLeft: '20px' }}>1 minuscule</p>
              <p style={{ marginLeft: '20px' }}>1 majuscule</p>
              <p style={{ marginLeft: '20px' }}>1 chiffre</p>
              <p style={{ marginLeft: '20px' }}>
                1 caractère spécial autorisé :
              </p>
              <p style={{ marginLeft: '50px' }}>@ Arobase</p>
              <p style={{ marginLeft: '50px' }}>! Point d'exclamation</p>
              <p style={{ marginLeft: '50px' }}>? Point d'interrogation</p>
            </div>
          </div>
        </>
      )}
      {id === 'username' && (
        <>
          <div className='div_rules'>
            <p>4 à 20 caratères</p>
            <p>Commence par une lettre</p>
            <p>Autorisés:</p>
            <p style={{ marginLeft: '20px' }}>Lettres</p>
            <p style={{ marginLeft: '20px' }}>Chiffres</p>
            <p style={{ marginLeft: '20px' }}>Caractères spéciaux:</p>
            <p style={{ marginLeft: '50px' }}>_ Underscore</p>
            <p style={{ marginLeft: '50px' }}>@ Arobase</p>
          </div>
        </>
      )}
      {(id === 'firstname' || id === 'lastname') && (
        <>
          <div className='div_rules'>
            <p>2 à 20 caratères</p>
            <p>Commence par une lettre</p>
            <p>Autorisés:</p>
            <p style={{ marginLeft: '20px' }}>Lettres</p>
            <p style={{ marginLeft: '20px' }}>Caractères spéciaux:</p>
            <p style={{ marginLeft: '50px' }}>- Trait d'union</p>
            <p style={{ marginLeft: '50px' }}>' Apostrophe</p>
            <p style={{ marginLeft: '50px' }}> Espace</p>
          </div>
        </>
      )}
      {id === 'email' && (
        <>
          <div className='div_rules'>
            <p>Domaines de 1er niveau autorisés :</p>
            <p style={{ marginLeft: '20px' }}>.com</p>
            <p style={{ marginLeft: '20px' }}>.fr</p>
          </div>
        </>
      )}
    </>
  );
};

export default RulesInfo;
