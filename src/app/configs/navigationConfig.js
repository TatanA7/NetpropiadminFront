import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'panel',
    title: 'Panel de Administración',
    type: 'group',
    icon: 'heroicons-outline:home',
    translate: 'PANEL',
    children: [
      {
        id: 'panel-dashboard',
        title: 'Panel',
        type: 'collapse',
        icon: 'heroicons-outline:cloud',
        translate: 'SUBPANEL',
        children: [
          {
            id: 'propertiesexample-component',
            title: 'Properties',
            translate: 'Propiedades',
            type: 'item',
            icon: 'heroicons-outline:star',
            url: 'properties',
          },
          {
            id: 'panel-inquilinos',
            title: 'Inquilinos',
            type: 'item',
            url: 'inquilinos',
            end: true,
          },
          {
            id: 'panel-transacciones',
            title: 'Transacciones',
            type: 'item',
            url: 'transacciones',
          },
          {
            id: 'panel-afectaciones',
            title: 'Afectaciones',
            type: 'item',
            url: 'afectaciones',
          },
        ],
      },
    ],
  },
];

export default navigationConfig;
