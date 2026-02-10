import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeI18n } from './i18n'; // Import the async initialization function
import i18n from 'i18next'; // Import the i18n instance for its `isInitialized` property

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const AppLoader: React.FC = () => {
  const [i18nInitialized, setI18nInitialized] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      await initializeI18n();
      setI18nInitialized(true);
    };
    initApp();
  }, []);

  if (!i18nInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        <div className="flex flex-col items-center p-6 rounded-lg shadow-md bg-white">
          <i className="fas fa-spinner fa-spin text-4xl mb-4"></i>
          <p className="text-lg font-semibold">{i18n.isInitialized ? i18n.t('loading') : 'Loading translations...'}</p>
        </div>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(rootElement);
root.render(<AppLoader />);