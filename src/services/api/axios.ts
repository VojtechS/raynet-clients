import axios from 'axios';

const apiBaseUrl = String(import.meta.env.VITE_API_URL ?? '');

if (!apiBaseUrl) {
  throw new Error('VITE_API_URL is not configured');
}

const apiToken = String(import.meta.env.VITE_API_TOKEN ?? '');

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  headers: apiToken
    ? {
        Authorization: `Bearer ${apiToken}`,
        Accept: 'application/json',
      }
    : undefined,
});
