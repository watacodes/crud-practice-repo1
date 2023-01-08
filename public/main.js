const update = document.getElementById('submit-button');

update.addEventListener('click', () => {
  fetch('/tasks', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },

  })
});