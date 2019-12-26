import { createContainer } from 'unstated-next';
import { useOverlayState } from 'utils/hooks';

export const OperationsContainer = createContainer(useOverlayState);
