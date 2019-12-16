import { useState, useEffect, useCallback, ComponentType } from 'react';
import { createContainer, useContainer } from 'unstated-next';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';
import { Operation } from './types';

interface IconProps {
  name: string;
  onClick: () => void;
  Icon: ComponentType;
}

export interface ContextualProps {
  icons?: IconProps[];
  title?: string;
  onClose?: () => void;
}

const defaultTitle = 'Flexget Manager';

export const AppBarContainer = createContainer(() => {
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState<JSX.Element>();
  const [contextualProps, setContextualProps] = useState<ContextualProps>();
  const [contextualMode, setContextual] = useState(false);

  return [
    { title, content, contextualProps, contextualMode },
    { setTitle, setContent, setContextualProps, setContextual },
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

  const clear = useCallback(() => setContent(undefined), [setContent]);

  useEffect(() => {
    setContent(content);

    return clear;
  }, [clear, content, setContent]);

  return clear;
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
