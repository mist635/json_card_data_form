import React from "react";
import { AutoForm } from "uniforms-material";
import { bridge } from "./bridge";

const MyForm = () => {
  const handleSubmit = async (data) => {
    console.log("送信データ:", data);

    try {
      const response = await fetch("https://json-card-data-server.onrender.com/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.success) {
        alert(`保存成功：${result.filename}`);
      } else {
        alert("保存に失敗しました");
      }
    } catch (err) {
      console.error("通信エラー:", err);
      alert("エラーが発生しました");
    }
  };

  return (
    <div>
      <h2>JSONフォーム</h2>
      <AutoForm schema={bridge} onSubmit={handleSubmit} />
    </div>
  );
};

export default MyForm;
