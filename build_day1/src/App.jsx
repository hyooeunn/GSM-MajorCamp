import { useState } from "react";
import "./App.css";

function App() {
  const [likedCards, setLikedCards] = useState([]);

  const toggleLike = (name) => {
    setLikedCards((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  const profile = {
    name: "효은",
    age: 18,
    hobby: "음악 듣기",
    intro:
      "안녕하세요! 저는 새로운 것을 배우는 걸 좋아하고, 편안한 분위기에서 이야기를 나누는 걸 즐깁니다.",
  };

  const friends = [
    { name: "서연", age: 18, hobby: "셀카 왕창 찍기" },
    { name: "하경", age: 18, hobby: "펭귄∙새 관찰" },
  ];

  return (
    <div className="app">
      <h1 className="title">소개 카드</h1>
      <div className="card-list">
        <article className="profile-card featured yellow">
          <div className="avatar">{profile.name[0]}</div>
          <h2>{profile.name}</h2>
          <p className="intro">{profile.intro}</p>
          <ul className="info-list">
            <li>
              <span>나이</span>
              <strong>{profile.age}살</strong>
            </li>
            <li>
              <span>취미</span>
              <strong>{profile.hobby}</strong>
            </li>
          </ul>
          <button
            className={`like-button ${likedCards.includes(profile.name) ? "liked" : ""}`}
            onClick={() => toggleLike(profile.name)}
          >
            {likedCards.includes(profile.name) ? "♥ 좋아요" : "♡ 좋아요"}
          </button>
        </article>

        {friends.map((friend) => {
          const cardClass = friend.name === "하경" ? "blue" : "pink";
          const introText =
            friend.name === "하경"
              ? "하경은 자연을 좋아하고 조용히 관찰하는 걸 즐깁니다."
              : `${friend.name}은 사진 찍는 걸 좋아하고, 밝고 활발한 분위기를 즐깁니다.`;

          return (
            <article className={`profile-card ${cardClass}`} key={friend.name}>
              <div className="avatar">{friend.name[0]}</div>
              <h2>{friend.name}</h2>
              <p className="intro">{introText}</p>
              <ul className="info-list">
                <li>
                  <span>나이</span>
                  <strong>{friend.age}살</strong>
                </li>
                <li>
                  <span>취미</span>
                  <strong>{friend.hobby}</strong>
                </li>
              </ul>
              <button
                className={`like-button ${likedCards.includes(friend.name) ? "liked" : ""}`}
                onClick={() => toggleLike(friend.name)}
              >
                {likedCards.includes(friend.name) ? "♥ 좋아요" : "♡ 좋아요"}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default App;
