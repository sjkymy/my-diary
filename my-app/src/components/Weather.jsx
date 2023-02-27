import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
// import weatherDescKo from "./weatherDescKo";

export default function Weather() {
    
    const [location, setLocation] = useState("");
    const [result, setResult] = useState({});
    const [atmosphere, setAtmosphere] = useState("");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3bee6a724f0b498cb3d4d5c31365533a`;
    
  const todayWeather = async (e) => {
    try {
        const data = await axios({
            method: "get",
            url: url
        })
        console.log(data);
        setResult(data);
        setAtmosphere(data.data.weather[0].main)
    } catch (err) {
        console.log(err.message);
    }
  };

  useEffect(() => {
    todayWeather();
  }, [location]);

  return (
    <AppWrap>
        <h3>현재 날씨를 확인하세요.</h3>
        <div className="appContentWrap">
            <select
                value={location}
                onChange={(e) => {setLocation(e.target.value)}}
            >
                <option value="">--도시를 선택하세요--</option>
                <option value="Seoul">서울</option>
                <option value="Incheon">인천</option>
                <option value="Daejeon">대전</option>
                <option value="Daegu">대구</option>
                <option value="Gwangju">광주</option>
                <option value="Busan">부산</option>
            </select>
        </div>
        {Object.keys(result).length !== 0 && (
            <ResultWrap>
                <p className="temperature">
                    기온: {Math.round(((result.data.main.temp - 273.15) * 10)) / 10}도
                </p>
                <p className="sky">
                    대기상태: {atmosphere}
                </p>
            </ResultWrap>
        )}
    </AppWrap>
  )
}

const AppWrap = styled.div`
    width: 300px;
    margin: 0 auto ;
    text-align: center;

    select {
        padding: 5px 0 5px 10px;
        border-radius:20px;
    }
`

const ResultWrap = styled.div`
    width: 100%;
`
