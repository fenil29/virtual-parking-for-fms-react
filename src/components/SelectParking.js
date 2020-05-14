import React, { useEffect, useState } from "react";

import axios from "axios";

import { useHistory } from "react-router-dom";

import { Select } from "antd";
const { Option } = Select;

function SelectParking() {
  const [loading, setLoading] = useState(true);
  const [parkingLot, setParkingLot] = useState([]);
  const history = useHistory();

  function onChange(value) {
    console.log(`selected ${value}`);
    history.push(`/${value}`);
  }
  const getParkingLot = () => {
    axios
      .get("http://localhost:4000/vp-parking")
      .then(function (response) {
        console.log(response.data);
        setParkingLot(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getParkingLot();
  }, []);
  return (
    <div className="outer-container">
      <div className="select-parking-lot">
        <h1>Select Parking Lot</h1>
        <div>
          <Select
            size="large"
            loading={loading}
            showSearch
            style={{ width: "100%" }}
            placeholder="Select a parking lot"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {parkingLot.map((lot, index) => (
              <Option key={index} value={lot.pd_lot_id}>
                {lot.pd_loc_name}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}

export default SelectParking;
