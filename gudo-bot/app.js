const btn = document.querySelector('.talk');

const content = document.querySelector('.content');

//array of greetings gudo will recogize
// const greetings = ['gudo is listening']

//speech recognition
//API is SpeechRecognition or webkit whichever is available
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

//on the click of the gudo button the function below will run (gudo STARTS listening)
recognition.onstart = function () {
    console.log('Gudo is listening');
}
//when gudo returns a result the function below will run (gudo STOPS listening)
// the event hold the string of what was being spoken about
recognition.onresult = function(event) {
    //returns what was spoken 
    const current = event.resultIndex;
    //the actual text
    const transcript = event.results[current][0].transcript;
    //accessing the content (h3)
    content.textContent = transcript;
    
};
//add the event listener to the btn. 
btn.addEventListener('click', () => {
    recognition.start();
});


//VOICE
// function readOutLoud(message) {
//     const speech = new SpeechSynthesisUtterance //maybe change this around 

//     speech.text = 'Sorry i didnt catch that';

//     if(message.includes('hey gudo')){
//         const finalText = greetings[Math.floor(Math.random() * greetings.length)];
//         speech.text = finalText;
//     }

    
//     speech.volume = 1;
//     speech.rate = 1;
//     speech.pitch = 1;

//     window.speechSynthesis.speak(speech);
// }

