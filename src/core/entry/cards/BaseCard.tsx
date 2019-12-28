import React, { FC, useCallback } from 'react';
import { css } from '@emotion/core';
import { CardMedia, Theme, CardContent } from '@material-ui/core';
import { getCachedUrl } from 'utils/image';
import { Skeleton } from '@material-ui/lab';

interface Props {
  images?: string[] | string;
  isPoster?: boolean;
  className?: string;
  label: string;
  loading?: boolean;
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

const text = css`
  height: 1.4rem;
  width: 100%;
`

const summary = (theme: Theme) =>  css`
  height: 1.4rem;
  width: 25%;
  margin: ${theme.typography.pxToRem(theme.spacing(2))} 0;
`

const header = (theme: Theme) =>  css`
  width: 70%;
  margin-bottom: ${theme.typography.pxToRem(theme.spacing(1))};
`

const BaseCard: FC<Props> = ({ images, label, isPoster = false, children, className, loading = false }) => {
  const imageCss = useCallback((theme: Theme) => [image, isPoster && poster(theme)], [isPoster]);

  const imageUrl = images && Array.isArray(images) ? images[0] : images;
  return (
    <div className={className}>

      {loading ? (
        <Skeleton variant="rect" css={imageCss} />
      ) :
        !!imageUrl && (
        <CardMedia
          css={imageCss}
          component={isPoster ? 'img' : 'div'}
          role="img"
          aria-label={label}
          image={getCachedUrl(imageUrl)}
          title={label}
        />
      )}
          <CardContent>{loading ? (
            <>
              <Skeleton  css={header} />
              <Skeleton css={summary} />
              <Skeleton  css={text} />
              <Skeleton  css={text} />
              <Skeleton  css={text} />
            </>
          ) : children}</CardContent>
    </div>
  );
};

export default BaseCard;
