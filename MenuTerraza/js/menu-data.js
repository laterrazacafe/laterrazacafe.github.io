/* eslint-disable */
const menuData = {

  bebidasCalientes: {
    label: 'Bebidas Calientes',
    groups: [
      {
        name: 'Cappuccino',
        sizes: true,
        items: [
          { name: 'Cappuccino Clásico',   ch: 55,  med: 70,  gra: 80  },
          { name: 'Cappuccino Vanilla',   ch: 65,  med: 70,  gra: 80  },
          { name: 'Cappuccino Avellana',  ch: 65,  med: 70,  gra: 80  },
          { name: 'Cappuccino Caramelo',  ch: 65,  med: 70,  gra: 80  },
          { name: 'Cappuccino Mocca',     ch: 65,  med: 70,  gra: 80  },
        ]
      },
      {
        name: 'Latte',
        sizes: true,
        items: [
          { name: 'Latte Chai',            ch: 45, med: 55, gra: 75   },
          { name: 'Latte Mocca',           ch: 45, med: 65, gra: 75   },
          { name: 'Latte Clásico',         ch: 45, med: 55, gra: 75    },
          { name: 'Latte Cajeta',          ch: 45, med: 55, gra: 75   },
          { name: 'Latte Caramelo',        ch: 45, med: 55, gra: 75   },
          { name: 'Latte Coco',            ch: 45, med: 55, gra: 75   },
          { name: 'Latte Cookies',         ch: 45, med: 55, gra: 75   },
          { name: 'Latte Fresas con Crema',ch: 45, med: 55, gra: 75   },
          { name: 'Latte Matcha',          ch: 45, med: 55, gra: 75   },
          { name: 'Latte Taro',            ch: 45, med: 55, gra: 75   },
          { name: 'Latte Vainilla',        ch: 45, med: 55, gra: 75   },
        ]
      },
      {
        name: 'Espresso & Americano',
        sizes: true,
        items: [
          { name: 'Espresso',   ch: 30, med: 40, gra: 50 },
          { name: 'Americano',  ch: 30, med: 35, gra: 40 },
        ]
      },
      {
        name: 'Tisanas',
        sizes: true,
        items: [
          { name: 'Tisana Fresa',             ch: 55, med: 65, gra: 75 },
          { name: 'Tisana Mango-Durazno',     ch: 55, med: 65, gra: 75 },
          { name: 'Tisana Manzana-Arándanos', ch: 55, med: 65, gra: 75 },
          { name: 'Tisana Moras del Bosque',  ch: 55, med: 65, gra: 75 },
          { name: 'Tisana Pétalos de Rosa',   ch: 55, med: 65, gra: 75 },
          { name: 'Tisana Ponche de Guayaba', ch: 55, med: 65, gra: 75 },
        ]
      },
    ]
  },

  bebidasFrias: {
    label: 'Bebidas Frías',
    groups: [
      {
        name: 'Frappe Estándar',
        sizes: true,
        items: [
          { name: 'Frappe Café',     ch: 60, med: 75, gra: 100 },
          { name: 'Frappe Chai',      ch: 60, med: 75, gra: 100 },
          { name: 'Frappe Matcha',    ch: 60, med: 75, gra: 100 },
          { name: 'Frappe Taro',      ch: 60, med: 75, gra: 100 },
          { name: 'Frappe Cajeta',    ch: 60, med: 75, gra: 100 },
          { name: 'Frappe Caramelo',  ch: 60, med: 75, gra: 100 },
          { name: 'Frappe Coco',      ch: 60, med: 75, gra: 100 },
          { name: 'Frappe Mazapán', ch: 60, med: 75, gra: 100 },
          { name: 'Frappe Oreo',      ch: 60, med: 75, gra: 100 },
          { name: 'Frappe Vanilla',   ch: 60, med: 75, gra: 100 },
        ]
      },
      {
        name: 'Frappe Premium',
        sizes: true,
        items: [
          { name: 'Frappe Chocomenta',      ch: 85,  med: 100, gra: 135 },
          { name: 'Frappe Fresas con Crema',ch: 85,  med: 100, gra: 135 },
          { name: 'Frappe Cremax',          ch: 85,  med: 100, gra: 135 },
          { name: 'Frappe Gansito',         ch: 85,  med: 100, gra: 135 },
          { name: 'Frappe Moka',            ch: 85,  med: 100, gra: 135 },
          { name: 'Frappe Kinder Bueno',    ch: 100, med: 120, gra: 150 },
          { name: 'Frappe Pingüino',       ch: 100, med: 120, gra: 150 },
          { name: 'Frappe Magnum',          ch: 115, med: 135, gra: 165 },
          { name: 'Frappe Mordisco',        ch: 115, med: 135, gra: 165 },
        ]
      },
      {
        name: 'Italian Soda',
        sizes: true,
        items: [
          { name: 'Italian Soda Manzana Verde-Mango', ch: 60, med: 80, gra: 100 },
          { name: 'Italian Soda Fresa',               ch: 60, med: 80, gra: 100 },
          { name: 'Italian Soda Mora Azul',           ch: 60, med: 80, gra: 100 },
        ]
      },
      {
        name: 'Rocas',
        sizes: true,
        items: [
          { name: 'Rocas Cajeta',    ch: 60, med: 75, gra: 100 },
          { name: 'Rocas Caramelo',  ch: 60, med: 75, gra: 100 },
          { name: 'Rocas Matcha',    ch: 60, med: 75, gra: 100 },
          { name: 'Rocas Taro',      ch: 60, med: 75, gra: 100 },
          { name: 'Rocas Vainilla',  ch: 60, med: 75, gra: 100 },
        ]
      },
      {
        name: 'Smoothies',
        sizes: true,
        items: [
          { name: 'Smoothie Fresa',        ch: 70, med: 85, gra: 100 },
          { name: 'Smoothie Frutos Rojos', ch: 70, med: 85, gra: 100 },
          { name: 'Smoothie Mango',        ch: 70, med: 85, gra: 100 },
          { name: 'Smoothie Plátano',     ch: 70, med: 85, gra: 100 },
          { name: 'Smoothie Mora Azul',    ch: 70, med: 85, gra: 100 },
        ]
      },
      {
        name: 'Otras Bebidas',
        sizes: true,
        items: [
          { name: 'Limón-Sal Sparkling', ch: 35, med: 40, gra: 55   },
          { name: 'Agua Natural 500 ml',  ch: 12, med: null, gra: null },
        ]
      },
    ]
  },

  comida: {
    label: 'Comida',
    groups: [
      {
        name: '',
        sizes: false,
        items: [
          {
            name: 'Brisket Deluxe',
            precio: 75,
            desc: 'Tortita rellena de carne de res marinada estilo BBQ brisket, con aguacate, lechuga y tomate.'
          },
          {
            name: 'Papa Carne',
            precio: 85,
            desc: 'Papitas caseras, carne seca, con pepino y cacahuate (opcional), salsa casera, Valentina, jugo Maggi y limón.'
          },
          {
            name: 'Papas Caseras',
            precio: 30
          },
        ]
      }
    ]
  },

  postres: {
    label: 'Postres',
    groups: [
      {
        name: '',
        sizes: false,
        items: [
          { name: 'Brownie Grande',    precio: 45  },
          { name: 'Choco Flan',        precio: 50  },
          { name: 'Galleta Chispas',   precio: 20  },
          { name: 'Rol de Canela',     precio: 75  },
          { name: 'Strudel',           precio: 55  },
          { name: 'Pastel',            precio: 60  },
          { name: 'Pastel 3 Leches',   precio: 35  },
          { name: 'Pastel Zanahoria',  precio: 85  },
          { name: 'Pastel Chocolate',  precio: 100 },
          { name: 'Pay Limón',       precio: 75  },
          { name: 'Waffles',           precio: 95  },
        ]
      }
    ]
  },

};
