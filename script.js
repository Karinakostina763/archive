// Навигация между страницами
function navigateTo(pageName) {
    // Скрыть все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Показать выбранную страницу
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Обновить URL без перезагрузки (опционально)
    history.pushState(null, '', `#${pageName}`);
    
    // Закрыть мобильное меню при клике
    const navMenu = document.getElementById('navMenu');
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
}

// Обработка кликов по ссылкам навигации
document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = link.getAttribute('data-page');
        navigateTo(pageName);
    });
});

// Мобильное меню
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

if (burger) {
    burger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burger.classList.toggle('active');
    });
}

// Обработка начальной загрузки страницы
window.addEventListener('load', () => {
    // Проверяем hash в URL
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(`page-${hash}`)) {
        navigateTo(hash);
    } else {
        navigateTo('home');
    }
});

// Модальное окно для услуг
function openModal(serviceType) {
    const modal = document.getElementById('serviceModal');
    const modalContent = document.getElementById('modalContent');
    
    let content = '';
    switch(serviceType) {
        case 'social':
            content = `
                <h3>Социально-правовые запросы</h3>
                <p>Мы предоставляем архивные справки, подтверждающие:</p>
                <ul>
                    <li>Стаж работы на предприятиях и в организациях</li>
                    <li>Размер заработной платы</li>
                    <li>Факты награждения и присвоения званий</li>
                    <li>Участие в ликвидации аварий</li>
                </ul>
                <p><strong>Срок исполнения:</strong> до 30 дней</p>
                <p><strong>Стоимость:</strong> согласно прейскуранту</p>
                <button class="btn-primary" onclick="closeModal()">Закрыть</button>
            `;
            break;
        case 'genealogy':
            content = `
                <h3>Генеалогические запросы</h3>
                <p>Помогаем в поиске сведений о предках:</p>
                <ul>
                    <li>Метрические книги (рождение, брак, смерть)</li>
                    <li>Ревизские сказки (подушные переписи)</li>
                    <li>Посемейные списки</li>
                    <li>Исповедные ведомости</li>
                </ul>
                <p><strong>Срок исполнения:</strong> от 14 до 60 дней</p>
                <button class="btn-primary" onclick="closeModal()">Закрыть</button>
            `;
            break;
        case 'thematic':
            content = `
                <h3>Тематические запросы</h3>
                <p>Подбираем информацию по заданной теме:</p>
                <ul>
                    <li>История организаций и учреждений</li>
                    <li>Биографические справки</li>
                    <li>Исторические события в регионе</li>
                    <li>Архитектурное наследие</li>
                </ul>
                <button class="btn-primary" onclick="closeModal()">Закрыть</button>
            `;
            break;
        case 'copy':
            content = `
                <h3>Ксерокопирование и сканирование</h3>
                <p><strong>Расценки:</strong></p>
                <ul>
                    <li>Ксерокопия листа А4 — 10 руб.</li>
                    <li>Сканирование (300 dpi) — 15 руб.</li>
                    <li>Выписка из документа — 50 руб.</li>
                </ul>
                <p>Заказ выполняется в течение 3-5 рабочих дней.</p>
                <button class="btn-primary" onclick="closeModal()">Закрыть</button>
            `;
            break;
        case 'reading':
            content = `
                <h3>Работа в читальном зале</h3>
                <p><strong>График работы:</strong> Пн-Чт 9:00-17:00, Пт — по записи</p>
                <p><strong>Правила:</strong> Предварительная запись обязательна. При себе иметь паспорт.</p>
                <p><strong>Бронирование:</strong> за 3 дня по телефону +7 (8512) 44-28-61</p>
                <button class="btn-primary" onclick="closeModal()">Закрыть</button>
            `;
            break;
        case 'excursion':
            content = `
                <h3>Экскурсии и консультации</h3>
                <p>Мы проводим:</p>
                <ul>
                    <li>Обзорные экскурсии по архиву (для групп от 5 человек)</li>
                    <li>Консультации по работе с архивными документами</li>
                    <li>Мастер-классы для студентов</li>
                </ul>
                <p><strong>Запись:</strong> по телефону +7 (8512) 44-28-60</p>
                <button class="btn-primary" onclick="closeModal()">Закрыть</button>
            `;
            break;
    }
    
    modalContent.innerHTML = content;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
}

// Закрытие модального окна при клике вне его
window.addEventListener('click', (e) => {
    const modal = document.getElementById('serviceModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Поиск документов
function searchDocuments() {
    const searchTerm = document.getElementById('docSearch').value.toLowerCase();
    const docs = document.querySelectorAll('.doc-item');
    
    docs.forEach(doc => {
        const text = doc.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            doc.style.display = 'block';
        } else {
            doc.style.display = 'none';
        }
    });
}

// Фильтрация документов по категориям
document.querySelectorAll('.category').forEach(cat => {
    cat.addEventListener('click', () => {
        // Убираем активный класс у всех
        document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
        cat.classList.add('active');
        
        const category = cat.getAttribute('data-category');
        const docs = document.querySelectorAll('.doc-item');
        
        if (category === 'all') {
            docs.forEach(doc => doc.style.display = 'block');
        } else {
            docs.forEach(doc => {
                if (doc.getAttribute('data-category') === category) {
                    doc.style.display = 'block';
                } else {
                    doc.style.display = 'none';
                }
            });
        }
    });
});

// Поиск по фондам
function searchFunds() {
    const searchTerm = document.getElementById('fundSearch').value.toLowerCase();
    const rows = document.querySelectorAll('.funds-table tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Детали новостей
function showNewsDetail(element) {
    const newsCard = element.closest('.news-card');
    const title = newsCard.querySelector('h3').textContent;
    const date = newsCard.querySelector('.news-date').textContent;
    const text = newsCard.querySelector('p').textContent;
    
    const modal = document.getElementById('serviceModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <h3>${title}</h3>
        <p><strong>${date}</strong></p>
        <p>${text}</p>
        <p>Полная версия новости доступна по запросу в архиве.</p>
        <button class="btn-primary" onclick="closeModal()">Закрыть</button>
    `;
    modal.style.display = 'flex';
}

// Обработка отправки форм
document.getElementById('requestForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Спасибо! Ваш запрос принят. Мы свяжемся с вами в ближайшее время.');
    e.target.reset();
});

document.getElementById('feedbackForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Сообщение отправлено! Мы ответим вам на указанный email.');
    e.target.reset();
});

// Добавление атрибутов data-category для документов
document.querySelectorAll('.doc-item').forEach((item, index) => {
    const categories = ['decrees', 'metrics', 'photos', 'decrees'];
    if (index < categories.length) {
        item.setAttribute('data-category', categories[index]);
    }
});

// Анимация появления при скролле (простая)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.direction-card, .service-card, .news-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});