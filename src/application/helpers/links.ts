import {
  BarChart,
  Clipboard,
  Layers,
  Minus,
  Server,
  Sliders,
} from "react-feather";

export const Links = [
  {
    id: 1,
    title: "Дашборд",
    href: "/dashboard",
    icon: Layers,
  },
  {
    id: 2,
    title: "Статистика",
    href: "/statistic",
    icon: BarChart,
  },
  {
    id: 3,
    title: "Возможности",
    href: "#",
    icon: Clipboard,
    subMenu: [
      {
        id: 11,
        title: "Развлечения",
        href: `/opportunities/entertainment`,
        icon: Minus,
      },
      {
        id: 12,
        title: "Коммунальные услуги",
        href: "/opportunities/communal",
        icon: Minus,
      },
      {
        id: 13,
        title: "Номера и коды",
        href: "/opportunities/numbers-codes",
        icon: Minus,
      },
      {
        id: 14,
        title: "Это надо знать!",
        href: "/opportunities/need-to-know",
        icon: Minus,
      },
      {
        id: 15,
        title: "Информация о г. Ташкент",
        href: "/opportunities/info-tashkent",
        icon: Minus,
      },
    ],
  },

  {
    id: 4,
    title: "Организации",
    href: "#",
    icon: Server,
    subMenu: [
      {
        id: 44,
        title: "Запросы",
        href: "/organizations/requests",
        icon: Minus,
      },
      {
        id: 45,
        title: "Действия",
        href: "/organizations/actions",
        icon: Minus,
      },
      {
        id: 46,
        title: "Добавить организацию",
        href: "/organizations/addorg",
        icon: Minus,
      },
      {
        id: 47,
        title: "Мои организации",
        href: "/organizations/myorgs",
        icon: Minus,
      },
    ],
  },
  {
    id: 5,
    title: "Управление",
    href: "#",
    icon: Sliders,
    subMenu: [
      {
        id: 55,
        title: "Пользователи",
        href: "/manage/users",
        icon: Minus,
      },
      {
        id: 56,
        title: "Разделы",
        href: "/manage/razdel",
        icon: Minus,
      },
    ],
  },
];
