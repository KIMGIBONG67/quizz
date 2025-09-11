document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('crossword-grid');
    const messages = document.getElementById('messages');
    const acrossCluesList = document.getElementById('across-clues');
    const downCluesList = document.getElementById('down-clues');
    const checkButton = document.getElementById('check-button');

    const boardSize = 12;

    const puzzles = {
        across: [
            { number: 1, clue: "가상현실 콘텐츠를 제작하는 전문가", answer: "VR개발자", row: 0, col: 0 },
            { number: 2, clue: "인공지능 모델을 훈련시키고 개선하는 전문가", answer: "AI엔지니어", row: 2, col: 1 },
            { number: 3, clue: "로봇을 설계하고 제어하는 기술자", answer: "로봇공학자", row: 4, col: 2 },
            { number: 4, clue: "사물 인터넷 기기를 개발하는 전문가", answer: "IoT개발자", row: 6, col: 0 },
            { number: 5, clue: "빅데이터를 분석하여 비즈니스 통찰을 제공하는 전문가", answer: "데이터사이언티스트", row: 8, col: 2 },
            { number: 6, clue: "유튜브, 틱톡 등에서 콘텐츠를 제작하는 사람", answer: "콘텐츠크리에이터", row: 10, col: 0 },
            { number: 7, clue: "드론을 조종하여 촬영, 배송 등 업무를 수행", answer: "드론조종사", row: 11, col: 5 }
        ],
        down: [
            { number: 1, clue: "클라우드 시스템을 구축하고 관리하는 전문가", answer: "클라우드엔지니어", row: 0, col: 0 },
            { number: 2, clue: "3D 모델링을 전문적으로 하는 사람", answer: "3D모델러", row: 2, col: 4 },
            { number: 3, clue: "스마트팜 기술을 연구하는 전문가", answer: "스마트팜전문가", row: 4, col: 2 },
            { number: 4, clue: "개인 맞춤형 영양 컨설팅을 제공하는 사람", answer: "맞춤형영양사", row: 6, col: 1 },
            { number: 5, clue: "자율주행 자동차 기술을 개발하는 전문가", answer: "자율주행차개발자", row: 8, col: 8 },
            { number: 6, clue: "유전자를 분석하고 질병을 예방하는 전문가", answer: "유전체분석가", row: 10, col: 0 },
            { number: 7, clue: "블록체인 기술을 활용한 서비스를 만드는 전문가", answer: "블록체인개발자", row: 1, col: 10 }
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
                    
                    // 가로 문제 번호가 있으면 span 생성
                    if (acrossClue) {
                        const acrossNumberSpan = document.createElement('span');
                        acrossNumberSpan.classList.add('number', 'across');
                        acrossNumberSpan.textContent = acrossClue.number;
                        cell.appendChild(acrossNumberSpan);
                    }

                    // 세로 문제 번호가 있으면 span 생성
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
