import axios from 'axios';
import querystring from 'querystring';
import * as config from '../config';

export interface AuthArgs {
  id: string;
  secret: string;
}

export interface AuthResponse {
  status: number;
  token: string | null;
}

const Auth = async (_: any, { id, secret }: AuthArgs) => {
  const credentials = Buffer.from(`${id}:${secret}`).toString('base64');
  const authRequest = axios.create({
    baseURL: config.API_AUTH_ROOT,
    headers: {
      Authorization: `Basic ${credentials}`
    }
  });

  const response: AuthResponse = {
    status: 500,
    token: null
  };

  try {
    const { data, status } = await authRequest.post(
      '/oauth2/token',
      querystring.stringify({
        grant_type: 'client_credentials'
      })
    );
    response.status = status;
    response.token = data.access_token;
  } catch (error) {
    /** error object info listed below
     *   console.log(error.response.data);
     *   console.log(error.response.status);
     *   console.log(error.response.headers);
     *   console.log(error.message);
     */
    response.status = error.response.status;
  }

  return response;
};

export default Auth;
