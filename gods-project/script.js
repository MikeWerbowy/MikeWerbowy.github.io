// DOM Elements
const gateHandle = document.getElementById('gateHandle');
const gateDoors = document.getElementById('gateDoors');
const entranceSection = document.getElementById('entrance');
const underworldSection = document.getElementById('underworld');
const navBtns = document.querySelectorAll('.nav-btn');
const underworldSections = document.querySelectorAll('.underworld-section');
const seasonText = document.getElementById('seasonText');
const seasonWheel = document.getElementById('seasonWheel');
const offeringForm = document.getElementById('offeringForm');
const offeringResponse = document.getElementById('offering-response');

// Debug: Log found elements
console.log('Found elements:');
console.log('Nav buttons:', navBtns.length);
console.log('Underworld sections:', underworldSections.length);
console.log('Gate handle:', !!gateHandle);
console.log('Underworld section:', !!underworldSection);

// Gate Opening Animation
gateHandle.addEventListener('click', () => {
    console.log('Gate handle clicked');
    gateDoors.classList.add('open');
    gateHandle.style.opacity = '0';

    setTimeout(() => {
        entranceSection.classList.remove('active');
        underworldSection.classList.add('active');

        // Auto-activate first section
        const throneRoom = document.getElementById('throne-room');
        const throneBtn = document.querySelector('.nav-btn[data-section="throne-room"]');

        if (throneRoom && throneBtn) {
            throneRoom.classList.add('active');
            throneBtn.classList.add('active');
            console.log('Activated throne room and button');
        } else {
            console.error('Could not find throne room elements');
        }
    }, 1000);
});

// Navigation between underworld sections
navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Nav button clicked:', btn.getAttribute('data-section'));

        const targetSection = btn.getAttribute('data-section');

        // Remove active class from all nav buttons and sections
        navBtns.forEach(b => b.classList.remove('active'));
        underworldSections.forEach(s => s.classList.remove('active'));

        // Add active class to clicked button and target section
        btn.classList.add('active');
        const targetElement = document.getElementById(targetSection);
        if (targetElement) {
            targetElement.classList.add('active');
            console.log('Activated section:', targetSection);
        } else {
            console.error('Could not find section:', targetSection);
        }
    });
});

// Seasonal Cycle Animation
let currentSeason = 0;
const seasons = ['spring', 'summer', 'autumn', 'winter'];
const seasonTexts = {
    spring: "Persephone returns from the underworld, bringing life and growth to the earth. Demeter rejoices at her daughter's presence.",
    summer: "The earth flourishes under Demeter's joy. Crops grow abundant as mother and daughter are reunited.",
    autumn: "The time of harvest approaches. Soon, Persephone must return to her husband in the shadowy realm below.",
    winter: "Persephone descends to rule as Queen of the Underworld. The earth grows cold and barren in Demeter's grief."
};

// Remove cycle button functionality - manual clicking only

// Offering Form Handler
const offeringResponses = {
    gratitude: [
        "Lord Hades acknowledges your gratitude. The shadows whisper of your respect for the natural order of life and death.",
        "Your words of thanks echo through the halls of the underworld. The ruler of the dead appreciates your understanding of his necessary role.",
        "The King of Shadows accepts your gratitude. May you find wisdom in accepting the cycles of existence."
    ],
    wisdom: [
        "Hades, keeper of hidden treasures, grants you this wisdom: True power lies not in avoiding death, but in understanding its place in the cosmic order.",
        "The Lord of the Deep speaks: Transformation is the greatest teacher. What seems like ending is often a new beginning.",
        "From the throne of shadows comes wisdom: The pomegranate seed teaches us that some bonds transcend the boundaries of realms."
    ],
    transformation: [
        "The ruler of transitions hears your plea. Like Persephone's journey, your transformation will bridge two worlds of being.",
        "Hades, lord of rebirth, blesses your desire for change. Remember that true transformation requires a descent before the ascent.",
        "The King of the Underworld responds: As the seed must die to become the tree, so must you release what was to embrace what will be."
    ],
    remembrance: [
        "The One Who Receives Many honors your remembrance of the departed. They dwell now in his protective realm, beyond mortal suffering.",
        "Lord Hades accepts your tribute to those who have passed beyond. In his kingdom, they know peace and await the eternal cycle's turn.",
        "The ruler of the dead acknowledges your love for those who have crossed the threshold. Their memory is a bridge between realms."
    ]
};

// Handle offering button selection
document.querySelectorAll('.offering-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.offering-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

offeringForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const offeringType = document.querySelector('.offering-btn.active').getAttribute('data-offering');
    const offeringText = document.getElementById('offering-text').value;

    if (offeringText.trim() === '') {
        alert('Please enter your offering before presenting it to Hades.');
        return;
    }

    // Show response
    const responses = offeringResponses[offeringType];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    offeringResponse.innerHTML = `
        <h4>Hades Responds:</h4>
        <p>"${randomResponse}"</p>
        <p><em>Your offering has been received in the halls of the underworld.</em></p>
    `;

    offeringResponse.classList.add('show');

    // Add flame effect
    document.querySelectorAll('.flame').forEach((flame, index) => {
        setTimeout(() => {
            flame.style.transform = 'scale(1.5)';
            flame.style.filter = 'brightness(1.5)';
        }, index * 200);

        setTimeout(() => {
            flame.style.transform = 'scale(1)';
            flame.style.filter = 'brightness(1)';
        }, (index * 200) + 1000);
    });

    // Clear form
    document.getElementById('offering-text').value = '';
});

// Pomegranate seed click effect
document.getElementById('pomegranate').addEventListener('click', () => {
    const pomegranate = document.getElementById('pomegranate');
    pomegranate.style.transform = 'translate(-50%, -50%) scale(1.5) rotateZ(360deg)';
    pomegranate.innerHTML = '<span>💎</span>';

    setTimeout(() => {
        pomegranate.style.transform = 'translate(-50%, -50%) scale(1) rotateZ(0deg)';
        pomegranate.innerHTML = '<span>🌰</span>';
    }, 1000);
});

// Season click effects
document.querySelectorAll('.season').forEach(season => {
    season.addEventListener('click', () => {
        // Remove previous active
        document.querySelector('.season.active')?.classList.remove('active');
        season.classList.add('active');

        const seasonName = season.getAttribute('data-season');
        if (seasonText && seasonTexts[seasonName]) {
            seasonText.textContent = seasonTexts[seasonName];
        }
    });
});

// Soul floating animation variance
document.querySelectorAll('.soul').forEach((soul, index) => {
    soul.style.animationDuration = `${6 + Math.random() * 4}s`;
    soul.style.left = `${20 + Math.random() * 60}%`;
});

// Initialize first season as active
document.querySelector('.season.spring').classList.add('active');

// Throne Room Interactions
const throne = document.querySelector('.throne');
const throneSpeak = document.getElementById('throne-speak');

const throneMessages = [
    "I am Hades, lord of the shadowy realm, ruler of countless souls.",
    "Through cunning wisdom, I gave Persephone the pomegranate seed.",
    "My kingdom is vast and my rule is just. All souls find peace here.",
    "Zeus planned our union well - the realms are now connected through love."
];

let messageIndex = 0;

throne.addEventListener('click', () => {
    throneSpeak.textContent = throneMessages[messageIndex];
    throneSpeak.classList.add('show');
    messageIndex = (messageIndex + 1) % throneMessages.length;

    // Auto-hide after 4 seconds
    setTimeout(() => {
        throneSpeak.classList.remove('show');
    }, 4000);
});

// Power item hover descriptions
const powerDescriptions = {
    ruler: "After the defeat of the Titans, I drew lots with my brothers and received the gloomy realm of the underworld as my domain.",
    master: "I control the hidden riches beneath the earth, including fertile soil and precious metals like gold and silver.",
    enforcer: "I ensure that the souls of the departed remain in my realm and that no one leaves the underworld without permission.",
    honors: "As brother to Zeus, I bestow the greatest timai among the immortals to those who serve in my realm."
};

document.querySelectorAll('.power-item').forEach(item => {
    item.addEventListener('click', () => {
        const power = item.getAttribute('data-power');
        throneSpeak.textContent = powerDescriptions[power];
        throneSpeak.classList.add('show');

        setTimeout(() => {
            throneSpeak.classList.remove('show');
        }, 3000);
    });
});

// Realm of Souls Interactions
let soulCount = 5;
const soulCountDisplay = document.getElementById('soulCount');
const addSoulBtn = document.getElementById('addSoulBtn');
const soulStream = document.querySelector('.soul-stream');

// Clickable souls
document.querySelectorAll('.clickable-soul').forEach(soul => {
    soul.addEventListener('click', () => {
        // Change direction and speed
        const newDuration = Math.random() * 6 + 4; // 4-10 seconds
        const newLeft = Math.random() * 60 + 20; // 20-80%

        soul.style.animationDuration = `${newDuration}s`;
        soul.style.left = `${newLeft}%`;
        soul.style.transform = 'scale(1.2)';

        setTimeout(() => {
            soul.style.transform = 'scale(1)';
        }, 300);
    });
});

// Add new soul button
addSoulBtn.addEventListener('click', () => {
    soulCount++;
    soulCountDisplay.textContent = soulCount;

    // Create new soul
    const newSoul = document.createElement('div');
    newSoul.className = 'soul clickable-soul';
    newSoul.style.animationDuration = `${Math.random() * 4 + 6}s`;
    newSoul.style.left = `${Math.random() * 60 + 20}%`;

    // Add click functionality to new soul
    newSoul.addEventListener('click', () => {
        const newDuration = Math.random() * 6 + 4;
        const newLeft = Math.random() * 60 + 20;

        newSoul.style.animationDuration = `${newDuration}s`;
        newSoul.style.left = `${newLeft}%`;
        newSoul.style.transform = 'scale(1.2)';

        setTimeout(() => {
            newSoul.style.transform = 'scale(1)';
        }, 300);
    });

    soulStream.appendChild(newSoul);

    // Button feedback
    addSoulBtn.textContent = 'Soul Guided Successfully!';
    setTimeout(() => {
        addSoulBtn.textContent = 'Guide Another Soul to Hades';
    }, 1500);
});

// Bridge of Realms Interactions
document.querySelectorAll('.clickable-realm').forEach(realm => {
    realm.addEventListener('click', () => {
        // Toggle expanded state
        const isExpanded = realm.classList.contains('expanded');

        // Close all other expanded realms
        document.querySelectorAll('.clickable-realm').forEach(r => {
            r.classList.remove('expanded');
        });

        // Toggle current realm
        if (!isExpanded) {
            realm.classList.add('expanded');
        }
    });
});

// Bridge icons animation
document.querySelectorAll('.clickable-bridge').forEach(bridge => {
    bridge.addEventListener('click', () => {
        bridge.style.transform = 'scale(1.5) rotate(360deg)';
        bridge.style.transition = 'all 0.8s ease';

        setTimeout(() => {
            bridge.style.transform = 'scale(1) rotate(0deg)';
        }, 800);
    });
});

// Initialize Lottie fire animation
document.addEventListener('DOMContentLoaded', () => {
    // Simple reliable fire emoji with better CSS animation
    const fireContainer = document.getElementById('lottie-fire');
    fireContainer.innerHTML = '🔥';
    fireContainer.style.fontSize = '12rem'; // Made bigger
    fireContainer.style.filter = 'hue-rotate(0deg) brightness(1.2) drop-shadow(0 0 20px rgba(255, 69, 0, 0.8))';

    // Add custom realistic fire animation
    fireContainer.style.animation = 'fire-dance 2s ease-in-out infinite alternate';

    // Create dynamic fire animation
    setInterval(() => {
        const hue = Math.random() * 30; // Random hue between 0-30 (red-orange range)
        const brightness = 1 + Math.random() * 0.4; // Brightness between 1-1.4
        const scale = 0.9 + Math.random() * 0.2; // Scale between 0.9-1.1

        fireContainer.style.filter = `hue-rotate(${hue}deg) brightness(${brightness}) drop-shadow(0 0 20px rgba(255, 69, 0, 0.8))`;
        fireContainer.style.transform = `scale(${scale})`;
    }, 200);

    console.log('The Gates of Hades have opened...');
});

// Easter eggs and additional interactions
let clickCount = 0;
document.querySelector('.crown').addEventListener('click', () => {
    clickCount++;
    if (clickCount === 3) {
        document.querySelector('.throne').style.boxShadow = '0 0 50px rgba(212, 175, 55, 0.8)';
        setTimeout(() => {
            document.querySelector('.throne').style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.3)';
        }, 2000);
        clickCount = 0;
    }
});

// Keyboard shortcuts for navigation
document.addEventListener('keydown', (e) => {
    const currentActive = document.querySelector('.nav-btn.active');
    if (!currentActive) return;

    const allNavBtns = Array.from(navBtns);
    const currentIndex = allNavBtns.indexOf(currentActive);

    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % allNavBtns.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        nextIndex = (currentIndex - 1 + allNavBtns.length) % allNavBtns.length;
    }

    if (nextIndex !== currentIndex) {
        e.preventDefault();
        allNavBtns[nextIndex].click();
    }
});