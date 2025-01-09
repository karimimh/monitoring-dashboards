"use client";

import PersianDateTimePicker from "./ui/datetime-picker";

interface DateRangePickerProps {
  fromDate?: number;
  toDate?: number;
  onChange: (fromDate?: number, toDate?: number) => void;
}

const DateRangePicker = ({
  fromDate,
  onChange,
  toDate,
}: DateRangePickerProps) => {
  return (
    <div className="flex flex-row-reverse font-normal text-sm gap-1 items-center">
      <div>از تاریخ </div>
      <PersianDateTimePicker
        value={fromDate ?? null}
        onChange={(fromDate) => onChange(fromDate, toDate)}
      />
      <div className="ml-2">تا تاریخ</div>
      <PersianDateTimePicker
        value={toDate ?? null}
        onChange={(toDate) => onChange(fromDate, toDate)}
      />
    </div>
  );
};

export default DateRangePicker;
