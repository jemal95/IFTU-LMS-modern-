import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Function to fetch JSON translation files
async function fetchTranslation(lang: string) {
  try {
    const response = await fetch(`./locales/${lang}/translation.json`);
    if (!response.ok) {
      throw new Error(`Failed to load ${lang} translation: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching ${lang} translation:`, error);
    // Return an empty object or a minimal fallback in case of error
    return {};
  }
}

export async function initializeI18n() {
  try {
    const [enTranslation, omTranslation] = await Promise.all([
      fetchTranslation('en'),
      fetchTranslation('om'),
    ]);

    await i18n // Ensure init is awaited
      .use(initReactI18next) // passes i18n down to react-i18next
      .init({
        resources: {
          en: {
            translation: enTranslation,
          },
          om: {
            translation: omTranslation,
          },
        },
        lng: 'en', // default language
        fallbackLng: 'en', // fallback language if translation not found
        interpolation: {
          escapeValue: false, // react already safes from xss
        },
      });
  } catch (error) {
    console.error("Failed to fully initialize i18n due to an error during translation loading:", error);
    // Fallback if main initialization fails (e.g., if fetchTranslation also failed to return an object)
    await i18n // Ensure init is awaited
      .use(initReactI18next)
      .init({
        resources: {
          en: { translation: { loading: "Error loading translations" } },
          om: { translation: { loading: "Dogoggora fe'aa jira" } },
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
      });
  }
}

export default i18n;