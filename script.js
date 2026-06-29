// 🖤 Save Goth Girl Program - Interactive JavaScript 🖤
// Cute & Gothic features to make the website come alive!

// ===== 0. CUTE BLACK CAT ANIMATION =====
function createBlackCat() {
    const cat = document.createElement('div');
    cat.textContent = '🐈‍⬛';
    cat.id = 'goth-cat';
    cat.style.cssText = `
        position: fixed;
        left: -50px;
        bottom: 100px;
        font-size: 3rem;
        cursor: pointer;
        z-index: 999;
        user-select: none;
        pointer-events: auto;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(cat);
    
    let catX = -50;
    let catY = window.innerHeight - 150;
    let direction = 1; // 1 for right, -1 for left
    let isWalking = true;
    
    // Cat walking animation
    function walkCat() {
        if (isWalking) {
            catX += direction * 2;
            
            // Change direction when reaching edges
            if (catX > window.innerWidth) {
                direction = -1;
            } else if (catX < -50) {
                direction = 1;
            }
            
            cat.style.left = catX + 'px';
            cat.style.bottom = catY + 'px';
            
            // Flip cat based on direction
            if (direction === -1) {
                cat.style.transform = 'scaleX(-1)';
            } else {
                cat.style.transform = 'scaleX(1)';
            }
        }
        
        requestAnimationFrame(walkCat);
    }
    
    walkCat();
    
    // Click anywhere to make cat jump there
    document.addEventListener('click', (e) => {
        isWalking = false;
        
        const clickX = e.clientX;
        const clickY = e.clientY;
        
        // Calculate distance and direction
        const distX = clickX - catX;
        const distY = clickY - catY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        // Flip cat if jumping left
        if (clickX < catX) {
            cat.style.transform = 'scaleX(-1)';
        } else {
            cat.style.transform = 'scaleX(1)';
        }
        
        // Jump animation
        cat.style.transition = `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)`;
        cat.style.left = clickX + 'px';
        cat.style.bottom = clickY + 'px';
        cat.style.fontSize = '4rem';
        
        catX = clickX;
        catY = clickY;
        
        // Add cute jump effect
        cat.style.animation = 'cat-jump 0.5s ease-out';
        
        // Meow sound effect (visual)
        showCatMeow(clickX, clickY);
        
        // Resume walking after 2 seconds
        setTimeout(() => {
            isWalking = true;
            cat.style.animation = 'none';
            cat.style.fontSize = '3rem';
            cat.style.transition = 'all 0.3s ease';
        }, 2000);
    });
    
    // Cat hover effect
    cat.addEventListener('mouseover', () => {
        cat.style.fontSize = '4rem';
        cat.textContent = '🐈‍⬛✨';
    });
    
    cat.addEventListener('mouseout', () => {
        cat.style.fontSize = '3rem';
        cat.textContent = '🐈‍⬛';
    });
}

// Show cute "meow" text when cat jumps
function showCatMeow(x, y) {
    const meows = ['meow 🖤', 'mew!', 'purr 💜', 'meoowww', '🐾'];
    const meow = document.createElement('div');
    meow.textContent = meows[Math.floor(Math.random() * meows.length)];
    meow.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 1.2rem;
        color: #d946a6;
        pointer-events: none;
        font-weight: bold;
        z-index: 998;
        animation: meow-float 2s ease-out forwards;
    `;
    
    document.body.appendChild(meow);
    setTimeout(() => meow.remove(), 2000);
}

// Add cat animations to style
const catAnimationStyle = document.createElement('style');
catAnimationStyle.textContent = `
    @keyframes cat-jump {
        0% {
            transform: translateY(0) scaleX(1);
            filter: drop-shadow(0 0 0px rgba(217, 70, 166, 0));
        }
        50% {
            transform: translateY(-30px) scaleX(1);
            filter: drop-shadow(0 0 15px rgba(217, 70, 166, 0.6));
        }
        100% {
            transform: translateY(0) scaleX(1);
            filter: drop-shadow(0 0 0px rgba(217, 70, 166, 0));
        }
    }
    
    @keyframes meow-float {
        0% {
            transform: translateY(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-40px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(catAnimationStyle);

// ===== 1. FLOATING GOTHIC ELEMENTS (Bats & Hearts) =====
function createFloatingElements() {
    const elements = ['🦇', '🖤', '🌙', '💜'];
    const container = document.body;
    
    setInterval(() => {
        const element = document.createElement('div');
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.position = 'fixed';
        element.style.left = Math.random() * window.innerWidth + 'px';
        element.style.top = '-20px';
        element.style.fontSize = Math.random() * 20 + 20 + 'px';
        element.style.opacity = '0.6';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '1';
        element.style.animation = 'float 8s linear forwards';
        
        container.appendChild(element);
        
        setTimeout(() => element.remove(), 8000);
    }, 1500);
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes glow {
        0%, 100% { text-shadow: 0 0 10px #d946a6; }
        50% { text-shadow: 0 0 20px #d946a6, 0 0 30px #8b5fbf; }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @keyframes typewriter {
        from { width: 0; }
        to { width: 100%; }
    }
    
    .goth-glow {
        animation: glow 2s ease-in-out infinite;
    }
    
    .goth-pulse {
        animation: pulse 1.5s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// ===== 2. GOTH GIRL QUOTE GENERATOR =====
const gothQuotes = [
    "🖤 Darkness isn't scary when you're the one wearing it.",
    "💜 Be a goth girl. Be unapologetically yourself.",
    "🌙 The night is our canvas, and we paint it black.",
    "🖤 They called us extinct. We called it fashion.",
    "💜 In a world of pastels, be the darkest shade.",
    "🌙 Goth girls save goth girls.",
    "🖤 Eyeliner on fleek, soul darker than the sky.",
    "💜 We're not depressed. We're just aesthetically honest.",
    "🖤 Goth culture: where melancholy meets beauty.",
    "🌙 Our darkness is our light.",
    "💜 Save a goth girl. Donate today.",
    "🖤 Black lipstick, blacker heart, brightest future.",
];

function generateGothQuote() {
    const quote = gothQuotes[Math.floor(Math.random() * gothQuotes.length)];
    
    // Create a cute popup
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #1a1a1a, #2a1a3a);
        border: 3px solid #d946a6;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 0 30px rgba(217, 70, 166, 0.5);
        z-index: 10000;
        max-width: 500px;
        text-align: center;
        color: #e0e0e0;
        font-size: 1.2rem;
        font-family: Georgia, serif;
        line-height: 1.8;
        animation: popup-appear 0.4s ease-out;
    `;
    
    popup.textContent = quote;
    document.body.appendChild(popup);
    
    // Add popup animation
    const popupStyle = document.createElement('style');
    popupStyle.textContent = `
        @keyframes popup-appear {
            from {
                transform: translate(-50%, -50%) scale(0.5);
                opacity: 0;
            }
            to {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(popupStyle);
    
    // Remove after 5 seconds
    setTimeout(() => {
        popup.style.animation = 'popup-appear 0.4s ease-out reverse';
        setTimeout(() => popup.remove(), 400);
    }, 5000);
}

// Add quote button to page
function addQuoteButton() {
    const button = document.createElement('button');
    button.textContent = '💜 Goth Wisdom 💜';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #d946a6;
        color: white;
        border: none;
        padding: 12px 20px;
        font-size: 1rem;
        border-radius: 25px;
        cursor: pointer;
        z-index: 9999;
        font-weight: bold;
        transition: all 0.3s ease;
        box-shadow: 0 0 15px rgba(217, 70, 166, 0.4);
    `;
    
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 0 25px rgba(217, 70, 166, 0.8)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 0 15px rgba(217, 70, 166, 0.4)';
    });
    
    button.addEventListener('click', generateGothQuote);
    document.body.appendChild(button);
}

// ===== 3. CUTE HOVER EFFECTS ON CARDS =====
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.about-card, .idea-card, .bgf-card, .founder-card, .donation-content');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== 4. GLOW EFFECT ON HEADINGS =====
function addHeadingGlows() {
    const headings = document.querySelectorAll('h1, h2, h3');
    
    headings.forEach(heading => {
        heading.classList.add('goth-glow');
    });
}

// ===== 5. CUTE HEART TRAIL (Follow cursor) =====
function createHeartTrail() {
    document.addEventListener('mousemove', (e) => {
        // Only create hearts occasionally to avoid lag
        if (Math.random() > 0.8) {
            const heart = document.createElement('div');
            heart.textContent = '💜';
            heart.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                pointer-events: none;
                font-size: 1.5rem;
                opacity: 0.7;
                z-index: 5;
            `;
            
            document.body.appendChild(heart);
            
            // Animate heart falling
            let opacity = 0.7;
            let top = e.clientY;
            const interval = setInterval(() => {
                opacity -= 0.05;
                top += 2;
                heart.style.opacity = opacity;
                heart.style.top = top + 'px';
                
                if (opacity <= 0) {
                    clearInterval(interval);
                    heart.remove();
                }
            }, 30);
        }
    });
}

// ===== 6. EASTER EGG: GOTH GIRL COUNTER =====
let gothGirlsSaved = 0;

function addGothGirlCounter() {
    // Add hidden button in header
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.style.transition = 'all 0.3s ease';
        
        logo.addEventListener('click', () => {
            gothGirlsSaved++;
            
            // Show celebration popup
            const celebrate = document.createElement('div');
            celebrate.textContent = `🖤 ${gothGirlsSaved} Goth Girls Saved! 🖤`;
            celebrate.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #d946a6;
                color: white;
                padding: 2rem;
                border-radius: 10px;
                font-size: 1.5rem;
                font-weight: bold;
                z-index: 9998;
                box-shadow: 0 0 30px rgba(217, 70, 166, 0.8);
            `;
            
            document.body.appendChild(celebrate);
            
            setTimeout(() => {
                celebrate.style.animation = 'float 2s ease-out forwards';
                setTimeout(() => celebrate.remove(), 2000);
            }, 1000);
        });
    }
}

// ===== 7. SMOOTH SCROLL EFFECT =====
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== 8. PAGE LOAD ANIMATION =====
function addPageLoadAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// ===== 9. CUTE ALERT FOR DONATIONS =====
function addDonationAlert() {
    const donateBtn = document.querySelector('.submit-button');
    if (donateBtn) {
        donateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const alert = document.createElement('div');
            alert.textContent = '💜 Thank you for supporting goth culture! You are a hero. 🖤';
            alert.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #d946a6, #8b5fbf);
                color: white;
                padding: 1.5rem 2rem;
                border-radius: 10px;
                font-weight: bold;
                z-index: 9998;
                box-shadow: 0 0 20px rgba(217, 70, 166, 0.6);
                animation: slideDown 0.5s ease-out;
            `;
            
            const slideStyle = document.createElement('style');
            slideStyle.textContent = `
                @keyframes slideDown {
                    from {
                        transform: translateX(-50%) translateY(-100px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(-50%) translateY(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(slideStyle);
            
            document.body.appendChild(alert);
            
            setTimeout(() => alert.remove(), 3000);
        });
    }
}

// ===== 10. KEYBOARD SHORTCUT: PRESS 'G' for Goth Wisdom =====
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'g') {
        generateGothQuote();
    }
});

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🖤 Save Goth Girl Program - JavaScript Activated! 🖤');
    
    createBlackCat();               // Cute black cat that walks and jumps!
    createFloatingElements();      // Floating bats, hearts, moons
    addQuoteButton();              // Cute quote generator button
    addCardHoverEffects();         // Smooth card hover effects
    addHeadingGlows();             // Glowing headings
    createHeartTrail();            // Heart trail following cursor
    addGothGirlCounter();          // Easter egg counter
    smoothScroll();                // Smooth scrolling
    addPageLoadAnimation();        // Page fade-in animation
    addDonationAlert();            // Donation confirmation
});

// ===== WELCOME MESSAGE =====
console.log(`
🖤🖤🖤 Welcome to Save Goth Girl Program 🖤🖤🖤
💜 Preserving goth culture, one website at a time 💜
🌙 Tip: Press 'G' for goth wisdom! 🌙
🖤 Click the SGGP logo to count saved goth girls! 🖤
`);
