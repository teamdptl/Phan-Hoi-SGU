import { Select, SelectItem } from "@tremor/react";
import { useState } from "react";
import { CalculatorIcon, EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";


export default function DropDownListDevice(props) {
    const userEquimentIdsWithOther = [...props.userEquimentIds, { id: '-1', name: 'Khác' }];


  const handleDeviceChange = (value) => {
      if (value !== "-1") {
          props.setSelectedValue(value);
          props.setData('other', null);
      } else {
          props.setSelectedValue(value);
          // props.setData('idEquipment', null);
      }
  };

  return (
      <>
          <Select value={props.selectedValue}  onChange={handleDeviceChange} placeholder={"Chọn thiết bị"}>
              {userEquimentIdsWithOther.map(item => (
                  <SelectItem key={item.id}  value={item.id} >
                      {item.name}
                  </SelectItem>
              ))}
          </Select>
      </>
  );
}
