import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
interface Holiday {
  date: string;
  holiday: string[];
}

interface SpecialDays {
  specialDays: Holiday[];
}

const SpecialDays: React.FC = () => {
  const [holiday, setHoliday] = useState<string | null>(null);
  const [holidayLink, setHolidayLink] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecialDays = async () => {
      const response = await fetch("/specialDays.json");
      const data: SpecialDays = await response.json();

      // Bugünün tarihini YYYY-MM-DD formatında al
      const today = new Date().toISOString().split("T")[0];

      // Bugünün tarihine karşılık gelen tatili bul
      const todayHoliday = data.specialDays.find((day) => day.date === today);

      if (todayHoliday) {
        const holidayName = todayHoliday.holiday.join(", ");
        setHoliday(holidayName);

        // Google arama linkini oluştur
        setHolidayLink(
          `https://www.google.com/search?q=${encodeURIComponent(holidayName)}`
        );
      } else {
        setHoliday("No special day today");
      }
    };

    fetchSpecialDays();
  }, []);

  return (
    <>
      <div style={{ width: "200px" }} className="invisible sm:visible pb-2">
        <Marquee speed={30}>
          {holidayLink && (
            <div className="pl-1">
              <span className="pr-1">
                <em>TODAY is</em>
              </span>
              <a href={holidayLink} target="_blank" rel="noopener noreferrer">
                {holiday}
              </a>
            </div>
          )}
          {holidayLink && (
            <div className="text-[#fef406] pl-1">
              <span className="pr-1">
                <em>TODAY is</em>
              </span>
              <a href={holidayLink} target="_blank" rel="noopener noreferrer">
                {holiday}
              </a>
            </div>
          )}
        </Marquee>
      </div>
    </>
  );
};

export default SpecialDays;
