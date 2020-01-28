// NOTE: See https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
// This is solution 2

/* eslint-disable no-bitwise,no-nested-ternary,no-plusplus */

function b64ToUint6(nChr: number) {
  return nChr > 64 && nChr < 91
    ? nChr - 65
    : nChr > 96 && nChr < 123
    ? nChr - 71
    : nChr > 47 && nChr < 58
    ? nChr + 4
    : nChr === 43
    ? 62
    : nChr === 47
    ? 63
    : 0;
}

function base64DecToArr(sBase64: string, nBlockSize?: number) {
  const sB64Enc = sBase64.replace(/[^A-Za-z0-9+/]/g, '');
  const nInLen = sB64Enc.length;
  const nOutLen = nBlockSize
    ? Math.ceil(((nInLen * 3 + 1) >>> 2) / nBlockSize) * nBlockSize
    : (nInLen * 3 + 1) >>> 2;
  const aBytes = new Uint8Array(nOutLen);

  for (
    let nMod3: number, nMod4: number, nUint24 = 0, nOutIdx = 0, nInIdx = 0;
    nInIdx < nInLen;
    nInIdx++
  ) {
    nMod4 = nInIdx & 3;
    nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << (18 - 6 * nMod4);
    if (nMod4 === 3 || nInLen - nInIdx === 1) {
      for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
        aBytes[nOutIdx] = (nUint24 >>> ((16 >>> nMod3) & 24)) & 255;
      }
      nUint24 = 0;
    }
  }

  return aBytes;
}

/* Base64 string to array encoding */

function uint6ToB64(nUint6: number) {
  return nUint6 < 26
    ? nUint6 + 65
    : nUint6 < 52
    ? nUint6 + 71
    : nUint6 < 62
    ? nUint6 - 4
    : nUint6 === 62
    ? 43
    : nUint6 === 63
    ? 47
    : 65;
}

function base64EncArr(aBytes: Uint8Array) {
  const eqLen = (3 - (aBytes.length % 3)) % 3;
  let sB64Enc = '';

  for (let nMod3: number, nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
    nMod3 = nIdx % 3;
    nUint24 |= aBytes[nIdx] << ((16 >>> nMod3) & 24);
    if (nMod3 === 2 || aBytes.length - nIdx === 1) {
      sB64Enc += String.fromCharCode(
        uint6ToB64((nUint24 >>> 18) & 63),
        uint6ToB64((nUint24 >>> 12) & 63),
        uint6ToB64((nUint24 >>> 6) & 63),
        uint6ToB64(nUint24 & 63),
      );
      nUint24 = 0;
    }
  }

  return eqLen === 0
    ? sB64Enc
    : sB64Enc.substring(0, sB64Enc.length - eqLen) + (eqLen === 1 ? '=' : '==');
}

/* UTF-8 array to DOMString and vice versa */

function UTF8ArrToStr(aBytes: Uint8Array) {
  let sView = '';

  for (let nPart: number, nLen = aBytes.length, nIdx = 0; nIdx < nLen; nIdx++) {
    nPart = aBytes[nIdx];
    sView += String.fromCharCode(
      nPart > 251 && nPart < 254 && nIdx + 5 < nLen /* six bytes */
        ? /* (nPart - 252 << 30) may be not so safe in ECMAScript! So...: */
          (nPart - 252) * 1073741824 +
            ((aBytes[++nIdx] - 128) << 24) +
            ((aBytes[++nIdx] - 128) << 18) +
            ((aBytes[++nIdx] - 128) << 12) +
            ((aBytes[++nIdx] - 128) << 6) +
            aBytes[++nIdx] -
            128
        : nPart > 247 && nPart < 252 && nIdx + 4 < nLen /* five bytes */
        ? ((nPart - 248) << 24) +
          ((aBytes[++nIdx] - 128) << 18) +
          ((aBytes[++nIdx] - 128) << 12) +
          ((aBytes[++nIdx] - 128) << 6) +
          aBytes[++nIdx] -
          128
        : nPart > 239 && nPart < 248 && nIdx + 3 < nLen /* four bytes */
        ? ((nPart - 240) << 18) +
          ((aBytes[++nIdx] - 128) << 12) +
          ((aBytes[++nIdx] - 128) << 6) +
          aBytes[++nIdx] -
          128
        : nPart > 223 && nPart < 240 && nIdx + 2 < nLen /* three bytes */
        ? ((nPart - 224) << 12) + ((aBytes[++nIdx] - 128) << 6) + aBytes[++nIdx] - 128
        : nPart > 191 && nPart < 224 && nIdx + 1 < nLen /* two bytes */
        ? ((nPart - 192) << 6) + aBytes[++nIdx] - 128 /* nPart < 127 ? */
        : /* one byte */
          nPart,
    );
  }

  return sView;
}

function strToUTF8Arr(sDOMStr: string) {
  const nStrLen = sDOMStr.length;
  let nArrLen = 0;

  /* mapping... */

  for (let nMapIdx = 0; nMapIdx < nStrLen; nMapIdx++) {
    const nChr = sDOMStr.charCodeAt(nMapIdx);
    nArrLen +=
      nChr < 0x80
        ? 1
        : nChr < 0x800
        ? 2
        : nChr < 0x10000
        ? 3
        : nChr < 0x200000
        ? 4
        : nChr < 0x4000000
        ? 5
        : 6;
  }

  const aBytes = new Uint8Array(nArrLen);

  /* transcription... */

  for (let nIdx = 0, nChrIdx = 0; nIdx < nArrLen; nChrIdx++) {
    const nChr = sDOMStr.charCodeAt(nChrIdx);
    if (nChr < 128) {
      /* one byte */
      aBytes[nIdx++] = nChr;
    } else if (nChr < 0x800) {
      /* two bytes */
      aBytes[nIdx++] = 192 + (nChr >>> 6);
      aBytes[nIdx++] = 128 + (nChr & 63);
    } else if (nChr < 0x10000) {
      /* three bytes */
      aBytes[nIdx++] = 224 + (nChr >>> 12);
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63);
      aBytes[nIdx++] = 128 + (nChr & 63);
    } else if (nChr < 0x200000) {
      /* four bytes */
      aBytes[nIdx++] = 240 + (nChr >>> 18);
      aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63);
      aBytes[nIdx++] = 128 + (nChr & 63);
    } else if (nChr < 0x4000000) {
      /* five bytes */
      aBytes[nIdx++] = 248 + (nChr >>> 24);
      aBytes[nIdx++] = 128 + ((nChr >>> 18) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63);
      aBytes[nIdx++] = 128 + (nChr & 63);
    } /* if (nChr <= 0x7fffffff) */ else {
      /* six bytes */
      aBytes[nIdx++] = 252 + (nChr >>> 30);
      aBytes[nIdx++] = 128 + ((nChr >>> 24) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 18) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63);
      aBytes[nIdx++] = 128 + (nChr & 63);
    }
  }

  return aBytes;
}

export const btoaUTF16 = (sString: string) => {
  return base64EncArr(strToUTF8Arr(sString));
};

export const atobUTF16 = (sBase64: string) => {
  return UTF8ArrToStr(base64DecToArr(sBase64));
};
