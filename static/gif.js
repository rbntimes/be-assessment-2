fetch(
  'http://api.giphy.com/v1/gifs/random?tag=' +
    document.getElementById('gif').dataset.tag +
    '&api_key=tyNj29PsgmTOAeo2E0fAnNPuLl9NsNV4',
  {
    method: 'GET',
  }
)
  .then(function(data) {
    return data.json();
  })
  .then(function({ data: { images: { fixed_height } } }) {
    document.getElementById('gif').src = fixed_height.url;
  });
