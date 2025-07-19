/**
 * Typing Animation Script
 * Creates a realistic typing effect that cycles through different profession titles
 */

class TypingAnimation {
  constructor(elementId, options = {}) {
    this.element = document.getElementById(elementId);
    this.professions = options.professions || [
      'Programmer',
      'Developer',
      'Designer',
      'Machine Learning Enthusiast',
      'AI Engineer',
      'Direktur'
    ];
    this.typeSpeed = options.typeSpeed || 500; // milliseconds between characters
    this.deleteSpeed = options.deleteSpeed || 30; // milliseconds between character deletions
    this.pauseTime = options.pauseTime || 1000; // milliseconds to pause at end of word
    this.currentProfessionIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.isTyping = false;
    
    this.init();
  }

  init() {
    if (!this.element) {
      console.error('Typing animation element not found');
      return;
    }
    
    this.startTyping();
  }

  startTyping() {
    this.isTyping = true;
    this.type();
  }

  type() {
    const currentProfession = this.professions[this.currentProfessionIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentProfession.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
      
      if (this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentProfessionIndex = (this.currentProfessionIndex + 1) % this.professions.length;
        setTimeout(() => this.type(), this.typeSpeed);
      } else {
        setTimeout(() => this.type(), this.deleteSpeed);
      }
    } else {
      this.element.textContent = currentProfession.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
      
      if (this.currentCharIndex === currentProfession.length) {
        setTimeout(() => {
          this.isDeleting = true;
          this.type();
        }, this.pauseTime);
      } else {
        const nextDelay = this.getVariableSpeed();
        setTimeout(() => this.type(), nextDelay);
      }
    }
  }

  getVariableSpeed() {
    const variation = Math.random() * 50 - 25;
    return Math.max(50, this.typeSpeed + variation);
  }

  pause() {
    this.isTyping = false;
  }

  resume() {
    if (!this.isTyping) {
      this.startTyping();
    }
  }

  destroy() {
    this.isTyping = false;
    if (this.element) {
      this.element.textContent = '';
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const typingElement = document.getElementById('typing-animation');
  
  if (typingElement) {
    const typingAnimation = new TypingAnimation('typing-animation', {
      professions: [
        'Programmer',
        'Developer', 
        'Designer',
        'Machine Learning Enthusiast',
        'AI Engineer'
      ],
      typeSpeed: 90,
      deleteSpeed: 20,
      pauseTime: 1500
    });

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        typingAnimation.pause();
      } else {
        typingAnimation.resume();
      }
    });
  }
});

window.addEventListener('resize', function() {
  const cursor = document.querySelector('.typing-cursor');
  if (cursor) {
    const isMobile = window.innerWidth <= 768;
    cursor.style.height = isMobile ? '1.1em' : '1.2em';
  }
});
