document.addEventListener('DOMContentLoaded', function () {
    // Use document.querySelector to select elements based on class names
    const bars = document.querySelector('.bars');
    const menu = document.querySelector('.menu');

    // Add an event listener to the bars element
    bars.addEventListener('click', function () {
        // Toggle the visibility of the menu
        menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'flex' : 'none';
    });
});
