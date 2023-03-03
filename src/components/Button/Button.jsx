import { ButtonLoadMore } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onSubmit }) => {
  return <ButtonLoadMore onClick={onSubmit}>Load more</ButtonLoadMore>;
};

Button.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
