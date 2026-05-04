// Shared functionality for the birthday website
console.log('Happy Birthday script loaded!');

// Page Transition Logic
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && !link.target && link.host === window.location.host) {
        e.preventDefault();
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location = link.href;
        }, 300);
    }
});

// Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const playButtons = document.querySelectorAll('.play-btn');
    const modal = document.getElementById('player-modal');
    const closeBtn = document.getElementById('close-modal');

    if (modal && closeBtn) {
        // Open modal when card is clicked
        const songCards = document.querySelectorAll('.song-card');
        songCards.forEach(card => {
            card.addEventListener('click', () => {
                const embedUrl = card.getAttribute('data-embed-url');
                const iframe = document.getElementById('modal-iframe');
                if (iframe && embedUrl) {
                    // Add autoplay=1 to the URL
                    // Spotify embeds use ? or & depending on existing params
                    const separator = embedUrl.includes('?') ? '&' : '?';
                    iframe.src = embedUrl + separator + 'autoplay=1';
                }
                modal.classList.add('active');
            });
        });

        const stopAudio = () => {
            const iframe = document.getElementById('modal-iframe');
            if (iframe) {
                iframe.src = '';
            }
        };

        // Close modal via button
        closeBtn.addEventListener('click', () => {
            stopAudio();
            modal.classList.remove('active');
        });

        // Close modal when clicking outside the card
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                stopAudio();
                modal.classList.remove('active');
            }
        });
    }

    // Friend Modal Logic
    const friendCards = document.querySelectorAll('.friend-card');
    const friendModal = document.getElementById('friend-modal');
    const closeFriendBtn = document.getElementById('close-friend-modal');

    if (friendCards.length > 0 && friendModal && closeFriendBtn) {
        friendCards.forEach(card => {
            card.addEventListener('click', () => {
                const name = card.querySelector('.friend-name').textContent;
                const imageSrc = card.querySelector('.friend-photo').src;
                const note = card.getAttribute('data-note');
                const signoff = card.getAttribute('data-signoff');

                document.getElementById('modal-friend-name').textContent = name;
                document.getElementById('modal-friend-photo').src = imageSrc;
                document.getElementById('modal-friend-note').textContent = note;
                document.getElementById('modal-friend-signoff').textContent = signoff;

                friendModal.classList.add('active');
            });
        });

        closeFriendBtn.addEventListener('click', () => {
            friendModal.classList.remove('active');
        });

        friendModal.addEventListener('click', (e) => {
            if (e.target === friendModal) {
                friendModal.classList.remove('active');
            }
        });
    }
});
