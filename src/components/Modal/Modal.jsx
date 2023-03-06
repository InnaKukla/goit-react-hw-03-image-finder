import { createPortal } from 'react-dom';
import { ModalOverlay, ModalView } from './Modal.styled';
import PropTypes from 'prop-types';

import { Component } from 'react';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeDown);
  }

  handleEscapeDown = e => {
    if (e.code === 'Escape') {
      this.props.onEscape();
    }
  };

  render() {
    const { tags, largeImageURL } = this.props;
    return createPortal(
      <ModalOverlay>
        <ModalView>
          <img src={largeImageURL} alt={tags} />
        </ModalView>
      </ModalOverlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
