import { Component } from 'react';
import {
  HeaderSearchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    picturesTags: '',
    page: 1,
  };

  changeTags = e => {
    this.setState({ picturesTags: e.currentTarget.value.toLowerCase() });
  };

  handlSubmitForm = e => {
    e.preventDefault();

    if (this.state.picturesTags.trim() === '') {
      alert('Enter pictures name');
      return;
    }
    this.props.onSubmit(this.state.picturesTags, this.state.page);
    this.setState({ picturesTags: '', page: 1 });
  };
  render() {
    return (
      <HeaderSearchbar>
        <SearchForm onSubmit={this.handlSubmitForm}>
          <SearchFormButton type="submit" className="button">
            <span className="button-label">Search</span>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.picturesTags}
            onChange={this.changeTags}
          />
        </SearchForm>
      </HeaderSearchbar>
    );
  }
}
