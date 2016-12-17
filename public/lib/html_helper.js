const addChildren = (parent, children) => {
  children.forEach((child) => {
    parent.appendChild(child);
  });
};

const createElementWith = (tag, id, text, classList = []) => {
  let el = document.createElement(tag);
  if (id) { el.id = id; }
  if (text) { el.innerText = text; }
  classList.forEach((c) => {
    el.classList.add(c);
  });
  return el;
};

export { addChildren, createElementWith };
