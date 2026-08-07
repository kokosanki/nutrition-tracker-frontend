import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import "react-day-picker/style.css";
import { formatLocalDate, parseLocalDate } from "@/utils/date.ts";
import styles from "./DatePickerPopover.module.scss";

interface DatePickerPopoverProps {
  date: string;
  onSelect: (date: string) => void;
}

const DatePickerPopover = ({ date, onSelect }: DatePickerPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent): void => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (selectedDate: Date | undefined): void => {
    if (!selectedDate) return;
    onSelect(formatLocalDate(selectedDate));
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Choose a date"
      >
        <FontAwesomeIcon icon={faCalendarDay} />
      </button>
      {isOpen && (
        <div className={styles.popover}>
          <DayPicker
            mode="single"
            selected={parseLocalDate(date)}
            onSelect={handleSelect}
            defaultMonth={parseLocalDate(date)}
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerPopover;
