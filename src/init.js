import onChange from "on-change";
import * as yup from "yup";
import render from "./render";

export default () => {
  const elements = {
    form: document.querySelector(".rss-form"),
    input: document.querySelector("#url-input"),
    feedback: document.querySelector(".feedback"),
  };

  const initialState = {
    form: {
      status: "pending",
      message: "",
    },
    feeds: [],
  };

  const watchedState = onChange(initialState, render(elements));

  const getSchema = (feeds) => {
    const schema = yup
      .string()
      .url("Ссылка должна быть валидным URL")
      .required()
      .notOneOf(feeds);
    return schema;
  };

  elements.form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get("url").trim();

    const schema = getSchema(watchedState.feeds);
    schema
      .validate(url)
      .then(() => {
        watchedState.form.status = "valid";
        watchedState.form.message = "RSS успешно загружен";
        watchedState.feeds.push(url);
      })
      .catch((err) => {
        watchedState.form.status = "invalid";
        if (watchedState.feeds.includes(url)) {
          watchedState.form.message = "RSS уже существует";
        } else {
          watchedState.form.message = err.message;
        }
      });
  });
};
