function formatFeedbackCount(count) {
  return `${count} feedback ${count === 1 ? "item" : "items"}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#feedback-form");
  const nameInput = document.querySelector("#name");
  const ratingInput = document.querySelector("#rating");
  const commentInput = document.querySelector("#comment");
  const feedbackList = document.querySelector("#feedback-list");
  const feedbackCount = document.querySelector("#feedback-count");
  const emptyState = document.querySelector("#empty-state");
  const clearButton = document.querySelector("#clear-button");
  const formStatus = document.querySelector("#form-status");

  function updateFeedbackSummary() {
    const count = feedbackList.children.length;
    feedbackCount.textContent = formatFeedbackCount(count);
    emptyState.hidden = count > 0;
    clearButton.disabled = count === 0;
  }

  function createFeedbackCard(name, rating, comment) {
    const item = document.createElement("li");
    const message = document.createElement("p");
    const footer = document.createElement("footer");
    const author = document.createElement("span");
    const score = document.createElement("span");

    item.className = "feedback-card";
    message.textContent = comment;
    author.textContent = name || "Anonymous";
    score.textContent = `${rating}/5`;

    footer.append(author, score);
    item.append(message, footer);
    return item;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const comment = commentInput.value.trim();
    if (!form.checkValidity() || !comment) {
      formStatus.textContent = "Choose a rating and enter a comment.";
      form.reportValidity();
      return;
    }

    const card = createFeedbackCard(
      nameInput.value.trim(),
      ratingInput.value,
      comment
    );

    feedbackList.prepend(card);
    form.reset();
    formStatus.textContent = "Feedback added.";
    updateFeedbackSummary();
    nameInput.focus();
  });

  clearButton.addEventListener("click", () => {
    feedbackList.replaceChildren();
    formStatus.textContent = "All feedback cleared.";
    updateFeedbackSummary();
    nameInput.focus();
  });

  updateFeedbackSummary();
});
