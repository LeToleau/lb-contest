import Bgd from '../assets/img/main-bgd.png';
import PlayBtn from './buttons/Button';
import { /*useEffect,*/ useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../assets/scss/components/Form.scss';

function Form() {
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    address: '',
    termsConditions: false,
  });

  const navigate = useNavigate()
  
  function handleSubmit(e) {
    /*
      Previene el comportamiento default de los
      formularios el cual recarga el sitio
    */
    e.preventDefault();

    // Aquí puedes enviar los datos al backend
    console.log(formData);
    // Reiniciar el estado del formulario después de enviar los datos
    setFormData({
      name: '',
      lastname: '',
      email: '',
      address: '',
      termsConditions: isChecked,
    });

    setTimeout(() => {
      navigate('/win-page')
    }, 200);
  }

  function handleCheckbox() {
    if (isChecked === true) {
      setIsChecked(false)
    } else {
      setIsChecked(true);
    }
  }


  function handleChange(e) {    
    // Sincroniza el estado de nuevo
    setFormData(
      {
        ...formData,
        [e.target.name]: e.target.value
      }
    );
  }

  const estiloDelDiv = {
      backgroundImage: `url(${Bgd})`,
  };

  /*
  useEffect(() => {
    setTimeout(()=>{
      document.querySelector('.main-background__logo').style.transform = `translate(0px, 0px)`;
      document.querySelector('.button').style.transform = `translate(0px, 0px)`;
      document.querySelector('.main-background').style.opacity = 1;
      document.querySelector('.main-background__logo').style.opacity = 1;
      document.querySelector('.button').style.opacity = 1;
    }, 100)
  }, [])
  */

  /*
  const handlePlayClick = () => {
    document.querySelector('.main-background__logo').style.opacity = 0;
    document.querySelector('.main-background').style.opacity = 0;
    document.querySelector('.button').style.opacity = 0;
    
    setTimeout(() => {
      navigate('/game')
    }, 200);
  };
  */

  return (
    <div className="form" style={estiloDelDiv}>
      <form className="form__form" onSubmit={handleSubmit}>
        <div className="form__wrapper">
          <h1>Restiamo in contatto</h1>
          <div className="form__row">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Cognome"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="form__row">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form__row">
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Indirizzo"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="form__row checkbox">
            <input
              id="terms-conditions"
              name="terms-conditions"
              type="checkbox"
              // checked={isChecked}
              // onChange={handleCheckbox}
            />
            <span>Iscrivendomi, accetto i <a href="">Termini di Servizio</a> e l&rsquo;<a href="">Informativa sulla Privacy</a> di Laura Biagiotti.</span>
          </div>
          <div className="form__row submit-button">
            <PlayBtn text={'Invia'} onClick={handleSubmit} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;