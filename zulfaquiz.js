(function(){
    // --- Fungsi utilitas untuk touch/mouse ---
    function getClientPos(e) {
        if (e.touches) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        return { x: e.clientX, y: e.clientY };
    }

    // --- Buat floating container utama ---
    let floatDiv = document.createElement('div');
    floatDiv.id = 'omegas-float-window';
    Object.assign(floatDiv.style, {
        position: 'fixed',
        top: '100px',
        left: '100px',
        width: Math.min(400, window.innerWidth * 0.9) + 'px',
        height: Math.min(500, window.innerHeight * 0.8) + 'px',
        backgroundColor: '#222',
        color: '#eee',
        fontFamily: 'sans-serif',
        border: '1px solid #444',
        borderRadius: '5px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
        zIndex: 999999,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        touchAction: 'none'
    });

    // --- Header ---
    let header = document.createElement('div');
    Object.assign(header.style, {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: '5px 10px',
        cursor: 'grab',
        userSelect: 'none',
        touchAction: 'none'
    });
    header.innerHTML = '<span>ZulfaQuiz</span><div id="header-buttons" style="display: flex; align-items: center;"></div>';
    let headerButtons = header.querySelector('#header-buttons');

    // Tombol Minimize
    let minimizeBtn = document.createElement('button');
    minimizeBtn.textContent = '_';
    Object.assign(minimizeBtn.style, {
        backgroundColor: '#555', color: 'white', border: 'none', padding: '5px 10px',
        marginLeft: '5px', cursor: 'pointer', borderRadius: '3px', fontSize: '0.9em',
        touchAction: 'manipulation'
    });

    // Tombol Close
    let closeBtn = document.createElement('button');
    closeBtn.textContent = 'X';
    Object.assign(closeBtn.style, {
        backgroundColor: '#555', color: 'white', border: 'none', padding: '5px 10px',
        marginLeft: '5px', cursor: 'pointer', borderRadius: '3px', fontSize: '0.9em',
        touchAction: 'manipulation'
    });

    headerButtons.appendChild(minimizeBtn);
    headerButtons.appendChild(closeBtn);

    // --- Konten dengan iframe ---
    let contentWrapper = document.createElement('div');
    Object.assign(contentWrapper.style, {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    });
    let iframe = document.createElement('iframe');
    iframe.src = 'https://cheatnetwork.eu/services/quizizz';  // URL situs web yang ingin disematkan
    Object.assign(iframe.style, {
        width: '100%',
        height: '100%',
        border: 'none',
        backgroundColor: '#fff'
    });
    contentWrapper.appendChild(iframe);

    // Gabungkan elemen utama
    floatDiv.appendChild(header);
    floatDiv.appendChild(contentWrapper);
    document.body.appendChild(floatDiv);

    // --- Tombol restore ---
    let restoreBtn = document.createElement('div');
    restoreBtn.id = 'omegas-restore-button';
    Object.assign(restoreBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '40px',
        height: '40px',
        backgroundColor: 'rgba(233, 69, 96, 0.25)',
        borderRadius: '50%',
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'rgba(255,255,255,0.6)',
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: 1000000,
        userSelect: 'none',
        border: '1px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(2px)',
        transition: 'background-color 0.2s',
        touchAction: 'manipulation'
    });
    restoreBtn.textContent = 'Q';
    restoreBtn.title = 'Klik untuk mengembalikan jendela';
    restoreBtn.addEventListener('mouseenter', () => restoreBtn.style.backgroundColor = 'rgba(233, 69, 96, 0.5)');
    restoreBtn.addEventListener('mouseleave', () => restoreBtn.style.backgroundColor = 'rgba(233, 69, 96, 0.25)');
    document.body.appendChild(restoreBtn);

    // --- State ---
    let isMinimized = false;

    // --- Event listeners tombol ---
    minimizeBtn.addEventListener('click', () => {
        if (!isMinimized) {
            floatDiv.style.display = 'none';
            restoreBtn.style.display = 'flex';
            isMinimized = true;
        }
    });

    closeBtn.addEventListener('click', () => {
        floatDiv.remove();
        restoreBtn.remove();
    });

    restoreBtn.addEventListener('click', () => {
        restoreBtn.style.display = 'none';
        floatDiv.style.display = 'flex';
        isMinimized = false;
    });
})();
