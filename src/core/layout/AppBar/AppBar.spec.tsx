import React, { FC, useEffect } from 'react';
import { mount } from 'enzyme';
import { IconButton } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { BaseProviders } from 'utils/tests';
import AppBar from './index';
import {
  useInjectPageTitle,
  useInjectContent,
  useContextualAppBar,
  ContextualProps,
} from './hooks';

describe('core/layout/AppBar', () => {
  it('calls toggle when the hamburger button is pressed', () => {
    const toggle = jest.fn();
    const wrapper = mount(
      <BaseProviders>
        <AppBar toggleSidebar={toggle} />
      </BaseProviders>,
    );

    wrapper
      .findWhere(el => el.props()['aria-label'] === 'toggle sidebar' && el.type() === IconButton)
      .simulate('click');

    expect(toggle).toHaveBeenCalled();
  });

  it('renders correct title', () => {
    const wrapper = mount(
      <BaseProviders>
        <AppBar toggleSidebar={jest.fn()} />
      </BaseProviders>,
    );

    expect(wrapper.text()).toBe('Flexget Manager');
  });

  describe('injectable app bar', () => {
    it('will render overriden title', () => {
      const OverrideTitle: FC = () => {
        useInjectPageTitle('New Title');
        return null;
      };

      const wrapper = mount(
        <BaseProviders>
          <AppBar toggleSidebar={jest.fn()} />
          <OverrideTitle />
        </BaseProviders>,
      );

      expect(wrapper.text()).toBe('New Title');
    });

    it('will render additonal content', () => {
      const content = <div>Hello</div>;
      const OverrideContent: FC = () => {
        useInjectContent(content);
        return null;
      };

      const wrapper = mount(
        <BaseProviders>
          <AppBar toggleSidebar={jest.fn()} />
          <OverrideContent />
        </BaseProviders>,
      );

      expect(wrapper.text()).toInclude('Hello');
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
        const wrapper = mount(
          <BaseProviders>
            <AppBar toggleSidebar={jest.fn()} />
            <Contextual enabled contextualProps={contextualProps} />
          </BaseProviders>,
        );

        wrapper
          .findWhere(el => el.props()['aria-label'] === 'close context' && el.type() === IconButton)
          .simulate('click');

        expect(onClose).toHaveBeenCalled();
      });

      it('renders normal content when no contextualProps are specified', () => {
        const wrapper = mount(
          <BaseProviders>
            <AppBar toggleSidebar={jest.fn()} />
            <Contextual enabled />
          </BaseProviders>,
        );

        expect(wrapper.text()).toInclude('Flexget Manager');
        expect(
          wrapper
            .findWhere(el => el.props()['aria-label'] === 'My Icon' && el.type() === IconButton)
            .exists(),
        ).toBeFalse();
      });
    });
    describe('not enabled', () => {
      it('renders normal content when not enabled', () => {
        const wrapper = mount(
          <BaseProviders>
            <AppBar toggleSidebar={jest.fn()} />
            <Contextual contextualProps={contextualProps} />
          </BaseProviders>,
        );
        expect(wrapper.text()).toInclude('Flexget Manager');
        expect(
          wrapper
            .findWhere(el => el.props()['aria-label'] === 'My Icon' && el.type() === IconButton)
            .exists(),
        ).toBeFalse();
      });
    });

    it('render contextual content when enabled', () => {
      const wrapper = mount(
        <BaseProviders>
          <AppBar toggleSidebar={jest.fn()} />
          <Contextual enabled contextualProps={contextualProps} />
        </BaseProviders>,
      );

      expect(
        wrapper
          .findWhere(el => el.props()['aria-label'] === 'My Icon' && el.type() === IconButton)
          .exists(),
      ).toBeTrue();
      expect(
        wrapper
          .findWhere(el => el.props()['aria-label'] === 'config editor' && el.type() === IconButton)
          .exists(),
      ).toBeFalse();
    });
  });
});
