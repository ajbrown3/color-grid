document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".grid");
    const rows = 10; // Adjust based on your grid size
    const cols = 10; // Adjust based on your grid size
    const gridArray = [];

    // Create Grid
    for (let i = 0; i < rows; i++) {
        const rowArray = [];
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            grid.appendChild(cell);
            rowArray.push(cell);
        }
        gridArray.push(rowArray);
    }

    // Ripple Effect
    function rippleEffect(row, col) {
        let radius = 0;

        const interval = setInterval(() => {
            let cellsAffected = [];

            for (let i = -radius; i <= radius; i++) {
                for (let j = -radius; j <= radius; j++) {
                    let newRow = row + i;
                    let newCol = col + j;

                    if (
                        newRow >= 0 && newRow < rows &&
                        newCol >= 0 && newCol < cols &&
                        Math.abs(i) + Math.abs(j) === radius // Ensures outward spread
                    ) {
                        cellsAffected.push(gridArray[newRow][newCol]);
                    }
                }
            }

            if (cellsAffected.length === 0) {
                clearInterval(interval);
                return;
            }

            cellsAffected.forEach(cell => {
                cell.style.backgroundColor = getRandomColor();
            });

            radius++;
        }, 100); // Adjust speed of ripple expansion
    }

    // Random Color Generator
    function getRandomColor() {
        return `hsl(${Math.random() * 360}, 100%, 70%)`;
    }

    // Click Event
    grid.addEventListener("click", function (event) {
        if (event.target.classList.contains("grid-cell")) {
            const row = parseInt(event.target.dataset.row);
            const col = parseInt(event.target.dataset.col);
            rippleEffect(row, col);
        }
    });

});
