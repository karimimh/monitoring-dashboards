"use client";

import { useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";

interface PersianDateTimePickerProps {
  onChange: (time?: number) => void;
  value: number | null;
}

const PersianDateTimePicker = ({
  value,
  onChange,
}: PersianDateTimePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<
    Date | string | number | DateObject | null
  >(value);
  const [selectedTime, setSelectedTime] = useState<string | null>(
    value
      ? new Date(value).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : null
  );

  return (
    <div
      className="flex h-9 py-0.5  items-center gap-2 px-2 border bg-white rounded-md shadow focus:outline focus:outline-3 focus:outline-blue-500"
      dir="ltr"
    >
      <DatePicker
        value={selectedDate}
        onChange={(d) => {
          setSelectedDate(d);
          if (d instanceof DateObject) {
            onChange(d.toDate().getTime());
          } else if (d !== null) {
            onChange(new Date(d as string).getTime());
          } else {
            onChange(undefined);
          }
        }}
        calendar={persian}
        locale={persian_fa}
        placeholder="انتخاب تاریخ"
        format="YYYY/MM/DD"
        inputClass="w-20 border-none  focus:outline-none"
        className="text-gray-700 bg-white"
      />
      <input
        type="time"
        value={selectedTime ?? undefined}
        onChange={(e) => {
          setSelectedTime(e.target.value);
          const [hours, minutes] = e.target.value.split(":");
          const date = new Date(selectedDate as Date);
          date.setHours(Number(hours));
          date.setMinutes(Number(minutes));
          onChange(date.getTime());
        }}
        className="w-16 text-gray-700 bg-white focus:outline-none"
      />
    </div>
  );
};

export default PersianDateTimePicker;
