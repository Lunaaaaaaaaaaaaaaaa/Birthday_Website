"use strict";

/*
 * PERSONALISE THE SITE HERE.
 * Dates use YYYY-MM-DD. Leave videoUrl empty to show the heartfelt text surprise.
 */
const LOVE_CONFIG = {
    partnerName: "My Love",
    senderName: "Me",
    relationshipStart: "2024-01-01T00:00:00",
    birthdayMonthDay: "08-15",
    distanceKm: 1247,
    videoUrl: "",
    finalMessage: "I know we are far apart right now, but every day with you is still my favorite part of life. Happy Birthday, my love. No distance can change how much you mean to me. ❤️",
    surpriseMessage: "Close your eyes for a second. Imagine me holding you close, telling you how proud I am of you, and reminding you that this distance is only a chapter—not our whole story. I love you. I miss you. And I am counting down every day until the next hello.",
    reasons: [
        "You make my bad days feel lighter without even trying.",
        "You believe in me, especially when I forget how to believe in myself.",
        "Your smile makes every mile between us feel worth crossing.",
        "You turn ordinary conversations into the best part of my day.",
        "You understand the things I cannot always put into words.",
        "Your kindness shows up in a thousand quiet, beautiful ways.",
        "You make me laugh when I am trying very hard to be serious.",
        "With you, I never have to pretend to be anyone else.",
        "You make the future feel like somewhere I cannot wait to go.",
        "Even your weird little habits have become some of my favorite things.",
        "You choose us, with patience, courage, and your whole heart.",
        "Because in every version of this life, I would still look for you."
    ],
    letters: [
        {
            title: "Open when you miss me",
            label: "For the quiet nights",
            body: "If the distance feels especially heavy tonight, put your hand over your heart. Mine is beating under the same sky, choosing you in every moment between now and the next time I can hold you. You are never as alone as the miles pretend."
        },
        {
            title: "Open when you feel low",
            label: "For the difficult days",
            body: "You do not have to be strong every second. Rest. Breathe. Let today be messy if it needs to be. I see how hard you try, and I am endlessly proud of the person you are—even on the days when you cannot see it yourself."
        },
        {
            title: "Open when you need a smile",
            label: "For emergency happiness",
            body: "Please remember that somewhere in the world, I am probably replaying one of your ridiculous jokes and smiling at my phone like an idiot. Consider this your official reminder that you are cute, deeply loved, and legally required to smile now."
        },
        {
            title: "Open on your birthday",
            label: "For your new orbit",
            body: "Today the universe celebrates the day it got a little brighter. I hope this year is gentle with your heart, bold with your dreams, and full of reasons to laugh until it hurts. Happy Birthday to my favorite human."
        }
    ]
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function bindPersonalDetails() {
    $$('[data-partner-name]').forEach((node) => { node.textContent = LOVE_CONFIG.partnerName; });
    $$('[data-sender-name]').forEach((node) => { node.textContent = LOVE_CONFIG.senderName; });
    $('#final-message').textContent = LOVE_CONFIG.finalMessage;
    $('#surprise-message').textContent = LOVE_CONFIG.surpriseMessage;
    document.title = `Happy Birthday, ${LOVE_CONFIG.partnerName} · Our Little Universe`;
}

function enterUniverse() {
    const welcome = $('.welcome-screen');
    welcome.classList.add('is-leaving');
    document.body.classList.remove('is-locked');
    window.setTimeout(() => {
        welcome.hidden = true;
        $('#home').setAttribute('tabindex', '-1');
        $('#home').focus({ preventScroll: true });
    }, reducedMotion ? 0 : 800);
}

$('.enter-button').addEventListener('click', enterUniverse);

function getRelationshipDays() {
    const start = new Date(LOVE_CONFIG.relationshipStart);
    const elapsed = Date.now() - start.getTime();
    return Number.isFinite(elapsed) ? Math.max(0, Math.floor(elapsed / 86400000)) : 0;
}

function getNextBirthday() {
    const [month, day] = LOVE_CONFIG.birthdayMonthDay.split('-').map(Number);
    const now = new Date();
    let birthday = new Date(now.getFullYear(), month - 1, day, 0, 0, 0);
    if (birthday.getTime() <= now.getTime()) birthday = new Date(now.getFullYear() + 1, month - 1, day, 0, 0, 0);
    return birthday;
}

function updateTimeDetails() {
    const days = getRelationshipDays();
    $('#hero-days').textContent = days.toLocaleString();
    $('#days-together').textContent = days.toLocaleString();

    const start = new Date(LOVE_CONFIG.relationshipStart);
    if (Number.isFinite(start.getTime())) {
        $('#met-date').textContent = `Our story began ${start.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}`;
    }

    const difference = Math.max(0, getNextBirthday().getTime() - Date.now());
    const values = {
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference / 3600000) % 24),
        minutes: Math.floor((difference / 60000) % 60),
        seconds: Math.floor((difference / 1000) % 60)
    };

    $('#next-birthday-days').textContent = values.days.toLocaleString();
    $('#count-days').textContent = String(values.days).padStart(2, '0');
    $('#count-hours').textContent = String(values.hours).padStart(2, '0');
    $('#count-minutes').textContent = String(values.minutes).padStart(2, '0');
    $('#count-seconds').textContent = String(values.seconds).padStart(2, '0');
}

function animateDistance() {
    const node = $('#distance-value');
    const target = Math.max(0, Number(LOVE_CONFIG.distanceKm) || 0);
    if (reducedMotion) {
        node.textContent = target.toLocaleString();
        return;
    }
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = Math.round(target * eased).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

function setupReveals() {
    const items = $$('.reveal');
    if (reducedMotion || !('IntersectionObserver' in window)) {
        items.forEach((item) => item.classList.add('is-visible'));
        $('.timeline').classList.add('is-visible');
        animateDistance();
        return;
    }

    let distanceAnimated = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            if (entry.target.closest('.stat-grid') && !distanceAnimated) {
                distanceAnimated = true;
                animateDistance();
            }
            observer.unobserve(entry.target);
        });
    }, { threshold: .14, rootMargin: '0px 0px -40px' });

    items.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
        observer.observe(item);
    });

    const timelineObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            timelineObserver.disconnect();
        }
    }, { threshold: .08 });
    timelineObserver.observe($('.timeline'));
}

function setupScrollEffects() {
    const header = $('.site-header');
    const progress = $('.scroll-progress span');
    const sections = $$('main section[id]');
    const navLinks = $$('nav a');
    let ticking = false;

    const update = () => {
        const y = window.scrollY;
        const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        progress.style.transform = `scaleX(${Math.min(1, y / scrollable)})`;
        header.classList.toggle('is-scrolled', y > 40);

        let active = '';
        sections.forEach((section) => {
            if (section.offsetTop <= y + window.innerHeight * .38) active = section.id;
        });
        navLinks.forEach((link) => link.classList.toggle('is-active', link.hash === `#${active}`));
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });
    update();
}

function setupReasons() {
    const reasons = LOVE_CONFIG.reasons.length ? LOVE_CONFIG.reasons : ['You are you—and that is more than enough.'];
    const text = $('#reason-text');
    const current = $('#reason-current');
    const total = $('#reason-total');
    const bar = $('.reason-progress span');
    let index = 0;

    total.textContent = String(reasons.length).padStart(2, '0');
    text.textContent = reasons[0];

    $('#next-reason').addEventListener('click', () => {
        index = (index + 1) % reasons.length;
        text.classList.remove('is-changing');
        void text.offsetWidth;
        text.classList.add('is-changing');
        window.setTimeout(() => { text.textContent = reasons[index]; }, reducedMotion ? 0 : 250);
        current.textContent = String(index + 1).padStart(2, '0');
        bar.style.width = `${((index + 1) / reasons.length) * 100}%`;
    });
}

function setupLetters() {
    const grid = $('#letter-grid');
    const dialog = $('#letter-dialog');
    const title = $('#letter-dialog-title');
    const label = $('#letter-dialog-label');
    const body = $('#letter-dialog-body');

    LOVE_CONFIG.letters.forEach((letter, index) => {
        const button = document.createElement('button');
        button.className = 'letter-button reveal';
        button.type = 'button';
        button.setAttribute('aria-label', letter.title);
        button.innerHTML = `
            <span class="envelope" aria-hidden="true"><span class="seal">♥</span></span>
            <small>Letter ${String(index + 1).padStart(2, '0')}</small>
            <strong>${letter.title}</strong>
        `;
        button.addEventListener('click', () => {
            label.textContent = letter.label;
            title.textContent = letter.title;
            body.textContent = letter.body;
            dialog.showModal();
        });
        grid.appendChild(button);
    });

    $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
    });
}

function createConfetti() {
    const container = $('#confetti');
    const colors = ['#ffc1ce', '#e7c98f', '#9f87e8', '#f7eff2', '#d777a2'];
    container.replaceChildren();
    const amount = reducedMotion ? 20 : 70;
    for (let i = 0; i < amount; i += 1) {
        const piece = document.createElement('i');
        piece.className = 'confetti-piece';
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = colors[i % colors.length];
        piece.style.setProperty('--drift', `${(Math.random() - .5) * 240}px`);
        piece.style.setProperty('--spin', `${(Math.random() * 900 - 450)}deg`);
        piece.style.setProperty('--fall-time', `${2.5 + Math.random() * 2.5}s`);
        piece.style.setProperty('--fall-delay', `${Math.random() * .8}s`);
        container.appendChild(piece);
    }
    window.setTimeout(() => container.replaceChildren(), 6000);
}

function setupSurprise() {
    const dialog = $('#surprise-dialog');
    const wrap = $('#video-wrap');

    if (LOVE_CONFIG.videoUrl) {
        const video = document.createElement('video');
        video.controls = true;
        video.preload = 'metadata';
        video.playsInline = true;
        video.src = LOVE_CONFIG.videoUrl;
        wrap.appendChild(video);
        wrap.hidden = false;
    }

    $('#open-surprise').addEventListener('click', () => {
        createConfetti();
        dialog.showModal();
    });
    $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
        const video = $('video', wrap);
        if (video) video.pause();
    });
}

function setupAmbientSound() {
    const button = $('.sound-button');
    const label = $('.sound-label');
    let context;
    let master;
    let timer;
    let playing = false;
    let chordIndex = 0;
    const chords = [
        [220, 277.18, 329.63],
        [174.61, 220, 261.63],
        [196, 246.94, 293.66],
        [164.81, 207.65, 246.94]
    ];

    const playChord = () => {
        if (!context || !master || !playing) return;
        const now = context.currentTime;
        chords[chordIndex].forEach((frequency, noteIndex) => {
            const oscillator = context.createOscillator();
            const gain = context.createGain();
            oscillator.type = noteIndex === 0 ? 'sine' : 'triangle';
            oscillator.frequency.value = frequency / 2;
            oscillator.detune.value = noteIndex * 3;
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(noteIndex === 0 ? .055 : .022, now + 1.5);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 7.5);
            oscillator.connect(gain).connect(master);
            oscillator.start(now);
            oscillator.stop(now + 7.6);
        });
        chordIndex = (chordIndex + 1) % chords.length;
    };

    const start = async () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        if (!context) {
            context = new AudioContext();
            master = context.createGain();
            master.gain.value = .22;
            master.connect(context.destination);
        }
        await context.resume();
        playing = true;
        playChord();
        timer = window.setInterval(playChord, 6000);
        button.setAttribute('aria-pressed', 'true');
        button.setAttribute('aria-label', 'Pause background music');
        label.textContent = 'Sound on';
    };

    const stop = () => {
        playing = false;
        window.clearInterval(timer);
        if (master && context) {
            master.gain.cancelScheduledValues(context.currentTime);
            master.gain.setTargetAtTime(0.0001, context.currentTime, .25);
        }
        button.setAttribute('aria-pressed', 'false');
        button.setAttribute('aria-label', 'Play background music');
        label.textContent = 'Sound off';
    };

    button.addEventListener('click', () => {
        if (playing) stop();
        else {
            if (master && context) master.gain.setTargetAtTime(.22, context.currentTime, .15);
            start();
        }
    });
}

function setupStarCanvas() {
    const canvas = $('#star-canvas');
    const context = canvas.getContext('2d');
    if (!context) return;
    let stars = [];
    let frame = 0;

    const resize = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.round(window.innerWidth * ratio);
        canvas.height = Math.round(window.innerHeight * ratio);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        const count = window.innerWidth < 700 ? 35 : 65;
        stars = Array.from({ length: count }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 1.4 + .25,
            alpha: Math.random() * .55 + .18,
            speed: Math.random() * .08 + .015,
            phase: Math.random() * Math.PI * 2
        }));
    };

    const draw = () => {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        stars.forEach((star) => {
            const twinkle = reducedMotion ? 1 : .7 + Math.sin(frame * .018 + star.phase) * .3;
            context.beginPath();
            context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            context.fillStyle = `rgba(255, 235, 224, ${star.alpha * twinkle})`;
            context.fill();
            if (!reducedMotion) {
                star.y -= star.speed;
                if (star.y < -2) star.y = window.innerHeight + 2;
            }
        });
        frame += 1;
        if (!reducedMotion) requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize, { passive: true });
}

function setupPointerEffects() {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const glow = $('.cursor-glow');
    window.addEventListener('pointermove', (event) => {
        glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    }, { passive: true });

    $$('.tilt-card').forEach((card) => {
        card.addEventListener('pointermove', (event) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - .5;
            const y = (event.clientY - rect.top) / rect.height - .5;
            card.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg) translateY(-3px)`;
        });
        card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
}

bindPersonalDetails();
updateTimeDetails();
setupLetters();
setupReasons();
setupSurprise();
setupAmbientSound();
setupStarCanvas();
setupScrollEffects();
setupPointerEffects();
setupReveals();
window.setInterval(updateTimeDetails, 1000);
