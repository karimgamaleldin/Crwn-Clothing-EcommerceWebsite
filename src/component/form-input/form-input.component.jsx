
import './form-input.styles.scss';

const FormInput = ({label , ...otherProps}) => { // instead of spreading we can use a dictionary to seperate the data of label and input
    return (
        <div className='group'>
          <input className='form-input' {...otherProps} />
          {label && (
            <label
              className={`${
                otherProps.value.length ? 'shrink' : ''
              } form-input-label`}
            >
              {label}
            </label>
          )}
        </div>
      );
};

export default FormInput;