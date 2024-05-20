const PORT = 9998

function handleButtonClick(titleValue, buttonToAddClass, buttonToRemoveClass) {
    title.innerHTML = titleValue;
    buttonToAddClass.classList.add("disable");
    buttonToRemoveClass.classList.remove("disable");
}

document.addEventListener("DOMContentLoaded", function () {
    let signUpBtn = document.getElementById("signUpBtn");
    let signInBtn = document.getElementById("signInBtn");

    signInBtn.onclick = function () {
        handleButtonClick("Sign In", signUpBtn, signInBtn);
    }

    signUpBtn.onclick = function () {
        handleButtonClick("Sign Up", signInBtn, signUpBtn);
    }
});


function formDataToJson(formData) {
    let jsonObject = {};
    for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
    }
    return jsonObject;
}

/*LOgin and Sign Up*/
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('userinfo');

    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formulario);
        const jsonObject = formDataToJson(formData);


        const action = event.submitter.dataset.action;

        try {
            const response = await fetch(`http://localhost:${PORT}/api/users/${action}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonObject)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Exito:', data);

                action === 'login' ? sessionStorage.setItem('username', jsonObject.username) : sessionStorage.clear();

                alert(data.message);
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    });
});