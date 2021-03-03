'use strict';

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `A9IX_x`,
    "title": `Учим HTML и CSS`,
    "createdDate": `16.01.2021`,
    "announce": `Это один из лучших рок-музыкантов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Он написал больше 30 хитов.`,
    "fullText": `Сотрясение мозга – очень серьезно. Пора перестать восхищаться теми, кто возвращается в поле после травм головы. Собрать камни бесконечности легко, если вы прирожденный герой. Медведев сейчас так хорош, что обводит даже одноручным бэкхендом. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Золотое сечение — соотношение двух величин, гармоническая пропорция. Как начать действовать? Для начала просто соберитесь. Он написал больше 30 хитов.`,
    "category": [
      `Спорт`
    ],
    "comments": [
      {
        "id": `CG-QVE`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то? Это где ж такие красоты?`
      },
      {
        "id": `1cdHIf`,
        "text": `Хочу такую же футболку :-) Плюсую, но слишком много буквы! Планируете записать видосик на эту тему?`
      }
    ],
    "picture": `Image.jpg`
  },
  {
    "id": `AXWTD3`,
    "title": `Биатлон в горах`,
    "createdDate": `08.01.2021`,
    "announce": `Первая большая ёлка была установлена только в 1938 году. Сотрясение мозга – очень серьезно. Пора перестать восхищаться теми, кто возвращается в поле после травм головы. Простые ежедневные упражнения помогут достичь успеха. Достичь успеха помогут ежедневные повторения.`,
    "fullText": `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Сотрясение мозга – очень серьезно. Пора перестать восхищаться теми, кто возвращается в поле после травм головы. Достичь успеха помогут ежедневные повторения.`,
    "category": [
      `IT`
    ],
    "comments": [
      {
        "id": `q5owW9`,
        "text": `Планируете записать видосик на эту тему?`
      }
    ],
    "picture": `Image.jpg`
  },
  {
    "id": `z1kuwc`,
    "title": `Как перестать беспокоиться и начать жить`,
    "createdDate": `10.02.2021`,
    "announce": `Ёлки — это не просто красивое дерево. Это прочная древесина. Первая большая ёлка была установлена только в 1938 году.`,
    "fullText": `Сотрясение мозга – очень серьезно. Пора перестать восхищаться теми, кто возвращается в поле после травм головы. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Простые ежедневные упражнения помогут достичь успеха. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    "category": [
      `Программирование`
    ],
    "comments": [
      {
        "id": `CF6sSs`,
        "text": `Согласен с автором! Планируете записать видосик на эту тему? Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `9v4vkY`,
        "text": `Совсем немного... Плюсую, но слишком много буквы!`
      },
      {
        "id": `W47SDM`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      }
    ],
    "picture": `Image.jpg`
  },
  {
    "id": `blMfhk`,
    "title": `Рок — это протест`,
    "createdDate": `12.01.2021`,
    "announce": `Ёлки — это не просто красивое дерево. Это прочная древесина. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    "fullText": `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Программировать не настолько сложно, как об этом говорят. Золотое сечение — соотношение двух величин, гармоническая пропорция. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Сотрясение мозга – очень серьезно. Пора перестать восхищаться теми, кто возвращается в поле после травм головы.`,
    "category": [
      `Спорт`
    ],
    "comments": [
      {
        "id": `eoRpSU`,
        "text": `Согласен с автором! Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `7eaA1R`,
        "text": `Мне кажется или я уже читал это где-то?`
      }
    ],
    "picture": `Image.jpg`
  },
  {
    "id": `rS1KPz`,
    "title": `Финал на краю вселенной`,
    "createdDate": `13.01.2021`,
    "announce": `Из под его пера вышло 8 платиновых альбомов. Простые ежедневные упражнения помогут достичь успеха. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    "fullText": `Достичь успеха помогут ежедневные повторения. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Простые ежедневные упражнения помогут достичь успеха. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    "category": [
      `Деревья`
    ],
    "comments": [
      {
        "id": `uIAqD8`,
        "text": `Совсем немного...`
      },
      {
        "id": `_28FoY`,
        "text": `Согласен с автором! Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы!`
      },
      {
        "id": `BOKyos`,
        "text": `Хочу такую же футболку :-) Планируете записать видосик на эту тему? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      }
    ],
    "picture": `Image.jpg`
  }
];




describe(`API returns article based on search query`, () => {

  let response;

  beforeAll(async () => {
    const app = express();
    app.use(express.json());
    search(app, new DataService(mockData));
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Финал`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 article found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`rS1KPz`));

});

test(`API returns code 404 if nothing is found`,
    () => {
      const app = express();
      app.use(express.json());
      search(app, new DataService(mockData));
      request(app)
        .get(`/search`)
        .query({
          query: `Такого заголовка нет`
        })
        .expect(HttpCode.NOT_FOUND)
    }
);

test(`API returns 400 when query string is absent`,
    () => {
      const app = express();
      app.use(express.json());
      search(app, new DataService(mockData));
        request(app)
        .get(`/search`)
        .expect(HttpCode.BAD_REQUEST)
    }
);
