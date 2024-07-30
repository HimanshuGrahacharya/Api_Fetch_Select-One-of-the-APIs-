import React, { useState, useEffect } from "react";

import Data from "./Data/file.json";
function App() {
  const [selectedApi, setSelectedApi] = useState("");
  const [parameters, setParameters] = useState([]);

  useEffect(() => {
    if (selectedApi) {
      const path = selectedApi.split(" ")[0]; // e.g., /serviceAgreements
      const method = selectedApi.split(" ")[1]; // e.g., get

      const apiDetails = Data.paths[path] && Data.paths[path][method];
      if (apiDetails) {
        setParameters(apiDetails.parameters || []);
      } else {
        setParameters([]);
      }
    }
  }, [selectedApi]);

  const handleApiChange = event => {
    setSelectedApi(event.target.value);
  };

  const renderFormField = param => {
    const { name, schema, description } = param;
    const type = schema.type === "integer" ? "number" : "text";
    const required = param.required ? "required" : "";

    return (
      <div key={name}>
        <label>
          {description || name}
          <input
            type={type}
            name={name}
            placeholder={description}
            required={required}
          />
        </label>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>API Form Generator</h1>
      <select onChange={handleApiChange} value={selectedApi}>
        <option value="">Select an API</option>
        {Object.keys(Data.paths).map(path =>
          Object.keys(Data.paths[path]).map(method => (
            <option key={`${path} ${method}`} value={`${path} ${method}`}>
              {path} ({method.toUpperCase()})
            </option>
          ))
        )}
      </select>

      {selectedApi && (
        <form>
          {parameters.map(param => renderFormField(param))}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default App;
