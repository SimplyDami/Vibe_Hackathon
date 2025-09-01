// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {

  const generateBtn = document.getElementById("generate-btn");
  const notesTextarea = document.getElementById("notes");
  const flashcardsContainer = document.getElementById("flashcards-container");

  // Function to generate flashcards
  generateBtn.addEventListener("click", function() {
    const notes = notesTextarea.value.trim();

    if (!notes) {
      alert("Please paste your notes first!");
      return;
    }

    // Clear previous flashcards
    flashcardsContainer.innerHTML = "";

    // Split notes by lines
    const lines = notes.split("\n").filter(line => line.trim() !== "");

    // Generate a flashcard for each line
    lines.forEach(line => {
      const card = document.createElement("div");
      card.classList.add("flashcard");
      card.innerHTML = `
        <div class="flashcard-inner">
          <div class="flashcard-front">${line}</div>
          <div class="flashcard-back">Answer for: ${line}</div>
        </div>
      `;
      flashcardsContainer.appendChild(card);
    });
  });

  // Optional: Flip flashcard on click
  flashcardsContainer.addEventListener("click", function(e) {
    const cardInner = e.target.closest(".flashcard-inner");
    if (cardInner) {
      cardInner.classList.toggle("flipped");
    }
  });
});
