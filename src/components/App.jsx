import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import PropTypes from 'prop-types';

export class App extends Component {
  state = {
    perPage: 12,
    pictures: [],
    error: null,
    status: 'idle',
    picturesTags: '',
    page: 1,
    totalPictures: null,
    loading: false,
  };

  componentDidMount() {
    const fetchAPI = 'https://pixabay.com/api/?';
    const myKeyAPI = '34053498-378d8fa1a1d393cc8f9dd2057';
    if (this.state.picturesTags !== '') {
      this.setState({ loading: true });
      fetch(
        `${fetchAPI}q=${this.state.picturesTags}&page=${this.state.page}&key=${myKeyAPI}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
      )
        .then(res => res.json())
        .then(pictures =>
          this.setState({
            pictures: pictures.hits,
          })
        )
        .finally(() => this.setState({ loading: false }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const includesTags = prevState.picturesTags.includes(
      this.state.picturesTags
    );

    if (!includesTags) {
      this.setState({ loading: true });

      const fetchAPI = 'https://pixabay.com/api/?';
      const myKeyAPI = '34053498-378d8fa1a1d393cc8f9dd2057';

      fetch(
        `${fetchAPI}q=${this.state.picturesTags}&page=${this.state.page}&key=${myKeyAPI}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
      )
        .then(res => res.json())
        .then(({ hits, totalHits }) =>
          this.setState({ pictures: hits, page: 1, totalPictures: totalHits })
        )
        .finally(() => this.setState({ loading: false }));
    }
  }
  submitHandler = picturesTags => {
    this.setState({ picturesTags });
  };

  hendlerButtonLoadMore = e => {
    e.preventDefault();
    this.setState({ page: this.state.page + 1, loading: true });

    console.log(this.state.loading);
    const fetchAPI = 'https://pixabay.com/api/?';
    const myKeyAPI = '34053498-378d8fa1a1d393cc8f9dd2057';
    fetch(
      `${fetchAPI}q=${this.state.picturesTags}&page=${this.state.page}&key=${myKeyAPI}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
    )
      .then(res => res.json())
      .then(({ hits }) => {
        if (hits.length > 0) {
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...hits],
          }));
        }
      })
      .catch(error => {
        this.setState({
          error: error.message,
        });
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const totalPages = Math.floor(
      this.state.totalPictures / this.state.perPage
    );

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar onSubmit={this.submitHandler} />
        {this.state.loading && <Loader />}
        <ImageGallery
          pictures={this.state.pictures}
          onClick={this.onClickPicture}
        />
        {totalPages > this.state.page && (
          <Button onSubmit={this.hendlerButtonLoadMore} />
        )}
      </div>
    );
  }
}

App.propTypes = {
  pictures: PropTypes.array,
  hits: PropTypes.array.isRequired,
  totalHits: PropTypes.number.isRequired,
};
