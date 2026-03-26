// DOM 요소 선택
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');
const skillBars = document.querySelectorAll('.skill-bar');
const scrollElements = document.querySelectorAll('.scroll-animate');
const contactForm = document.querySelector('.form');

// 모바일 네비게이션 토글
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // 햄버거 메뉴 애니메이션
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bar.style.transform = '';
            bar.style.opacity = '';
        }
    });
});

// 네비게이션 링크 클릭 시 메뉴 닫기
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // 햄버거 메뉴 원상복구
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = '';
            bar.style.opacity = '';
        });
    });
});

// 스크롤 시 헤더 스타일 변경
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12)';
    }
});

// 스킬 바 애니메이션
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !bar.style.width) {
            const width = bar.getAttribute('style').match(/width:\s*(\d+%)/);
            if (width) {
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width[1];
                }, 200);
            }
        }
    });
};

// 스크롤 애니메이션
const animateOnScroll = () => {
    scrollElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        
        if (isVisible) {
            element.classList.add('active');
        }
    });
};

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 폼 제출 처리
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // 간단한 폼 검증
        if (!data.name || !data.email || !data.message) {
            showNotification('모든 필수 항목을 채워주세요.', 'error');
            return;
        }
        
        // 이메일 검증
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('올바른 이메일 주소를 입력해주세요.', 'error');
            return;
        }
        
        // 성공 메시지 표시
        showNotification('메시지가 성공적으로 전송되었습니다!', 'success');
        
        // 폼 초기화
        this.reset();
        
        // 실제 프로젝트에서는 여기서 서버로 데이터 전송
        console.log('폼 데이터:', data);
    });
}

// 알림 메시지 표시 함수
function showNotification(message, type = 'info') {
    // 알림 요소 생성
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 스타일 적용
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // 타입별 색상 설정
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    }
    
    // DOM에 추가
    document.body.appendChild(notification);
    
    // 애니메이션 효과
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 타이핑 효과
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 프로젝트 카드 호버 효과
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 스킬 아이템 애니메이션
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('animate-fade-in');
});

// 통계 숫자 애니메이션
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = stat.textContent;
        const isPercentage = target.includes('%');
        const hasPlus = target.includes('+');
        const number = parseInt(target.replace(/[^0-9]/g, ''));
        
        if (isNaN(number)) return;
        
        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            let display = Math.floor(current);
            if (hasPlus) display += '+';
            if (isPercentage) display += '%';
            
            stat.textContent = display;
        }, 30);
    });
}

// 스크롤 이벤트 리스너
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    animateSkillBars();
    animateOnScroll();
    
    // 통계 섹션이 보이면 숫자 애니메이션 실행
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible && !statsSection.animated) {
            animateNumbers();
            statsSection.animated = true;
        }
    }
    
    ticking = false;
}

// 이벤트 리스너 등록
window.addEventListener('scroll', requestTick);
window.addEventListener('resize', requestTick);

// 초기 실행
document.addEventListener('DOMContentLoaded', () => {
    // 스크롤 애니메이션 요소 추가
    document.querySelectorAll('.project-card, .skill-item, .stat-item').forEach(el => {
        el.classList.add('scroll-animate');
    });
    
    // 초기 애니메이션 실행
    updateAnimations();
    
    // 히어로 타이틀 타이핑 효과 (선택적)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// 파티클 배경 효과 (선택적)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(102, 126, 234, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    
    // 랜덤 위치
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    
    // 애니메이션
    let posY = window.innerHeight;
    let posX = parseFloat(particle.style.left);
    let speedY = -Math.random() * 2 - 1;
    let speedX = (Math.random() - 0.5) * 0.5;
    let opacity = 1;
    
    const animateParticle = () => {
        posY += speedY;
        posX += speedX;
        opacity -= 0.01;
        
        particle.style.top = posY + 'px';
        particle.style.left = posX + 'px';
        particle.style.opacity = opacity;
        
        if (posY > -10 && opacity > 0) {
            requestAnimationFrame(animateParticle);
        } else {
            particle.remove();
        }
    };
    
    requestAnimationFrame(animateParticle);
}

// 파티클 생성 (간헐적으로)
setInterval(() => {
    if (Math.random() > 0.7) {
        createParticle();
    }
}, 500);

// 테마 변경 기능 (선택적)
let isDarkTheme = false;

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    
    if (isDarkTheme) {
        document.documentElement.style.setProperty('--bg-color', '#1a202c');
        document.documentElement.style.setProperty('--text-color', '#e2e8f0');
        document.documentElement.style.setProperty('--text-light', '#a0aec0');
        document.documentElement.style.setProperty('--bg-section', '#2d3748');
        document.documentElement.style.setProperty('--border-color', '#4a5568');
    } else {
        document.documentElement.style.setProperty('--bg-color', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#2d3748');
        document.documentElement.style.setProperty('--text-light', '#718096');
        document.documentElement.style.setProperty('--bg-section', '#f7fafc');
        document.documentElement.style.setProperty('--border-color', '#e2e8f0');
    }
}

// 페이지 로딩 애니메이션
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 성능 최적화: throttle 함수
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 스크롤 이벤트에 throttle 적용
window.addEventListener('scroll', throttle(() => {
    // 스크롤 관련 성능 최적화 작업
}, 100));
