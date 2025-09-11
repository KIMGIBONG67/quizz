document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('crossword-grid');
    const messages = document.getElementById('messages');
    const acrossCluesList = document.getElementById('across-clues');
    const downCluesList = document.getElementById('down-clues');
    const checkButton = document.getElementById('check-button');

    const boardSize = 12;

    const puzzles = {
        across: [
            { number: 1, clue: "손님에게 맛있는 음식을 만들어 제공하는 사람", answer: "요리사", row: 0, col: 0 },
            { number: 2, clue: "꽃을 다듬고 장식하는 전문가", answer: "플로리스트", row: 2, col: 1 },
            { number: 3, clue: "개인이나 회사의 수입과 지출을 기록하고 관리하는 사람", answer: "회계사", row: 4, col: 0 },
            { number: 4, clue: "미술관에서 작품을 해설하고 관리하는 직업", answer: "큐레이터", row: 6, col: 2 },
            { number: 5, clue: "국가나 지방 공공 기관에서 일하는 사람", answer: "공무원", row: 8, col: 0 },
            { number: 6, clue: "외국어로 된 글을 다른 언어로 바꾸는 사람", answer: "번역가", row: 10, col: 1 },
            { number: 7, clue: "책이나 글을 쓰는 사람", answer: "작가", row: 11, col: 5 }
        ],
        down: [
            { number: 1, clue: "요가를 가르치는 전문가", answer: "요가강사", row: 0, col: 0 },
            { number: 2, clue: "배의 운전과 운항을 책임지는 사람", answer: "선장", row: 2, col: 1 },
            { number: 3, clue: "손님의 주문에 맞춰 커피를 만드는 사람", answer: "바리스타", row: 4, col: 0 },
            { number: 4, clue: "아픈 동물을 치료해 주는 의사", answer: "수의사", row: 6, col: 2 },
            { number: 5, clue: "미술관이나 박물관에서 작품을 설명해주는 안내인", answer: "도슨트", row: 8, col: 0 },
            { number: 6, clue: "방송 프로그램의 제작을 총괄하는 사람", answer: "피디", row: 10, col: 1 },
            { number: 7, clue: "머리카락을 자르거나 스타일링하는 전문가", answer: "미용사", row: 11, col: 5 }
        ]
    };
    
    const boardData = {};

    function setupBoard() {
        puzzles.across.forEach(p => {
            for (let i = 0; i < p.answer.length; i++) {
                const key = `${p.row}-${p.col + i}`;
                if (!boardData[key]) boardData[key] = { across: null, down: null, letter: p.answer[i] };
                boardData[key].across = { number: p.number, clue: p.clue, answer: p.answer };
            }
        });

        puzzles.down.forEach(p => {
            for (let i = 0; i < p.answer.length; i++) {
                const key = `${p.row + i}-${p.col}`;
                if (!boardData[key]) boardData[key] = { across: null, down: null, letter: p.answer[i] };
                boardData[key].down = { number: p.number, clue: p.clue, answer: p.answer };
            }
        });
    }

    function createBoard() {
        grid.innerHTML = '';
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const key = `${row}-${col}`;
                const cell = document.createElement('div');
                cell.classList.add('cell');

                if (boardData[key]) {
                    cell.classList.add('filled');
                    const input = document.createElement('input');
                    input.setAttribute('type', 'text');
                    input.setAttribute('maxlength', '1');
                    input.dataset.row = row;
                    input.dataset.col = col;
                    cell.appendChild(input);

                    const acrossClue = puzzles.across.find(p => p.row === row && p.col === col);
                    const downClue = puzzles.down.find(p => p.row === row && p.col === col);
                    
                    if (acrossClue) {
                        const acrossNumberSpan = document.createElement('span');
                        acrossNumberSpan.classList.add('number', 'across');
                        acrossNumberSpan.textContent = acrossClue.number;
                        cell.appendChild(acrossNumberSpan);
                    }

                    if (downClue) {
                        const downNumberSpan = document.createElement('span');
                        downNumberSpan.classList.add('number', 'down');
                        downNumberSpan.textContent = downClue.number;
                        cell.appendChild(downNumberSpan);
                    }
                }
                grid.appendChild(cell);
            }
        }
    }

    function displayClues() {
        acrossCluesList.innerHTML = '';
        downCluesList.innerHTML = '';

        puzzles.across.forEach(p => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="across-number">${p.number}.</span> ${p.clue}`;
            acrossCluesList.appendChild(li);
        });

        puzzles.down.forEach(p => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="down-number">${p.number}.</span> ${p.clue}`;
            downCluesList.appendChild(li);
        });
    }

    function checkAnswers() {
        let allCorrect = true;
        
        document.querySelectorAll('.cell.filled input').forEach(input => {
            input.parentElement.classList.remove('correct', 'incorrect');
        });

        const checkPuzzle = (puzzleType) => {
            puzzles[puzzleType].forEach(p => {
                let userSolution = '';
                for (let i = 0; i < p.answer.length; i++) {
                    const row = (puzzleType === 'across') ? p.row : p.row + i;
                    const col = (puzzleType === 'across') ? p.col + i : p.col;
                    const input = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
                    userSolution += input ? input.value.toUpperCase() : '';
                }

                if (userSolution !== p.answer.toUpperCase()) {
                    allCorrect = false;
                    for (let i = 0; i < p.answer.length; i++) {
                        const row = (puzzleType === 'across') ? p.row : p.row + i;
                        const col = (puzzleType === 'across') ? p.col + i : p.col;
                        const input = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
                        if (input && input.value.toUpperCase() !== p.answer[i].toUpperCase()) {
                            input.parentElement.classList.add('incorrect');
                        }
                    }
                } else {
                    for (let i = 0; i < p.answer.length; i++) {
                        const row = (puzzleType === 'across') ? p.row : p.row + i;
                        const col = (puzzleType === 'across') ? p.col + i : p.col;
                        const input = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
                        if (input) {
                            input.parentElement.classList.add('correct');
                        }
                    }
                }
            });
        };

        checkPuzzle('across');
        checkPuzzle('down');

        if (allCorrect) {
            messages.textContent = "🎉 다 맞추셨습니다. 축하합니다! 🎉";
            messages.style.color = "green";
        } else {
            messages.textContent = "🤔 틀린 곳이 있습니다. 다시 풀어보세요.";
            messages.style.color = "red";
        }
    }

    setupBoard();
    createBoard();
    displayClues();
    checkButton.addEventListener('click', checkAnswers);
});
