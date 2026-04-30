document.addEventListener('DOMContentLoaded', () => {
    // ... 기존 코드 유지 ...

    // 사이드바 토글 로직 추가
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');

    // 햄버거 버튼 클릭 시 열기
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('open');
        });
    }

    // X 버튼 클릭 시 닫기
    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }

    // 메뉴 항목 클릭 시 사이드바 자동 닫기
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    });
});