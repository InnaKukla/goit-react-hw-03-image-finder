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
  };

  changeTags = e => {
    console.log(e.currentTarget.value);
    this.setState({ picturesTags: e.currentTarget.value.toLowerCase() });
  };

  handlSubmitForm = e => {
    e.preventDefault();
    if (this.state.picturesTags.trim() === '') {
      alert('Input pictures name');
      return;
    }
    this.props.onSubmit(this.state.picturesTags);
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
