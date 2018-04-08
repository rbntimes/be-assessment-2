var form = document.getElementById('chat');
form.addEventListener('submit', function(e) {
  data = document.getElementById('message').value;
  e.preventDefault();
  fetch(form.action, {
    method: 'post',
    body: JSON.stringify({ message: data }),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  })
    .then(function(response) {
      if (response.ok) {
        document.getElementById('message').value = '';
        document.getElementById('message').focus();
      }
      return response;
    })
    .then(function(data) {
      return data;
    });
});
