// ==UserScript==
// @name        Karantina Sorgulama Dropdown Liste Güncellenen
// @namespace   violentmonkey
// @version     2.14
// @description Karantina BSS Uygunluk Sorgulama Sayfasına Sık Kullanılan Kapıların Sayı Başlangıçlarını Ekleme
// @match       https://tbsapp.tarbil.gov.tr/Reports/ReportViewDynamic.aspx?report=*
// @grant       none
// @updateURL   https://raw.githubusercontent.com/ercerd/tbskarantina/main/karantina-sorgulama-dropdown.user.js
// @downloadURL https://raw.githubusercontent.com/ercerd/tbskarantina/main/karantina-sorgulama-dropdown.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Dropdown options for 2024
    const dropdownOptions2024 = [
        { value: '33-ITH1-2024-', explanation: 'Mersin          :' },
        { value: '22-ITH1-2024-', explanation: 'Edirne          :' },
        { value: '04-ITH1-2024-', explanation: 'Gürbulak-Ağrı   :' },
        { value: '08-ITH1-2024-', explanation: 'Sarp-Artvin     :' },
        { value: '30-ITH2-2024-', explanation: 'Esendere-Hakkari:' },
        { value: '36-ITH2-2024-', explanation: 'Kars            :' },
        { value: '54-ITH1-2024-', explanation: 'Sakarya         :' },
        { value: '75-ITH1-2024-', explanation: 'Aktaş-Türkgözü-Ardahan:' },
        { value: '76-ITH2-2024-', explanation: 'Dilucu-Iğdır    :' },
        { value: '31-ITH1-2024-', explanation: 'Hatay           :' },
        { value: '33-IADE1-2024-', explanation: 'İhraç İadesi    :' },
    ];

    // Dropdown options for 2025
    const dropdownOptions2025 = [
        { value: '33-ITH1-2025-', explanation: 'Mersin          :' },
        { value: '22-ITH1-2025-', explanation: 'Edirne          :' },
        { value: '04-ITH1-2025-', explanation: 'Gürbulak-Ağrı   :' },
        { value: '08-ITH1-2025-', explanation: 'Sarp-Artvin     :' },
        { value: '30-ITH2-2025-', explanation: 'Esendere-Hakkari:' },
        { value: '36-ITH2-2025-', explanation: 'Kars            :' },
        { value: '54-ITH1-2025-', explanation: 'Sakarya         :' },
        { value: '75-ITH1-2025-', explanation: 'Aktaş-Türkgözü-Ardahan:' },
        { value: '76-ITH2-2025-', explanation: 'Dilucu-Iğdır    :' },
        { value: '31-ITH1-2025-', explanation: 'Hatay           :' },
        { value: '33-IADE1-2025-', explanation: 'İhraç İadesi    :' },
    ];

    // Add scrollbar style
    const style = document.createElement('style');
    style.textContent = `
        .dropdown-list::-webkit-scrollbar {
            width: 8px;
        }
        .dropdown-list::-webkit-scrollbar-track {
            background: #333;
        }
        .dropdown-list::-webkit-scrollbar-thumb {
            background-color: #4CAF50;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(style);

    function injectDropdown() {
        const tableElement = document.querySelector('.auto-style1');
        if (!tableElement) {
            console.error('Table element with class "auto-style1" not found');
            return;
        }

        const newTable = document.createElement('table');
        newTable.classList.add('custom-table');
        const newRow = newTable.insertRow();
        const cell = newRow.insertCell();

        // Create dropdown container
        const dropdownContainer = document.createElement('div');
        dropdownContainer.style.position = 'relative';
        dropdownContainer.style.width = '350px';

        // Create search input
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Kapı Seçiniz veya Arayınız...';
        searchInput.style.width = '100%';
        searchInput.style.backgroundColor = "#333";
        searchInput.style.border = "1px solid #4CAF50";
        searchInput.style.borderRadius = "4px";
        searchInput.style.color = "#FEFFFC";
        searchInput.style.padding = "10px";
        searchInput.style.height = "40px";
        searchInput.style.fontFamily = "Arial, sans-serif";
        searchInput.style.fontSize = "16px";

        // Create dropdown list
        const dropdownList = document.createElement('ul');
        dropdownList.classList.add('dropdown-list');
        dropdownList.style.display = 'none';
        dropdownList.style.position = 'absolute';
        dropdownList.style.top = '100%';
        dropdownList.style.left = '0';
        dropdownList.style.right = '0';
        dropdownList.style.backgroundColor = '#333';
        dropdownList.style.border = '1px solid #4CAF50';
        dropdownList.style.borderRadius = '1px';
        dropdownList.style.marginTop = '0px';
        dropdownList.style.maxHeight = '450px';
        dropdownList.style.overflowY = 'auto';
        dropdownList.style.zIndex = '1000';
        dropdownList.style.listStyle = 'none';
        dropdownList.style.padding = '0';
        dropdownList.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.2)';
        dropdownList.style.scrollbarColor = '#4CAF50 #333';

        // Create year buttons
        const button2024 = document.createElement('button');
        button2024.textContent = '2024';
        button2024.style.marginRight = '10px';
        button2024.style.backgroundColor = "#333";
        button2024.style.border = "1px solid #4CAF50";
        button2024.style.borderRadius = "4px";
        button2024.style.color = "#FEFFFC";
        button2024.style.padding = "10px";
        button2024.style.fontFamily = "Arial, sans-serif";
        button2024.style.fontSize = "16px";
        button2024.style.cursor = "pointer";

        const button2025 = document.createElement('button');
        button2025.textContent = '2025';
        button2025.style.marginRight = '10px';
        button2025.style.backgroundColor = "#333";
        button2025.style.border = "1px solid #4CAF50";
        button2025.style.borderRadius = "4px";
        button2025.style.color = "#FEFFFC";
        button2025.style.padding = "10px";
        button2025.style.fontFamily = "Arial, sans-serif";
        button2025.style.fontSize = "16px";
        button2025.style.cursor = "pointer";

        let currentOptions = dropdownOptions2025;

        function populateDropdownList(filterText = '') {
            dropdownList.innerHTML = '';
            const filteredOptions = currentOptions.filter(option =>
                option.value.toLowerCase().includes(filterText.toLowerCase()) ||
                option.explanation.toLowerCase().includes(filterText.toLowerCase())
            );

            filteredOptions.forEach(option => {
                const li = document.createElement('li');
                li.textContent = `${option.explanation} ${option.value}`;

                // List item styles
                li.style.padding = '3px';
                li.style.cursor = 'pointer';
                li.style.color = '#FEFFFC';
                li.style.fontFamily = "Arial, sans-serif";
                li.style.fontSize = "16px";
                li.style.lineHeight = "20px";
                li.style.whiteSpace = "nowrap";
                li.style.borderBottom = "1px solid #4CAF50";

                // Remove border for last item
                if (filteredOptions[filteredOptions.length - 1] === option) {
                    li.style.borderBottom = "none";
                }

                li.addEventListener('click', () => {
                    setDefaultInputValue(option.value);
                    dropdownList.style.display = 'none';
                    setTimeout(() => {
                        searchInput.value = '';
                    }, 50);
                });

                li.addEventListener('mouseout', () => {
                    li.style.backgroundColor = 'transparent';
                    li.style.color = '#FEFFFC';
                });

                dropdownList.appendChild(li);
            });
        }

        searchInput.addEventListener('focus', () => {
            dropdownList.style.display = 'block';
            populateDropdownList(searchInput.value);
        });

        searchInput.addEventListener('input', () => {
            dropdownList.style.display = 'block';
            populateDropdownList(searchInput.value);
        });
        
        document.addEventListener('click', (e) => {
            if (!dropdownContainer.contains(e.target)) {
                dropdownList.style.display = 'none';
            }
        });

        button2024.addEventListener('click', (event) => {
            event.preventDefault();
            currentOptions = dropdownOptions2024;
            populateDropdownList();
            setDefaultInputValue(dropdownOptions2024[0].value);
            setTimeout(() => {
                searchInput.value = '';
            }, 50);
        });

        button2025.addEventListener('click', (event) => {
            event.preventDefault();
            currentOptions = dropdownOptions2025;
            populateDropdownList();
            setDefaultInputValue(dropdownOptions2025[0].value);
            setTimeout(() => {
                searchInput.value = '';
            }, 50);
        });

        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                searchInput.value = '';
            }, 100);
        });

        // Create container for buttons and dropdown
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.alignItems = 'center';

        dropdownContainer.appendChild(searchInput);
        dropdownContainer.appendChild(dropdownList);

        container.appendChild(button2024);
        container.appendChild(button2025);
        container.appendChild(dropdownContainer);

        cell.appendChild(container);
        tableElement.parentNode.insertBefore(newTable, tableElement.nextSibling);

        setDefaultInputValue(dropdownOptions2025[0].value);
    }

    function setDefaultInputValue(value) {
        const inputField = document.getElementById('ctl00_ctl00_bodyCPH_ContentPlaceHolder1_ReportViewerMain_ctl04_ctl03_txtValue');
        if (inputField) {
            inputField.selectionStart = inputField.selectionEnd = inputField.value.length;
            inputField.value = value;
            inputField.selectionStart = inputField.selectionEnd = inputField.value.length;

            const simulatedEvent = new Event('change', { bubbles: true });
            inputField.dispatchEvent(simulatedEvent);

            setTimeout(function() {
                inputField.focus();
                inputField.selectionStart = inputField.selectionEnd = inputField.value.length;
            }, 100);
        } else {
            console.error('Target input field not found');
        }
    }

    // Initial injection
    injectDropdown();

})();
