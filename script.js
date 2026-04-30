document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. 모바일 사이드바 토글 로직 ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('open');
        });
    }
    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('open'); // 메뉴 클릭 시 사이드바 닫기
        });
    });

    // --- 2. 스크롤 네비게이션 하이라이트 ---
    const sections = document.querySelectorAll('section');
    const navLinksDesktop = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinksDesktop.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- 3. 에이전트 워크플로우 타이핑 효과 ---
    const typingContainer = document.getElementById('typing-container');
    const thoughts = [
        "> Initializing NEXTAI Thinker Agent...",
        "> Analyzing user requirements and architecture...",
        "> [OK] Blueprint generated.",
        "> Handing over to Builder Agent for codebase generation.",
        "> Resolving dependencies... Done.",
        "> Waiting for 신인철 엔지니어's Vibe check (Human-in-the-loop)..."
    ];

    let lineIdx = 0;
    let charIdx = 0;

    function typeEffect() {
        if (lineIdx < thoughts.length) {
            if (charIdx === 0) {
                const line = document.createElement('div');
                line.id = `line-${lineIdx}`;
                typingContainer.appendChild(line);
            }

            const currentLine = thoughts[lineIdx];
            const targetEl = document.getElementById(`line-${lineIdx}`);

            if (charIdx < currentLine.length) {
                targetEl.innerHTML += currentLine.charAt(charIdx);
                charIdx++;
                setTimeout(typeEffect, 30); // 타이핑 속도
            } else {
                lineIdx++;
                charIdx = 0;
                setTimeout(typeEffect, 700); // 줄바꿈 대기 시간
            }
        } else {
            // 커서 깜빡임 추가
            const cursor = document.createElement('span');
            cursor.innerHTML = '█';
            cursor.style.animation = 'blink 1s step-end infinite';
            typingContainer.appendChild(cursor);
        }
    }

    // 워크플로우 섹션이 화면에 보일 때 애니메이션 시작
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeEffect();
            observer.disconnect();
        }
    }, { threshold: 0.5 });

    const agentSection = document.getElementById('agentic-flow');
    if(agentSection) observer.observe(agentSection);
});

// 커서 깜빡임 애니메이션 CSS 동적 추가
const style = document.createElement('style');
style.innerHTML = `@keyframes blink { 50% { opacity: 0; } }`;
document.head.appendChild(style);