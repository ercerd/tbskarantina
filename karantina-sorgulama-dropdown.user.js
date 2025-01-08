// ==UserScript==
// @name        Karantina Sorgulama Dropdown Liste
// @namespace   violentmonkey
// @version     1
// @description Karantina BSS Uygunluk Sorgulama Sayfasına Sık Kullanılan Kapıların Sayı Başlangıçlarını Ekleme
// @match       https://tbsapp.tarbil.gov.tr/Reports/ReportViewDynamic.aspx?report=*
// @grant       none
// ==/UserScript==

(function() {
  'use strict';

  // Dropdown options (separate options with commas)
  const dropdownOptions = [
  { value: '33-ITH1-2025-', explanation: 'Mersin          :' },
  { value: '33-ITH1-2024-', explanation: 'Mersin-2024     :' },
  { value: '22-ITH1-2025-', explanation: 'Edirne          :' },
  { value: '04-ITH1-2025-', explanation: 'Gürbulak-Ağrı   :' },
  { value: '08-ITH1-2025-', explanation: 'Sarp-Artvin     :' },
  { value: '30-ITH2-2025-', explanation: 'Esendere-Hakkari:' },
  { value: '36-ITH2-2025-', explanation: 'Kars            :' },
  { value: '54-ITH1-2025-', explanation: 'Sakaryas         :' },
  { value: '75-ITH1-2025-', explanation: 'Aktaş-Türkgözü-Ardahan:' },
  { value: '76-ITH2-2025-', explanation: 'Dilucu-Iğdır    :' },
  { value: '31-ITH1-2025-', explanation: 'Hatay         :' },
  { value: '33-IADE1-2025-', explanation: 'İhraç İadesi    :' },
  ];

  function injectDropdown() {
    // Find the table with class "auto-style1"
    const tableElement = document.querySelector('.auto-style1');
    if (!tableElement) {
      console.error('Table element with class "auto-style1" not found');
      return;
    }

    // Create a new table
    const newTable = document.createElement('table');
    newTable.classList.add('custom-table'); // Add class for styling

    // Create a new row in the table
    const newRow = newTable.insertRow();

    // Create a cell in the new row
    const cell = newRow.insertCell();

    // Create the dropdown select element
    const dropdown = document.createElement('select');
    dropdown.classList.add('custom-dropdown'); // Add class for styling

    // Add styling for the dropdown
    dropdown.style.backgroundColor = "#333"; // Background color
    dropdown.style.border = "1px solid #4CAF50"; // Border
    dropdown.style.borderRadius = "4px"; // Border radius
    dropdown.style.color = "#FEFFFC"; // Text color
    dropdown.style.padding = "10px"; // Padding
    dropdown.style.width = "350px"; // Width
    dropdown.style.height = "40px"; // Height
    dropdown.style.fontFamily = "Arial, sans-serif"; // Font family
    dropdown.style.fontSize = "16px"; // Font size
    dropdown.style.backgroundRepeat = "no-repeat"; // No repeat for background image
    dropdown.style.backgroundPosition = "right 10px center"; // Position of the background image
    dropdown.style.backgroundSize = "12px 12px"; // Size of the background image
    dropdown.style.textIndent = "0.01px"; // Fix for IE11 text align

    // Create a placeholder option
    const placeholderOption = document.createElement('option');
    placeholderOption.value = "";
    placeholderOption.textContent = "Kapı Seçiniz";
    placeholderOption.style.color = "#FFF"; // White text color
    placeholderOption.selected = true;
    placeholderOption.disabled = true; // Disable placeholder option
    dropdown.appendChild(placeholderOption);

    // Add options to the dropdown
    for (const option of dropdownOptions) {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = `${option.value}: ${option.explanation}`;
      optionElement.classList.add('custom-dropdown-option'); // Add class for styling options
      dropdown.appendChild(optionElement);
    }

    // Append the dropdown to the cell
    cell.appendChild(dropdown);

    // Add padding to move the dropdown 200px to the right within the cell
    cell.style.paddingLeft = "200px";

    // Insert the new table after the existing table
    tableElement.parentNode.insertBefore(newTable, tableElement.nextSibling);

  // Set the default value to the value of the first option
  const inputField = document.getElementById('ctl00_ctl00_bodyCPH_ContentPlaceHolder1_ReportViewerMain_ctl04_ctl03_txtValue');
  if (inputField) {
    // Move cursor to the end of the input field before setting the value
    inputField.selectionStart = inputField.selectionEnd = inputField.value.length;
    inputField.value = dropdownOptions[0].value; // Set the value of the first option

    // Move cursor to the end of the input field after setting the value
    inputField.selectionStart = inputField.selectionEnd = inputField.value.length;

    // Trigger a simulated change event on the input field (optional)
    const simulatedEvent = new Event('change', { bubbles: true });
    inputField.dispatchEvent(simulatedEvent);

    // Move cursor to the end of the input field after a short delay
    setTimeout(function() {
      inputField.focus(); // Focus on the input field
      inputField.selectionStart = inputField.selectionEnd = inputField.value.length; // Move cursor to the end
    }, 100);
  } else {
    console.error('Target input field not found');
  }

// Handle dropdown change
dropdown.addEventListener('change', function() {
  if (this.value) { // Check if a non-empty option is selected
    const inputField = document.getElementById('ctl00_ctl00_bodyCPH_ContentPlaceHolder1_ReportViewerMain_ctl04_ctl03_txtValue');
    if (inputField) {
      // Move cursor to the end of the input field before setting the value
      inputField.selectionStart = inputField.selectionEnd = inputField.value.length;
      inputField.value = this.value;

      // Add visual effect to the input field
      inputField.style.border = "3px solid #4CAF50"; // Green border

      // Reset the border after 1 second
      setTimeout(function() {
        inputField.style.border = ""; // Reset border to default
      }, 600);

      // Move cursor to the end of the input field after setting the value
      inputField.selectionStart = inputField.selectionEnd = inputField.value.length;

      // Trigger a simulated change event on the input field (optional)
      const simulatedEvent = new Event('change', { bubbles: true });
      inputField.dispatchEvent(simulatedEvent);

      // Move cursor to the end of the input field after a short delay
      setTimeout(function() {
        inputField.focus(); // Focus on the input field
        inputField.selectionStart = inputField.selectionEnd = inputField.value.length; // Move cursor to the end
      }, 100);
    } else {
      console.error('Target input field not found');
    }
  }
});

  }

  // Initial injection
  injectDropdown();

})();
