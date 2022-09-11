import React from 'react';
import XMarkIcon from './svg-assets/xmark-icon';

const Modal = props => {
  const { handleDelete, handleModal } = this.props;

  return (
    <>
      <div className="justify-center items-center flex fixed inset-0 z-50">
        <div className="relative my-6 mx-auto w-[350px] md:w-[400px]">
          <div className="border-0 rounded-lg shadow-lg relative flex
                  flex-col w-full bg-white">
            <div className="flex items-start justify-between px-5 py-4 border-b
                  border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Confirm Delete
              </h3>
              <button
                className="p-1 border-0 text-black float-right leading-none font-semibold"
                onClick={handleModal}
              ><XMarkIcon />
              </button>
            </div>
            <div className="relative px-6 md:py-2 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                {'Are you sure you want to delete this post? This process can\'t be undone.'}
              </p>
            </div>
            <div className="flex items-center justify-end px-6 py-4 border-t
              border-solid border-slate-200 rounded-b">
              <button
                className=" font-bold hover:text-gray-700 hover:scale-105 uppercase mx-6
                      my-2 text-sm"
                onClick={handleModal}
              >Cancel
              </button>
              <button
                className="bg-red-500 text-white active:bg-red-600
                      font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg
                      hover:scale-105 mr-1 mb-1"
                onClick={handleDelete}
              >Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
