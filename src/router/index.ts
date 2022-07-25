import { createRouter, createWebHistory, RouterView } from 'vue-router';
import type { RouterScrollBehavior } from 'vue-router';

import { ConstantsList } from '@/components/members/ConstantsList';
import { ComponentDetails } from '@/components/component/ComponentDetails';
import { ClassDetailsPage } from '@/components/class/ClassDetailsPage';
import { FunctionsList } from '@/components/methods/FunctionsList';
import { TypeDefsList } from '@/components/types/TypeDefsList';
import { ErrorPage } from '@/components/common/ErrorPage';
import { HomePage } from '@/components/common/HomePage';
import { PackageDetailsPage } from '@/components/packages/PackageDetailsPage';
import { PackagePage } from '@/components/packages/PackagePage';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },

  {
    path: '/packages/:package',
    name: 'package',
    component: PackagePage,
    meta: {
      hasRightSidebar: true
    },
    children: [
      {
        path: '',
        name: 'package.details',
        component: PackageDetailsPage
      },
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
        component: ClassDetailsPage
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage
  }
];

const history = createWebHistory(import.meta.env.BASE_URL);

const scrollBehavior: RouterScrollBehavior = (
  to,
  from,
  savedPosition
) => {
  if (savedPosition) {
    return savedPosition;
  }
  if (to.hash) {
    return { el: to.hash };
  }
  return { top: 0 };
}

export const router = createRouter({
  history,
  routes,
  scrollBehavior
});
