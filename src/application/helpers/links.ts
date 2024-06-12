import { BarChart, Clipboard, Layers } from "react-feather";

export const Links = [
  {
    id: 1,
    title: "Дашборд",
    href: "/",
    icon: Layers,
    subMenu: [{ id: 31321, title: "Блог", href: "/blog", icon: "" }],
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
        icon: "",
      },
      {
        id: 12,
        title: "Коммунальные услуги",
        href: "/opportunities/communal",
        icon: "",
      },
      {
        id: 13,
        title: "Номера и коды",
        href: "/opportunities/numbers-codes",
        icon: "",
      },
      {
        id: 14,
        title: "Это надо знать!",
        href: "/opportunities/need-to-know",
        icon: "",
      },
      {
        id: 15,
        title: "Информация о г. Ташкент",
        href: "/opportunities/info-tashkent",
        icon: "",
      },
    ],
  },
];
