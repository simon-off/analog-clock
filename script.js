// Calculate clock size
const clockSize = () => {
  const maxSize = 640;
  const vMin = Math.min(window.innerHeight, window.innerWidth);
  const clockPadding = vMin / 4;
  return Math.min(vMin, maxSize + clockPadding) - clockPadding;
};

// Create the clock
const clock = document.createElement("div");
clock.classList.add("clock");
document.body.append(clock);
const updateClockSize = () => clock.style.setProperty("--clock-size", clockSize() + "px");
updateClockSize();

// Draw middle dot
const dot = document.createElement("div");
dot.classList.add("dot");
clock.append(dot);

// Draw hands
for (let i = 0; i < 3; i++) {
  const hand = document.createElement("div");
  hand.classList.add("hand");
  clock.append(hand);
}

const hands = clock.querySelectorAll(".hand");
hands[0].classList.add("hand__second");
hands[1].classList.add("hand__minute");
hands[2].classList.add("hand__hour");

function updateHands() {
  const time = new Date();
  hands[0].style.rotate = time.getSeconds() * 6 + "deg";
  hands[1].style.rotate = time.getMinutes() * 6 + time.getSeconds() / 10 + "deg";
  hands[2].style.rotate = (time.getHours() % 12) * 30 + time.getMinutes() / 2 + "deg";
}

updateHands();
setInterval(() => {
  updateHands();
}, 1000);

// Update marks positions
function updateMarks(marks) {
  const padding = clockSize() / 16;
  const radius = clockSize() / 2 - padding;
  const n = marks.length;

  marks.forEach((mark, i) => {
    // Calculate scary Math... https://stackoverflow.com/q/26599782
    const offset = -n / 4;
    const x = radius + radius * Math.cos((360 / n / 180) * (i + offset) * Math.PI);
    const y = radius + radius * Math.sin((360 / n / 180) * (i + offset) * Math.PI);
    // Update position
    mark.style.top = y - mark.offsetHeight / 2 + padding + "px";
    mark.style.left = x - mark.offsetWidth / 2 + padding + "px";
  });
}

// Create marks
function createMarks(n, divClass, numbers) {
  const marks = [];

  for (let i = 0; i < n; i++) {
    const mark = document.createElement("div");
    mark.classList.add("mark", divClass);
    if (numbers) {
      if (i === 0) mark.innerHTML = `<span>${n * (12 / n)}</span>`;
      else mark.innerHTML = `<span>${i * (12 / n)}</span>`;
    }
    marks.push(mark);
    clock.append(mark);
  }
  updateMarks(marks);
  return marks;
}

const hourMarks = createMarks(12, "mark__hour", true);
const minuteMarks = createMarks(60, "mark__minute", false);

window.addEventListener("resize", () => {
  updateClockSize();
  updateMarks(hourMarks);
  updateMarks(minuteMarks);
});

// Make sure the marks end up in the right place!
window.addEventListener("DOMContentLoaded", () => {
  updateMarks(hourMarks);
  updateMarks(minuteMarks);
});
