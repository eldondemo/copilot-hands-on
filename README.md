# Build a Feedback Board with GitHub Copilot

In this 45-minute lab, you will use GitHub Copilot in Visual Studio Code to finish a small website. The site uses only HTML, CSS, and JavaScript, so it opens directly in a browser without installing a runtime or package manager.

## What you will practice

- Asking Copilot to explain unfamiliar code
- Giving Copilot useful context and clear constraints
- Generating and refining HTML, CSS, and JavaScript
- Reviewing and testing suggestions before keeping them
- Using Copilot to diagnose a bug and review accessibility

Copilot can produce different valid solutions. Your code does not need to match the `solution` folder exactly; it needs to satisfy each checkpoint.

## Before the lab

You need:

- A modern web browser
- Visual Studio Code
- Access to GitHub Copilot and Copilot Chat in Visual Studio Code
- This workshop folder on your computer

No terminal, local server, build tool, or package installation is required.

## Setup — 5 minutes

1. Open this workshop folder in Visual Studio Code.
2. Open `starter/index.html`.
3. Open the same file from File Explorer in your browser. You should see a heading and introduction.
4. Keep the browser open. After each exercise, save your files and refresh the page.
5. Open Copilot Chat in Visual Studio Code.

> **Working habit:** Treat every suggestion as a draft. Read the proposed changes, keep only what you understand, and test the result.

## Exercise 1: Understand the project — 5 minutes

**Set Copilot Chat mode to Ask.** Ask mode is appropriate because you want an explanation without changing any files.

Open `starter/index.html`, `starter/styles.css`, and `starter/script.js`. Attach those files to Copilot Chat, or make sure they are open and included as context, then ask:

```text
Explain how these three files work together for a beginner. Describe what the browser
loads first, what each TODO asks me to build, and the purpose of formatFeedbackCount.
Do not change any code yet.
```

Ask one follow-up question about something in the response. For example:

```text
Why is the DOMContentLoaded event useful in this script?
```

**Checkpoint:** You can identify the page structure in `index.html`, presentation rules in `styles.css`, and behavior in `script.js`.

## Exercise 2: Add semantic HTML — 8 minutes

**Set Copilot Chat mode to Agent.** You will make three small changes instead of asking Copilot to build the entire interface at once. After each prompt, review and accept the change before continuing.

Open `starter/index.html` and add it to the chat context.

### Step 1: Create the page layout

Ask Copilot:

```text
In starter/index.html, replace only the COPILOT TASK 1 comment with a div whose class
is "feedback-layout". Inside it, add two section elements with class "panel".

The first section must use aria-labelledby="form-title" and contain only an h2 with
id "form-title" and text "Add feedback". The second must use
aria-labelledby="feedback-title" and contain only an h2 with id "feedback-title"
and text "Shared feedback".

Do not change the existing header, theme script, stylesheet link, or script reference.
```

Before accepting, confirm there are exactly two sections and each `aria-labelledby` value matches its heading ID.

### Step 2: Add the feedback form

Ask Copilot:

```text
In starter/index.html, add a form with id "feedback-form" immediately after
#form-title. Do not change the second section.

Add three div.field groups with visible labels:
- An optional input with id="name", name="name", type="text", maxlength="40",
  and autocomplete="name".
- A required select with id="rating" and name="rating". Its first option must have
  value="" and text "Choose a rating". Add options with values 5, 4, 3, 2, and 1.
- A required textarea with id="comment", name="comment", rows="5", and
  maxlength="240".

After the fields, add a submit button with class "primary-button" and text
"Add feedback". Then add an empty p#form-status.status with role="status" and
aria-live="polite". Do not add styles, scripts, or inline event handlers.
```

Before accepting, confirm every label's `for` value matches its control's `id`, and that only rating and comment are required.

### Step 3: Add the feedback list

Ask Copilot:

```text
In starter/index.html, find the section with aria-labelledby="feedback-title".
Change only the contents of that section.

Replace its h2 with a div.section-heading. Inside it, add a div containing the same
h2#feedback-title and a p#feedback-count with text "0 feedback items". Also inside
.section-heading, add a disabled button#clear-button.secondary-button with type
"button" and text "Clear all".

After .section-heading, add p#empty-state.empty-state with text
"No feedback yet. Add the first item." Then add an empty
ul#feedback-list.feedback-list with aria-live="polite".

Do not change the form, add styles, or add JavaScript.
```

Review the proposed change before accepting it:

- Does the second section still reference `feedback-title` with `aria-labelledby`?
- Does the Clear all button start disabled and use `type="button"`?
- Is the feedback list empty and identified by `feedback-list`?
- Did Copilot preserve the theme script, stylesheet link, and script reference?

If anything is missing, name that one issue in a new prompt instead of asking Copilot to regenerate the page.

**Checkpoint:** Refresh the browser. Both sections and all form controls appear, although styling is still basic.

## Exercise 3: Create responsive styles — 8 minutes

**Keep Copilot Chat in Agent mode.** Give it a narrow request because this is a focused change to one known file.

Open `starter/styles.css`, add it to the chat context, and ask Copilot:

```text
In starter/styles.css, replace only the COPILOT TASK 2 comment with CSS for the new
feedback board markup. Use the existing --cp-* variables for every color. Do not add
hardcoded color values or external assets.

Style .feedback-layout as a one-column grid that becomes two columns at 760px. Style
.panel, .field, labels, inputs, select, textarea, buttons, .status, .section-heading,
.empty-state, .feedback-list, and .feedback-card. Use a 16px card radius and 0.625rem
for controls. Make controls at least 44px tall, include a clear :focus-visible outline,
and stack the section heading on screens below 480px. Keep the existing font.
```

Inspect the generated CSS. Search the new rules for `#`, `rgb`, or `hsl`; colors in component rules should reference `var(--cp-...)`.

**Checkpoint:** Refresh the browser, then narrow its window. The layout changes from two columns to one, form controls remain usable, and keyboard focus is visible when you press <kbd>Tab</kbd>.

## Exercise 4: Add behavior — 10 minutes

**Keep Copilot Chat in Agent mode.** This behavior is a multi-step feature: Copilot needs to inspect the HTML contract, implement the script, and keep several UI states synchronized. Review every proposed tool call and file change.

Open `starter/script.js`. Include the three starter files as context, then ask Copilot:

```text
In starter/script.js, implement COPILOT TASK 3 inside the existing DOMContentLoaded
listener. Preserve and call the existing formatFeedbackCount helper.

On form submission, prevent navigation, require a selected rating and a non-blank
trimmed comment, and show a useful message in #form-status when invalid. For valid
input, create a li.feedback-card containing the comment, the name or "Anonymous",
and the rating as "<rating>/5". Build the card with createElement and textContent,
never innerHTML. Prepend it to #feedback-list, reset the form, show a success message,
update #feedback-count, hide #empty-state when items exist, enable #clear-button,
and return focus to #name.

When Clear all is selected, remove all feedback, update the count and empty state,
disable the button, show a status message, and focus #name. Keep all data in memory
and do not use storage, a server, libraries, inline handlers, or alert.
```

Before accepting, find where Copilot inserts user-provided text. Keep the change only if it uses `textContent` (or `createTextNode`) rather than `innerHTML`.

Test in the browser:

1. Choose a rating, enter only spaces in the comment, and submit. It should show the
   custom validation message and not add a card.
2. Choose a rating, enter a comment, and submit. A card should appear.
3. Enter `<img src=x onerror=alert(1)>` as a comment. It should appear as text, not run as HTML.
4. Add a second card, then select **Clear all**. The list should become empty.

**Checkpoint:** Form submission, validation, counting, empty-state behavior, and clearing all work. You may notice that the displayed count is wrong—that is intentional.

## Exercise 5: Debug and review — 6 minutes

Add one feedback item and compare the number of visible cards with the displayed count.

**Set Copilot Chat mode to Ask** so Copilot investigates and explains without immediately changing the code. Then ask:

```text
There is one feedback card in the list, but the page says there are zero. Trace the
count from the DOM update back to formatFeedbackCount in starter/script.js. Explain
the root cause before proposing the smallest possible fix. Preserve correct singular
and plural wording.
```

Read the explanation and proposed fix. The correct fix should remove the subtraction, not compensate elsewhere.

**Set Copilot Chat mode to Agent** and ask it to apply only the smallest fix it just described:

```text
Apply only the smallest fix you described to formatFeedbackCount in
starter/script.js. Do not change any other function.
```

Test the count with zero, one, and two items.

**Set Copilot Chat mode back to Ask** for a focused review that does not automatically change files:

```text
Review starter/index.html, starter/styles.css, and starter/script.js for beginner-level
accessibility and safe handling of user-entered text. Report only concrete issues.
Do not add dependencies or redesign the page.
```

If the review identifies a valid issue, switch to **Agent mode** before asking Copilot to make that specific correction. Apply only changes you understand and can verify.

**Checkpoint:** Counts read `0 feedback items`, `1 feedback item`, and `2 feedback items`. You can use the form and buttons with the keyboard, and entered markup stays plain text.

## Wrap-up — 3 minutes

You used five habits that transfer to larger projects:

1. Give Copilot the relevant files and describe the desired outcome.
2. State constraints such as accessibility, dependencies, and safe APIs.
3. Ask for small, reviewable changes instead of generating everything at once.
4. Ask for an explanation before accepting a bug fix.
5. Verify behavior yourself, including failure cases.

The `solution` folder contains one complete implementation for comparison. Differences are expected.

## If you get stuck

- **Page did not change:** Save all files and refresh the browser.
- **Styles are missing:** Confirm `index.html` still links to `styles.css`.
- **Interactions do nothing:** Confirm `index.html` still loads `script.js`, then ask Copilot to check whether every queried ID matches the HTML.
- **Copilot changed too much:** Undo the edit and repeat the prompt with “replace only the named TODO.”
- **Need a working reference:** Replace the current exercise's file with its counterpart from `solution`, then continue from the next exercise.

## Optional stretch tasks

- Add a delete button to each feedback card with an accessible label.
- Show a live remaining-character count for the comment.
- Add rating buttons that filter the visible feedback without changing the stored list.
