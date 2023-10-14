document.addEventListener("DOMContentLoaded", function() {
    const askButton = document.querySelector(".btn.ask");
    const questionInput = document.querySelector(".question");
    const answerDiv = document.getElementById("answer");
    const statusMessage = document.querySelector(".message");
  
    function askQuestion() {
        const question = questionInput.value;
        if (question.trim() === "") return;
  
        statusMessage.textContent = "Asking...";
        fetch('/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: question })
        })
        .then(response => response.json())
        .then(data => {
            answerDiv.textContent = data.answer;
            answerDiv.style.display = "block";
            statusMessage.textContent = "Answered";
        })
        .catch(error => {
            console.error('Error:', error);
            statusMessage.textContent = "Error occurred";
        });
    }
  
    askButton.addEventListener("click", askQuestion);
  
    // Listen for "Enter" key press on the input field
    questionInput.addEventListener("keydown", function(event) {
        if (event.keyCode === 13) { // 13 is the keyCode for the Enter key
            askQuestion();
            event.preventDefault(); // Prevent default behavior (form submission, etc.)
        }
    });
  });
  