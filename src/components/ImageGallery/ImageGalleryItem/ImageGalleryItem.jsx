import { Component } from 'react';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isVisibleModal: false,
  };

  toggleModal = () => {
    this.setState(({ isVisibleModal }) => ({
      isVisibleModal: !isVisibleModal,
    }));
  };
  render() {
    const { id, webformatURL, tags, largeImageURL } = this.props;
    return (
      <GalleryItem key={id} onClick={this.toggleModal}>
        <GalleryItemImg src={webformatURL} alt={tags} />
        {this.state.isVisibleModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onEscape={this.toggleModal}
          />
        )}
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
