import { useState, useEffect, useCallback, ElementType, ComponentType } from 'react';
import { createContainer, useContainer } from 'unstated-next';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';
import { Operation } from './types';

interface IconProps {
  name: string;
  onClick: () => void;
  Icon: ComponentType;
}

interface ContextualProps {
  enabled?: boolean;
  icons?: IconProps[];
  title?: string;
}

const defaultTitle = 'Flexget Manager';

export const AppBarContainer = createContainer(() => {
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState<ElementType>();
  const [contextualProps, setContextualProps] = useState<ContextualProps>();

  return [
    { title, content, contextualProps },
    { setTitle, setContent, setContextualProps },
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

export const useInjectContent = (content: ElementType) => {
  const [, { setContent }] = useContainer(AppBarContainer);

  const clear = useCallback(() => setContent(undefined), [setContent]);

  useEffect(() => {
    setContent(content);

    return clear;
  }, [clear, content, setContent]);

  return clear;
};

export const useContextualNav = (enabled: boolean, props: Omit<ContextualProps, 'enabled'>) => {
  const [, { setContextualProps }] = useContainer(AppBarContainer);

  const clear = useCallback(() => setContextualProps(undefined), [setContextualProps]);

  useEffect(() => {
    setContextualProps({ enabled, ...props });

    return clear;
  }, [clear, enabled, props, setContextualProps]);

  return clear;
};

export const useServerOperation = (operation: Operation, onSuccess = () => {}) => {
  const [state, request] = useFlexgetAPI('/server/manage', Method.Post);
  const makeRequest = useCallback(async () => {
    const resp = await request({ operation });
    if (resp.ok) {
      onSuccess();
    }
  }, [onSuccess, operation, request]);

  return [state, makeRequest] as const;
};
