// Clock properties
const clockSize = 512;

// Create Clock
const clock = document.createElement("div");
clock.classList.add("clock");
clock.style.setProperty("--clock-size", clockSize + "px");
document.body.append(clock);

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

// Draw marks
function drawMarks(n, padding, divClass, numbers = false) {
  const radius = clockSize / 2 - padding;

  for (let i = 0; i < n; i++) {
    const hourMark = document.createElement("div");
    hourMark.classList.add("mark", divClass);
    if (numbers) {
      if (i === 0) hourMark.innerHTML = `<span>${n * (12 / n)}</span>`;
      else hourMark.innerHTML = `<span>${i * (12 / n)}</span>`;
    }
    clock.append(hourMark);

    // Scary Math... https://stackoverflow.com/q/26599782
    const offset = -n / 4;
    const x = radius + radius * Math.cos((360 / n / 180) * (i + offset) * Math.PI);
    const y = radius + radius * Math.sin((360 / n / 180) * (i + offset) * Math.PI);

    // Update style
    hourMark.style.top = y - hourMark.offsetHeight / 2 + padding + "px";
    hourMark.style.left = x - hourMark.offsetWidth / 2 + padding + "px";
  }
}

drawMarks(12, 32, "mark__hour", true);
drawMarks(60, 32, "mark__minute");
