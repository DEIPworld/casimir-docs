import { createRouter, createWebHashHistory, RouterView } from 'vue-router';
import ConstantDetails from '../views/ConstantDetails';
import HomeView from '../views/HomeView';
import ComponentDetails from '../views/ComponentDetails';
import ClassDetails from '../views/ClassDetails';
import FunctionDetails from '../views/FunctionDetails';
import NotFound from '../views/NotFound';
import TypeDefsDetails from '../views/TypeDefsDetails';

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
        component: ConstantDetails
      },
      {
        path: 'functions',
        name: 'package.functions',
        component: FunctionDetails
      },
      {
        path: 'typedefs',
        name: 'package.typedefs',
        component: TypeDefsDetails
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
