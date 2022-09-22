import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';

import { BsArrowsFullscreen } from 'react-icons/bs';
import { Checkbox } from '@mui/material';
import { IPhoto, ModalProps } from '../types';

type PhotoProps = IPhoto & {
  showModal: Dispatch<SetStateAction<ModalProps>>;
  setSelectedCounter: Dispatch<SetStateAction<number>>;
  setCheckedBoxes: Dispatch<SetStateAction<number[]>>;
  checkedBoxes: number[];
};

const Photo = ({
  albumId,
  url,
  thumbnailUrl,
  title,
  id,
  showModal,
  setSelectedCounter,
  checkedBoxes,
  setCheckedBoxes,
}: PhotoProps) => {
  useEffect(() => {
    if (checkedBoxes.includes(id)) setIsChecked(true);
  }, [checkedBoxes, id]);

  const [isChecked, setIsChecked] = useState(false);

  const handleChangeCheck = () => {
    setIsChecked((prev) => !prev);

    if (isChecked) {
      setSelectedCounter((prev) => prev - 1);
      setCheckedBoxes((prev) => prev.filter((photoId) => photoId !== id));
      return;
    }

    setCheckedBoxes((prev) => [...prev, id]);
    setSelectedCounter((prev) => prev + 1);
  };

  const handleShowModal = () => {
    showModal({
      albumId,
      id,
      thumbnailUrl,
      url,
      title,
      open: true,
    });
  };

  return (
    <div
      className={`relative border-2 ${
        isChecked ? 'border-blue-400 bg-blue-200' : 'border-black/20'
      } flex flex-col rounded-lg px-4 pt-12 pb-4 shadow-md hover:bg-blue-200`}
    >
      <div className="flex flex-col items-center">
        <Image
          loader={() => thumbnailUrl}
          unoptimized
          src={thumbnailUrl}
          alt={title}
          width={150}
          height={150}
          objectFit="contain"
          onClick={handleChangeCheck}
          className="rounded-md hover:cursor-pointer"
        />
        <div className="absolute left-0 top-0 flex w-full items-center pr-3">
          <Checkbox
            color="primary"
            id={id + ''}
            checked={isChecked}
            onChange={handleChangeCheck}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
          />
          <div
            onClick={handleShowModal}
            className="rounded-sm-500 flex h-6 w-6 items-center justify-center rounded-sm border-[3px] border-gray-500 bg-transparent shadow-md transition-all hover:cursor-pointer hover:bg-blue-300"
          >
            <BsArrowsFullscreen className="h-3.5 w-3.5 transition-all duration-100 hover:h-4 hover:w-4" />
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-sm font-semibold capitalize">
        {title}
      </p>
    </div>
  );
};

export default Photo;
