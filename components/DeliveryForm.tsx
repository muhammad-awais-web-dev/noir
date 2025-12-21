import React, { useEffect, useRef, useState } from "react";
import { ShippingCostData } from "@/data/ShipingCostData";

const DeliveryForm = (props: {
  setDeliveryFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  deliveryFormValid: boolean;
  setFormData?: React.Dispatch<React.SetStateAction<{firstName:string;province:string;city:string;shipingCost:number;street:string;home:string}>>;
  formData?: {firstName:string;province:string;city:string;shipingCost:number;street:string;home:string};
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [fullName, setFullName] = useState<string>("Full Name");
  const [province, setProvince] = useState<string>("Select Province");
  const [City, setCity] = useState<string>("Select City");
  const [street, setStreet] = useState<string>("");
  const [home, setHome] = useState<string>("");

  useEffect(() => {
    props.setDeliveryFormValid(
      fullName !== "" &&
        fullName !== "Full Name" &&
        province !== "Select Province" &&
        City !== "Select City" &&
        street !== "" &&
        home !== ""
    );
    if(props.setFormData && props.deliveryFormValid){
      const shippingCost = ShippingCostData.find((p) => p.province_name === province)
        ?.cities.find((c) => c.name === City)?.shippingCost;
      props.setFormData({
        firstName: fullName,
        province: province,
        city: City,
        shipingCost: shippingCost || 0,
        street: street,
        home: home
      });

    }
  }, [fullName, province, City, street, home]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="select-text flex flex-col gap-5 my-2 ">
      <input
        type="text"
        required
        placeholder="Full Name"
        onChange={(e) => setFullName(e.target.value)}
        className=" w-full p-3 border dark:border-white border-black rounded-md "
      />
      <select
        disabled={!fullName || fullName === "Full Name"}
        defaultValue={province}
        onChange={(e) => setProvince(e.target.value)}
        className=" w-full p-3 border dark:border-white border-black rounded-md disabled:bg-black/20 disabled:dark:bg-white/20 disabled:text-[#666666] disabled:dark:text-[#666666]"
      >
        <option className=" bg-white text-black dark:bg-black dark:text-white " disabled>Select Province</option>
        {ShippingCostData.map((province) => (
          <option className=" bg-white text-black dark:bg-black dark:text-white " key={province.id} value={province.province_name}>
            {province.province_name}
          </option>
        ))}
      </select>
      <select
        defaultValue={City}
        disabled={
          province === "Select Province" ||
          fullName === "" ||
          fullName === "Full Name"
        }
        onChange={(e) => setCity(e.target.value)}
        className=" w-full p-3 border dark:border-white border-black rounded-md disabled:bg-black/20 disabled:dark:bg-white/20 disabled:text-[#666666] disabled:dark:text-[#666666]"
      >
        <option className=" bg-white text-black dark:bg-black dark:text-white " disabled>Select City</option>
        {ShippingCostData.filter((p) => p.province_name === province).flatMap(
          (p) =>
            p.cities.map((city) => (
              <option className=" bg-white text-black dark:bg-black dark:text-white " key={city.code} value={city.name}>
                {city.name}
              </option>
            ))
        )}
      </select>
      <input
        disabled={
          province === "Select Province" ||
          City === "Select City" ||
          fullName === "" ||
          fullName === "Full Name"
        }
        type="text"
        placeholder="Street Address"
        onChange={(e) => setStreet(e.target.value)}
        className=" w-full p-3 border dark:border-white border-black rounded-md disabled:bg-black/20 disabled:dark:bg-white/20 disabled:text-[#666666] disabled:dark:text-[#666666]"
      />
      <input
        disabled={
          province === "Select Province" ||
          City === "Select City" ||
          fullName === "" ||
          fullName === "Full Name" ||
          street === ""
        }
        type="text"
        placeholder="Home Address"
        onChange={(e) => setHome(e.target.value)}
        className=" w-full p-3 border dark:border-white border-black rounded-md disabled:bg-black/20 disabled:dark:bg-white/20 disabled:text-[#666666] disabled:dark:text-[#666666]"
      />
    </form>
  );
};

export default DeliveryForm;
