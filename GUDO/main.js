/*This script allows the user to Change the site to Dark Mode for easier reading.
    changes the Background to blacks and grey. changes <p> tags to white font. 



*/

const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});
