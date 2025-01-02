export const formatText = (text: string) => {
  // Заменяем \n на <br /> для переноса строк
  let formattedText = text.replace(/\n/g, '<br />');
  
  // Заменяем **текст** на <strong>текст</strong> для жирного текста
  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  return formattedText;
};
