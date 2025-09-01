// ========== Flashcard Generator Demo ==========

// Select elements
const notesInput = document.getElementById("notes");
const generateBtn = document.getElementById("generate-btn");
const flashcardsContainer = document.getElementById("flashcards");

// Example AI-like flashcard generator (mocked for demo)
function generateFlashcards(text) {
  // Split input into sentences or lines
  let sentences = text.split(/[.?!\n]/).filter(s => s.trim() !== "");

  // Create flashcards (max 5 for demo)
  return sentences.slice(0, 5).map((sentence, index) => {
    return {
      question: `Q${index + 1}: What is the key idea here?`,
      answer: sentence.trim()
    };
  });
}

// Render flashcards on the page
function renderFlashcards(cards) {
  flashcardsContainer.innerHTML = ""; // clear previous

  if (cards.length === 0) {
    flashcardsContainer.innerHTML = "<p>No flashcards generated. Try adding more notes!</p>";
    return;
  }

  cards.forEach(card => {
    let div = document.createElement("div");
    div.className = "flashcard";
    div.innerHTML = `
      <h4>${card.question}</h4>
      <p><strong>Answer:</strong> ${card.answer}</p>
    `;
    flashcardsContainer.appendChild(div);
  });
}

// Button click event
generateBtn.addEventListener("click", () => {
  let text = notesInput.value.trim();

  if (text === "") {
    alert("Please enter some notes first!");
    return;
  }

  let flashcards = generateFlashcards(text);
  renderFlashcards(flashcards);
});
