function formatFeedbackCount(count) {
  // Format the label shown above the feedback list.
  return `${Math.max(0, count - 1)} feedback ${count === 1 ? "item" : "items"}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // COPILOT TASK 3:
  // Add form validation, render submitted feedback with safe DOM APIs,
  // update the item count with formatFeedbackCount, and clear the form.
});
