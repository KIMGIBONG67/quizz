const puzzle = [
    // 가로 (Across)
    { start: { row: 0, col: 0 }, direction: 'across', word: '인공지능전문가', clue: 'AI 기술을 개발하고 연구하는 사람', length: 7 },
    { start: { row: 2, col: 0 }, direction: 'across', word: '데이터사이언티스트', clue: '대량의 데이터를 분석하고 예측하는 전문가', length: 10 },
    { start: { row: 4, col: 1 }, direction: 'across', word: '사물인터넷개발자', clue: '스마트 기기 간의 연결을 만드는 개발자', length: 9 },
    { start: { row: 6, col: 0 }, direction: 'across', word: '메타버스기획자', clue: '가상 세계를 설계하고 콘텐츠를 기획하는 사람', length: 8 },
    { start: { row: 8, col: 0 }, direction: 'across', word: '드론조종사', clue: '무인 항공기를 운행하고 제어하는 전문가', length: 5 },
    { start: { row: 10, col: 1 }, direction: 'across', word: '웹툰작가', clue: '온라인 만화를 그리는 사람', length: 4 },
    { start: { row: 12, col: 0 }, direction: 'across', word: '스마트팜전문가', clue: '첨단 기술로 농장을 관리하는 사람', length: 8 },
    { start: { row: 14, col: 0 }, direction: 'across', word: '로봇공학자', clue: '로봇을 만들고 연구하는 사람', length: 5 },
    { start: { row: 16, col: 1 }, direction: 'across', word: '클라우드엔지니어', clue: '가상 서버 및 저장 공간을 관리하는 기술자', length: 9 },
    { start: { row: 18, col: 0 }, direction: 'across', word: '3D프린팅전문가', clue: '3차원 물체를 출력하는 기술자', length: 9 },
    
    // 세로 (Down)
    { start: { row: 0, col: 0 }, direction: 'down', word: '인플루언서', clue: 'SNS에서 영향력을 행사하는 사람', length: 5 },
    { start: { row: 0, col: 2 }, direction: 'down', word: '게임스트리머', clue: '온라인 게임 방송을 진행하는 사람', length: 6 },
    { start: { row: 0, col: 4 }, direction: 'down', word: '챗봇개발자', clue: '대화형 인공지능 프로그램을 만드는 사람', length: 5 },
    { start: { row: 0, col: 6 }, direction: 'down', word: 'UXUI디자이너', clue: '사용자가 편리하게 제품을 사용할 수 있도록 디자인하는 사람', length: 7 },
    { start: { row: 0, col: 8 }, direction: 'down', word: '블록체인개발자', clue: '분산원장기술을 활용한 시스템을 만드는 사람', length: 7 },
    { start: { row: 1, col: 10 }, direction: 'down', word: '에너지효율관리사', clue: '건물의 에너지 사용을 최적화하는 전문가', length: 8 },
    { start: { row: 3, col: 1 }, direction: 'down', word: '스마트시티전문가', clue: '도시의 문제 해결을 위해 기술을 적용하는 사람', length: 8 },
    { start: { row: 5, col: 3 }, direction: 'down', word: 'VRAR콘텐츠크리에이터', clue: '가상/증강 현실 콘텐츠를 만드는 사람', length: 11 },
    { start: { row: 7, col: 5 }, direction: 'down', word: '자율주행차개발자', clue: '스스로 운전하는 자동차를 만드는 사람', length: 8 },
    { start: { row: 9, col: 7 }, direction: 'down', word: '보안전문가', clue: '네트워크 및 시스템을 해킹으로부터 보호하는 사람', length: 5 },
];

const ROWS = 20;
const COLS = 20;
const board = Array(ROWS).fill(null).map(() => Array(COLS).fill(null));

function createQuizBoard() {
    const quizBoard = document.getElementById('quiz-board');
    if (!quizBoard) {
        console.error('quiz-board 요소를 찾을 수 없습니다.');
        return;
    }
    quizBoard.innerHTML = '';
    
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            quizBoard.appendChild(cell);
        }
    }
    
    const cluesAcross = document.createElement('div');
    cluesAcross.className = 'clues-list';
    cluesAcross.innerHTML = '<h3>가로</h3>';

    const cluesDown = document.createElement('div');
    cluesDown.className = 'clues-list';
    cluesDown.innerHTML = '<h3>세로</h3>';
    
    let acrossNumber = 1;
    let downNumber = 1;

    puzzle.forEach(item => {
        let { start: { row, col }, direction, word, clue } = item;
        
        const firstCell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        if (!firstCell) return;

        const numberSpan = document.createElement('span');
        numberSpan.className = 'clue-number';
        
        if (direction === 'across') {
            numberSpan.textContent = acrossNumber;
            numberSpan.classList.add('across');
            cluesAcross.innerHTML += `<p class="across-clue"><b>${acrossNumber}.</b> ${clue}</p>`;
            acrossNumber++;
        } else {
            numberSpan.textContent = downNumber;
            numberSpan.classList.add('down');
            cluesDown.innerHTML += `<p class="down-clue"><b>${downNumber}.</b> ${clue}</p>`;
            downNumber++;
        }

        firstCell.appendChild(numberSpan);

        if (direction === 'across') {
            for (let i = 0; i < word.length; i++) {
                const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col + i}"]`);
                if (cell) {
                    cell.classList.add('active');
                    board[row][col + i] = word[i];
                    cell.innerHTML = `${cell.innerHTML}<input type="text" maxlength="1" data-row="${row}" data-col="${col + i}">`;
                }
            }
        } else {
            for (let i = 0; i < word.length; i++) {
                const cell = document.querySelector(`.cell[data-row="${row + i}"][data-col="${col}"]`);
                if (cell) {
                    cell.classList.add('active');
                    board[row + i][col] = word[i];
                    cell.innerHTML = `${cell.innerHTML}<input type="text" maxlength="1" data-row="${row + i}" data-col="${col}">`;
                }
            }
        }
    });

    const cluesContainer = document.createElement('div');
    cluesContainer.className = 'clues-container';
    cluesContainer.appendChild(cluesAcross);
    cluesContainer.appendChild(cluesDown);
    quizBoard.parentNode.insertBefore(cluesContainer, quizBoard.nextSibling);
}

function checkAnswers() {
    let allCorrect = true;
    const message = document.getElementById('message');
    const allInputs = document.querySelectorAll('#quiz-board input');
    
    allInputs.forEach(input => {
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        const correctChar = board[row][col];
        const enteredChar = input.value.trim().toUpperCase();

        if (enteredChar !== correctChar) {
            allCorrect = false;
            input.parentElement.classList.add('wrong');
        } else {
            input.parentElement.classList.remove('wrong');
        }
    });

    if (allCorrect) {
        message.style.color = 'green';
        message.textContent = '다 맞추셨습니다. 축하합니다. 🎉';
    } else {
        message.style.color = 'red';
        message.textContent = '틀린 곳에 표시되었습니다. 다시 풀어보세요. 😥';
    }
}

function resetQuiz() {
    const allInputs = document.querySelectorAll('#quiz-board input');
    allInputs.forEach(input => {
        input.value = '';
        input.parentElement.classList.remove('wrong');
    });
    document.getElementById('message').textContent = '';
}

document.addEventListener('DOMContentLoaded', () => {
    createQuizBoard();
    
    window.checkAnswers = checkAnswers;
    window.resetQuiz = resetQuiz;
});
