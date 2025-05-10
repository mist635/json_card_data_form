import React, { useState } from "react";
import { AutoForm } from "uniforms-material";
import { schema } from "./bridge";

export default function MyForm() {
  const [status, setStatus] = useState("idle"); // 状態: idle | sending | success | error

  const handleSubmit = async (formData) => {
    setStatus("sending");

    try {
      const response = await fetch("https://json-card-data-server.onrender.com/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Server responded with an error");

      setStatus("success");
      alert("データの保存に成功しました！");
    } catch (error) {
      setStatus("error");
      const retry = window.confirm(
        "データの送信に失敗しました。\n無料サーバーを使用しているため、サーバーが一時的に落ちている可能性があります。\nもう一度送信を試みますか？"
      );
      if (retry) {
        handleSubmit(formData); // 再送信（再帰的）
      } else {
        alert("保存は行われませんでした。後でもう一度お試しください。");
      }
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <AutoForm schema={schema} onSubmit={handleSubmit} />
      {status === "sending" && <p>⏳ 送信中です…</p>}
    </div>
  );
}
