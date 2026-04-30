document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section, footer#cta");
    const ctaButton = document.getElementById("cta-button");
    const ctaFeedback = document.getElementById("cta-feedback");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("open");
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (mainNav) {
                mainNav.classList.remove("open");
            }
        });
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                const activeId = entry.target.getAttribute("id");
                navLinks.forEach((link) => {
                    const target = link.getAttribute("href");
                    link.classList.toggle("active", target === `#${activeId}`);
                });
            });
        },
        {
            root: null,
            rootMargin: "-35% 0px -50% 0px",
            threshold: 0.1
        }
    );

    sections.forEach((section) => observer.observe(section));

    if (ctaButton && ctaFeedback) {
        ctaButton.addEventListener("click", () => {
            ctaFeedback.textContent = "준비 중입니다. 곧 실제 구매 링크가 연결됩니다.";
            ctaButton.classList.add("clicked");
            setTimeout(() => {
                ctaButton.classList.remove("clicked");
            }, 250);
        });
    }
});