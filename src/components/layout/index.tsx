import { Box, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { LayoutDashboard } from './dashboard';
import { routes } from '~/utils/routesPrivate';
import { subsMenu } from '~/types/routes';

interface layoutProps {
  children: ReactNode;
}

export const allRoutes = [
  {
    route: '/',
    product: 'panel',
  },
  {
    route: '/requests',
    product: 'requests',
  },
  {
    route: '/requests',
    product: 'requests_live',
  },
  {
    route: '/cozinha',
    product: 'requests_kitchen',
  },
  {
    route: '/pdv',
    product: 'requests_pdv',
  },
  {
    route: '/menu_digital',
    product: 'products',
  },
  {
    route: '/menu_digital',
    product: 'products_products',
  },
  {
    route: '/menu-qrcode',
    product: 'products_app_qrcode',
  },
  {
    route: '/coupon',
    product: 'discount',
  },
  {
    route: '/deliveryman',
    product: 'delivery',
  },
  {
    route: '/open-delivery',
    product: 'delivery_open',
  },
  {
    route: '/my-delivery',
    product: 'delivery_mine',
  },
  {
    route: '/closed-requests',
    product: 'delivery_finished',
  },
  {
    route: '/clients',
    product: 'clients',
  },
  {
    route: '/chatBot',
    product: 'chatbot',
  },
  {
    route: '/config',
    product: 'settings',
  },
  {
    route: '/hours',
    product: 'settings_workTime',
  },
  {
    route: '/payment',
    product: 'settings_paymentMethods',
  },
  {
    route: '/delivery',
    product: 'settings_delivery',
  },
  {
    route: '/welcome',
    product: 'settings_welcomePage',
  },
  {
    route: '/my-team',
    product: 'settings_myTeam',
  },
];

export function Layout({ children }: layoutProps) {
  const { asPath, query } = useRouter();
  const router = useRouter();
  const checkRoute = [
    '/login',
    '/register',
    '/receipt',
    `/activate/${query.hash}`,
    '/recovery',
    `/recovery-password/${query.hash}`,
    `/register-complete/${query.hash}`,
  ];

  const titleRoute = routes.find((item: any) => item.path === asPath);

  const routeItem = allRoutes.find((item) => item.route === asPath);
  console.log(routeItem, 'ROUTE');

  // if (!hasPermission && asPath !== '/404') {
  //   router.push('/404');
  //   return null;
  // }

  return (
    <Box>
      {checkRoute.includes(asPath) ? (
        children
      ) : (
        <LayoutDashboard title={titleRoute?.title || ''}>
          {children}
        </LayoutDashboard>
      )}
    </Box>
  );
}
