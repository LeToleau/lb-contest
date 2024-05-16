import '../assets/scss/components/ChoiceResult.scss';

function ChoiceResult({ text, className }) {
    return (
      <div className={`choice-result ${className}`}>
          <span>
              {text}
          </span>
      </div>
    );
  }

export default ChoiceResult;