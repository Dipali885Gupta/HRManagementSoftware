import type { PagedResultRequestDto } from '@abp/ng.core';

export interface DownloadTokenResultDto extends DownloadTokenResultDtoBase {
}

export interface DownloadTokenResultDtoBase {
  token?: string;
}

export interface LookupDto<TKey> extends LookupDtoBase<TKey> {
}

export interface LookupDtoBase<TKey> {
  id: TKey;
  displayName?: string;
}

export interface LookupRequestDto extends LookupRequestDtoBase {
}

export interface LookupRequestDtoBase extends PagedResultRequestDto {
  filter?: string;
}
