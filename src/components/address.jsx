import React, { memo } from "react";

const Address = memo(({ formData, setFormData, errors }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Street"
        value={formData.address.street}
        onChange={(e) =>
          setFormData({
            ...formData,
            address: { ...formData.address, street: e.target.value },
          })
        }
      />
      {errors.street && <p style={{ color: "red" }}>{errors.street}</p>}
      <input
        type="text"
        placeholder="City"
        value={formData.address.city}
        onChange={(e) =>
          setFormData({
            ...formData,
            address: { ...formData.address, city: e.target.value },
          })
        }
      />
      <input
        type="text"
        placeholder="State"
        value={formData.address.state}
        onChange={(e) =>
          setFormData({
            ...formData,
            address: { ...formData.address, state: e.target.value },
          })
        }
      />
      <input
        type="text"
        placeholder="Zip"
        value={formData.address.zip}
        onChange={(e) =>
          setFormData({
            ...formData,
            address: { ...formData.address, zip: e.target.value },
          })
        }
      />
    </>
  );
});

export default Address;