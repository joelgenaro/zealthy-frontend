import React, { memo } from "react";

const AboutMe = memo(({ formData, setFormData, errors }) => {
    return (
      <>
        <textarea
          placeholder="About Me"
          value={formData.aboutMe}
          onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })}
        />
         {errors.aboutMe && <p style={{ color: "red" }}>{errors.aboutMe}</p>}
      </>
    );
  });
  
  export default AboutMe;