import '../../assets/scss/components/buttons/PlayBtn.scss';
import { Link } from 'react-router-dom';

function PlayButton({ text, onClick }) {
    return (
      <div className="play-button" onClick={onClick}>
          <span>
              {text}
          </span>
      </div>
    );
  }
  
  export default PlayButton;