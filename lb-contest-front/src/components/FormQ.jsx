import Bgd from '../assets/img/main-bgd.png';
import PlayBtn from './buttons/Button';
import { /*useEffect,*/ useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../assets/scss/components/Form.scss';

function Form() {
  const [validationMsg, setValidationMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    taxCode: '',
    city: '',
    postCode: '',
    province: '',
    address: '',
    termsConditions: false,
  });

  const navigate = useNavigate()
  
  function handleSubmit(e) {
   e.preventDefault();

   const isValidated = Object.values(formData).some(value => value === '');
   let validations = !isValidated;

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const validMail = emailRegex.test(formData.email);

   const postalCodeRegex = /^\d{5}$/;
   const validPostalCode = postalCodeRegex.test(formData.postCode);

   const taxCodeRegex = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;
   const validTaxCode = taxCodeRegex.test(formData.taxCode);
   // Aquí puedes enviar los datos al backend
   //console.log(formData);

   const conditions = {
    valid: validations && formData.termsConditions && validMail && validPostalCode && validTaxCode,
    incompleteForm: !validations,
    invalidEmail: /*validations && formData.termsConditions && */ !validMail /*&& validPostalCode && validTaxCode*/,
    invalidTaxCode: /*validations && formData.termsConditions && validMail && validPostalCode &&*/ !validTaxCode,
    invalidPostalCode: /*validations && formData.termsConditions && validMail &&*/ !validPostalCode /*&& validTaxCode*/,
    termsNotAccepted: /*validations &&*/ !formData.termsConditions /*&& validMail && validPostalCode && validTaxCode*/,
   };

   const validationMessages = {
    valid: '',
    incompleteForm: `*Si prega di compilare tutti i campi del modulo`,
    invalidEmail: `*Il formato dell'email non è corretto, inseriscilo correttamente`,
    invalidTaxCode: `*Il formato del codice fiscale non è corretto, inseriscilo correttamente`,
    invalidPostalCode: `*Il formato del CAP non è corretto, deve contenere esattamente 5 cifre`,
    termsNotAccepted: `*Per continuare è necessario accettare i Termini e Condizioni`,
   };

   const conditionKey = Object.keys(conditions).find(key => conditions[key]);
    
    if (conditionKey === 'valid') {
      // Reiniciar el estado del formulario después de enviar los datos
      setValidationMsg(validationMessages.valid);
      setFormData({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        taxCode: '',
        city: '',
        postCode: '',
        province: '',
        address: '',
        termsConditions: false,
      });
      setTimeout(() => {
        navigate('/quasi')
      }, 200);
    }  else {
      setValidationMsg(validationMessages[conditionKey]);
    }
  }

  function handleCheckbox() {
    setFormData(
      {
        ...formData,
        termsConditions: !formData.termsConditions
      }
    );
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
          <h1>Inserisci i tuoi dati e scopri se sei il vincitore</h1>
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
              id="phone"
              name="phone"
              type="text"
              placeholder="Telefono"
              value={formData.phone}
              onChange={handleChange}
            />
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
              id="tax-code"
              name="taxCode"
              type="text"
              placeholder="Codice Fiscale"
              value={formData.taxCode}
              onChange={handleChange}
            />
          </div>
          <div className="form__row">
            <div className="form__row--newline">
              <input
                id="city"
                name="city"
                type="text"
                placeholder="Cittá"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                id="post-code"
                name="postCode"
                type="text"
                placeholder="CAP"
                value={formData.postCode}
                onChange={handleChange}
              />
            </div>
            <input
              id="province"
              name="province"
              type="text"
              placeholder="Provincia"
              value={formData.province}
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
              onChange={handleCheckbox}
            />
            <span>Iscrivendomi, accetto i <a href="">Termini di Servizio</a> e l&rsquo;<a href="">Informativa sulla Privacy</a> di Laura Biagiotti.</span>
          </div>
          <div className="form__row checkbox">
            <span style={{color: 'red', fontSize: '14px'}}>{validationMsg}</span>
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