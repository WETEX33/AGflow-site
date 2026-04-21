/* AGflow - interactions site */

(function () {
    "use strict";

    /* ---- Animations au scroll ---- */
    const reveals = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up");

    if (reveals.length && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        reveals.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback : tout afficher
        reveals.forEach(function (el) {
            el.classList.add("active");
        });
    }

    /* ---- Navigation mobile ---- */
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("header nav");

    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            nav.classList.toggle("open");
            const isOpen = nav.classList.contains("open");
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        // Fermer au clic sur un lien
        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* ---- Bouton retour haut ---- */
    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {
        const toggleBtn = function () {
            if (window.scrollY > 400) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }
        };

        window.addEventListener("scroll", toggleBtn, { passive: true });
        toggleBtn();

        backToTop.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ---- Année dynamique footer ---- */
    const yearEl = document.querySelector(".footer-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
})();
