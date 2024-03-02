document.getElementById('generate').addEventListener('click', function() {
    const userInput = document.getElementById('input').value;
    if (!userInput.trim()) {
        alert('Please enter a description.');
        return;
    }

    fetch('placeholder', { // TODO: backend
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userInput }),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('output').innerText = data.code;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to generate code. Please try again.');
        });
});
