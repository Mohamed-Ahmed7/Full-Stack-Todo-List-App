import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { type ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
}

const Modal = ({
  title,
  description,
  children,
  isOpen,
  closeModal,
}: IProps) => {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white shadow-xl p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              {title && (
                <DialogTitle
                  as="h3"
                  className=" font-semibold text-xl text-black"
                >
                  {title}
                </DialogTitle>
              )}
              {description && (
                <p className="mt-2 text-sm/6 text-black">{description}</p>
              )}
              <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
