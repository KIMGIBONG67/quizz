
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('crossword-grid');
    const messages = document.getElementById('messages');
    const acrossCluesList = document.getElementById('across-clues');
    const downCluesList = document.getElementById('down-clues');
    const checkButton = document.getElementById('check-button');

    const boardSize = 12;

    const puzzles = {
        across: [
            { number: 1, clue: "데이터를 분석하여 비즈니스 의사결정을 돕는 사람", answer: "데이터분석가", row: 0, col: 0 },
            { number: 2, clue: "책이나 잡지 등에 들어가는 그림을 그리는 사람", answer: "일러스트레이터", row: 2, col: 0 },
            { number: 3, clue: "사람들의 심리적인 어려움을 해결해 주는 전문가", answer: "심리상담사", row: 4, col: 1 },
            { number: 4, clue: "방송에서 뉴스를 읽고 전달하는 직업", answer: "아나운서", row: 6, col: 0 },
            { number: 5, clue: "손님의 주문에 맞춰 커피를 만드는 사람", answer: "바리스타", row: 8, col: 2 },
            { number: 6, clue: "미술관에서 작품을 해설하고 관리하는 직업", answer: "큐레이터", row: 10, col: 0 },
            { number: 7, clue: "아픈 동물을 치료해 주는 의사", answer: "수의사", row: 11, col: 5 },
            { number: 8, clue: "개인이나 회사의 수입과 지출을 기록하고 관리하는 사람", answer: "회계사", row: 9, col: 7 },
            { number: 9, clue: "국가나 지방 공공 기관에서 일하는 사람", answer: "공무원", row: 7, col: 2 },
            { number: 10, clue: "외국어로 된 글을 다른 언어로 바꾸는 사람", answer: "번역가", row: 5, col: 7 }
        ],
        down: [
            { number: 1, clue: "디지털 기기를 활용해 자유롭게 일하는 사람", answer: "디지털노마드", row: 0, col: 0 },
            { number: 2, clue: "어린 아이들을 가르치고 돌보는 선생님", answer: "유치원교사", row: 1, col: 4 },
            { number: 3, clue: "직업으로 게임을 하는 사람", answer: "프로게이머", row: 2, col: 7 },
            { number: 4, clue: "미술을 가르치는 선생님", answer: "회화선생님", row: 4, col: 1 },
            { number: 5, clue: "만화나 애니메이션 캐릭터를 만드는 사람", answer: "애니메이터", row: 3, col: 9 },
            { number: 6, clue: "불이 난 곳에서 사람을 구하는 사람", answer: "소방관", row: 6, col: 4 },
            { number: 7, clue: "맛있는 음식을 만드는 사람", answer: "요리사", row: 8, col: 2 },
            { number: 8, clue: "배를 운전하여 바다를 항해하는 사람", answer: "선장", row: 1, col: 10 },
            { number: 9, clue: "책이나 글을 쓰는 사람", answer: "작가", row: 7, col: 7 },
            { number: 10, clue: "법률 전문가로, 법정에서 변론을 맡는다", answer: "변호사", row: 5, col: 11 }
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
