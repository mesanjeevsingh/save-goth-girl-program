// 🖤 Save Goth Girl Program - Interactive JavaScript 🖤
// Cute & Gothic features to make the website come alive!

// ===== 0. CUTE BLACK CAT ANIMATION (Mobile Friendly) =====
function createBlackCat() {
    const cat = document.createElement('div');
    cat.textContent = '🐈‍⬛';
    cat.id = 'goth-cat';
    
    // Mobile check
    const isMobile = window.innerWidth < 768;
    const catSize = isMobile ? '2.5rem' : '3rem';
    const startBottom = isMobile ? '80px' : '100px';
    
    cat.style.cssText = `
        position: fixed;
        left: -50px;
        bottom: ${startBottom};
        font-size: ${catSize};
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
    
    // Handle both click and touch
    function makeCatJump(e) {
        // Get coordinates from either mouse or touch event
        let clickX, clickY;
        
        if (e.touches) {
            // Touch event
            clickX = e.touches[0].clientX;
            clickY = e.touches[0].clientY;
        } else {
            // Mouse event
            clickX = e.clientX;
            clickY = e.clientY;
        }
        
        isWalking = false;
        
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
        cat.style.fontSize = isMobile ? '3.5rem' : '4rem';
        
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
            cat.style.fontSize = catSize;
            cat.style.transition = 'all 0.3s ease';
        }, 2000);
    }
    
    // Both click and touch events
    document.addEventListener('click', makeCatJump);
    document.addEventListener('touchend', makeCatJump);
    
    // Cat hover/touch effect
    cat.addEventListener('mouseover', () => {
        cat.style.fontSize = isMobile ? '3.5rem' : '4rem';
        cat.textContent = '🐈‍⬛✨';
    });
    
    cat.addEventListener('mouseout', () => {
        cat.style.fontSize = catSize;
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

// ===== GOTH GIRL TAP GAME =====
function createGothTapGame() {
    // Game variables
    let score = 0;
    let combo = 0;
    let highScore = localStorage.getItem('gothGameHighScore') || 0;
    
    // Goth emojis with different point values
    const gothElements = [
        { emoji: '🐈‍⬛', points: 10, rarity: 'common', label: 'Cat' },
        { emoji: '🦇', points: 5, rarity: 'common', label: 'Bat' },
        { emoji: '🖤', points: 5, rarity: 'common', label: 'Heart' },
        { emoji: '💜', points: 5, rarity: 'common', label: 'Purple Heart' },
        { emoji: '🌙', points: 15, rarity: 'rare', label: 'Moon' },
        { emoji: '💀', points: 20, rarity: 'epic', label: 'Skull' },
        { emoji: '🕷️', points: 8, rarity: 'uncommon', label: 'Spider' },
        { emoji: '⚰️', points: 25, rarity: 'legendary', label: 'Coffin' },
        { emoji: '🔮', points: 30, rarity: 'legendary', label: 'Crystal Ball' },
        { emoji: '🌑', points: 12, rarity: 'uncommon', label: 'Dark Moon' },
    ];
    
    // Create game UI
    const gameContainer = document.createElement('div');
    gameContainer.id = 'goth-game-container';
    gameContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 500;
    `;
    document.body.appendChild(gameContainer);
    
    // Score display
    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'goth-score-display';
    scoreDisplay.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: linear-gradient(135deg, #d946a6, #8b5fbf);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 1.3rem;
        font-weight: bold;
        z-index: 501;
        box-shadow: 0 0 20px rgba(217, 70, 166, 0.6);
        font-family: Georgia, serif;
        pointer-events: auto;
        min-width: 150px;
        text-align: center;
    `;
    scoreDisplay.innerHTML = `
        <div style="font-size: 0.9rem; opacity: 0.9;">Score</div>
        <div style="font-size: 1.8rem;">${score}</div>
        <div style="font-size: 0.8rem; opacity: 0.8; margin-top: 5px;">Best: ${highScore}</div>
    `;
    document.body.appendChild(scoreDisplay);
    
    // Combo counter
    const comboDisplay = document.createElement('div');
    comboDisplay.id = 'goth-combo-display';
    comboDisplay.style.cssText = `
        position: fixed;
        top: 150px;
        left: 20px;
        color: #d946a6;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 501;
        font-family: Georgia, serif;
        text-shadow: 0 0 10px rgba(217, 70, 166, 0.5);
        display: none;
    `;
    comboDisplay.textContent = `🔥 Combo: ${combo}x`;
    document.body.appendChild(comboDisplay);
    
    // Milestone messages
    const milestones = {
        50: '🖤 Goth Girl Saved! 🖤',
        100: '💜 You Are A Legend! 💜',
        250: '🌙 Master of Darkness! 🌙',
        500: '⚰️ Goth Culture Guardian! ⚰️',
        1000: '🔮 You Have Ascended! 🔮',
    };
    
    function showMilestoneMessage(milestone) {
        const message = document.createElement('div');
        message.textContent = milestones[milestone];
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #d946a6, #8b5fbf);
            color: white;
            padding: 2rem 3rem;
            border-radius: 15px;
            font-size: 1.8rem;
            font-weight: bold;
            z-index: 9999;
            box-shadow: 0 0 40px rgba(217, 70, 166, 0.8);
            animation: milestone-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            text-align: center;
        `;
        
        document.body.appendChild(message);
        setTimeout(() => {
            message.style.animation = 'milestone-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) reverse';
            setTimeout(() => message.remove(), 400);
        }, 2000);
    }
    
    // Create tapable goth element
    function createTapElement() {
        const element = gothElements[Math.floor(Math.random() * gothElements.length)];
        const tapDiv = document.createElement('div');
        
        const x = Math.random() * (window.innerWidth - 80);
        const y = Math.random() * (window.innerHeight - 80);
        
        tapDiv.textContent = element.emoji;
        tapDiv.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 3rem;
            cursor: pointer;
            z-index: 510;
            user-select: none;
            animation: tap-appear 0.4s ease-out;
            filter: drop-shadow(0 0 5px rgba(217, 70, 166, 0.5));
            pointer-events: auto;
        `;
        
        // Add rarity glow
        if (element.rarity === 'rare') {
            tapDiv.style.filter = 'drop-shadow(0 0 10px #8b5fbf)';
        } else if (element.rarity === 'epic') {
            tapDiv.style.filter = 'drop-shadow(0 0 15px #d946a6)';
        } else if (element.rarity === 'legendary') {
            tapDiv.style.filter = 'drop-shadow(0 0 20px #FFD700)';
        }
        
        gameContainer.appendChild(tapDiv);
        
        // Click to tap
        tapDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Add points
            score += element.points * (1 + combo * 0.1); // Combo bonus
            combo++;
            
            // Update score display
            scoreDisplay.innerHTML = `
                <div style="font-size: 0.9rem; opacity: 0.9;">Score</div>
                <div style="font-size: 1.8rem;">${Math.floor(score)}</div>
                <div style="font-size: 0.8rem; opacity: 0.8; margin-top: 5px;">Best: ${highScore}</div>
            `;
            
            // Update combo display
            comboDisplay.style.display = 'block';
            comboDisplay.textContent = `🔥 Combo: ${combo}x`;
            
            // Update high score
            if (score > highScore) {
                highScore = Math.floor(score);
                localStorage.setItem('gothGameHighScore', highScore);
            }
            
            // Show point popup
            const pointsPopup = document.createElement('div');
            const pointValue = Math.floor(element.points * (1 + combo * 0.1));
            pointsPopup.textContent = `+${pointValue} 🖤`;
            pointsPopup.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                color: #d946a6;
                font-size: 1.5rem;
                font-weight: bold;
                pointer-events: none;
                z-index: 511;
                animation: points-float 1.5s ease-out forwards;
            `;
            
            document.body.appendChild(pointsPopup);
            setTimeout(() => pointsPopup.remove(), 1500);
            
            // Remove tapped element
            tapDiv.style.animation = 'tap-disappear 0.3s ease-out forwards';
            setTimeout(() => tapDiv.remove(), 300);
            
            // Check milestones
            Object.keys(milestones).forEach(milestone => {
                if (Math.floor(score) === parseInt(milestone)) {
                    showMilestoneMessage(milestone);
                }
            });
        });
        
        // Remove after 4 seconds if not tapped
        setTimeout(() => {
            if (tapDiv.parentNode) {
                tapDiv.style.animation = 'tap-disappear 0.3s ease-out forwards';
                setTimeout(() => tapDiv.remove(), 300);
            }
            combo = Math.max(0, combo - 1); // Decrease combo if missed
            if (combo === 0) {
                comboDisplay.style.display = 'none';
            }
        }, 4000);
    }
    
    // Spawn new elements every 1.5 seconds
    setInterval(createTapElement, 1500);
    
    // Initial spawn
    createTapElement();
}

// Add animations for tap game
const tapGameStyles = document.createElement('style');
tapGameStyles.textContent = `
    @keyframes tap-appear {
        from {
            transform: scale(0) rotate(-30deg);
            opacity: 0;
        }
        to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    }
    
    @keyframes tap-disappear {
        to {
            transform: scale(0) rotate(30deg);
            opacity: 0;
        }
    }
    
    @keyframes points-float {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-60px);
            opacity: 0;
        }
    }
    
    @keyframes milestone-pop {
        from {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
    
    #goth-score-display:hover {
        transform: scale(1.05);
        box-shadow: 0 0 30px rgba(217, 70, 166, 0.9);
    }
`;
document.head.appendChild(tapGameStyles);
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
    document.addEventListener('mousemove', (