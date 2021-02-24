import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Took more than ${s - 1} seconds to load`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok)
      throw new Error(`An error of ${data.message} 👉👉👉 ${data.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};