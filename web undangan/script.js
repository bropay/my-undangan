// script.js - Premium Wedding Invitation dengan Autoplay Optimal

// ==================== DAFTAR LAGU DARI FOLDER LOKAL ====================
// Pastikan file MP3 ada di folder "music/" dengan nama: wedding-music.mp3
const weddingSongs = [
    {
        title: "Bulbul Al-Afrah - Taqsim",
        url: "music/wedding-music.mp3",
    }
];

const FALLBACK_URL = "music/wedding-music.mp3";

// ==================== NAVBAR ====================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ==================== COUNTDOWN ====================
// TANGGAL: 11 April 2026, Pukul 10.00 WIB
const weddingDate = new Date(2026, 3, 11, 10, 0, 0).getTime();

function formatNumber(num) {
    return num < 10 ? '0' + num : num;
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        
        const countdownTitle = document.querySelector('.countdown-section .section-title');
        if (countdownTitle) {
            countdownTitle.innerHTML = "Acara Telah Berlangsung";
        }
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = formatNumber(days);
    document.getElementById("hours").innerHTML = formatNumber(hours);
    document.getElementById("minutes").innerHTML = formatNumber(minutes);
    document.getElementById("seconds").innerHTML = formatNumber(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ==================== WISHES SYSTEM ====================
const wishForm = document.getElementById('wishForm');
const wishListContainer = document.querySelector('.wish-list');
const STORAGE_KEY = 'wedding_wishes_fadhil_atikah_2026';

function loadWishes() {
    const storedWishes = localStorage.getItem(STORAGE_KEY);
    return storedWishes ? JSON.parse(storedWishes) : [];
}

function saveWishes(wishes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
}

function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function displayWishes() {
    const wishes = loadWishes();
    wishListContainer.innerHTML = '';

    if (wishes.length === 0) {
        wishListContainer.innerHTML = '<div class="wish-item" style="text-align: center;">✨ Belum ada ucapan. Jadilah yang pertama! ✨</div>';
        return;
    }

    wishes.slice().reverse().forEach((wish, index) => {
        const wishItem = document.createElement('div');
        wishItem.className = 'wish-item';
        
        wishItem.innerHTML = `
            <div class="wish-name">${escapeHTML(wish.name)}</div>
            <div class="wish-text">${escapeHTML(wish.message)}</div>
            <small>${wish.date || ''}</small>
            <button onclick="deleteWish(${wishes.length - 1 - index})" class="delete-btn">
                <i class="fas fa-trash"></i> Hapus
            </button>
        `;
        
        wishListContainer.appendChild(wishItem);
    });
}

function addWish(name, message) {
    if (!name.trim() || !message.trim()) {
        alert('Nama dan ucapan tidak boleh kosong!');
        return false;
    }
    
    const wishes = loadWishes();
    
    const today = new Date();
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const formattedDate = today.toLocaleDateString('id-ID', options);
    
    wishes.push({
        name: name.trim(),
        message: message.trim(),
        date: formattedDate
    });
    
    saveWishes(wishes);
    displayWishes();
    
    return true;
}

window.deleteWish = function(index) {
    if (confirm('Apakah Anda yakin ingin menghapus ucapan ini?')) {
        const wishes = loadWishes();
        wishes.splice(index, 1);
        saveWishes(wishes);
        displayWishes();
    }
};

if (wishForm) {
    wishForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('wishName').value;
        const message = document.getElementById('wishMessage').value;
        
        if (addWish(name, message)) {
            wishForm.reset();
            
            const submitBtn = document.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
            }, 2000);
        }
    });
}

displayWishes();

// ==================== SCROLL REVEAL ====================
const sections = document.querySelectorAll('section');

function checkVisibility() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', checkVisibility);
checkVisibility();

// ==================== MUSIC PLAYER DENGAN AUTOPLAY ====================
let currentSongIndex = 0;
const audio = document.getElementById('weddingAudio');
const musicToggle = document.getElementById('musicToggle');
const musicInfo = document.getElementById('musicInfo');
const musicPlayBtn = document.getElementById('musicPlayBtn');
const musicTitle = document.querySelector('.music-title');
const musicIcon = document.getElementById('musicIcon');

let isPlaying = false;
let isInfoVisible = false;
let autoPlayAttempted = false;
let userInteracted = false;

// Fungsi untuk memuat lagu
function loadSong(index) {
    let song;
    if (index < weddingSongs.length) {
        song = weddingSongs[index];
        audio.src = song.url;
        musicTitle.textContent = song.title;
    } else {
        audio.src = FALLBACK_URL;
        musicTitle.textContent = "Wedding Song";
    }
    
    audio.load();
    console.log('Loading song:', musicTitle.textContent);
}

// Fungsi untuk memutar musik
function playMusic() {
    if (isPlaying) return;
    
    audio.volume = 0.4;
    
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            isPlaying = true;
            musicPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
            musicToggle.classList.add('playing');
            if (musicIcon) musicIcon.style.opacity = '0';
            console.log('✅ Music playing');
        }).catch(error => {
            console.log('Play failed:', error);
            isPlaying = false;
            musicPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
            musicToggle.classList.remove('playing');
            if (musicIcon) musicIcon.style.opacity = '1';
        });
    }
}

// Fungsi untuk pause musik
function pauseMusic() {
    if (!isPlaying) return;
    
    audio.pause();
    isPlaying = false;
    musicPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
    musicToggle.classList.remove('playing');
    if (musicIcon) musicIcon.style.opacity = '1';
}

// Fungsi toggle play/pause
function togglePlay() {
    if (audio.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
}

// ==================== AUTOPLAY STRATEGY ====================
// Strategi 1: Coba autoplay saat halaman dimuat
function attemptAutoPlay() {
    if (autoPlayAttempted) return;
    autoPlayAttempted = true;
    
    console.log('Attempting autoplay...');
    
    audio.volume = 0.3;
    
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            isPlaying = true;
            musicPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
            musicToggle.classList.add('playing');
            if (musicIcon) musicIcon.style.opacity = '0';
            console.log('✅ Autoplay SUCCESS!');
            showNotification('🎵 Selamat datang, musik diputar otomatis');
        }).catch(error => {
            console.log('Autoplay BLOCKED by browser:', error);
            showNotification('🔊 Klik di mana saja untuk memutar musik');
            
            // Tunggu interaksi pengguna untuk memutar musik
            waitForUserInteraction();
        });
    }
}

// Menunggu interaksi pengguna untuk memutar musik
function waitForUserInteraction() {
    if (userInteracted) return;
    
    const playOnInteraction = () => {
        if (!isPlaying && !userInteracted) {
            userInteracted = true;
            console.log('User interacted, playing music...');
            playMusic();
            
            // Hapus event listeners setelah digunakan
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
            document.removeEventListener('scroll', playOnInteraction);
        }
    };
    
    document.addEventListener('click', playOnInteraction);
    document.addEventListener('touchstart', playOnInteraction);
    document.addEventListener('scroll', playOnInteraction, { once: true });
}

// Show notification
function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'music-notification';
    notif.innerHTML = message;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        if (notif && notif.remove) notif.remove();
    }, 3000);
}

// Event listeners untuk tombol musik
if (musicPlayBtn) {
    musicPlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
        userInteracted = true;
    });
}

if (musicToggle) {
    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        isInfoVisible = !isInfoVisible;
        if (musicInfo) musicInfo.classList.toggle('visible');
        userInteracted = true;
    });
}

// Error handling untuk audio
if (audio) {
    audio.addEventListener('error', (e) => {
        console.error('Audio error - File not found:', audio.src);
        showNotification('⚠️ File musik tidak ditemukan di folder music/');
        musicTitle.textContent = "Musik tidak ditemukan";
    });
    
    // Loop ketika lagu selesai
    audio.addEventListener('ended', () => {
        if (isPlaying) {
            audio.currentTime = 0;
            audio.play().catch(console.error);
        }
    });
    
    // Audio siap dimuat
    audio.addEventListener('canplaythrough', () => {
        console.log('Audio ready to play');
    });
}

// Load lagu pertama
loadSong(0);

// ==================== MULTIPLE AUTOPLAY TRIGGERS ====================
// Trigger 1: Saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        attemptAutoPlay();
    }, 300);
});

// Trigger 2: Saat window load
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!isPlaying && !autoPlayAttempted) {
            attemptAutoPlay();
        }
    }, 500);
});

// Trigger 3: Saat user scroll (jika autoplay gagal)
let scrollTriggered = false;
window.addEventListener('scroll', () => {
    if (!autoPlayAttempted && !scrollTriggered) {
        scrollTriggered = true;
        attemptAutoPlay();
    }
});

// Trigger 4: Saat user tap/click (fallback terakhir)
document.body.addEventListener('click', () => {
    if (!autoPlayAttempted) {
        attemptAutoPlay();
    }
}, { once: true });

document.body.addEventListener('touchstart', () => {
    if (!autoPlayAttempted) {
        attemptAutoPlay();
    }
}, { once: true });

// Keyboard shortcut (spasi)
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        togglePlay();
        userInteracted = true;
    }
});

// Volume control dengan scroll
if (musicInfo) {
    musicInfo.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        const newVolume = Math.max(0, Math.min(1, audio.volume + delta));
        audio.volume = newVolume;
        showNotification(`Volume ${Math.round(audio.volume * 100)}%`);
    });
}

// Simpan state
window.addEventListener('beforeunload', () => {
    if (audio && !isNaN(audio.currentTime)) {
        localStorage.setItem('weddingAudioTime', audio.currentTime);
    }
    localStorage.setItem('weddingAudioPlaying', isPlaying);
});

// Load state
window.addEventListener('load', () => {
    const savedTime = localStorage.getItem('weddingAudioTime');
    const wasPlaying = localStorage.getItem('weddingAudioPlaying') === 'true';
    
    if (savedTime && !isNaN(parseFloat(savedTime))) {
        audio.currentTime = parseFloat(savedTime);
    }
    
    if (wasPlaying && !autoPlayAttempted) {
        // Jika sebelumnya sedang diputar, coba autoplay
        setTimeout(() => attemptAutoPlay(), 200);
    }
});

// Tambahkan CSS untuk animasi
if (!document.querySelector('#dynamicStyles')) {
    const style = document.createElement('style');
    style.id = 'dynamicStyles';
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            to { opacity: 0; transform: translateY(10px); }
        }
        .music-instruction {
            animation: fadeInUp 0.3s ease, fadeOut 3s ease forwards 2s;
        }
    `;
    document.head.appendChild(style);
}