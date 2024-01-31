import PaginationButton from "@/components/PaginationButton";

type Props = {
  currentPage: number;
  lastPage: number;
};

const GeneratePaginationButtons = ({ currentPage, lastPage }: Props) => {
  const TOTAL_BUTTON_NUM = lastPage > 7 ? 7 : lastPage;
  const BUTTON_MIDDLE = Math.round(TOTAL_BUTTON_NUM / 2);
  const PAGE_DISTINCTION = lastPage - currentPage;

  const BUTTONS = Array.from({ length: TOTAL_BUTTON_NUM }).map((_, i) => {
    const value =
      PAGE_DISTINCTION >= BUTTON_MIDDLE
        ? i + (currentPage <= BUTTON_MIDDLE ? 1 : currentPage - 2)
        : lastPage - (TOTAL_BUTTON_NUM - i - 1);

    return <PaginationButton value={value} currentPage={currentPage} />;
  });

  if (TOTAL_BUTTON_NUM < lastPage && PAGE_DISTINCTION >= BUTTON_MIDDLE) {
    BUTTONS.splice(
      -2,
      2,
      <PaginationButton key="last...page" value="..." />,
      <PaginationButton
        key={lastPage}
        value={lastPage}
        currentPage={currentPage}
      />
    );
  }

  if (TOTAL_BUTTON_NUM < lastPage && PAGE_DISTINCTION < BUTTON_MIDDLE) {
    BUTTONS.splice(1, 1, <PaginationButton key="start...page" value="..." />);
  }

  if (TOTAL_BUTTON_NUM < lastPage && TOTAL_BUTTON_NUM < currentPage) {
    BUTTONS.splice(
      0,
      1,
      <PaginationButton key={1} value={1} currentPage={currentPage} />
    );
  }

  return BUTTONS;
};

export default GeneratePaginationButtons;
