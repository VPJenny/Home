const downloadBtn = document.getElementById("downloadBtn");
const downloadPopup = document.getElementById("downloadPopup");
const downloadClose = document.getElementById("downloadClose");

if (downloadBtn && downloadPopup) {
    downloadBtn.addEventListener("click", function (event) {
        event.preventDefault();
        downloadPopup.classList.add("active");
    });
}

if (downloadClose && downloadPopup) {
    downloadClose.addEventListener("click", function () {
        downloadPopup.classList.remove("active");
    });
}

if (downloadPopup) {
    downloadPopup.addEventListener("click", function (event) {
        if (event.target === downloadPopup) {
            downloadPopup.classList.remove("active");
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && downloadPopup) {
        downloadPopup.classList.remove("active");
    }
});

const rulesBtn =
    document.getElementById("rulesBtn");
const rulesPopup =
    document.getElementById("rulesPopup");
const rulesClose =
    document.getElementById("rulesClose");

if (rulesBtn && rulesPopup) {
    rulesBtn.addEventListener(
        "click",
        function (event) {
            event.preventDefault();
            rulesPopup.classList.add("active");
        }
    );
}

if (rulesClose && rulesPopup) {
    rulesClose.addEventListener(
        "click",
        function () {
            rulesPopup.classList.remove("active");
        }
    );
}

if (rulesPopup) {
    rulesPopup.addEventListener(
        "click",
        function (event) {
            if (event.target === rulesPopup) {
                rulesPopup.classList.remove("active");
            }
        }
    );
}

document.addEventListener(
    "keydown",
    function (event) {
        if (
            event.key === "Escape" &&
            rulesPopup
        ) {
            rulesPopup.classList.remove("active");
        }
    }
);

const joinBtn = document.getElementById("joinBtn");
const joinPopup = document.getElementById("joinPopup");
const joinClose = document.getElementById("joinClose");

if (joinBtn && joinPopup) {
    joinBtn.addEventListener(
        "click",
        function (event) {
            event.preventDefault();
            joinPopup.classList.add("active");
        }
    );
}

if (joinClose && joinPopup) {
    joinClose.addEventListener(
        "click",
        function () {
            joinPopup.classList.remove("active");
        }
    );
}

if (joinPopup) {
    joinPopup.addEventListener(
        "click",
        function (event) {
            if (event.target === joinPopup) {
                joinPopup.classList.remove("active");
            }
        }
    );
}

document.addEventListener(
    "keydown",
    function (event) {
        if (
            event.key === "Escape" &&
            joinPopup
        ) {
            joinPopup.classList.remove("active");
        }
    }
);

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
let currentHeroSlide = 0;
let heroTimer = null;

function setHeroHeight() {
    const heroSlider = document.querySelector(".hero-slider");
    if (!heroSlider) return;
    const activeSlide =
        document.querySelector(".hero-slide.active");
    if (!activeSlide) return;
    const image =
        activeSlide.querySelector("img");
    if (!image) return;
    function updateHeight() {
        const imageHeight = image.offsetHeight;
        if (imageHeight > 0) {
            heroSlider.style.height =
                imageHeight + "px";
        }
    }
    if (image.complete) {
        updateHeight();
    } else {
        image.addEventListener(
            "load",
            updateHeight,
            { once: true }
        );
    }
}

function showHeroSlide(index) {
    if (heroSlides.length === 0) return;
    heroSlides.forEach(function (slide) {
        slide.classList.remove("active");
    });
    heroDots.forEach(function (dot) {
        dot.classList.remove("active");
    });
    heroSlides[index].classList.add("active");
    if (heroDots[index]) {
        heroDots[index].classList.add("active");
    }
    currentHeroSlide = index;
    setHeroHeight();
}

function nextHeroSlide() {
    if (heroSlides.length === 0) return;
    let nextSlide =
        currentHeroSlide + 1;
    if (nextSlide >= heroSlides.length) {
        nextSlide = 0;
    }
    showHeroSlide(nextSlide);
}

function startHeroSlider() {
    if (heroSlides.length <= 1) return;
    clearInterval(heroTimer);
    heroTimer = setInterval(function () {
        nextHeroSlide();
    }, 5000);
}

heroDots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
        showHeroSlide(index);
        // RESET TIMER
        clearInterval(heroTimer);
        startHeroSlider();
    });
});

window.addEventListener("resize", function () {
    setHeroHeight();
});

if (heroSlides.length > 0) {
    showHeroSlide(0);
    startHeroSlider();
}

// ==================================================
// GOLD RAIN EFFECT
// ==================================================

const rainCanvas = document.getElementById("rainCanvas");

if (rainCanvas) {

    const ctx = rainCanvas.getContext("2d");

    let rainDrops = [];
    let rainAnimation;


    // ==================================================
    // RESIZE CANVAS
    // ==================================================

    function resizeRainCanvas() {

        const dpr = window.devicePixelRatio || 1;

        rainCanvas.width =
            window.innerWidth * dpr;

        rainCanvas.height =
            window.innerHeight * dpr;

        rainCanvas.style.width =
            window.innerWidth + "px";

        rainCanvas.style.height =
            window.innerHeight + "px";

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        createRain();
    }


    // ==================================================
    // CREATE RAIN
    // ==================================================

    function createRain() {

        rainDrops = [];

        const screenWidth =
            window.innerWidth;

        let rainCount;

        if (screenWidth <= 600) {

            rainCount = 70;

        } else {

            rainCount = 120;

        }


        for (let i = 0; i < rainCount; i++) {

            rainDrops.push({

                x:
                    Math.random() *
                    window.innerWidth,

                y:
                    Math.random() *
                    window.innerHeight,

                length:
                    Math.random() * 12 + 6,

                speed:
                    Math.random() * 3 + 2,

                opacity:
                    Math.random() * 1 + 0.25,

                width:
                    Math.random() * 2 + 0.5

            });

        }

    }


    // ==================================================
    // DRAW RAIN
    // ==================================================

    function drawRain() {

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );


        rainDrops.forEach(function (drop) {

            ctx.beginPath();


            ctx.moveTo(
                drop.x,
                drop.y
            );


            ctx.lineTo(
                drop.x - 1.5,
                drop.y + drop.length
            );


            ctx.strokeStyle =
                `rgba(255, 213, 74, ${drop.opacity})`;


            ctx.lineWidth =
                drop.width;


            ctx.shadowBlur = 4;

            ctx.shadowColor =
                "rgba(255, 193, 7, 0.5)";


            ctx.stroke();


            // MOVE

            drop.y += drop.speed;


            // RESET

            if (
                drop.y >
                window.innerHeight
            ) {

                drop.y =
                    -drop.length;

                drop.x =
                    Math.random() *
                    window.innerWidth;

            }

        });


        ctx.shadowBlur = 0;


        rainAnimation =
            requestAnimationFrame(drawRain);

    }


    // ==================================================
    // START RAIN
    // ==================================================

    resizeRainCanvas();

    drawRain();


    // ==================================================
    // RESIZE
    // ==================================================

    window.addEventListener(
        "resize",
        resizeRainCanvas
    );

}