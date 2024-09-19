export default (elements) => (path, value) => {
  const { input, feedback } = elements;
  switch (path) {
    case "form.status":
      if (value === "valid") {
        input.classList.remove("is-invalid");
        feedback.classList.remove("text-danger");
        feedback.classList.add("text-success");
      } else {
        input.classList.add("is-invalid");
        feedback.classList.add("text-danger");
        feedback.classList.remove("text-success");
      }
      break;

    case "form.message":
      feedback.textContent = value;
      break;

    case "feeds":
      elements.form.reset();
      input.focus();
      break;

    default:
      break;
  }
};
