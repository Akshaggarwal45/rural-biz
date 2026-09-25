// Language support with Google Translate synchronization and instant UI translations

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
];

export function setLanguage(langCode: string) {
  try {
    localStorage.setItem('ruralbiz-lang', langCode);
    
    // Set Google Translate cookie for domain and root path
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    document.cookie = `googtrans=/en/${langCode}; domain=.${window.location.hostname}; path=/;`;

    // Trigger google translate dropdown if present
    const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      // If combo not ready yet, wait slightly and retry
      setTimeout(() => {
        const delayedCombo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
        if (delayedCombo) {
          delayedCombo.value = langCode;
          delayedCombo.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }, 500);
    }
  } catch (err) {
    console.error('Error changing language:', err);
  }
}
