const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
    // console.log("dragstart");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
    // console.log("dragend");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    // console.log(e);
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, Y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];
  let i = 0;
  return draggableElements.reduce(
    (closet, child) => {
      const box = child.getBoundingClientRect();
      const offset = Y - box.top - box.height / 2;
      if (offset < 0 && offset > closet.offset) {
        return { offset: offset, element: child };
      }
      return closet;
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
