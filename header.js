// header.js - 상단 헤더 및 로그인 상태 공통 관리 스크립트

function renderHeader(activeMenu) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const headerContainer = document.getElementById('common-header');

    if (!headerContainer) return;

    // 메뉴 목록 정의 (href, 라벨)
    const menus = [
        { href: 'index.html', label: '🏠 홈' },
        { href: 'groupbuy.html', label: '🛒 공동구매' },
        { href: 'shopping.html', label: '🛍️ 쇼핑몰' },
        { href: 'hanacard.html', label: '💳 하나카드' },
        { href: 'insurance.html', label: '🛡️ 펫보험' },
        { href: 'membership.html', label: '⭐ 멤버쉽혜택' },
        { href: 'events.html', label: '🎁 이벤트' },
        { href: 'my.html', label: '👤 MY', requiresAuth: true } // 로그인 시에만 보임
    ];

    // Navigation HTML 생성
    const menuItemsHtml = menus.map(menu => {
        // 로그인 필요한 메뉴인데 로그인 안되어있으면 표시 안함
        if (menu.requiresAuth && !isLoggedIn) return '';

        const isActive = menu.href === activeMenu;
        const activeClass = isActive 
            ? 'border-b-2 border-amber-400 text-amber-400 font-bold' 
            : 'hover:text-amber-300 transition text-slate-300';

        return `<a href="${menu.href}" class="py-3 ${activeClass}">${menu.label}</a>`;
    }).join('');

    // 우측 로그인 / 로그아웃 버튼 영역 HTML
    const authAreaHtml = isLoggedIn ? `
        <a href="my.html" class="hover:text-amber-400 transition flex items-center bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
            <i class="fa-solid fa-user mr-1.5 text-amber-400"></i> MY페이지
        </a>
        <button onclick="handleLogout()" class="text-slate-400 hover:text-rose-400 text-xs transition underline">
            로그아웃
        </button>
    ` : `
        <a href="login.html" class="hover:text-amber-400 transition text-xs">로그인</a>
        <span class="text-slate-700 text-xs">|</span>
        <a href="signup.html" class="bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-amber-300 transition shadow">회원가입</a>
    `;

    // 전체 Header HTML 렌더링
    headerContainer.innerHTML = `
        <header class="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-md">
            <div class="max-w-7xl mx-auto px-4 py-2.5 flex justify-between items-center">
                <div class="flex items-center space-x-3">
                    <a href="index.html" class="flex items-center space-x-2">
                        <img src="beluna_logo.png" alt="Belluna Pet Logo" class="h-9 w-auto object-contain">
                        <span class="text-xl font-black text-amber-400 tracking-wider hidden sm:inline-block">Belluna Pet</span>
                    </a>
                    <span class="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">ALPHA</span>
                </div>
                
                <div class="text-xs text-slate-400 hidden md:block">
                    한국애견연맹과 함께 만드는 회원 중심 플랫폼
                </div>

                <!-- 우측 로그인/MY 버튼 영역 -->
                <div class="flex items-center space-x-3 text-sm font-medium text-slate-200">
                    ${authAreaHtml}
                </div>
            </div>

            <!-- Navigation Bar -->
            <nav class="bg-slate-950 border-t border-slate-800/80 overflow-x-auto">
                <div class="max-w-7xl mx-auto px-4 flex whitespace-nowrap space-x-6 text-sm font-semibold">
                    ${menuItemsHtml}
                </div>
            </nav>
        </header>
    `;
}

// 로그아웃 공통 함수
function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    alert('로그아웃 되었습니다.');
    window.location.reload();
}
