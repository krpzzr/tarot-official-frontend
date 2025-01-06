export const formatText = (text: string) => {
  let formattedText = text;

  // Заменяем **текст** на <strong>текст</strong> для жирного текста
  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  
  // Заменяем #### {текст} на <h4>{текст}</h4> для заголовков 4 уровня
  formattedText = formattedText.replace(/#### (.*?)(\n|$)/g, '<h4>$1</h4>$2');

  // Заменяем ### {текст} на <h3>{текст}</h3> для заголовков 3 уровня
  formattedText = formattedText.replace(/### (.*?)(\n|$)/g, '<h3>$1</h3>$2');

  // Заменяем ## {текст} на <h2>{текст}</h2> для заголовков 2 уровня
  formattedText = formattedText.replace(/## (.*?)(\n|$)/g, '<h2>$1</h2>$2');

  // Заменяем # {текст} на <h1>{текст}</h1> для заголовков 1 уровня
  formattedText = formattedText.replace(/# (.*?)(\n|$)/g, '<h1>$1</h1>$2');

  // Заменяем переносы строк на <br />
  formattedText = formattedText.replace(/\n/g, '<br />');

  // Удаляем все <br /> перед и после определенных тегов
  formattedText = formattedText.replace(/(<br \/>)*(<\/?(?:h1|h2|h3|h4|h5|h6|p|ul|li)>)(<br \/>)*\s*/g, '$2');

  return formattedText;
};