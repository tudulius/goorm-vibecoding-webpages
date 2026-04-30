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
            sidebar.classList.remove('open'); 
        });
    });

    // --- 2. 스크롤 네비게이션 하이라이트 및 탑 바 타이틀 연동 ---
    const sections = document.querySelectorAll('section');
    const navLinksDesktop = document.querySelectorAll('.nav-links a');
    const pageTitle = document.getElementById('current-page-title'); // 탑 바 텍스트

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // 탑 바 높이(70px)를 고려하여 계산
            if (pageYOffset >= (sectionTop - sectionHeight / 3 - 70)) {
                current = section.getAttribute('id');
            }
        });

        // 좌측 사이드바 활성화 상태 변경
        navLinksDesktop.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // 🌟 상단 탑 바 타이틀 텍스트 동적 변경
        let titleText = 'Home';
        if (current === 'philosophy') titleText = 'Philosophy';
        else if (current === 'value-prop') titleText = 'Value';
        else if (current === 'services') titleText = 'Services';
        else if (current === 'agentic-flow') titleText = 'Workflow';
        
        if (pageTitle) pageTitle.textContent = titleText;
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
                setTimeout(typeEffect, 30); 
            } else {
                lineIdx++;
                charIdx = 0;
                setTimeout(typeEffect, 700); 
            }
        } else {
            const cursor = document.createElement('span');
            cursor.innerHTML = '█';
            cursor.style.animation = 'blink 1s step-end infinite';
            typingContainer.appendChild(cursor);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeEffect();
            observer.disconnect();
        }
    }, { threshold: 0.5 });

    const agentSection = document.getElementById('agentic-flow');
    if(agentSection) observer.observe(agentSection);
});

const style = document.createElement('style');
style.innerHTML = `@keyframes blink { 50% { opacity: 0; } }`;
document.head.appendChild(style);