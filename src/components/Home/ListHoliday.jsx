import React from "react";
import CardHoliday from "./CardHoliday";
import { getHoliday } from "../../services/hodilay";
import { useState, useEffect } from "react";

const ListHoliday = () => {
  const [holidayDate, setHolidayDate] = useState([]);
  const country = "VI";
  const year = new Date().getFullYear();

  const fetchHoliday = async () => {
    try {
      const data = await getHoliday(country, year);
      setHolidayDate(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchHoliday();
  }, [country, year]);

  return (
    <div>
      {holidayDate.map((item, key) => {
        return (
          <CardHoliday
            key={key}
            title={item.name}
            date={item.date}
            type={item.type}
            isShow={true}
          />
        );
      })}
    </div>
  );
};

export default ListHoliday;
