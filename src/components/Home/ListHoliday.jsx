import React from "react";
import CardHoliday from "./CardHoliday";
import { getHoliday } from "../../services/hodilay";
import { useState, useEffect } from "react";
import { Select, Space } from "antd";

const ListHoliday = () => {
  const [holidayDate, setHolidayDate] = useState([]);
  const [countryState, setContrystate] = useState("VI");
  const year = new Date().getFullYear();

  const fetchHoliday = async () => {
    try {
      const data = await getHoliday(countryState, year);
      setHolidayDate(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHoliday();
  }, [countryState, year]);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setContrystate(value);
  };

  return (
    <>
      <Space wrap>
        <Select
          defaultValue="VI"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: "US",
              label: "US",
            },
            {
              value: "VI",
              label: "VI",
            },
          ]}
        />
      </Space>
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
    </>
  );
};

export default ListHoliday;
