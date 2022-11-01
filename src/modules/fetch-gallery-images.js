import axios from 'axios'

const key = '30986125-b49381751b2e2f4b8e31e6edc';
/* const BASE_URL = 'https://pixabay.com/api/'; */
axios.defaults.baseURL = 'https://pixabay.com/api/'

async function fetchImages (q, page, per_page) {
    const response = await axios.get(
        `?key=${key}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
    )
    return response;
    
}

export {fetchImages};