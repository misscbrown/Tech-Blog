// this file will be scripted into login handlebars

// on click of a button on the handlebars

//we get whats enntered in fields

// make post request

// if they login correctly we redirect to /dashboard 

const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to dashboard
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

