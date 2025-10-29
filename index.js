// Statistik Timing
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // Durasi animasi (2 detik)
    let current = 0;
    const increment = target / (duration / 10); 

    const timer = setInterval(() => {
        current += increment;
        
        if (current < target) {
            // Tampilkan angka tanpa desimal
            element.textContent = Math.ceil(current); 
        } else {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 10);
}

// Mengumpulkan semua elemen yang perlu dihitung
const counterElements = document.querySelectorAll('.counter-card .stat-number, .profile-value.counter-value');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            // Hentikan observasi setelah animasi dimulai
            observer.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.8 // Animasi dimulai saat 80% elemen terlihat
});

// Amati setiap elemen penghitung
counterElements.forEach(element => {
    observer.observe(element);
});

// ================

// Tugas dan Pelayanan
document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Fungsi untuk menampilkan tab yang dipilih
    function showTab(tabId) {
        // Hapus kelas 'active' dari semua link dan pane
        tabLinks.forEach(link => link.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Tambahkan kelas 'active' pada link yang diklik
        const activeLink = document.querySelector(`.tab-link[data-tab="${tabId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Tampilkan tab pane yang sesuai
        const activePane = document.getElementById(tabId);
        if (activePane) {
            activePane.classList.add('active');
        }
    }

    // Tambahkan event listener pada setiap link tab
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });

    // Set tab default (misalnya, jika URL memiliki hash)
    const initialTab = window.location.hash.substring(1) || 'audio';
    showTab(initialTab);
});