import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from 'toolkit/hooks';
import { useCardLayoutsHistory } from 'components/LayoutHistoryList/hooks';

import styles from './styles.module.scss';

const categories = [
  {
    id: 1,
    categories: ['Есть ли помеха в настоящем', 'Будет ли помеха в будущем', 'Результат, будущее, ответ на ваш вопрос', 'Совет, объяснение, пояснение по поводу будущего']
  },
  {
    id: 2,
    categories: ['Общий прогноз на загаданный период времени', 'Что вас ждет в личной жизни в этот период', 'Что вас ждет в материальном плане']
  },
  {
    id: 3,
    categories: ['Что влияет в настоящем на ваш вопрос', 'Помощь или препятствия', 'Мотивация прошлого', 'Недавнее прошлое', 'Вероятное будущее', 'Ближайшее будущее', 'Ваше отношение к проблеме', 'Ваше окружение', 'Ваши надежды или опасения', 'Окончательный итог']
  },
  {
    id: 4,
    categories: ['Что влияет из прошлого на настоящее', 'Настоящее положение вещей', 'Как будут развиваться события', 'Наилучшая линия поведения', 'Влияние и воздействие окружающих на ситуацию', 'Помехи и препятствия', 'Итог']
  },
  {
    id: 5,
    categories: ['Прошлое вопрошающего', 'Настоящее вопрошающего', 'Будущее вопрошающего', 'События ближайшего будущего', 'События промежуточного будущего', 'События отдаленного будущего']
  },
  {
    id: 6,
    categories: ['Причина, по которой возник вопрос', 'Активная сила', 'Полнолуние. Данные события проявляются наиболее явно',  'Растущая луна. Сила, которая будет нарастать', 'Убывающая луна. Сила, которая будет убывать', 'Тайная тенденция. То, что скрыто влияет на вопрос', 'То, что сразу видно в данной ситуации', 'Дальнейший путь. Итог', 'Тайна. Почему и для чего всё это происходит']
  },
  {
    id: 7,
    categories: ['Уместно ли положительное решение', 'Уместно ли отрицательное решение', 'Последствия положительного решения', 'Последствия отрицательного решения', 'Факторы, не принятые во внимание', 'Факторы, значимость которых была преувеличена', 'Результат претворения решения в жизнь']
  },
  {
    id: 8,
    categories: ['Текущая ситуация', 'Ближайшее будущее', 'Более отдаленное будущее', 'Судьба', 'Совет']
  }
];

const LayoutHistoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: list } = useCardLayoutsHistory();
  const { data: cards } = useAppSelector((state) => state.cards);

  const layout = list.find((item) => item.id === Number(id));
  if (!layout) return <div></div>;

  // Находим категории для текущего типа расклада
  const layoutCategories = categories.find((cat) => cat.id === layout.cardLayout.layout_type);

  return (
    <div className={styles.wrapper}>
      <h1>{layout.question}</h1>
      {layoutCategories ? (
        <ul className={styles.list}>
          {layoutCategories.categories.map((categoryName, index) => {
            let cardIdsToDisplay: number[] = [];

            if (layout.cardLayout.layout_type === 7 && categoryName === 'Результат претворения решения в жизнь') {
              // Для категории "Результат претворения решения в жизнь" отображаем последние 2 карты
              cardIdsToDisplay = layout.cards.slice(-2);
            } else if (layout.cardLayout.layout_type === 8) {
              if (categoryName === 'Текущая ситуация') {
                // Для "Текущей ситуации" отображаем первые 2 карты
                cardIdsToDisplay = layout.cards.slice(0, 2);
              } else if (categoryName === 'Ближайшее будущее') {
                // Для "Ближайшего будущего" отображаем следующие 3 карты
                cardIdsToDisplay = layout.cards.slice(2, 5);
              } else {
                // Для остальных категорий распределяем оставшиеся карты
                const alreadyDisplayed = 5; // Учитываем, что первые 5 карт уже использованы
                const currentCategoryIndex = layoutCategories.categories.indexOf(categoryName);
                cardIdsToDisplay = layout.cards.slice(alreadyDisplayed + currentCategoryIndex - 2, alreadyDisplayed + currentCategoryIndex - 1);
              }
            } else {
              // Для остальных категорий отображаем карту по индексу
              cardIdsToDisplay = layout.cards.slice(index, index + 1);
            }

            return (
              <li key={index}>
                <h2>{categoryName}</h2>
                <div>
                  {cardIdsToDisplay.map((cardId) => {
                    const card = cards.find((c) => c.id === Number(cardId));
                    return card ? (
                      <div key={cardId}>
                        <img src={`${window.location.origin}/images/cards_list/${card.image}`} alt={card.nameRu} />
                        <h3>{card.nameRu}</h3>
                        <p>{card.descriptionRu}</p>
                      </div>
                    ) : null;
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Категории для данного типа расклада не найдены</p>
      )}
    </div>
  );
}

export default LayoutHistoryDetail; 