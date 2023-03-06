import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import PropTypes from 'prop-types';
import { apiFetch } from './services/api';

export class App extends Component {
  state = {
    perPage: 12,
    pictures: [],
    error: null,
    picturesTags: '',
    page: 1,
    totalPictures: null,
    loading: false,
  };



  componentDidUpdate(prevProps, prevState) {
    const includesTags = prevState.picturesTags.includes(
      this.state.picturesTags
    );

    if (!includesTags) {
      this.setState({ loading: true});
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      apiFetch(this.state.picturesTags, this.state.page)
        .then(({ hits, totalHits }) =>
          {
            
            this.setState({ pictures: hits, page: this.state.page, totalPictures: totalHits, loading: false });
          
          }
        )
        .finally(() => this.setState({ loading: false }));
    }
  }
  submitHandler = picturesTags => {
    this.setState({ picturesTags });
  };

  hendlerButtonLoadMore = e => {
    e.preventDefault();
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));

    console.log(this.state.loading);
    apiFetch(this.state.picturesTags, this.state.page)
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
      .finally(() => this.setState({ loading: false}));
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
  hits: PropTypes.array,
  totalHits: PropTypes.number,
};