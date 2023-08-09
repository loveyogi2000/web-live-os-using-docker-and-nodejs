
//code for fetching msg from url  header
$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search); // Get the query parameters from the URL
    const message = urlParams.get('msg'); // Get the value of the 'msg' parameter
    if (message) {
      const messageElement = document.getElementById('message'); // Get the HTML element to display the message
      messageElement.textContent = message; // Set the text content of the element to the message
    }
});