function LeverageBox({ title, subTitle, children }) {
  return (
    <div className="w-full border border-gray rounded-[10px] bg-background px-5 sm:px-10 pt-2 sm:pt-4 pb-5 sm:pb-10">
      <div className="w-full flex flex-col mb-5">
        <p className="text-black text-lg md:text-xl font-mainSemibold">
          {title}
        </p>
        {subTitle ? (
          <p className="text-grayDark text-base font-mainRegular">{subTitle}</p>
        ) : (
          <></>
        )}
      </div>
      {children}
    </div>
  );
}
export default LeverageBox;
