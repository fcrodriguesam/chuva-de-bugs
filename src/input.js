export const inputState = {
  left: false,
  right: false
};

const keyMap = {
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right"
};

export function bindInput(onSpacePress) {
  window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      onSpacePress?.();
      return;
    }

    const direction = keyMap[event.code];
    if (!direction) {
      return;
    }

    event.preventDefault();
    inputState[direction] = true;
  });

  window.addEventListener("keyup", (event) => {
    const direction = keyMap[event.code];
    if (!direction) {
      return;
    }

    inputState[direction] = false;
  });
}

export function resetInput() {
  inputState.left = false;
  inputState.right = false;
}
