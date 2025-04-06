import React, { useState, useEffect } from "react";
import { get, post } from "../utils/api";

function Admin() {
  const [config, setConfig] = useState({
    page2: ["aboutMe"],
    page3: ["address"],
  });

  const components = ["aboutMe", "address", "birthdate"];

  useEffect(() => {
    get("/admin-config")
      .then((res) => setConfig(res.data))
      .catch((err) => console.error("Error fetching config:", err));
  }, []);

  const handleCheckboxChange = (page, component) => {
    setConfig((prevConfig) => {
      const updatedPage = prevConfig[page].includes(component)
        ? prevConfig[page].filter((item) => item !== component)
        : [...prevConfig[page], component];

      return {
        ...prevConfig,
        [page]: updatedPage,
      };
    });
  };

  const handleSave = () => {
    if (config.page2.length === 0 || config.page3.length === 0) {
      alert("Each page must have at least one component.");
      return;
    }

    post("/admin-config", config)
      .then(() => alert("Saved!"))
      .catch((err) => console.error("Error saving config:", err));
  };

  const isComponentDisabled = (page, component) => {
    const otherPage = page === "page2" ? "page3" : "page2";
    return config[otherPage].includes(component);
  };

  return (
    <div>
      <h2>Admin Configuration</h2>
      <div>
        <h3>Page 2</h3>
        {components.map((component) => (
          <label key={`page2-${component}`}>
            <input
              type="checkbox"
              checked={config.page2.includes(component)}
              disabled={isComponentDisabled("page2", component)}
              onChange={() => handleCheckboxChange("page2", component)}
            />
            {component}
          </label>
        ))}
      </div>
      <div>
        <h3>Page 3</h3>
        {components.map((component) => (
          <label key={`page3-${component}`}>
            <input
              type="checkbox"
              checked={config.page3.includes(component)}
              disabled={isComponentDisabled("page3", component)}
              onChange={() => handleCheckboxChange("page3", component)}
            />
            {component}
          </label>
        ))}
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Admin;