import axios from 'axios';

const getData = base => {
  return axios
    .get('https://api.fixer.io/latest?base=' + base + '&symbols=CAD,USD,EUR')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

export { getData };
