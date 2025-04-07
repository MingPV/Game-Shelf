"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiDocs() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch("/api/docs")
      .then((res) => res.json())
      .then((data) => setSpec(data))
      .catch((err) => console.error("Failed to load Swagger spec", err));
  }, []);

  if (!spec) return <p>Loading Swagger UI...</p>;

  return (
    <div className="bg-white">
      <SwaggerUI
        spec={spec}
        docExpansion="full"
        defaultModelsExpandDepth={-1}
        showExtensions={true}
        showCommonExtensions={true}
        filter={false}
        deepLinking={true}
        layout="BaseLayout"
        tryItOutEnabled={true}
      />
    </div>
  );
}
