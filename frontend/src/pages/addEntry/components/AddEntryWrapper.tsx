import React from 'react';

interface AddEntryWrapperProps {
  children: React.ReactNode;
}

export const AddEntryWrapper = (props: AddEntryWrapperProps) => {
  const { children } = props;

  return (
    <div className="container mx-auto my-4 md:my-8">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 flex mx-auto">
          <div className="mx-4 card bg-neutral text-neutral-content card-compact w-full">
            <div className="card-body flex">
              <h4 className="text-3xl pb-2">Legg til</h4>
              <div className="flex flex-col">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
