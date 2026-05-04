// Data pro katalog řemesel
const katalogData = [
    {
        id: 'instalat',
        icon: 'fa-faucet-drip',
        title: 'Instalatérství',
        tasks: ['Opravy kapajících kohoutků a protékajících WC', 'Čištění ucpaných odpadů a sifonů', 'Výměna vodovodních baterií', 'Zapojení pračky a myčky nádobí']
    },
    {
        id: 'elektro',
        icon: 'fa-bolt',
        title: 'Elektrikář',
        tasks: ['Výměna a oprava zásuvek či vypínačů', 'Zapojení světel a lustrů', 'Diagnostika zkratů a výpadků jističů', 'Zapojení vestavných spotřebičů (varné desky)']
    },
    {
        id: 'malir',
        icon: 'fa-paint-roller',
        title: 'Malíř / Tapetář',
        tasks: ['Výmalba pokojů i celých bytů', 'Odstranění starých tapet a lepení nových', 'Drobné opravy omítek a sádrokartonu', 'Nátěry zárubní a topení']
    },
    {
        id: 'zamecnik',
        icon: 'fa-screwdriver-wrench',
        title: 'Zámečník',
        tasks: ['Otevírání zabouchnutých dveří', 'Výměna zámků a vložek', 'Opravy kování a klik', 'Montáž doplňkových bezpečnostních prvků']
    },
    {
        id: 'nabytek',
        icon: 'fa-couch',
        title: 'Montáž nábytku',
        tasks: ['Skládání nábytku (IKEA, XXXLutz atd.)', 'Montáž skříní, postelí a komod', 'Věšení polic a zrcadel na zeď', 'Instalace garnýží a rolet']
    },
    {
        id: 'tesar',
        icon: 'fa-hammer',
        title: 'Tesař / Truhlář',
        tasks: ['Drobné opravy dřevěného nábytku', 'Seřízení a oprava pantů u skříněk', 'Výřezy do pracovních desek', 'Úprava a oprava prahů']
    },
    {
        id: 'klima',
        icon: 'fa-snowflake',
        title: 'Klimatizace',
        tasks: ['Čištění a dezinfekce klimatizací', 'Výměna vzduchových filtrů', 'Kontrola úniku chladiva', 'Drobné opravy a seřízení jednotek']
    },
    {
        id: 'obklad',
        icon: 'fa-border-all',
        title: 'Obkladač',
        tasks: ['Výměna prasklých obkladaček a dlažby', 'Přespárování koupelen a sprchových koutů', 'Drobné silikonování a izolace', 'Opravy obkladů po vytopení']
    },
    {
        id: 'okna',
        icon: 'fa-window-restore',
        title: 'Okna / Dveře',
        tasks: ['Seřízení plastových i dřevěných oken', 'Výměna těsnění proti průvanu', 'Oprava drhnoucích dveří', 'Montáž a oprava sítí proti hmyzu']
    },
    {
        id: 'tv',
        icon: 'fa-wifi',
        title: 'TV / Internet',
        tasks: ['Montáž TV držáků na zeď', 'Zapojení a ladění televizorů', 'Instalace a nastavení Wi-Fi routerů', 'Lištování a estetické schování kabelů']
    },
    {
        id: 'uklid',
        icon: 'fa-broom',
        title: 'Úklid / Čištění',
        tasks: ['Hloubkové čištění koberců a sedaček (tepování)', 'Generální a po-rekonstrukční úklid', 'Mytí oken a žaluzií', 'Odborné čištění spár a koupelen']
    },
    {
        id: 'dalsi',
        icon: 'fa-ellipsis',
        title: 'A mnoho dalšího',
        tasks: ['Nenašli jste svůj problém?', 'Nevadí! Popište ho Bořkovi svými slovy.', 'Náš asistent problém analyzuje.', 'Najdeme vám profíka i na nestandardní opravy.']
    }
];

// Inicializace katalogu po načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('katalog-app');
    if (!appContainer) return;

    // Vytvoření mřížky pro dlaždice
    const gridDiv = document.createElement('div');
    gridDiv.className = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10';
    
    // Vytvoření panelu pro detaily (skrytý ve výchozím stavu)
    const detailDiv = document.createElement('div');
    detailDiv.id = 'katalog-detail';
    detailDiv.className = 'mt-8 bg-fixit-50 dark:bg-slate-800 rounded-3xl border border-fixit-500/30 overflow-hidden transition-all duration-500 ease-in-out opacity-0 translate-y-[-20px]';
    detailDiv.style.maxHeight = '0px';

    let activeId = null;

    // Vykreslení jednotlivých dlaždic
    katalogData.forEach(item => {
        const tile = document.createElement('div');
        tile.className = 'group bg-slate-50 dark:bg-slate-800 hover:bg-fixit-500 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 flex flex-col items-center gap-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-fixit-500 tile-item';
        tile.dataset.id = item.id;
        
        tile.innerHTML = `
            <div class="w-14 h-14 bg-white dark:bg-slate-700 group-hover:bg-fixit-600 rounded-2xl flex items-center justify-center text-fixit-500 group-hover:text-white text-2xl transition-colors shadow-sm tile-icon-container">
                <i class="fa-solid ${item.icon}"></i>
            </div>
            <span class="font-bold text-sm text-slate-700 dark:text-slate-300 group-hover:text-white text-center transition-colors">${item.title}</span>
        `;

        // Logika po kliknutí
        tile.addEventListener('click', () => {
            const isClosing = activeId === item.id;
            
            // Reset stylů všech dlaždic
            document.querySelectorAll('.tile-item').forEach(t => {
                t.classList.remove('bg-fixit-500', 'border-fixit-500', 'scale-105', 'shadow-xl');
                t.classList.add('bg-slate-50', 'dark:bg-slate-800');
                const text = t.querySelector('span');
                text.classList.remove('text-white');
                text.classList.add('text-slate-700', 'dark:text-slate-300');
                const iconBox = t.querySelector('.tile-icon-container');
                iconBox.classList.remove('bg-fixit-600', 'text-white');
                iconBox.classList.add('bg-white', 'dark:bg-slate-700', 'text-fixit-500');
            });

            if (isClosing) {
                // Zavíráme panel
                detailDiv.style.maxHeight = '0px';
                detailDiv.classList.replace('opacity-100', 'opacity-0');
                detailDiv.classList.replace('translate-y-0', 'translate-y-[-20px]');
                activeId = null;
            } else {
                // Otevíráme panel pro nové řemeslo
                activeId = item.id;
                
                // Zvýraznění aktivní dlaždice
                tile.classList.remove('bg-slate-50', 'dark:bg-slate-800');
                tile.classList.add('bg-fixit-500', 'border-fixit-500', 'scale-105', 'shadow-xl');
                tile.querySelector('span').classList.remove('text-slate-700', 'dark:text-slate-300');
                tile.querySelector('span').classList.add('text-white');
                tile.querySelector('.tile-icon-container').classList.remove('bg-white', 'dark:bg-slate-700', 'text-fixit-500');
                tile.querySelector('.tile-icon-container').classList.add('bg-fixit-600', 'text-white');

                // Vykreslení obsahu detailu
                const tasksHtml = item.tasks.map(task => `
                    <li class="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-lg">
                        <i class="fa-solid fa-check text-fixit-500 mt-1"></i>
                        <span>${task}</span>
                    </li>
                `).join('');

                detailDiv.innerHTML = `
                    <div class="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <div class="w-24 h-24 shrink-0 bg-white dark:bg-slate-700 text-fixit-500 rounded-3xl flex items-center justify-center text-4xl shadow-md border border-slate-100 dark:border-slate-600">
                            <i class="fa-solid ${item.icon}"></i>
                        </div>
                        <div class="flex-grow">
                            <h3 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">Nejčastěji řešíme v kategorii ${item.title}</h3>
                            <ul class="grid sm:grid-cols-2 gap-4 mb-8">
                                ${tasksHtml}
                            </ul>
                            <a href="#ai-poptavka" onclick="document.getElementById('poptavka-input').value = 'Potřebuji poptat: ${item.title} - ';" class="inline-block bg-fixit-500 hover:bg-fixit-600 text-white px-8 py-4 rounded-xl font-bold transition hover:scale-105 shadow-lg">
                                Zadat poptávku zdarma
                            </a>
                        </div>
                    </div>
                `;

                // Animace otevření
                detailDiv.style.maxHeight = detailDiv.scrollHeight + 100 + 'px';
                detailDiv.classList.replace('opacity-0', 'opacity-100');
                detailDiv.classList.replace('translate-y-[-20px]', 'translate-y-0');

                // Lehký odskok po kliknutí, aby byl detail vidět
                setTimeout(() => {
                    detailDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });

        gridDiv.appendChild(tile);
    });

    // Přidání do DOM
    appContainer.appendChild(gridDiv);
    appContainer.appendChild(detailDiv);
});
