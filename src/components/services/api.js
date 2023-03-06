// import { Searchbar } from './Searchbar';


export function apiFetch(picturesTags, page) {
    const fetchAPI = 'https://pixabay.com/api/?';
    const myKeyAPI = '34053498-378d8fa1a1d393cc8f9dd2057';
    
    return fetch(
        `${fetchAPI}q=${picturesTags}&page=${page}&key=${myKeyAPI}&image_type=photo&orientation=horizontal&per_page=12`
    ).then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(new Error(`${picturesTags} pictureser didn't find`))
    })      
}