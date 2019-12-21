import React, { FC, useCallback } from 'react';
import { css } from '@emotion/core';
import { CardMedia, Theme, CardContent } from '@material-ui/core';
import { getCachedUrl } from 'utils/image';

interface Props {
  images?: string[] | string;
  isPoster?: boolean;
  className?: string;
  label: string;
}

const image = css`
  min-height: 30rem;
`;

const poster = (theme: Theme) => css`
  width: 55%;
  float: left;
  padding-right: ${theme.typography.pxToRem(theme.spacing(2))};
  padding-bottom: ${theme.typography.pxToRem(theme.spacing(2))};
  ${theme.breakpoints.up('sm')} {
    width: 40%;
  }
`;

const BaseCard: FC<Props> = ({ images, label, isPoster = false, children, className }) => {
  const imageCss = useCallback((theme: Theme) => [image, isPoster && poster(theme)], [isPoster]);

  const imageUrl = images && Array.isArray(images) ? images[0] : images;
  return (
    <div className={className}>
      {!!imageUrl && (
        <CardMedia
          css={imageCss}
          component={isPoster ? 'img' : 'div'}
          role="img"
          aria-label={label}
          image={getCachedUrl(imageUrl)}
          title={label}
        />
      )}
      <CardContent>{children}</CardContent>
    </div>
  );
};

export default BaseCard;
