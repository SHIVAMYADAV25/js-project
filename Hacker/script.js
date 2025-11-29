const div = document.getElementById("hack");
const original = div.textContent;
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
let count = 0;
let intervalId = null;

div.addEventListener("mouseenter", () => {
    clearInterval(intervalId);
    count = 0;

    intervalId = setInterval(() => {
        let scrambled = original
            .split("")
            .map((char, index) => {
                if (count >= index) return char;
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        div.textContent = scrambled;
        count += 0.25;

        // Stop when done
        if (count >= original.length) {
            clearInterval(intervalId);
            div.textContent = original;
        }
    }, 40);
});
