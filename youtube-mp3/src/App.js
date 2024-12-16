import React, { useState } from "react";

const App = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const serverUrl = "http://localhost:8000";

  const handleDownload = async () => {
    setLoading(true);
    try {
      const reqUrl = `${serverUrl}/download?url=${encodeURIComponent(url)}`;
      const response = await fetch(reqUrl, {
        headers: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      });
      console.log(`res: ${response}`);
      const link = document.createElement("a");
      link.href = reqUrl;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Failed to download MP3 file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter YouTube video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button disabled={loading} onClick={handleDownload}>
        {loading ? "Downloading..." : "Download MP3"}
      </button>
    </div>
  );
};

export default App;
