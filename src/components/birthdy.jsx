import React, { memo } from "react";

const Birthdate = memo(({ formData, setFormData, errors }) => {
  return (
    <>
      <input
        type="date"
        value={formData.birthdate}
        onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
      />
        {errors.birthdate && <p style={{ color: "red" }}>{errors.birthdate}</p>}
    </>
  );
});

export default Birthdate;