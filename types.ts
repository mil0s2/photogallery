export interface IPhoto {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  url: string;
  title: string;
}

export interface IAlbumPage {
  photos: IPhoto[];
}

export type ModalProps = IPhoto & {
  open: boolean;
};
