/* =========================================================
   BIZPILOT AI — LANDING PAGE
   main.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn = document.querySelector(".landing-menu-btn");
    const navigation = document.querySelector(".landing-navigation");
    const navActions = document.querySelector(".landing-nav-actions");

    if (menuBtn && navigation) {

        menuBtn.addEventListener("click", () => {

            const isOpen =
                navigation.classList.contains("mobile-open");

            navigation.classList.toggle("mobile-open");

            if (navActions) {
                navActions.classList.toggle("mobile-open");
            }

            menuBtn.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICK
    ===================================================== */

    const navLinks = document.querySelectorAll(
        ".landing-navigation a"
    );

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navigation?.classList.remove("mobile-open");

            navActions?.classList.remove("mobile-open");

            menuBtn?.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const landingHeader =
        document.querySelector(".landing-header");

    if (landingHeader) {

        const updateHeader = () => {

            if (window.scrollY > 20) {

                landingHeader.classList.add(
                    "landing-header-scrolled"
                );

            } else {

                landingHeader.classList.remove(
                    "landing-header-scrolled"
                );

            }

        };

        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

    }


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", event => {

        if (
            !navigation ||
            !menuBtn ||
            !navigation.classList.contains("mobile-open")
        ) {
            return;
        }

        const clickedInsideMenu =
            navigation.contains(event.target);

        const clickedButton =
            menuBtn.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedButton
        ) {

            navigation.classList.remove(
                "mobile-open"
            );

            navActions?.classList.remove(
                "mobile-open"
            );

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =====================================================
       ESC KEY — CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            navigation?.classList.remove(
                "mobile-open"
            );

            navActions?.classList.remove(
                "mobile-open"
            );

            menuBtn?.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );

});

const dashboardMenuBtn =
    document.getElementById("dashboardMenuBtn");

const dashboardSidebar =
    document.getElementById("dashboardSidebar");

if (dashboardMenuBtn && dashboardSidebar) {

    dashboardMenuBtn.addEventListener("click", () => {

        dashboardSidebar.classList.toggle(
            "mobile-open"
        );

    });

}

/* =========================================================
   PREMIUM UPGRADE — SCROLL REVEAL ANIMATION
========================================================= */

const revealEls = document.querySelectorAll("[data-reveal]");

if (revealEls.length) {

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));

}


/* =========================================================
   PREMIUM UPGRADE — DARK MODE TOGGLE
========================================================= */

const themeToggleBtn = document.getElementById("themeToggleBtn");

function applyStoredTheme() {
    const savedTheme = localStorage.getItem("bizpilot-theme");
    if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    }
}

applyStoredTheme();

if (themeToggleBtn) {

    themeToggleBtn.addEventListener("click", () => {

        const isDark =
            document.documentElement.getAttribute("data-theme") === "dark";

        if (isDark) {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("bizpilot-theme", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("bizpilot-theme", "dark");
        }

    });

}


/* =========================================================
   LANDING PAGE MOBILE MENU
========================================================= */

const landingMenuBtn = document.getElementById("landingMenuBtn");
const landingNavigation = document.querySelector(".landing-navigation");

if (landingMenuBtn && landingNavigation) {
    landingMenuBtn.addEventListener("click", () => {
        const opened = landingNavigation.classList.toggle("mobile-active");
        landingMenuBtn.textContent = opened ? "✕" : "☰";
        landingMenuBtn.setAttribute("aria-label", opened ? "Close navigation" : "Open navigation");
    });

    landingNavigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            landingNavigation.classList.remove("mobile-active");
            landingMenuBtn.textContent = "☰";
            landingMenuBtn.setAttribute("aria-label", "Open navigation");
        });
    });
}


/* =========================================================
   MOBILE MENU FINAL FALLBACK
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("landingMenuBtn");
    const navMenu = document.querySelector(".landing-navigation");

    if (!menuBtn || !navMenu) return;

    menuBtn.onclick = function (event) {
        event.preventDefault();
        navMenu.classList.toggle("mobile-active");

        const isOpen = navMenu.classList.contains("mobile-active");
        menuBtn.textContent = isOpen ? "✕" : "☰";
        menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };

    navMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navMenu.classList.remove("mobile-active");
            menuBtn.textContent = "☰";
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
});
