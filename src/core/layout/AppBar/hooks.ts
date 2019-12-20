import { useState, useEffect, useCallback } from 'react';
import { createContainer, useContainer } from 'unstated-next';
import { OverflowMenuProps } from './OverflowMenu';

export interface ContextualProps {
  menuItems?: OverflowMenuProps[];
  title?: string;
  onClose?: () => void;
}

const defaultTitle = 'Flexget Manager';

export const AppBarContainer = createContainer(() => {
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState<JSX.Element>();
  const [menuProps, setMenuProps] = useState<OverflowMenuProps[]>();
  const [contextualProps, setContextualProps] = useState<ContextualProps>();
  const [contextualMode, setContextual] = useState(false);

  return [
    { title, content, contextualProps, contextualMode, menuProps },
    { setTitle, setContent, setContextualProps, setContextual, setMenuProps },
  ] as const;
});

export const useInjectPageTitle = (title: string) => {
  const [, { setTitle }] = useContainer(AppBarContainer);

  const clear = useCallback(() => {
    setTitle(defaultTitle);
    document.title = defaultTitle;
  }, [setTitle]);

  useEffect(() => {
    setTitle(title);
    document.title = `${defaultTitle} - ${title}`;
  }, [setTitle, title]);

  return clear;
};

export const useInjectContent = (content: JSX.Element) => {
  const [, { setContent }] = useContainer(AppBarContainer);

  useEffect(() => {
    setContent(content);

    return () => setContent(undefined);
  }, [content, setContent]);
};

export const useSetMenuProps = (menuProps: OverflowMenuProps[]) => {
  const [, { setMenuProps }] = useContainer(AppBarContainer);

  useEffect(() => {
    setMenuProps(menuProps);

    return () => setMenuProps(undefined);
  }, [menuProps, setMenuProps]);
};

export const useContextualAppBar = (props?: ContextualProps) => {
  const [, { setContextual, setContextualProps }] = useContainer(AppBarContainer);

  const clear = useCallback(() => {
    setContextualProps(undefined);
    setContextual(false);
  }, [setContextual, setContextualProps]);

  useEffect(() => {
    setContextualProps(props);

    return clear;
  }, [clear, props, setContextualProps]);

  return { setContextual, clear };
};
