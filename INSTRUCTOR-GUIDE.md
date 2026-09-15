# Instructor Guide: GitHub Copilot Beginner Lab

This guide supports a 55-minute workshop in which participants complete a static feedback board with GitHub Copilot in Visual Studio Code.

## Learning objectives

By the end, learners should be able to:

- Give Copilot relevant file context, a concrete goal, and useful constraints
- Use Copilot to explain, generate, refine, debug, and review code
- Evaluate generated changes instead of accepting them automatically
- Verify a small web feature through observable browser behavior
- Recognize safe DOM rendering and basic accessibility practices
- Use focused chat sessions and maintain project documentation across session boundaries

## Preparation

Before the session:

1. Distribute the complete workshop folder.
2. Confirm participants can use GitHub Copilot Chat in Visual Studio Code.
3. Confirm `starter/index.html` opens directly in the available browser.
4. Open `solution/index.html` yourself and test adding and clearing feedback.
5. Keep the `solution` folder unchanged so it remains a recovery reference.
6. Confirm the workshop root contains `STUDENT-GUIDE.md` but no `README.md`; learners create `README.md` during the lab.

No repository clone, terminal, extension-based web server, package manager, or internet-hosted asset is required after the files are distributed. Copilot access still requires the participant's normal authenticated connection.

## Run of show

| Time | Segment | Instructor focus |
| --- | --- | --- |
| 0:00-0:05 | Setup | Confirm files open, browser preview works, and learners can locate the Chat mode selector. |
| 0:05-0:10 | Explain — Ask | Demonstrate attaching relevant files and using Ask mode without editing. |
| 0:10-0:14 | Create README — Agent | Start a dedicated documentation session and describe only the current state. |
| 0:14-0:22 | HTML — Agent | Start a fresh implementation session; emphasize targeted edits, exact IDs, and reviewing the proposed diff. |
| 0:22-0:30 | CSS — Agent | Continue the HTML/CSS session; reinforce responsive checks and visible keyboard focus. |
| 0:30-0:33 | Update README — Agent | Return to the documentation session and record verified HTML/CSS progress. |
| 0:33-0:43 | JavaScript — Agent | Start a fresh implementation session; review validation, DOM APIs, and safe rendering. |
| 0:43-0:49 | Debug/review — Ask/Agent | Continue that session; diagnose in Ask, apply the minimal fix in Agent, then review in Ask. |
| 0:49-0:52 | Finish README — Agent | Return to the documentation session and reconcile claims with final checks. |
| 0:52-0:55 | Wrap-up | Recap context boundaries, constraints, explanation, and verification. |

## Facilitation notes

### Setup

Show the folder structure and explain that `starter` is the learner workspace while `solution` is a reference. Have everyone open the HTML file from File Explorer rather than introducing a local server. Demonstrate the edit cycle: accept a change, save the edited file, refresh the browser, and inspect the result.

State the core rule early: **Copilot proposes; the developer decides.**

Point out the Copilot Chat mode selector. Explain the progression used in the lab:

- **Ask** answers questions and explains code without editing files.
- **Agent** makes code changes, can inspect related files, and may use tools or propose several edits. A narrow prompt keeps a small task focused.

Also demonstrate how to start a new chat session and how to reopen one from chat history. Explain that sessions preserve conversation context, while files continue changing independently. Learners must attach the latest file versions when returning to a session.

Mode controls can move between Visual Studio Code versions, so demonstrate where they appear in the version installed on the workshop machines.

### Exercise 1: Explain

Confirm that everyone selects **Ask mode**. Demonstrate how to include the three starter files as chat context using the controls available in the installed VS Code version. Copilot's wording may differ, but it should identify:

- HTML as structure
- CSS as presentation
- JavaScript as behavior
- `DOMContentLoaded` as delaying DOM queries until the document is available
- Three marked implementation tasks
- `formatFeedbackCount` as the count-label formatter

Do not reveal the subtraction defect yet. If Copilot notices it, acknowledge the observation and ask the learner to leave it unchanged until the debugging exercise.

### Documentation checkpoint 1: Create the README

Have learners start a dedicated **README session** in Agent mode. They should create `README.md` in the workspace root using only the current `starter` files as evidence. Verify that the initial status checklist leaves the HTML, CSS, JavaScript, and final testing work incomplete and that Copilot does not inspect `solution`.

Ask learners to keep this session in their chat history. Its narrow documentation context will be reused at two later checkpoints.

### Exercise 2: HTML

Have learners start a new **HTML and CSS session** in Agent mode. This exercise deliberately uses three prompts: layout, form, then feedback list. Pause after each change so learners experience incremental prompting and review rather than submitting one large specification. After each accepted change, have learners save `starter/index.html`, refresh the browser, and identify what changed on the page.

For the layout prompt, verify that both `aria-labelledby` values resolve to headings. For the form prompt, verify label associations and required fields. For the list prompt, verify the Clear all button is initially disabled and uses `type="button"`.

The exact markup can vary, but later exercises depend on these IDs:

`feedback-form`, `name`, `rating`, `comment`, `form-status`, `feedback-count`, `clear-button`, `empty-state`, and `feedback-list`.

The initial page may look plain or uneven. That is expected and creates a clear before/after result for the CSS exercise.

### Exercise 3: CSS

Keep learners in **Agent mode**. Before the browser check, have them save `starter/styles.css` and refresh the page. Ask them to shrink the browser instead of only reading the media query. Have them press `Tab` to confirm focus is visible. If Copilot introduces hardcoded colors in new component rules, prompt it to replace those values with the existing `--cp-*` variables.

### Documentation checkpoint 2: Update the README

Have learners reopen the **README session** and attach the current README, HTML, and CSS files. The update should mark verified HTML and CSS work complete while leaving JavaScript and final testing unfinished. This is the key demonstration that the documentation conversation stays focused while current files provide fresh evidence.

### Exercise 4: JavaScript

Have learners start a new **JavaScript and review session** in Agent mode and include all three starter files as context. Explain that Agent is appropriate here because it must understand the HTML contract while implementing several connected UI behaviors. Learners should monitor its actions and reject unrelated file changes.

Before testing, explicitly inspect how the comment and name are rendered. `textContent` or `createTextNode` is acceptable; interpolating user input into `innerHTML` is not. Have learners save `starter/script.js` and refresh the browser before running the behavior checks.

Required behavior:

- Invalid submissions do not add cards
- Whitespace-only comments are rejected
- Anonymous names receive a fallback label
- New cards appear at the beginning of the list
- Count, empty state, and clear-button state stay synchronized
- Submission resets the form and returns focus to the name field
- Clear all empties the list and returns focus
- Data disappears on refresh because persistence is intentionally out of scope

If a learner's generated script works but is structured differently from the solution, let them keep it.

### Exercise 5: Debug and review

Have learners switch to **Ask mode** for diagnosis so Copilot explains the root cause before changing code. After they understand the answer, switch to **Agent mode** to apply only the formatter correction. Have them save the script, refresh the browser, and retest zero, one, and two items. Switch back to **Ask mode** for the accessibility and safe-rendering review.

The intentional defect is in `starter/script.js`:

```js
return `${Math.max(0, count - 1)} feedback ${count === 1 ? "item" : "items"}`;
```

The smallest correct fix is:

```js
return `${count} feedback ${count === 1 ? "item" : "items"}`;
```

The learning point is the debugging request: observe the mismatch, trace the data, ask for an explanation, and make the smallest correction. Learners should not “fix” the count by adding one at every call site.

For the review prompt, accept only concrete, relevant findings. Use this moment to note that Copilot review output is also a draft and may report issues that are already handled.

### Documentation checkpoint 3: Finish the README

Have learners return to the **README session**, attach the current README and all three starter files, and reconcile the documentation with their final browser checks. Completed claims should cover only behavior they observed. Copilot must update only `README.md` and must not inspect `solution`.

## Checkpoint answers

| Checkpoint | Expected result |
| --- | --- |
| Initial page | Heading and introduction render with no server. |
| HTML | Two sections, labeled controls, status region, count, empty state, list, and clear button exist. |
| CSS | Two columns on wider screens, one on narrow screens, with readable controls and focus indicators. |
| JavaScript | Valid feedback adds safely; invalid input is rejected; clear all resets list state. |
| Debug | Count uses the actual list length and correct singular/plural wording. |
| Review | Keyboard operation works and markup entered as feedback is displayed literally. |

## Common issues and recovery

| Symptom | Likely cause | Recovery |
| --- | --- | --- |
| Browser shows old content | File was not saved or page was not refreshed | Save all files, then refresh. |
| Unstyled controls | Stylesheet link changed or CSS has a syntax error | Restore the link and ask Copilot to locate the first parse error. |
| Submit reloads the page | Missing `event.preventDefault()` | Ask Copilot to trace the submit handler. |
| JavaScript reports `null` | Generated IDs do not match selectors | Compare HTML IDs with `querySelector` calls. |
| Count never changes | Summary update is not called after list changes | Ask Copilot to identify every operation that changes list length. |
| Entered tags become elements | User input was assigned to `innerHTML` | Replace that path with elements and `textContent`. |
| Learner is far behind | Copilot made broad or incompatible edits | Copy the current exercise's corresponding file from `solution`, then continue. |

## Pacing options

**If the group is behind:** Provide the HTML from `solution/index.html` after Exercise 2, shorten the CSS discussion to the responsive and focus rules, and preserve the JavaScript/debugging segments.

**If the group is ahead:** Use one optional stretch task from `STUDENT-GUIDE.md`. Ask learners to write their own prompt first, compare prompts in pairs, and explain how their constraints affected the result.

**If Copilot is temporarily unavailable:** Pair learners with a working seat, use the completed solution to discuss the intended edits, and continue the code-review and browser-testing portions. Do not spend the session troubleshooting account entitlement.

## Closing discussion

Ask learners:

- Which constraint most improved Copilot's response?
- What did they verify instead of trusting?
- When did a smaller prompt make the change easier to review?
- What context stayed useful when they returned to the README session?
- What additional context would they provide in a real project?

End by reinforcing that effective Copilot use combines focused sessions, current file context, explicit constraints, incremental changes, and developer verification.
