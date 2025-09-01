 // ========== Flashcard Generator Demo with Flask Backend ==========

// Select elements
const notesInput = document.getElementById("notes");
const generateBtn = document.getElementById("generate-btn");
const flashcardsContainer = document.getElementById("flashcards-container");

// ---------------------------
// Render flashcards on the page
// ---------------------------
function renderFlashcards(cards) {
  flashcardsContainer.innerHTML = ""; // clear previous

  if (cards.length === 0) {
    flashcardsContainer.innerHTML = "<p>No flashcards generated. Try adding more notes!</p>";
    return;
  }

  cards.forEach(card => {
    let cardDiv = document.createElement("div");
    cardDiv.className = "flashcard";

    cardDiv.innerHTML = `
      <div class="flashcard-inner">
        <div class="flashcard-front">
          <h4>${card.question}</h4>
        </div>
        <div class="flashcard-back">
          <p><strong>Answer:</strong> ${card.answer}</p>
        </div>
      </div>
    `;
    flashcardsContainer.appendChild(cardDiv);
  });
}

// ---------------------------
// Fetch all saved flashcards
// ---------------------------
async function fetchSavedFlashcards() {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/flashcards");
    const data = await response.json();
    renderFlashcards(data);
  } catch (err) {
    console.error("Error fetching saved flashcards:", err);
  }
}

// ---------------------------
// Generate flashcards button
// ---------------------------
generateBtn.addEventListener("click", async () => {
  let text = notesInput.value.trim();

  if (text === "") {
    alert("Please enter some notes first!");
    return;
  }

  try {
    // Call Flask backend API to generate flashcards
    const response = await fetch("http://127.0.0.1:5000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ notes: text })
    });

    const data = await response.json();

    if (response.ok) {
      // Refresh display with newly generated + saved flashcards
      await fetchSavedFlashcards();
    } else {
      alert(data.error || "Something went wrong!");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Unable to connect to the server. Is Flask running?");
  }
});

// ---------------------------
// Initial fetch when page loads
// ---------------------------
window.addEventListener("DOMContentLoaded", fetchSavedFlashcards);
