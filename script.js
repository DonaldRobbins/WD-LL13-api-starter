// Use this script to write your fetch logic
// You'll fetch data from your selected API and display it on the page
// Function to fetch and display a random fact inside the card
function fetchRandomFactInCard() {
  const card = document.getElementById('factCard');
  card.innerHTML = 'Loading...';
  fetch('https://uselessfacts.jsph.pl/random.json?language=en')
    .then(response => response.json())
    .then(data => {
      card.innerHTML = `
        <h2>Random Fact</h2>
        <p style="font-size:1.2em;">${data.text}</p>
        <small>Source: <a href="${data.source_url}" target="_blank">${data.source}</a></small>
        <button id="newFactBtn" style="margin-top:1em;">Get Another Fact</button>
      `;
      document.getElementById('newFactBtn').onclick = fetchRandomFactInCard;
    })
    .catch(() => {
      card.textContent = 'Failed to load fact. Please try again.';
    });
}

// Set up the clickable card on page load
window.onload = function() {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = `
    <div id="factCard" style="cursor:pointer; padding:2em; border:2px solid #007bff; border-radius:12px; background:#eef6ff; text-align:center; transition:box-shadow 0.2s;">
      <span style="font-size:1.2em; color:#007bff;">Click this card to reveal a useless fact!</span>
    </div>
  `;
  document.getElementById('factCard').onclick = function() {
    // Remove click-to-reveal after first click
    document.getElementById('factCard').onclick = null;
    fetchRandomFactInCard();
  };
};