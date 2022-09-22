import { ChangeEvent, useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Modal, Pagination } from '@mui/material';

import { Photo } from '../../components';
import { IAlbumPage, IPhoto, ModalProps } from '../../types';

const initialModalValues: ModalProps = {
  albumId: 0,
  id: 0,
  thumbnailUrl: '',
  url: '',
  title: '',
  open: false,
};

const AlbumPage = ({ photos }: IAlbumPage) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(initialModalValues);
  const [selectedCounter, setSelectedCounter] = useState(0);
  const [checkedBoxes, setCheckedBoxes] = useState<number[]>([]);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePaginationChange = (e: ChangeEvent<unknown>, value: number) => {
    router.push(`${value}`);
  };

  const handleCloseModal = () => {
    setShowModal(initialModalValues);
  };

  const gallery = photos.map(
    ({ albumId, id, title, thumbnailUrl, url }: IPhoto) => {
      return (
        <Photo
          albumId={albumId}
          id={id}
          key={id}
          title={title}
          thumbnailUrl={thumbnailUrl}
          url={url}
          showModal={setShowModal}
          setSelectedCounter={setSelectedCounter}
          checkedBoxes={checkedBoxes}
          setCheckedBoxes={setCheckedBoxes}
        />
      );
    }
  );

  return (
    <>
      <Head>
        <title>PhotoGallery</title>
      </Head>
      <header
        className={`${
          isScrolled ? 'bg-white/90 shadow-lg shadow-black/40' : ''
        } sticky top-0 z-50 flex w-full flex-col items-center justify-between space-y-4 bg-white py-6 px-6 transition-all duration-200 ease-in lg:flex-row`}
      >
        <h1 className="text-4xl font-bold text-blue-700">PhotoGallery</h1>
        <Pagination
          count={100}
          variant="outlined"
          color="primary"
          className="border-white !text-white"
          onChange={handlePaginationChange}
          page={+router.query.id!}
        />
        <p className="text-xl font-semibold lg:pr-24">
          Selected: {selectedCounter}
        </p>
      </header>
      <div className="flex flex-col items-center gap-12 px-6 lg:py-12">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {gallery}
        </div>
        <Modal open={showModal.open} onClose={handleCloseModal}>
          <div className="flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 sm:max-w-[632px]">
              <Image
                loader={() => showModal.url}
                unoptimized
                src={showModal.url}
                alt={showModal.title}
                width={600}
                height={600}
              />
              <div className="flex flex-col">
                <p>
                  Album id:
                  <span className="font-semibold">{showModal.albumId}</span>
                </p>
                <p>
                  Id: <span className="font-semibold">{showModal.id}</span>
                </p>
                <p>
                  Title:
                  <span className="font-semibold">{showModal.title}</span>
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AlbumPage;

export const getStaticProps: GetStaticProps = async (context: any) => {
  const pid = context.params.id;

  const data = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${pid}/photos`
  )
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });

  return {
    props: { photos: data },
  };
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
