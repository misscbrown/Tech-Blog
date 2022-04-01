const signupFormHandler = async (event) => {
  console.log('*************')
    event.preventDefault();

    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    console.log('************************-------*******here is the stuff' + username, email, password)
    console.log('*****************************************************')


    if (username && email && password) {
        const response = await fetch('/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Sorry! ' + response.statusText);
        }
    }
};

document
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler);
//signupFormHandler();