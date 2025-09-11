document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('crossword-grid');
    const messages = document.getElementById('messages');
    const acrossCluesList = document.getElementById('across-clues');
    const downCluesList = document.getElementById('down-clues');
    const checkButton = document.getElementById('check-button');

    // 최신 직업 관련 퀴즈 데이터
    const puzzles = {
        across: [
            { number: 1, clue: "가상현실 콘텐츠를 제작하는 전문가", answer: "VR개발자", row: 0, col: 0 },
            { number: 2, clue: "인공지능 모델을 훈련시키고 개선하는 전문가", answer: "AI엔지니어", row: 2, col: 2 },
            { number: 3, clue: "로봇을 설계하고 제어하는 기술자", answer: "로봇공학자", row: 4, col: 4 },
            { number: 4, clue: "사물 인터넷 기기를 개발하는 전문가", answer: "IoT개발자", row: 6, col: 0 },
            { number: 5, clue: "빅데이터를 분석하여 비즈니스 통찰을 제공하는 전문가", answer: "데이터사이언티스트", row: 8, col: 2 },
            { number: 6, clue: "유튜브, 틱톡 등에서 콘텐츠를 제작하는 사람", answer: "콘텐츠크리에이터", row: 10, col: 0 },
            { number: 7, clue: "드론을 조종하여 촬영, 배송 등 업무를 수행", answer: "드론조종사", row: 12, col: 4 },
            { number: 8, clue: "친환경 에너지를 연구하고 개발하는 전문가", answer: "신재생에너지전문가", row: 14, col: 0 },
            { number: 9, clue: "사용자 경험을 디자인하는 전문가", answer: "UX디자이너", row: 16, col: 4 },
            { number: 10, clue: "웹툰을 그리는 작가", answer: "웹툰작가", row: 18, col: 0 }
        ],
        down: [
            { number: 1, clue: "클라우드 시스템을 구축하고 관리하는 전문가", answer: "클라우드엔지니어", row: 0, col: 0 },
            { number: 2, clue: "3D 모델링을 전문적으로 하는 사람", answer: "3D모델러", row: 2, col: 6 },
            { number: 3, clue: "스마트팜 기술을 연구하는 전문가", answer: "스마트팜전문가", row: 4, col: 4 },
            { number: 4, clue: "개인 맞춤형 영양 컨설팅을 제공하는 사람", answer: "맞춤형영양사", row: 6, col: 2 },
            { number: 5, clue: "자율주행 자동차 기술을 개발하는 전문가", answer: "자율주행차개발자", row: 8, col: 8 },
            { number: 6, clue: "유전자를 분석하고 질병을 예방하는 전문가", answer: "유전체분석가", row: 10, col: 0 },
            { number: 7, clue: "블록체인 기술을 활용한 서비스를 만드는 전문가", answer: "블록체인개발자", row: 12, col: 4 },
            { number: 8, clue: "메타버스 공간을 기획하고 만드는 사람", answer: "메타버스플래너", row: 14, col: 6 },
            { number: 9, clue: "데이터를 시각화하여 정보 전달을 돕는 전문가", answer: "데이터시각화전문가", row: 16, col: 2 },
            { number: 10, clue: "신약 개발을 연구하는 전문가", answer: "바이오제약연구원", row: 18, col: 0 }
        ]
    };

    const boardSize = 20;
    const board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));

    function createBoard() {
        // 퍼즐 보드 데이터 채우기
        puzzles.across.forEach(p => {
            for (let i = 0; i < p.answer.length; i++) {
                if (!board[p.row][p.col + i]) {
                    board[p.row][p.col + i] = { letter: p.answer[i], clues: [] };
                }
                board[p.row][p.col + i].clues.push({ type: 'across', number: p.number });
            }
        });

        puzzles.down.forEach(p => {
            for (let i = 0; i < p.answer.length; i++) {
                if (!board[p.row + i][p.col]) {
                    board[p.row + i][p.col] = { letter: p.answer[i], clues: [] };
                }
                board[p.row + i][p.col].clues.push({ type: 'down', number: p.number });
            }
        });

        // HTML 보드 생성
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                if (board[row][col]) {
                    cell.classList.add('filled');
                    const input = document.createElement('input');
                    input.setAttribute('type', 'text');
                    input.setAttribute('maxlength', '1');
                    input.dataset.row = row;
                    input.dataset.col = col;
                    cell.appendChild(input);

                    // 번호 표시
                    const numberSpan = document.createElement('span');
                    numberSpan.classList.add('number');

                    const acrossClue = board[row][col].clues.find(c => c.type === 'across');
                    const downClue = board[row][col].clues.find(c => c.type === 'down');

                    if (acrossClue && (acrossClue.row === row && acrossClue.col === col)) {
                         numberSpan.textContent = acrossClue.number;
                         numberSpan.classList.add('across');
                         cell.appendChild(numberSpan);
                    }
                    if (downClue && (downClue.row === row && downClue.col === col)) {
                        numberSpan.textContent = downClue.number;
                        numberSpan.classList.add('down');
                        cell.appendChild(numberSpan);
                    }
                    // 두 번호가 같은 칸에 있는 경우
                    if (acrossClue && downClue && acrossClue.number === downClue.number) {
                        numberSpan.textContent = acrossClue.number;
                        numberSpan.classList.add('across', 'down');
                    }
                }
                grid.appendChild(cell);
            }
        }
    }

    function displayClues() {
        puzzles.across.forEach(p => {
            const li = document.createElement('li');
            li.textContent = `${p.number}. ${p.clue}`;
            acrossCluesList.appendChild(li);
        });

        puzzles.down.forEach(p => {
            const li = document.createElement('li');
            li.textContent = `${p.number}. ${p.clue}`;
            downCluesList.appendChild(li);
        });
    }

    function checkAnswers() {
        let allCorrect = true;
        
        // 정답 초기화
        document.querySelectorAll('.cell.filled input').forEach(input => {
            input.parentElement.classList.remove('correct', 'incorrect');
        });

        // 가로 문제 확인
        puzzles.across.forEach(p => {
            let userSolution = '';
            for (let i = 0; i < p.answer.length; i++) {
                const input = document.querySelector(`[data-row='${p.row}'][data-col='${p.col + i}']`);
                userSolution += input ? input.value.toUpperCase() : '';
            }
            if (userSolution !== p.answer.toUpperCase()) {
                allCorrect = false;
                for (let i = 0; i < p.answer.length; i++) {
                    const input = document.querySelector(`[data-row='${p.row}'][data-col='${p.col + i}']`);
                    if (input && input.value.toUpperCase() !== p.answer[i].toUpperCase()) {
                        input.parentElement.classList.add('incorrect');
                    }
                }
            } else {
                 for (let i = 0; i < p.answer.length; i++) {
                    const input = document.querySelector(`[data-row='${p.row}'][data-col='${p.col + i}']`);
                    if (input) {
                        input.parentElement.classList.add('correct');
                    }
                }
            }
        });

        // 세로 문제 확인
        puzzles.down.forEach(p => {
            let userSolution = '';
            for (let i = 0; i < p.answer.length; i++) {
                const input = document.querySelector(`[data-row='${p.row + i}'][data-col='${p.col}']`);
                userSolution += input ? input.value.toUpperCase() : '';
            }
            if (userSolution !== p.answer.toUpperCase()) {
                allCorrect = false;
                for (let i = 0; i < p.answer.length; i++) {
                    const input = document.querySelector(`[data-row='${p.row + i}'][data-col='${p.col}']`);
                    if (input && input.value.toUpperCase() !== p.answer[i].toUpperCase()) {
                        input.parentElement.classList.add('incorrect');
                    }
                }
            } else {
                for (let i = 0; i < p.answer.length; i++) {
                    const input = document.querySelector(`[data-row='${p.row + i}'][data-col='${p.col}']`);
                    if (input) {
                        input.parentElement.classList.add('correct');
                    }
                }
            }
        });

        if (allCorrect) {
            messages.textContent = "🎉 다 맞추셨습니다. 축하합니다! 🎉";
            messages.style.color = "green";
        } else {
            messages.textContent = "🤔 틀린 곳이 있습니다. 다시 풀어보세요.";
            messages.style.color = "red";
        }
    }

    createBoard();
    displayClues();
    checkButton.addEventListener('click', checkAnswers);
});
