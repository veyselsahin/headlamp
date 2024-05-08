import { SvgIcon, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import React, { isValidElement, ReactElement } from 'react';
import { getThemeName } from '../../lib/themes';
import { useTypedSelector } from '../../redux/reducers/reducers';
import { ReactComponent as LogoDark } from '../../resources/icon-dark.svg';
import { ReactComponent as LogoLight } from '../../resources/icon-light.svg';
import { ReactComponent as LogoWithTextDark } from '../../resources/logo-dark.svg';
import { ReactComponent as LogoWithTextLight } from '../../resources/logo-light.svg';
import EmptyContent from '../common/EmptyContent';
import ErrorBoundary from '../common/ErrorBoundary';

export interface AppLogoProps {
  /** The size of the logo. 'small' for in mobile view, and 'large' for tablet and desktop sizes. By default the 'large' is used. */
  logoType?: 'small' | 'large';
  /** User selected theme. By default it checks which is is active. */
  themeName?: 'dark' | 'light';
  /** A class to use on your SVG. */
  className?: string;
  /** SxProps to use on your SVG. */
  sx?: SxProps<Theme>;
  [key: string]: any;
}

export type AppLogoType =
  | React.ComponentType<AppLogoProps>
  | ReactElement
  | typeof React.Component
  | null;

export default function OriginalAppLogo(props: AppLogoProps) {
  const { sx, className, logoType, themeName } = props;

  return (
    <SvgIcon
      sx={sx}
      className={className}
      component={
        logoType === 'large'
          ? themeName === 'dark'
            ? LogoWithTextLight
            : LogoWithTextDark
          : themeName === 'dark'
          ? LogoLight
          : LogoDark
      }
      viewBox="0 0 auto 32"
    />
  );
}

export function AppLogo(props: AppLogoProps) {
  const { logoType = 'large', themeName = getThemeName() } = props;
  const arePluginsLoaded = useTypedSelector(state => state.plugins.loaded);
  const PluginAppLogoComponent = useTypedSelector(state => state.theme.logo);
  const PluginAppLogoComp = PluginAppLogoComponent as typeof React.Component;

  // Till all plugins are not loaded show empty content for logo as we might have logo coming from a plugin
  if (!arePluginsLoaded) {
    return <EmptyContent />;
  }

  return PluginAppLogoComponent ? (
    <ErrorBoundary>
      {isValidElement(PluginAppLogoComponent) ? (
        // If it's an element, just use it.
        PluginAppLogoComponent
      ) : (
        // It is a component, so we make it here.
        <PluginAppLogoComp
          logoType={logoType}
          themeName={themeName}
          sx={{ height: '32px', width: 'auto' }}
        />
      )}
    </ErrorBoundary>
  ) : (
    <OriginalAppLogo
      logoType={logoType}
      themeName={themeName}
      sx={{ height: '32px', width: 'auto' }}
    />
  );
}
