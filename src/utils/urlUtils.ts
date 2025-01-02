/**
 * Функция для преобразования URL с хэшем в URL с параметром запроса.
 * @param {string} currentUrl - исходный URL с хэшем.
 * @returns {string} Новый URL с параметром tgWebAppData.
 */
function convertHashToQueryParam(currentUrl: string): string {
  // Извлекаем хэш
  const hash = window.location.hash;

  // Если хэш существует, удаляем символ #
  if (hash) {
    const cleanHash = hash.substring(1); // Убираем #
    // Формируем новый URL
    const newUrl = currentUrl.split('#')[0] + (currentUrl.length ? '&' : '?') + cleanHash;

    return new URLSearchParams(newUrl).toString();
  }

  
  // Если хэш не найден, возвращаем исходный URL
  return currentUrl;
}

function getLocaleFromHash() {
  // Получаем строку хэша, удаляя первый символ (#)
  const hash = window.location.hash.substring(1);

  // Преобразуем хэш в объект параметров
  const params = new URLSearchParams(hash);

  // Декодируем параметр tgWebAppData
  const tgWebAppData = params.get('tgWebAppData');
  if (!tgWebAppData) {
    console.error('tgWebAppData not found in hash');
    return null;
  }

  // Парсим tgWebAppData и ищем параметр language_code
  const decodedData = decodeURIComponent(tgWebAppData);
  const queryParams = new URLSearchParams(decodedData);

  // Достаем user объект
  const userData = queryParams.get('user');
  if (!userData) {
    console.error('User data not found in tgWebAppData');
    return null;
  }

  // Декодируем и парсим объект user
  const user = JSON.parse(decodeURIComponent(userData));
  console.log(user);

  // Возвращаем значение language_code
  return user.language_code || null;
}

function getAPIUrl() {
  return process.env.REACT_APP_API_URL;
}

// Экспортируем функцию для использования в других файлах
export { convertHashToQueryParam, getLocaleFromHash, getAPIUrl };