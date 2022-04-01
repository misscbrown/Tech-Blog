const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log('***************' + password, username)

    if (username && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to dashboard
            document.location.replace('/dashboard');
        } else {
            alert('This user ' + response.statusText);
        }
    }
};


document
    .querySelector('#login-button')
    .addEventListener('submit', loginFormHandler);
