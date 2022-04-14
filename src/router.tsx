import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
// import { PartialRouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

//Authentication

const Login = Loader(lazy(() => import('src/content/authentication/Login')));
const ForgotPassword = Loader(
  lazy(() => import('src/content/authentication/ForgotPassword'))
);

// Pages

// const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications

const ContentPack = Loader(
  lazy(() => import('src/content/applications/ContentPack'))
);
const Survey = Loader(lazy(() => import('src/content/applications/Survey')));
const AddContentPack = Loader(
  lazy(() => import('src/content/applications/ContentPack/Add/index'))
);

const AddSurvey = Loader(
  lazy(() => import('src/content/applications/Survey/Add/index'))
);

// const UserProfile = Loader(
//   lazy(() => import('src/content/applications/Users/profile'))
// );
// const UserSettings = Loader(
//   lazy(() => import('src/content/applications/Users/settings'))
// );

// Components

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes = (isLogin) => [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: isLogin ? (
          <Navigate
            to={`${process.env.REACT_APP_BASE_NAME}/dashboards`}
            replace
          />
        ) : (
          <Navigate to={`${process.env.REACT_APP_BASE_NAME}/login`} replace />
        )
      },

      {
        path: 'status',
        children: [
          {
            path: '/',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: isLogin ? (
      <SidebarLayout />
    ) : (
      <Navigate to={`${process.env.REACT_APP_BASE_NAME}/login`} replace />
    ),
    children: [
      {
        path: '/',
        element: <Crypto />
      }
    ]
  },
  {
    path: 'content-pack',
    element: isLogin ? (
      <SidebarLayout />
    ) : (
      <Navigate to={`${process.env.REACT_APP_BASE_NAME}/login`} replace />
    ),

    children: [
      {
        path: '/',
        element: <ContentPack />
      },
      {
        path: '/add',
        element: <AddContentPack />
      }
    ]
  },
  {
    path: 'survey',
    element: isLogin ? (
      <SidebarLayout />
    ) : (
      <Navigate to={`${process.env.REACT_APP_BASE_NAME}/login`} replace />
    ),

    children: [
      {
        path: '/',
        element: <Survey />
      },
      {
        path: '/add',
        element: <AddSurvey />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'forgot-password',
    element: <ForgotPassword />
  }
];

export default routes;
