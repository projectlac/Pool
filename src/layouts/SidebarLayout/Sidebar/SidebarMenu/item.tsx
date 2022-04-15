import { FC, ReactNode, useState, useContext } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { SidebarContext } from 'src/contexts/SidebarContext';

import PropTypes from 'prop-types';
import { Button, Badge, Collapse, ListItem } from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface SidebarMenuItemProps {
  children?: ReactNode;
  link?: string;
  icon?: any;
  badge?: string;
  open?: boolean;
  active?: boolean;
  name: string;
}

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
  children,
  link,
  icon: Icon,
  badge,
  open: openParent,
  active,
  name,
  ...rest
}) => {
  const { toggleSidebar, localToggle } = useContext(SidebarContext);

  if (children) {
    return (
      <ListItem
        component="div"
        className="Mui-children"
        key={name}
        {...rest}
        sx={{
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '45px',
            height: '58%',
            background: `${
              localToggle
                ? 'transparent'
                : `${openParent ? '#e9ecef' : 'transparent'}`
            }`,
            right: '0',
            top: '10px',
            borderTopLeftRadius: '16px'
          },
          '& a': {
            color: `${
              localToggle ? 'transparent !important' : '#044b7e !important'
            }`
          }
        }}
      >
        <Button
          component={RouterLink}
          className={clsx({ 'Mui-Parent-active': openParent })}
          startIcon={Icon && <Icon />}
          to={link}
          endIcon={openParent ? <ArrowDropDownIcon /> : ''}
        >
          {name}
        </Button>
        {localToggle ? (
          ''
        ) : (
          <Collapse
            className={clsx({ 'Mui-active Mui-childList': openParent })}
            in={openParent}
            sx={{
              '& ul div:last-child': {
                position: 'relative'
              },
              '& ul div:last-child .Mui-active::before': {
                content: '""',
                position: 'absolute',
                width: '45px',
                height: '101%',
                background: '#e9ecef',
                right: '0',
                bottom: '2px',
                zIndex: '9'
              },
              '& ul div a': {
                fontSize: '1rem !important',
                paddingTop: '12px !important',
                paddingBottom: '12px !important'
              },
              '& ul .Mui-active': {
                backgroundColor: '#e9ecef !important',
                transition: `all 0s !important`
              }
            }}
          >
            {children}
          </Collapse>
        )}
      </ListItem>
    );
  }

  return (
    <ListItem component="div" key={name} {...rest}>
      <Button
        activeClassName="Mui-active"
        component={RouterLink}
        onClick={() => {
          toggleSidebar();
        }}
        to={link}
        startIcon={Icon && <Icon />}
      >
        {localToggle ? '' : name}

        {badge && <Badge badgeContent={badge} />}
      </Button>
    </ListItem>
  );
};

SidebarMenuItem.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  link: PropTypes.string,
  icon: PropTypes.elementType,
  badge: PropTypes.string,
  open: PropTypes.bool,
  name: PropTypes.string.isRequired
};

SidebarMenuItem.defaultProps = {
  open: false,
  active: false
};

export default SidebarMenuItem;
