import axios from 'axios'

const key = '30986125-b49381751b2e2f4b8e31e6edc';

axios.defaults.baseURL = 'https://pixabay.com/api/'

async function fetchImages (q, page, per_page) {
    const searchParams = {
        params: {
          q,
          page,
          per_page,
          orientation: 'horizontal',
          safesearch: 'true',
          image_type: 'photo'
        },
      };
    const response = await axios.get(
        `?key=${key}&q=${q}`, searchParams
    )
    return response;
    
}

export {fetchImages};