const newFormHandler = async function(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const body = document.querySelector('textarea[name="post-body"]').value.trim();

    const token = localStorage.getItem('token');
    await fetch (`/post`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    });

    document.location.replace('/dashboard');
};

document
    .querySelector('#new-post-form')
    .addEventListener('submit', newFormHandler);