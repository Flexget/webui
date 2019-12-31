declare module 'react-infinite-scroller' {
  export interface InfiniteScrollProps extends React.HTMLProps<InfiniteScroll> {
    element?: string;
    hasMore?: boolean;
    initialLoad?: boolean;
    isReverse?: boolean;
    loadMore(page: number): void;
    pageStart?: number;
    threshold?: number;
    useCapture?: boolean;
    useWindow?: boolean;
    loader?: React.ReactElement;
    getScrollParent?(): HTMLElement | null;
  }

  export default class InfiniteScroll extends React.Component<InfiniteScrollProps> {
    pageLoaded: number;

    getParentElement(elem?: HTMLElement | null): HTMLElement | undefined | null;
  }
}
