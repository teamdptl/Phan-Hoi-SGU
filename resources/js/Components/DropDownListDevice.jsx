import { Select, SelectItem } from "@tremor/react";
import { useState } from "react";
import { CalculatorIcon, EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";


export default function DropDownListDevice(props) {

    const handleDeviceChange = (value) => {
      props.setSelectedValue(value);
      
      if (value != 4) {

        props.setData('selectDeviceOther', null);
      }
    };

    return (
      <>
        <Select onValueChange={handleDeviceChange}>
          <SelectItem value="1" >
            Kilometers
          </SelectItem>
          <SelectItem value="2" >
            Meters
          </SelectItem>
          <SelectItem value="3" >
            Miles
          </SelectItem>
          <SelectItem value="4" >
            Khác
          </SelectItem>
        </Select>
      </>
    );
}
