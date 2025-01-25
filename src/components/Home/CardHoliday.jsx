import React from "react";
import { Card, Space } from "antd";

const CardHoliday = ({ title, date, type, isShow }) => {
  return (
    <>
      <Space direction="vertical" size={16}>
        <Card
          title={title}
          extra={<a href="#">More</a>}
          style={{
            width: 300,
          }}
        >
          <p>{date}</p>
          <p>{type}</p>
          <button
            className={`${
              isShow ? "bg-[#ff0000]" : "bg-[#252994]"
            } text-white px-4 py-2 rounded-md`}
          >
            Show more
          </button>
        </Card>
      </Space>
    </>
  );
};

export default CardHoliday;
