import React, { useState, CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';

import { useAppSelector } from 'toolkit/hooks';
import { useCardLayoutsHistory } from 'components/LayoutHistoryList/hooks';

import styles from './styles.module.scss';
import { convertHashToQueryParam, getAPIUrl } from 'utils/urlUtils';

const categories = [
  {
    id: 1,
    categories: [
    {
      name: 'Есть ли помеха в настоящем',
      description: 'Что мешает в данный момент реализации ваших замыслов. Хорошая карта говорит о том, что помех на вашем пути нет',
    },
    {
      name: 'Будет ли помеха в будущем',
      description: 'Если до этого была помеха, в будущем она может исчезнуть. И наоборот, если раньше всё было хорошо, потом могут появиться трудности',
    },
    {
      name: 'Результат, будущее, ответ на ваш вопрос',
      description: null,
    },
    {
      name: 'Совет, объяснение, пояснение по поводу будущего',
      description: 'Эта карта может дополнительно внести ясность и прояснить ситуацию по поводу будущего. Можете использовать её только в случае крайне непонятного предыдущего ответа'
    },
  ]
  },
  {
    id: 2,
    categories: [
      {
        name: 'Общий прогноз на загаданный период времени',
        description: 'Общая характеристика будущих событий, что будет преобладать',
      },
      {
        name: 'Что вас ждет в личной жизни в этот период',
        description: null,
      },
      {
        name: 'Что вас ждет в материальном плане',
        description: null,
      },
    ]
  },
  {
    id: 3,
    categories: [
      {
        name: 'Что влияет в настоящем на ваш вопрос',
        description: null,
      },
      {
        name: 'Помощь или препятствия',
        description: 'Положительная карта - вы получите помощь, будете сильнее своих врагов. Негативная карта - ждите проблем, враги окажутся сильнее',
      },
      {
        name: 'Мотивация прошлого',
        description: 'Что влияло в прошлом на ваш вопрос, что заставило действовать',
      },
      {
        name: 'Недавнее прошлое',
        description: null,
      },
      {
        name: 'Вероятное будущее',
        description: null,
      },
      {
        name: 'Ближайшее будущее',
        description: null,
      },
      {
        name: 'Ваше отношение к проблеме',
        description: null,
      },
      {
        name: 'Ваше окружение',
        description: 'Как ваше окружение относится ко всему происходящему, как влияет на события. Здесь могут быть родственники, друзья, знакомые, коллеги',
      },
      {
        name: 'Ваши надежды или опасения',
        description: null,
      },
      {
        name: 'Окончательный итог',
        description: null,
      },
    ]
  },
  {
    id: 4,
    categories: [
      {
        name: 'Что влияет из прошлого на настоящее',
        description : null,
      },
      {
        name: 'Настоящее положение вещей',
        description : null,
      },
      {
        name: 'Как будут развиваться события',
        description : null,
      },
      {
        name: 'Наилучшая линия поведения',
        description : null,
      },
      {
        name: 'Влияние и воздействие окружающих на ситуацию',
        description : null,
      },
      {
        name: 'Помехи и препятствия',
        description : null,
      },
      {
        name: 'Итог',
        description : null,
      },
    ]
  },
  {
    id: 5,
    categories: [
      {
        name: 'Прошлое вопрошающего',
        description : null,
      },
      {
        name: 'Настоящее вопрошающего',
        description : null,
      },
      {
        name: 'Будущее вопрошающего',
        description : null,
      },
      {
        name: 'События ближайшего будущего',
        description : null,
      },
      {
        name: 'События промежуточного будущего',
        description : null,
      },
      {
        name: 'События отдаленного будущего',
        description : null,
      },
    ]
  },
  {
    id: 6,
    categories: [
      {
        name: 'Причина, по которой возник вопрос',
        description : null,
      },
      {
        name: 'Активная сила',
        description : 'Сила, которая проводит активные изменения. Именно эти события меняют в настоящее время ваше ближайшее будущее',
      },
      {
        name: 'Полнолуние. Данные события проявляются наиболее явно',
        description : 'Здесь описана ситуация, которая в данный момент является наиболее видимой и ощутимой',
      },
      {
        name: 'Растущая луна. Сила, которая будет нарастать',
        description : 'В какую сторону будет двигаться ситуация. Здесь будет описано или улучшение, или изменение к худшему. Карта хорошо показывает перспективу вашего вопроса',
      },
      {
        name: 'Убывающая луна. Сила, которая будет убывать',
        description : 'Данная ситуация останется в прошлом, проигрывающая сила',
      },
      {
        name: 'Тайная тенденция. То, что скрыто влияет на вопрос',
        description : null,
      },
      {
        name: 'То, что сразу видно в данной ситуации',
        description : 'Описанное в этой позиции сразу бросается в глаза. Можно сказать, это еще одна карта, которая описывает настоящее. Но эти события не столь важны, они могут быть лишь ширмой, маской. Возможно, это специально выставляется напоказ, чтобы скрыть что-то другое. Рекомендуется тщательно изучить предыдущий пункт "Тайная тенденция"',
      },
      {
        name: 'Дальнейший путь. Итог',
        description : null,
      },
      {
        name: 'Тайна. Почему и для чего всё это происходит',
        description : 'Здесь рассматривается только старший аркан. Карта показывает реальное значение происходящих событий. К чему это приведет вас. Из младших арканов рассматриваются только те, которые тесно связаны с вопросом. Младший аркан говорит об отсутствии скрытого смысла, ситуация ясна и понятна',
      }
    ]
  },
  {
    id: 7,
    categories: [
      {
        name: 'Уместно ли положительное решение',
        description : 'Пришло ли время осуществить задуманное',
      },
      {
        name: 'Уместно ли отрицательное решение',
        description : 'Нужно ли именно сейчас воплощать в жизнь отрицательное решение. Может случиться так, что еще не настало время как для положительного, так и для отрицательного решения',
      },
      {
        name: 'Последствия положительного решения',
        description: null,
      },
      {
        name: 'Последствия отрицательного решения',
        description: null,
      },
      {
        name: 'Факторы, не принятые во внимание',
        description: 'Очень важный пункт, нужно обязательно обратить внимание на эту карту. Описанные здесь события и последствия намного важнее, чем вы думаете',
      },
      {
        name: 'Факторы, значимость которых была преувеличена',
        description: 'Отрицательная карта говорит о том, что вы слишком пессимистично настроены. На самом деле трудности не такие уж и серьезные',
      },
      {
        name: 'Результат претворения решения в жизнь',
        description: 'Это отдаленные последствия вашего положительного решения. Вы можете увидеть к чему всё это в итоге приведет и задать себе вопрос: "А нужно ли вам это?" Изначальный результат вашего решения может быть положительный, но в итоге дальнейшие события могут быть не такими радужными. Посмотрите на итоги вашего отрицательного решения. Может быть, они будут более привлекательными',
      }
    ]
  },
  {
    id: 8,
    categories: [
      {
        name: 'Текущая ситуация',
        description: 'Можете проверить расклад на точность по этим двум картам',
      },
      {
        name: 'Ближайшее будущее',
        description: null,
      },
      {
        name: 'Более отдаленное будущее',
        description: null,
      },
      {
        name: 'Судьба',
        description: 'Если здесь негативная карта, то изменить это будет крайне сложно, но возможно. В любом случае изучите совет, который даст вам следующая карта',
      },
      {
        name: 'Совет',
        description: 'Именно это вы должны сделать для достижения задуманного. Если в пунктах "Судьба" и "Совет" выпали негативные карты, то вам лучше оставить это дело, всё равно ничего не получится. Если в положении "Судьба" выпала положительная карта, а здесь плохая, то вам нужно как можно скорее разобраться с описанными негативными событиями и исправить их. Дополнение: почти всегда карта просто описывает будущие события. Она как бы спрашивает: нужно ли стремиться к этому?',
      }
    ]
  }
];

const override: CSSProperties = {
  // display: "block",
  // margin: "0 auto",
};


const formatText = (text: string) => {
  // Заменяем \n на <br /> для переноса строк
  let formattedText = text.replace(/\n/g, '<br />');
  
  // Заменяем **текст** на <strong>текст</strong> для жирного текста
  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  return formattedText;
};

const LayoutHistoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentTab, setCurrentTab] = useState(0);
  const [aiAnswer, setAiAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: list } = useCardLayoutsHistory();
  const { data: cards } = useAppSelector((state) => state.cards);

  const layout = list.find((item) => item.id === Number(id));

  if (!layout) return <div></div>;

  // Находим категории для текущего типа расклада
  const layoutCategories = categories.find((cat) => cat.id === layout.cardLayout.layout_type);

  const handleGetAiAnswer = async () => {
    if (isLoading) return;
    if (layoutCategories && layout) {
      const categoryStrings: string[] = [];
  
      layoutCategories.categories.forEach((category, index) => {
        let cardIdsToDisplay: number[] = [];
  
        if (layout.cardLayout.layout_type === 7 && category.name === 'Результат претворения решения в жизнь') {
          // Для категории "Результат претворения решения в жизнь" отображаем последние 2 карты
          cardIdsToDisplay = layout.cards.slice(-3);
        } else if (layout.cardLayout.layout_type === 8) {
          if (category.name === 'Текущая ситуация') {
            // Для "Текущей ситуации" отображаем первые 2 карты
            cardIdsToDisplay = layout.cards.slice(0, 2);
          } else if (category.name === 'Ближайшее будущее') {
            // Для "Ближайшего будущего" отображаем следующие 3 карты
            cardIdsToDisplay = layout.cards.slice(2, 5);
          } else {
            // Для остальных категорий распределяем оставшиеся карты
            const alreadyDisplayed = 5; // Учитываем, что первые 5 карт уже использованы
            const currentCategoryIndex = layoutCategories.categories.indexOf(category);
            cardIdsToDisplay = layout.cards.slice(alreadyDisplayed + currentCategoryIndex - 2, alreadyDisplayed + currentCategoryIndex - 1);
          }
        } else {
          // Для остальных категорий отображаем карту по индексу
          cardIdsToDisplay = layout.cards.slice(index, index + 1);
        }
  
        // Находим карты и собираем их названия
        const cardNames = cardIdsToDisplay
          .map((cardId) => {
            const card = cards.find((c) => c.id === Number(cardId));
            return card ? `${card.nameRu} ${card.isUpright ? '(прямая карта)' : '(перевернутая карта)'}` : null;
          })
          .filter((name): name is string => name !== null); // Исключаем null
  
        // Добавляем строку для текущей категории в массив
        categoryStrings.push(`-${category.name} - ${cardNames.join(', ')}`);
      });
      
      try {
        setIsLoading(true);
        const queryParams = convertHashToQueryParam(window.location.search);
        const response = await axios.post(`${getAPIUrl()}/detailed-layout?${queryParams}`, {
          cardLayoutHistoryId: layout.id,
          cards: categoryStrings.join('.\n'),
        });
        const answer = response.data?.answer;

        setCurrentTab(1);
        setAiAnswer(answer);
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Ошибка при получении подробного расклада:', error);
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <h1>{layout.question}</h1>
      <ul className={styles.tabs}>
        <li
          className={currentTab === 0 ? styles.active : ''}
          onClick={() => setCurrentTab(0)}
        >
          Базовый
        </li>
        <li
          className={currentTab === 1 ? styles.active : ''}
          onClick={() => {
            if (layout.aiAnswer || aiAnswer) {
              setCurrentTab(1)
            }
          }}
        >
          Подробный
        </li>
      </ul>
      {currentTab === 1 && (layout.aiAnswer || aiAnswer) && (
        <div
          style={{
            borderRadius: 40,
            background: '#fff',
            color: '#000',
            padding: 20
          }}
          dangerouslySetInnerHTML={{
            __html: formatText(aiAnswer || layout.aiAnswer || '')
          }}
        />
      )}
      {layoutCategories && currentTab === 0 && (
        <ul className={styles.list}>
          {layoutCategories.categories.map((category, index) => {
            let cardIdsToDisplay: number[] = [];

            if (layout.cardLayout.layout_type === 7 && category.name === 'Результат претворения решения в жизнь') {
              // Для категории "Результат претворения решения в жизнь" отображаем последние 2 карты
              cardIdsToDisplay = layout.cards.slice(-3);
            } else if (layout.cardLayout.layout_type === 8) {
              if (category.name === 'Текущая ситуация') {
                // Для "Текущей ситуации" отображаем первые 2 карты
                cardIdsToDisplay = layout.cards.slice(0, 2);
              } else if (category.name === 'Ближайшее будущее') {
                // Для "Ближайшего будущего" отображаем следующие 3 карты
                cardIdsToDisplay = layout.cards.slice(2, 5);
              } else {
                // Для остальных категорий распределяем оставшиеся карты
                const alreadyDisplayed = 5; // Учитываем, что первые 5 карт уже использованы
                const currentCategoryIndex = layoutCategories.categories.indexOf(category);
                cardIdsToDisplay = layout.cards.slice(alreadyDisplayed + currentCategoryIndex - 2, alreadyDisplayed + currentCategoryIndex - 1);
              }
            } else {
              // Для остальных категорий отображаем карту по индексу
              cardIdsToDisplay = layout.cards.slice(index, index + 1);
            }

            return (
              <li key={index}>
                <h2>{category.name}</h2>
                {category.description && <p
                  style={{
                    fontStyle: 'italic',
                    textAlign: 'center',
                    marginBottom: 20,
                  }}
                >{category.description}</p>}
                <div style={{ marginBottom: 40 }}>
                  {cardIdsToDisplay.map((cardId) => {
                    const card = cards.find((c) => c.id === Number(cardId));
                    return card ? (
                      <div key={cardId}>
                        <img src={`${window.location.origin}/images/cards_list/${card.image}`} alt={card.nameRu} />
                        <h3>{card.nameRu}&nbsp;{!card.isUpright ? '(перевернутая)' : ''}</h3>
                        <p>{card.descriptionRu}</p>
                      </div>
                    ) : null;
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {!layout.aiAnswer && !aiAnswer && (
        <button
          className={`${styles.aiButton} ${isLoading ? styles.loadingButton : ''}`}
          onClick={handleGetAiAnswer}
        >
          {isLoading ? 'Формируем подробный расклад' : 'Получить подробный разбор расклада'}
          {isLoading ? (
            <div
              style={{
                height: 10,
                marginTop: 7,
                marginBottom: 8
              }}
            >
              <BeatLoader
                loading={isLoading}
                size={11}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <div className={styles.detailPrice}>
              50 <img src={`${window.location.origin}/images/balance_icon.png`} alt="" />
            </div>
          )}
        </button>
      )}
    </div>
  );
}

export default LayoutHistoryDetail; 