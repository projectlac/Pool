import { Suspense, lazy, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
// import { PartialRouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import jwt_decode from 'jwt-decode';

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
const EditContentPack = Loader(
  lazy(() => import('src/content/applications/ContentPack/Add/index'))
);

const AddSurvey = Loader(
  lazy(() => import('src/content/applications/Survey/Add/index'))
);
const EditSurvey = Loader(
  lazy(() => import('src/content/applications/Survey/Add/index'))
);
const User = Loader(lazy(() => import('src/content/applications/User')));
const AddUser = Loader(
  lazy(() => import('src/content/applications/User/Add/index'))
);
const EditUser = Loader(
  lazy(() => import('src/content/applications/User/Add/index'))
);

const Individual = Loader(
  lazy(() => import('src/content/applications/Outlet/Individual'))
);
const AddIndividual = Loader(
  lazy(() => import('src/content/applications/Outlet/Individual/Add/index'))
);
const EditIndividual = Loader(
  lazy(() => import('src/content/applications/Outlet/Individual/Add/index'))
);

const Groups = Loader(
  lazy(() => import('src/content/applications/Outlet/Groups'))
);
const AddGroups = Loader(
  lazy(() => import('src/content/applications/Outlet/Groups/Add/index'))
);

const EditGroups = Loader(
  lazy(() => import('src/content/applications/Outlet/Groups/Add/index'))
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

const routes = (isLogin, role) => [
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
    path: 'outlet',
    element: isLogin ? (
      <SidebarLayout />
    ) : (
      <Navigate to={`${process.env.REACT_APP_BASE_NAME}/login`} replace />
    ),

    children: [
      {
        path: '/',
        element: (
          <Navigate
            to={`${process.env.REACT_APP_BASE_NAME}/outlet/groups`}
            replace
          />
        )
      },
      {
        path: '/groups',
        element: <Groups />
      },
      {
        path: '/groups/add',
        element: <AddGroups />
      },
      {
        path: '/groups/edit/:id',
        element: <EditGroups />
      },
      {
        path: '/individual',
        element: <Individual />
      },
      {
        path: '/individual/add',
        element: <AddIndividual />
      },
      {
        path: '/individual/edit/:id',
        element: <EditIndividual />
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
      },
      {
        path: '/edit/:id',
        element: <EditContentPack />
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
      },
      {
        path: '/edit/:id',
        element: <EditSurvey />
      }
    ]
  },
  {
    path: 'user',
    element: isLogin ? (
      role === 'Admin' ? (
        <SidebarLayout />
      ) : (
        <Navigate
          to={`${process.env.REACT_APP_BASE_NAME}/dashboards`}
          replace
        />
      )
    ) : (
      <Navigate to={`${process.env.REACT_APP_BASE_NAME}/login`} replace />
    ),

    children: [
      {
        path: '/',
        element: <User />
      },
      {
        path: '/add',
        element: <AddUser />
      },
      {
        path: '/edit/:id',
        element: <EditUser />
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
