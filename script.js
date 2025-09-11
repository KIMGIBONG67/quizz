document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('crossword-grid');
    const messages = document.getElementById('messages');
    const acrossCluesList = document.getElementById('across-clues');
    const downCluesList = document.getElementById('down-clues');
    const checkButton = document.getElementById('check-button');

    const boardSize = 12;

    const puzzles = {
        across: [
            { number: 1, clue: "인터넷과 디지털 기기를 활용해 장소에 구애받지 않고 일하는 사람. 5자, answer: "디지털노마드", row: 0, col: 0 },
            { number: 2, clue: "인공지능(AI) 관련 소프트웨어, 모델, 알고리즘을 개발하는 전문가. 7자", answer: "인공지능개발자", row: 2, col: 0 },
            { number: 3, clue: "박물관, 유적지, 문화재, 전통 행사 등에서 방문객에게 문화와 역사에 대해 설명하고 안내하는 전문가. 5자", answer: "문화해설자", row: 4, col: 1 },
            { number: 4, clue: "기업이나 기관에서 생산, 공사, 운영 등에 필요한 자재를 계획, 구매, 보관, 배분, 재고 관리하는 업무. 4자", answer: "자재관리", row: 6, col: 0 },
            { number: 5, clue: "손님의 주문에 맞춰 커피를 만드는 사람. 4자", answer: "바리스타", row: 8, col: 2 },
            { number: 6, clue: "자동차, 항공기 등 교통수단의 안전성을 테스트하기 위해 사용하는 인체 모형. 4자", answer: "충돌더미" , row: 10, col: 0 },
            { number: 7, clue: "자신의 블로그를 운영하며 콘텐츠를 제작, 게시하고 관리하는 사람. 3자", answer: "블로거", row: 11, col: 5 },
            { number: 8, clue: "동물원, 수족관, 농장 등에서 동물을 돌보고 관리하는 전문가. 3자", answer: "사육사", row: 9, col: 7 },
            { number: 9, clue: "국가나 지방 공공 기관에서 일하는 사람. 3자", answer: "공무원", row: 7, col: 2 },
            { number: 10, clue: "기관, 단체, 학교, 재단 등의 이사회나 조직을 대표하고 총괄하는 최고 책임자. 3자", answer: "이사장", row: 5, col: 7 }
        ],
        down: [
            { number: 1, clue: "시각, 제품, 공간, UI/UX 등 다양한 분야에서 디자인을 기획하고 실행하는 전문가. 6자", answer: "디자인전문가", row: 0, col: 0 },
            { number: 2, clue: "웹사이트나 웹 애플리케이션을 설계, 개발, 유지보수하는 전문가. 4자", answer: "웹개발자", row: 1, col: 4 },
            { number: 3, clue: "직업으로 게임을 하는 사람. 5자", answer: "프로게이머", row: 2, col: 7 },
            { number: 4, clue: "꽃과 식물을 재배하고 관리하며, 판매나 전시를 위해 준비하는 전문가. 5자", answer: "화훼재배사", row: 4, col: 1 },
            { number: 5, clue: "기업이나 기관의 사업장(오피스, 공장, 매장 등) 운영과 시설, 자원, 인력을 효율적으로 관리하는 업무. 5자", answer: "사업장관리", row: 3, col: 9 },
            { number: 6, clue: "학교나 교육기관에서 학생을 가르치고 교육활동을 수행하는 전문가. 2자", answer: "교원", row: 6, col: 4 },
            { number: 7, clue: "주류를 조제하고, 고객에게 음료를 제공하며, 술집·바·레스토랑에서 서비스하는 전문가. 3자", answer: "바텐더", row: 8, col: 2 },
            { number: 8, clue: "컴퓨터 프로그램을 작성하고, 소프트웨어나 애플리케이션 기능을 구현하는 전문가", answer: "코더", row: 1, col: 10 },
            { number: 9, clue: "음식의 조리, 메뉴 개발, 식재료 관리 등을 담당하며, 레스토랑이나 식당에서 요리를 만드는 전문가. 3자", answer: "요리사", row: 7, col: 7 },
            { number: 10, clue: "기계, 자동차, 항공기, 산업 장비 등의 상태를 점검하고 수리·유지보수하는 전문가. 3자", answer: "정비사", row: 5, col: 11 }
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
