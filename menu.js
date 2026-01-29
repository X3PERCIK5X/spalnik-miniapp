// menu.js
// Данные меню. Категории 1-в-1 как в меню пользователя.
// Поля: id, name, desc, weight, price

const IMG = (name) => encodeURI(`фото меню/${name}`);

// Карта изображений по id (добавлено из папки "фото меню")
window.SPALNIK_IMAGES = {
  meat_chicken_steak: IMG("стейк ципленка.JPG"),
  meat_add_fries_idaho: IMG("Айдахо с кетчупом.JPG"),
  rb_pulled_pork: IMG("Римбургер свинина.JPG"),
  pz_bbq: IMG("пицца ББК.JPG"),
  pz_chicken_bbq: IMG("Пицца кура барбекю.JPG"),
  pz_hellboy: IMG("пицца хэлбой.JPG"),
  pz_mushroom: IMG("пицца грибная.JPG"),
  pz_shrimp: IMG("Пицца креветка.JPG"),
  sal_caesar_chicken: IMG("Цезарь курица.JPG"),
  sal_shrimp_tomyam: IMG("салат креветка ям.JPG"),
  sal_a_ya_tomat: IMG("Салат а я томат .JPG"),
  soup_ramen: IMG("Суп рамен.JPG"),
  soup_tomyam: IMG("суп том ям.JPG"),
  wing_breaded: IMG("куриные крылья в панировке.JPG"),
  beer_set: IMG("пивной сет.JPG"),
  hot_squid_rings: IMG("кольца кальмара в панировке.JPG"),
  hot_fish_chips: IMG("фиш энд чипс.JPG"),
  hot_nuggets: IMG("наггетсы.JPG"),
  hot_cheese_sticks: IMG("Сырные палочки.JPG"),
  hot_sweetpotato_fries: IMG("батат фри.JPG"),
  hot_breaded_shrimp: IMG("креветки в панировке.JPG"),
  hot_halloumi: IMG("халумис гриль.JPG"),
  cold_guacamole_nachos: IMG("гуакамоле с начос.JPG"),
  cold_pickled_egg: IMG("яйцо маринованное.JPG"),
  cold_gherkins: IMG("корнишоны.JPG"),
  sauce_bbq: IMG("соус барбекю.JPG"),
  sauce_bavarian_mustard: IMG("соус баварская горчица.JPG"),
  sauce_lingonberry: IMG("соус брусничный.JPG"),
  sauce_tzatziki: IMG("соус дзадзыки.JPG"),
  sauce_guacamole: IMG("соус гуакамоле.JPG"),
  sauce_cheddar: IMG("соус чеддер.JPG"),
  sauce_soy: IMG("соевый соус.JPG"),
  sauce_ketchup: IMG("соус кетчуп.JPG"),
  sauce_ranch: IMG("соус ранч.JPG"),
  sauce_blue_cheese: IMG("соус блю чиз.JPG"),
  sauce_sour_cream: IMG("сметана.JPG"),
  jerky_beef_adjika: IMG("вяленое мясо.JPG"),
};

window.SPALNIK_MENU = [
  {
    id: "meat",
    title: "МЯСО",
    items: [
      {
        id: "meat_chicken_steak",
        name: "Стейк цыплёнка",
        desc: "Филе, сырный соус, рукола, черри, оливковое масло, бальзамик",
        weight: "160|50|40 г",
        price: 620,
      },
      {
        id: "meat_meatballs",
        name: "Митболы",
        desc: "Обжаренные мясные шарики из свинины и говядины в соусе барбекю с чеддером и луком фри",
        weight: "200 г",
        price: 550,
      },
      {
        id: "meat_beef_ribs",
        name: "Рёбра говяжьи мраморные",
        desc: "С кукурузой под вишнёвым соусом барбекю",
        weight: "380|80 г",
        price: 1190,
      },
      {
        id: "meat_pork_ribs",
        name: "Рёбра свиные",
        desc: "С хрустящим луком фри под соусом на выбор: баварская горчица / барбекю / чили",
        weight: "335 г",
        price: 690,
      },
      {
        id: "meat_add_fries_idaho",
        name: "Добавить картофель фри или айдахо",
        desc: "",
        weight: "165 г",
        price: 190,
      },
    ],
  },

  {
    id: "sausages",
    title: "КОЛБАСКИ",
    items: [
      {
        id: "saus_bavarian_pork",
        name: "Баварские свиные (Нюрнбергские улитки)",
        desc: "В натуральной оболочке, подаём с картофелем айдахо, салатом коулсло и баварской горчицей",
        weight: "190|245|40 г",
        price: 890,
      },
      {
        id: "saus_tyrolean_beef",
        name: "Тирольские говяжьи",
        desc: "Подкопчённые, с добавлением куриного мяса, без оболочки. Подаём с картофелем айдахо, салатом коулсло и соусом барбекю",
        weight: "190|245|40 г",
        price: 880,
      },
    ],
  },

  {
    id: "sausage_set",
    title: "КОЛБАСНЫЙ СЕТ",
    items: [
      {
        id: "set_11",
        name: "Колбасный сет — 11 колбасок",
        desc: "Луковые кольца, картофель айдахо, салат коулсло, соусы: чили, барбекю, баварская горчица",
        weight: "500|400|120 г",
        price: 2550,
      },
      {
        id: "set_22",
        name: "Колбасный сет — 22 колбаски",
        desc: "Луковые кольца, картофель айдахо, салат коулсло, соусы: чили, барбекю, баварская горчица",
        weight: "1000|400|120 г",
        price: 3550,
      },
    ],
  },

  {
    id: "rimburger",
    title: "РИМБУРГЕР (стритфуд в римской основе)",
    items: [
      {
        id: "rb_pulled_pork",
        name: "Рваная свинина",
        desc: "Бекон, чеддер, баварская горчица, красный лук, лук фри. Подаём на выбор с корнишоном или халапеньо",
        weight: "340 г",
        price: 730,
      },
      {
        id: "rb_braised_beef",
        name: "Томлёная говядина",
        desc: "Бекон, капуста двух видов, чеддер, соус ранч, вишнёвый барбекю, ворчестер. Подаём на выбор с халапеньо или без",
        weight: "370 г",
        price: 760,
      },
    ],
  },

  {
    id: "pizza_tomato",
    title: "РИМСКАЯ ПИЦЦА — На томатном соусе",
    items: [
      {
        id: "pz_meat",
        name: "Мясная",
        desc: "Пепперони, бекон, свиной окорок, моцарелла, оливки, оливковое масло, базилик",
        weight: "485 г",
        price: 980,
      },
      {
        id: "pz_ham_mushrooms",
        name: "Ветчина и грибы",
        desc: "Ветчина, моцарелла, шампиньоны, черри, пармезан, рукола, песто, трюфельное масло",
        weight: "510 г",
        price: 880,
      },
      {
        id: "pz_margherita",
        name: "Маргарита",
        desc: "Моцарелла, вяленые томаты, базилик",
        weight: "370 г",
        price: 650,
      },
      {
        id: "pz_bbq",
        name: "Барбекю",
        desc: "Митболы, колбаски чоризо, чеддер, печёный перец, красный лук, соус барбекю, лук фри",
        weight: "485 г",
        price: 830,
      },
      {
        id: "pz_chicken_bbq",
        name: "Кура барбекю",
        desc: "Моцарелла, курица в специях, бекон, красный лук, соус барбекю, петрушка",
        weight: "465 г",
        price: 810,
      },
      {
        id: "pz_hellboy",
        name: "Хеллбой",
        desc: "Пепперони, печёный перец, моцарелла, мёд, песто, халапеньо, базилик",
        weight: "450 г",
        price: 790,
      },
      {
        id: "pz_double_pepperoni",
        name: "Дабл пепперони",
        desc: "Моцарелла, пепперони, оливковое масло, базилик",
        weight: "405 г",
        price: 760,
      },
    ],
  },

  {
    id: "pizza_cream",
    title: "РИМСКАЯ ПИЦЦА — На сливочном соусе",
    items: [
      {
        id: "pz_pear_gorg",
        name: "Груша–горгондзола",
        desc: "Моцарелла, горгондзола, груша, мята, грецкие орехи, трюфельное масло",
        weight: "455 г",
        price: 890,
      },
      {
        id: "pz_mushroom",
        name: "Грибная",
        desc: "Шампиньоны, вешенки, моцарелла, черри, лук, пармезан, рукола, трюфельное масло",
        weight: "460 г",
        price: 780,
      },
      {
        id: "pz_shrimp",
        name: "Креветка",
        desc: "Моцарелла, креветки, черри, пармезан, чесночное масло, рукола, устричный соус",
        weight: "510 г",
        price: 1100,
      },
      {
        id: "pz_four_cheese",
        name: "Четыре сыра",
        desc: "Моцарелла, чеддер, горгондзола, пармезан, грецкие орехи, мята",
        weight: "420 г",
        price: 950,
      },
    ],
  },

  {
    id: "focaccia",
    title: "ФОКАЧЧА",
    items: [
      {
        id: "foc_pesto",
        name: "С песто и базиликом",
        desc: "",
        weight: "130 г",
        price: 260,
      },
      {
        id: "foc_oil_basil",
        name: "С оливковым маслом и базиликом",
        desc: "",
        weight: "130 г",
        price: 250,
      },
    ],
  },

  {
    id: "salads",
    title: "САЛАТЫ",
    items: [
      {
        id: "sal_caesar_chicken",
        name: "Цезарь с куриным филе",
        desc: "Романо, томаты черри, пармезан, гренки, соус цезарь",
        weight: "245 г",
        price: 590,
      },
      {
        id: "sal_caesar_shrimp",
        name: "Цезарь с креветками",
        desc: "Романо, томаты черри, пармезан, гренки, соус цезарь",
        weight: "265 г",
        price: 790,
      },
      {
        id: "sal_coleslaw",
        name: "Коулсло",
        desc: "Капуста двух видов, морковь, сметанный соус, мёд, горчица, чеснок, копчёная паприка",
        weight: "135 г",
        price: 250,
      },
      {
        id: "sal_shrimp_tomyam",
        name: "Креветка ям",
        desc: "Романо, рукола, обжаренные креветки, черри, мёд, соус том ям, кунжут, оливковое масло",
        weight: "265 г",
        price: 790,
      },
      {
        id: "sal_a_ya_tomat",
        name: "А я томат",
        desc: "Рукола, вяленые томаты, красный лук, оливковое масло",
        weight: "75 г",
        price: 250,
      },
    ],
  },

  {
    id: "soups",
    title: "СУПЫ",
    items: [
      {
        id: "soup_ramen",
        name: "Рамен",
        desc: "Пшеничная лапша, куриное филе в специях, маринованное яйцо",
        weight: "450 г",
        price: 390,
      },
      {
        id: "soup_borscht",
        name: "Борщ",
        desc: "С отборной говядиной, подаём с чесночными гренками и сметаной",
        weight: "450|70|40 г",
        price: 450,
      },
      {
        id: "soup_tomyam",
        name: "Том ям",
        desc: "Креветки, черри, вешенки, острый чили, рис, лайм",
        weight: "450|100|10 г",
        price: 690,
      },
    ],
  },

  {
    id: "wings",
    title: "КРЫЛЬЯ КУРИНЫЕ",
    items: [
      {
        id: "wing_breaded",
        name: "В хрустящей панировке",
        desc: "С чесночным соусом",
        weight: "250|40 г",
        price: 490,
      },
      {
        id: "wing_5spices",
        name: "Пять специй",
        desc: "С морковью, сельдереем и чесночным соусом",
        weight: "290|150|40 г",
        price: 650,
      },
      {
        id: "wing_many_5spices",
        name: "Много крыльев «5 специй»",
        desc: "Морковь, сельдерей, соусы: чесночный, ранч, чили",
        weight: "870|150|120 г",
        price: 1900,
      },
    ],
  },

  {
    id: "beer_set",
    title: "ПИВНОЙ СЕТ",
    items: [
      {
        id: "beer_set",
        name: "Пивной сет",
        desc: "Крылья, луковые кольца, сырные палочки, картофель фри, миндаль, начос, соусы: дзадзыки, кетчуп, ранч",
        weight: "825|120 г",
        price: 1490,
      },
    ],
  },

  {
    id: "hot_snacks",
    title: "ГОРЯЧИЕ ЗАКУСКИ",
    items: [
      // Раздетые креветки перенесены сюда ✅
      {
        id: "shrimp_naked_cheese_sauce",
        name: "Креветки в сырном соусе",
        desc: "С пармезаном и толикой чесночного масла, подаём с фокаччей",
        weight: "250|50 г",
        price: 1090,
      },

      {
        id: "hot_squid_rings",
        name: "Кольца кальмара",
        desc: "С соусом ранч",
        weight: "200|40 г",
        price: 560,
      },
      {
        id: "hot_fish_chips",
        name: "Фиш энд чипс",
        desc: "С соусом дзадзыки",
        weight: "130|165|40 г",
        price: 730,
      },
      {
        id: "hot_camembert",
        name: "Печёный камамбер",
        desc: "С фокаччей",
        weight: "125|50 г",
        price: 730,
      },
      {
        id: "hot_shrimp_shell",
        name: "Креветки в панцире",
        desc: "Обжаренные, с соевым соусом и лимоном",
        weight: "250|40 г",
        price: 1050,
      },
      {
        id: "hot_nuggets",
        name: "Наггетсы куриные",
        desc: "С кетчупом",
        weight: "200|40 г",
        price: 380,
      },
      {
        id: "hot_fries",
        name: "Картофель фри",
        desc: "С кетчупом",
        weight: "165|40 г",
        price: 290,
      },
      {
        id: "hot_idaho",
        name: "Картофель айдахо",
        desc: "С кетчупом",
        weight: "165|40 г",
        price: 290,
      },
      {
        id: "hot_cheese_sticks",
        name: "Сырные палочки",
        desc: "С брусничным соусом",
        weight: "190|40 г",
        price: 490,
      },
      {
        id: "hot_onion_rings",
        name: "Луковые кольца",
        desc: "С чесночным соусом",
        weight: "120|40 г",
        price: 290,
      },
      {
        id: "hot_halloumi",
        name: "Сыр халуми-гриль",
        desc: "С мёдом",
        weight: "200|40 г",
        price: 650,
      },
      {
        id: "hot_croutons",
        name: "Бородинские гренки",
        desc: "С чесночным соусом",
        weight: "140|40 г",
        price: 250,
      },
      {
        id: "hot_sweetpotato_fries",
        name: "Батат фри",
        desc: "С пармезаном и соусом дзадзыки",
        weight: "170|40 г",
        price: 480,
      },
      {
        id: "hot_nachos_cheese",
        name: "Начос в сыре",
        desc: "С халапеньо и соусом чеддер",
        weight: "135|50 г",
        price: 450,
      },
      {
        id: "hot_breaded_shrimp",
        name: "Креветки в панировке",
        desc: "С соусом ранч",
        weight: "200|40 г",
        price: 790,
      },
    ],
  },

  {
    id: "cold_snacks",
    title: "ХОЛОДНЫЕ ЗАКУСКИ",
    items: [
      {
        id: "cold_guacamole_nachos",
        name: "Гуакамоле с начос",
        desc: "",
        weight: "120|100 г",
        price: 450,
      },
      {
        id: "cold_pickled_egg",
        name: "Яйцо маринованное",
        desc: "",
        weight: "70 г",
        price: 130,
      },
      {
        id: "cold_poultry_knots",
        name: "Кнуты из птицы",
        desc: "",
        weight: "75 г",
        price: 450,
      },
      {
        id: "cold_carrot_celery",
        name: "Морковь и сельдерей",
        desc: "С соусом блю чиз",
        weight: "80|70|40 г",
        price: 390,
      },
      {
        id: "cold_olives_godz",
        name: "Оливки годзиллы",
        desc: "",
        weight: "100 г",
        price: 390,
      },
      {
        id: "cold_gherkins",
        name: "Корнишоны",
        desc: "",
        weight: "150 г",
        price: 250,
      },
    ],
  },

  {
    id: "snacks_dried",
    title: "СНЕКИ / ВЯЛЕНОЕ",
    items: [
      { id: "sn_fistashki", name: "Фисташки", desc: "", weight: "100 г", price: 390 },
      { id: "sn_pretzels", name: "Крендельки", desc: "", weight: "50 г", price: 120 },
      { id: "sn_salted_nuts", name: "Солёные орехи", desc: "", weight: "100 г", price: 260 },

      // Джерки от Серёги
      {
        id: "jerky_beef_adjika",
        name: "Джерки: говядина (аджика, томат, укроп)",
        desc: "Джерки от Серёги",
        weight: "40 г",
        price: 490,
      },
      {
        id: "jerky_jalapeno_paprika",
        name: "Джерки: халапеньо, паприка, кайенский перец",
        desc: "Джерки от Серёги",
        weight: "40 г",
        price: 490,
      },
      {
        id: "jerky_blackpepper",
        name: "Джерки: чёрный перец, тмин, терияки",
        desc: "Джерки от Серёги",
        weight: "40 г",
        price: 490,
      },

      // Вяленые
      { id: "dried_biltong", name: "Билтонг (говядина)", desc: "Вяленые", weight: "45 г", price: 580 },
      { id: "dried_basturma", name: "Бастурма (говядина)", desc: "Вяленые", weight: "45 г", price: 580 },
      { id: "dried_deer", name: "Сыровяленая оленина", desc: "Вяленые", weight: "50 г", price: 580 },
    ],
  },

  {
  id: "sauces",
  title: "СОУСЫ",
  items: [
    { id: "sauce_bbq", name: "Барбекю", desc: "", weight: "40 г", price: 100 },
    { id: "sauce_bavarian_mustard", name: "Баварская горчица", desc: "", weight: "40 г", price: 100 },
    { id: "sauce_lingonberry", name: "Брусничный", desc: "", weight: "40 г", price: 100 },
    { id: "sauce_tzatziki", name: "Дзадзыки", desc: "", weight: "40 г", price: 100 },
    { id: "sauce_chili", name: "Чили", desc: "", weight: "40 г", price: 100 },
    { id: "sauce_guacamole", name: "Гуакамоле", desc: "", weight: "40 г", price: 100 },
    { id: "sauce_cheese", name: "Сырный", desc: "", weight: "40 г", price: 100 },
    { id: "sauce_soy", name: "Соевый", desc: "", weight: "40 г", price: 100 },
    { id: "sauce_cheddar", name: "Чеддер", desc: "", weight: "40 г", price: 100 },
    { id: "sauce_ketchup", name: "Кетчуп", desc: "", weight: "40 г", price: 100 },
    { id: "sauce_ranch", name: "Ранч", desc: "", weight: "40 г", price: 100 },
    { id: "sauce_caesar", name: "Цезарь", desc: "", weight: "40 г", price: 100 },
    { id: "sauce_garlic", name: "Чесночный", desc: "", weight: "40 г", price: 100 },
    { id: "sauce_tom_yam", name: "Том ям", desc: "", weight: "40 г", price: 100 },
    { id: "sauce_blue_cheese", name: "Блю чиз", desc: "", weight: "40 г", price: 100 },
    { id: "sauce_sour_cream", name: "Сметана", desc: "", weight: "40 г", price: 100 },
    { id: "sauce_cherry_bbq", name: "Вишнёвый барбекю", desc: "", weight: "40 г", price: 100 },
    { id: "sauce_pepper", name: "Перечный", desc: "", weight: "40 г", price: 100 }
  ],
},
]
