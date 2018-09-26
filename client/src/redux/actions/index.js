import axios from 'axios';

export const POST_FORM = 'post_form';

export function postForm(values) {
  const request = axios.post('/', values);

  return {
    type: POST_FORM,
    payload: request,
  };
}
