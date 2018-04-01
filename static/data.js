fetch('/data', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cache: 'no-cache',
  },
  credentials: 'same-origin',
}).then(function(data) {
  return data.text().then(function(data) {
    parent = document.getElementById('list').innerHTML = data;
  });
});
