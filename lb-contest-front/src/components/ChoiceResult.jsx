import '../assets/scss/components/ChoiceResult.scss';
import Tick from '../assets/img/tick.svg';
import Cross from '../assets/img/cross.svg';

function ChoiceResult({ text, className }) {
    let img;
    if (className == 'right') {
      img = Tick;
    } else {
      img = Cross;
    }

    return (
      <picture className={`choice-result ${className}`}>
        <img src={img} alt={`${className} icon`} />
      </picture>
    );
  }

export default ChoiceResult;