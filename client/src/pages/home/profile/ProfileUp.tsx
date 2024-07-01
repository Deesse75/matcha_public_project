import { useContext, useRef } from "react";
import { UserContext } from "../../../components/app.utilities/context/user.context";

const ProfileUp = () => {
  const me = useContext(UserContext);
  const refGender = useRef<HTMLSelectElement>(null);
  const refOrientation = useRef<HTMLSelectElement>(null);
  const refRegion = useRef<HTMLSelectElement>(null);
  const refDiet = useRef<HTMLSelectElement>(null);
  const refBiography = useRef<HTMLTextAreaElement>(null);

  return (
    <div className='profile_container'>
      <div className='title'>Compléter votre profil</div>
      <div className='profile_pourcent'>{`Actuellement rempli à ${me.user.pourcentFilled} %`}</div>

      <div className='photos_container'>
        {/* <Photo /> */}
      </div>
      <div className='select_container'>
        <div className='label'>Genre</div>
        <div className='current_value'>{me.user.gender}</div>
        <select className='new_value' ref={refGender} name='gender' id='gender'>
          <option defaultValue=''>---</option>
          <option value='Homme'>Homme</option>
          <option value='Femme'>Femme</option>
          <option value='Non-binaire'>Non-binaire</option>
          <option value='Agenre'>Agenre</option>
          <option value='Bigenre'>Bigenre</option>
          <option value='Genre fluide'>Genre fluide</option>
          <option value='Femme transgenre'>Femme transgenre</option>
          <option value='Homme transgenre'>Homme transgenre</option>
          <option value='Pangenre'>Pangenre</option>
          <option value='Autre'>Autre</option>
        </select>
      </div>

      <div className='select_container'>
        <div className='label'>Orientation sexuelle</div>
        <div className='current_value'>{me.user.orientation}</div>
        <select
          className='new_value'
          ref={refOrientation}
          name='orientation'
          id='orientation'
        >
          <option defaultValue=''>---</option>
          <option value='Hétérosexuel(le)'>Hétérosexuel(le)</option>
          <option value='Homosexuel(le)'>Homosexuel(le)</option>
          <option value='Bisexuel(le)'>Bisexuel(le)</option>
          <option value='Pansexuel(le)'>Pansexuel(le)</option>
          <option value='Asexuel(le)'>Asexuel(le)</option>
          <option value='Demisexuel(le)'>Demisexuel(le)</option>
          <option value='Sapiosexuel(le)'>Sapiosexuel(le)</option>
          <option value='Polysexuel(le)'>Polysexuel(le)</option>
          <option value='Queer'>Queer</option>
          <option value='Skoliosexuel(le)'>Skoliosexuel(le)</option>
          <option value='Graysexuel(le)'>Graysexuel(le)</option>
          <option value='Questionnement'>Questionnement</option>
          <option value='Autre'>Autre</option>
        </select>
      </div>

      <div className='select_container'>
        <div className='label'>Région</div>
        <div className='current_value'>{me.user.region}</div>
        <select className='new_value' ref={refRegion} name='region' id='region'>
          <option defaultValue=''>---</option>
          <option value='Auvergne-Rhône-Alpes'>Auvergne-Rhône-Alpes</option>
          <option value='Bourgogne-Franche-Comté'>
            Bourgogne-Franche-Comté
          </option>
          <option value='Bretagne'>Bretagne</option>
          <option value='Centre-Val de Loire'>Centre-Val de Loire</option>
          <option value='Corse'>Corse</option>
          <option value='Grand Est'>Grand Est</option>
          <option value='Hauts-de-France'>Hauts-de-France</option>
          <option value='Île-de-France'>Île-de-France</option>
          <option value='Normandie'>Normandie</option>
          <option value='Nouvelle-Aquitaine'>Nouvelle-Aquitaine</option>
          <option value='Occitanie'>Occitanie</option>
          <option value='Pays de la Loire'>Pays de la Loire</option>
          <option value="Provence-Alpes-Côte d'Azur">
            Provence-Alpes-Côte d'Azur
          </option>
          <option value='Guadeloupe'>Guadeloupe</option>
          <option value='Martinique'>Martinique</option>
          <option value='Guyane'>Guyane</option>
          <option value='La Réunion'>La Réunion</option>
          <option value='Mayotte'>Mayotte</option>
        </select>
      </div>

      <div className='select_container'>
        <div className='label'>Régime alimentaire</div>
        <div className='current_value'>{me.user.diet}</div>
        <select className='new_value' ref={refDiet} name='diet' id='diet'>
          <option defaultValue=''>---</option>
          <option value='Aucun'>Aucun</option>
          <option value='Végétarien'>Végétarien</option>
          <option value='Vegan'>Vegan</option>
          <option value='Halal'>Halal</option>
          <option value='Sans gluten'>Sans gluten</option>
          <option value='Sans lactose'>Sans lactose</option>
          <option value='Autre'>Autre</option>
        </select>
      </div>

      <div className='select_container'>
        <div className='label'>Biographie</div>
        <div className='bio_container'>
          <div className='current_value_bio'>{me.user.bio}</div>
          <textarea
            placeholder='Présentez vous en quelques mots...'
            className='new_value_bio'
            ref={refBiography}
            name='biography'
            id='biography'
            maxLength={200}
          ></textarea>
        </div>
      </div>

      <div className='button_container'>
        <button className='button_clear' >
          Effacer
        </button>

        <button
          className='button_submit'
          onClick={() => {}}
        >
          Mettre à jour
        </button>
      </div>
    </div>
  );
};

export default ProfileUp;
