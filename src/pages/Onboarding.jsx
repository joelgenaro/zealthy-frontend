import React, { useState, useEffect } from "react";
import { get, post } from "../utils/api.js";
import Address from "../components/address.jsx";
import AboutMe from "../components/aboutMe.jsx";
import Birthdate from "../components/birthdy.jsx";

function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    aboutMe: "",
    address: { street: "", city: "", state: "", zip: "" },
    birthdate: "",
  });
  const [config, setConfig] = useState({ page2: [], page3: [] });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedStep = localStorage.getItem("onboardingStep");
    const savedFormData = localStorage.getItem("onboardingFormData");

    if (savedStep && savedFormData) {
      setStep(Number(savedStep));
      setFormData(JSON.parse(savedFormData));
    }

    get("/admin-config")
      .then((res) => setConfig(res.data))
      .catch((err) => console.error("Error fetching config:", err));
  }, []);

  useEffect(() => {
    if (formData.email && formData.password) {
      localStorage.setItem("onboardingStep", step);
      localStorage.setItem("onboardingFormData", JSON.stringify(formData));
    }
  }, [step, formData]);

  const validateFields = (fields) => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field === "email" && !formData.email) newErrors.email = "Email is required.";
      if (field === "password" && !formData.password) newErrors.password = "Password is required.";
      if (field === "aboutMe" && !formData.aboutMe) newErrors.aboutMe = "About Me is required.";
      if (field === "address" && !formData.address.street) newErrors.street = "Street address is required.";
      if (field === "birthdate" && !formData.birthdate) newErrors.birthdate = "Birthdate is required.";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateFields(["email", "password"])) setStep(step + 1);
    if (step === 2 && validateFields(config.page2)) setStep(step + 1);
  };

  const handlePrev = () => setStep(step - 1);

  const handleSubmit = () => {
    if (validateFields(config.page3)) {
      post("/users", formData)
        .then(() => {
          alert("Submitted!");
          localStorage.removeItem("onboardingStep");
          localStorage.removeItem("onboardingFormData");
        })
        .catch((err) => console.error("Error submitting data:", err));
    }
  };

  const renderComponent = (componentName) => {
    switch (componentName) {
      case "address":
        return <Address formData={formData} setFormData={setFormData} errors={errors} />;
      case "aboutMe":
        return <AboutMe formData={formData} setFormData={setFormData} errors={errors} />;
      case "birthdate":
        return <Birthdate formData={formData} setFormData={setFormData} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Step 1: Account Info</h2>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Step 2</h2>
          {config.page2.map((componentName, index) => (
            <div key={index}>{renderComponent(componentName)}</div>
          ))}
          <button onClick={handlePrev}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>Step 3</h2>
          {config.page3.map((componentName, index) => (
            <div key={index}>{renderComponent(componentName)}</div>
          ))}
          <button onClick={handlePrev}>Back</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default Onboarding;