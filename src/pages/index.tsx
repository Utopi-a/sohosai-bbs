import { api, type RouterOutputs } from "@/utils/api";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const getAllMessagesApi = api.message.getMessages.useQuery();
  const createMessageApi = api.message.createMessage.useMutation({ onSuccess: () => getAllMessagesApi.refetch });
  const [messages, setMessages] = useState<RouterOutputs["message"]["getMessages"]>([]);

  useEffect(() => {
    if (getAllMessagesApi.data) {
      setMessages(getAllMessagesApi.data);
    }
  }, [getAllMessagesApi.data]);

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) {
      setError("内容を入力しないと書き込めないんぽ……");
      return;
    }
    const newMessage = {
      id: Date.now(),
      author: author || "風吹けばんぽたそ",
      content,
      createdAt: new Date(),
    };
    createMessageApi.mutate({ content, author });
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setAuthor("");
    setContent("");
    setError("");
  };

  return (
    <>
      <Head>
        <title>驚額の掲示板</title>
        <meta name="description" content="驚額の掲示板へようこそんぽ。ここでみんなでお話するんぽ～～！" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#000000",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            flex: "1 0 auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: '"MS PGothic", "Meiryo", sans-serif',
              padding: "10px",
              width: "100%",
              maxWidth: "800px",
            }}
          >
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "normal",
                borderLeft: "solid 6px #ffd702",
                paddingLeft: "5px",
                color: "#ffffff",
              }}
            >
              驚額の掲示板
            </h1>
            <p style={{ color: "#ffffff" }}>ここは驚額の掲示板んぽ。 いっぱいお話するんぽ～</p>
            <form
              onSubmit={handleSubmit}
              style={{
                marginBottom: "20px",
                padding: "10px",
                backgroundColor: "#dddddd",
              }}
            >
              <div>
                名前んぽ (省略できるんぽ) :
                <br />
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  style={{
                    width: "200px",
                    marginBottom: "5px",
                  }}
                />
              </div>
              <div>
                内容んぽ:
                <br />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={5}
                  style={{
                    width: "100%",
                    marginBottom: "5px",
                  }}
                ></textarea>
              </div>
              <div>
                <input
                  type="submit"
                  value="書き込むんぽ～"
                  style={{
                    backgroundColor: "#efefef",
                    border: "1px solid #999999",
                    padding: "3px 10px",
                  }}
                />
              </div>
              {error && <div style={{ color: "red" }}>{error}</div>}
            </form>
            <div>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <tbody>
                  {messages.map((message, index) => (
                    <tr
                      key={message.id}
                      style={{
                        border: "1px solid #cccccc",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <td
                        style={{
                          padding: "10px",
                          verticalAlign: "top",
                        }}
                      >
                        <span style={{ color: "#008000" }}>{messages.length - index}</span>
                        <span style={{ color: "#0000ff" }}> 名前：</span>
                        <span style={{ color: "#008000", fontWeight: "bold" }}>{message.author}</span>
                        <span style={{ color: "#0000ff" }}> 投稿日：</span>
                        <span>{new Date(message.createdAt).toLocaleString("ja-JP")}</span>
                        <br />
                        <span
                          style={{
                            whiteSpace: "pre-wrap",
                            fontFamily: "monospace",
                          }}
                        >
                          {message.content}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <footer
          style={{
            padding: "1rem 0",
            textAlign: "center",
            marginTop: "2rem",
            flexShrink: 0,
          }}
        >
          <p
            style={{
              color: "#ffffff",
            }}
          >
            やきそばマイスター
          </p>
        </footer>
      </div>
    </>
  );
}
