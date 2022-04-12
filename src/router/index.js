import { createRouter, createWebHashHistory, RouterView } from 'vue-router';
import HomeView from '../views/HomeView';
import { ConstantsList } from '../views/ConstantsList';
import { ComponentDetails } from '../views/ComponentDetails';
import { ClassDetails } from '../views/ClassDetails';
import { FunctionsList } from '../views/FunctionsList';
import { TypeDefsList } from '../views/TypeDefsList';
import NotFound from '../views/NotFound';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/packages/:package',
    name: 'package',
    component: RouterView,
    children: [
      {
        path: 'constants',
        name: 'package.constants',
        component: ConstantsList
      },
      {
        path: 'functions',
        name: 'package.functions',
        component: FunctionsList
      },
      {
        path: 'typedefs',
        name: 'package.typedefs',
        component: TypeDefsList
      },
      {
        path: 'components/:component',
        name: 'package.component',
        component: ComponentDetails
      },
      {
        path: 'classes/:class',
        name: 'package.class',
        component: ClassDetails
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
