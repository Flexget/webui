import React, { FC, useEffect } from 'react';
import { Check } from '@mui/icons-material';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithWrapper } from 'utils/tests';
import {
  useInjectPageTitle,
  useInjectContent,
  useContextualAppBar,
  ContextualProps,
} from './hooks';
import AppBar from './index';

describe('core/layout/AppBar', () => {
  it('calls toggle when the hamburger button is pressed', () => {
    const toggle = jest.fn();
    renderWithWrapper(<AppBar toggleSidebar={toggle} />);

    fireEvent.click(screen.getByRole('button', { name: 'toggle sidebar' }));

    expect(toggle).toHaveBeenCalled();
  });

  it('renders correct title', () => {
    renderWithWrapper(<AppBar toggleSidebar={jest.fn()} />);

    expect(screen.getByText('Flexget Manager')).toBeInTheDocument();
  });

  describe('injectable app bar', () => {
    it('will render overriden title', () => {
      const OverrideTitle: FC = () => {
        useInjectPageTitle('New Title');
        return null;
      };

      renderWithWrapper(
        <>
          <AppBar toggleSidebar={jest.fn()} />
          <OverrideTitle />
        </>,
      );

      expect(screen.getByText('New Title')).toBeInTheDocument();
    });

    it('will render additional content', () => {
      const injectedContent = <div>Hello</div>;
      const OverrideContent: FC = () => {
        useInjectContent(injectedContent);
        return null;
      };

      renderWithWrapper(
        <>
          <AppBar toggleSidebar={jest.fn()} />
          <OverrideContent />
        </>,
      );

      expect(screen.getByText('Hello')).toBeInTheDocument();
    });
  });

  describe('contextual app bar', () => {
    interface Props {
      enabled?: boolean;
      contextualProps?: ContextualProps;
    }

    const Contextual: FC<Props> = ({ contextualProps, enabled = false }) => {
      const { setContextual } = useContextualAppBar(contextualProps);
      useEffect(() => {
        setContextual(enabled);
      }, [enabled, setContextual]);
      return null;
    };

    const onClose = jest.fn();

    const contextualProps: ContextualProps = {
      onClose,
      title: 'My Contextual Title',
      menuItems: [
        {
          name: 'My Icon',
          onClick: jest.fn(),
          Icon: Check,
        },
      ],
    };

    describe('enabled', () => {
      it('calls closeFn when the button is pressed', () => {
        renderWithWrapper(
          <>
            <AppBar toggleSidebar={jest.fn()} />
            <Contextual enabled contextualProps={contextualProps} />
          </>,
        );

        fireEvent.click(screen.getByRole('button', { name: 'close context' }));

        expect(onClose).toHaveBeenCalled();
      });

      it('renders normal content when no contextualProps are specified', () => {
        renderWithWrapper(
          <>
            <AppBar toggleSidebar={jest.fn()} />
            <Contextual enabled />
          </>,
        );

        expect(screen.getByText('Flexget Manager')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'My Icon' })).not.toBeInTheDocument();
      });
    });

    describe('not enabled', () => {
      it('renders normal content when not enabled', () => {
        renderWithWrapper(
          <>
            <AppBar toggleSidebar={jest.fn()} />
            <Contextual contextualProps={contextualProps} />
          </>,
        );

        expect(screen.getByText('Flexget Manager')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'My Icon' })).not.toBeInTheDocument();
      });
    });

    it('renders contextual content when enabled', () => {
      renderWithWrapper(
        <>
          <AppBar toggleSidebar={jest.fn()} />
          <Contextual enabled contextualProps={contextualProps} />
        </>,
      );

      expect(screen.getByRole('button', { name: 'My Icon' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'config editor' })).not.toBeInTheDocument();
    });
  });
});
